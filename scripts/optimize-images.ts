import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function optimizeImages() {
  console.log('Starting image optimization with sharp...');
  const dirs = [
    path.resolve(process.cwd(), 'src/assets/images'),
    path.resolve(process.cwd(), 'public/images'),
    path.resolve(process.cwd(), 'public')
  ];

  const processed = new Set<string>();

  async function walkAndOptimize(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkAndOptimize(fullPath);
      } else if (entry.isFile() && /\.(jpe?g|png)$/i.test(entry.name)) {
        if (processed.has(fullPath)) continue;
        processed.add(fullPath);

        const isAvatar = /avatar/i.test(entry.name);
        const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');

        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();

          if (isAvatar) {
            // Resize avatars to max 256x256
            await sharp(fullPath)
              .resize(256, 256, { fit: 'cover' })
              .webp({ quality: 80, effort: 6 })
              .toFile(webpPath + '.tmp');
            fs.renameSync(webpPath + '.tmp', webpPath);

            await sharp(fullPath)
              .resize(256, 256, { fit: 'cover' })
              .jpeg({ quality: 75, mozjpeg: true })
              .toFile(fullPath + '.tmp');
            fs.renameSync(fullPath + '.tmp', fullPath);
            console.log(`Optimized avatar: ${entry.name}`);
          } else {
            // General images: max 1280 width
            const targetWidth = metadata.width && metadata.width > 1280 ? 1280 : undefined;
            const resizer = targetWidth ? sharp(fullPath).resize(targetWidth) : sharp(fullPath);

            await resizer
              .webp({ quality: 80, effort: 5 })
              .toFile(webpPath + '.tmp');
            fs.renameSync(webpPath + '.tmp', webpPath);

            const jpgResizer = targetWidth ? sharp(fullPath).resize(targetWidth) : sharp(fullPath);
            await jpgResizer
              .jpeg({ quality: 78, mozjpeg: true })
              .toFile(fullPath + '.tmp');
            fs.renameSync(fullPath + '.tmp', fullPath);
            console.log(`Optimized image: ${entry.name}`);
          }
        } catch (err) {
          console.error(`Error optimizing ${fullPath}:`, err);
        }
      }
    }
  }

  for (const d of dirs) {
    await walkAndOptimize(d);
  }

  // Also optimize og-image.jpg if exists
  const ogPath = path.resolve(process.cwd(), 'public/og-image.jpg');
  if (fs.existsSync(ogPath)) {
    try {
      await sharp(ogPath)
        .resize(1200, 630, { fit: 'cover' })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(ogPath + '.tmp');
      fs.renameSync(ogPath + '.tmp', ogPath);
      console.log('Optimized public/og-image.jpg');
    } catch (e) {
      console.error('Failed to optimize og-image.jpg', e);
    }
  }

  console.log('Image optimization finished successfully.');
}

optimizeImages();
