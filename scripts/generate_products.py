import json
import os

products = []

def add_prod(pid, name, cat, brand, cond, mkt_price, desc, specs, img, badge, extra=None):
    if extra is None:
        extra = {}
    disc_price = int(round(mkt_price * 0.8))  # Strictly 20% OFF
    saving = mkt_price - disc_price
    item = {
        'id': pid,
        'name': name,
        'category': cat,
        'brand': brand,
        'condition': cond,
        'marketPrice': mkt_price,
        'discountedPrice': disc_price,
        'discountPercentage': 20,
        'savingAmount': saving,
        'priceEstimate': f'PKR {disc_price:,}',
        'description': desc,
        'specs': specs,
        'warranty': extra.get('warranty', '3-Month Bench Warranty + 10-Day Checking'),
        'availability': extra.get('availability', 'In Stock (Sialkot Lab & Doorstep)'),
        'imageUrl': img,
        'imageAlt': f'{name} in Sialkot at 20% discount',
        'featuredBadge': badge
    }
    for k in ['processor', 'generation', 'ram', 'storage', 'display', 'graphics', 'batteryHealth']:
        if k in extra:
            item[k] = extra[k]
    products.append(item)

# 1. LAPTOPS & PCS (25 MODELS)
laptops = [
    # HP (5)
    ('prod-laptop-hp-840-g8', 'HP EliteBook 840 G8 (11th Gen Core i5)', 'HP', 'Certified Grade-A (UAE Import)', 125000,
     'Clean silver business laptop with backlit keys and crisp FHD screen. Tested in Sialkot lab.',
     ['Intel Core i5-1135G7 (11th Gen)', '16GB DDR4 RAM • 512GB NVMe SSD', '14.0" FHD IPS 400 nits Display', 'Intel Iris Xe Graphics', 'Thunderbolt 4 • Fingerprint Login'],
     '/images/shop/laptop_hp_elitebook_840.svg', 'Best Seller 20% OFF',
     {'processor': 'Intel Core i5-1135G7 (11th Gen)', 'generation': '11th Gen', 'ram': '16GB DDR4', 'storage': '512GB NVMe SSD', 'display': '14" FHD IPS', 'graphics': 'Intel Iris Xe', 'batteryHealth': '90%+ Battery Health (7-9 Hours)'}),

    ('prod-laptop-hp-850-g7', 'HP EliteBook 850 G7 (10th Gen Core i7)', 'HP', 'Certified Grade-A (UAE Import)', 140000,
     'Large 15.6 inch screen with full numeric keypad. Ideal for accounts and factory bills.',
     ['Intel Core i7-10610U (10th Gen 6-Core)', '16GB DDR4 RAM • 512GB SSD', '15.6" FHD IPS Screen + Numpad', 'Face Unlock IR Camera + Backlit Keys', 'Dual Mic Noise Reduction'],
     '/images/shop/laptop_hp_elitebook_850.svg', '15.6" Big Screen',
     {'processor': 'Intel Core i7-10610U (10th Gen)', 'generation': '10th Gen', 'ram': '16GB DDR4', 'storage': '512GB NVMe SSD', 'display': '15.6" FHD IPS', 'graphics': 'Intel UHD 620', 'batteryHealth': '88%+ Battery Health (6-8 Hours)'}),

    ('prod-laptop-hp-zbook-firefly', 'HP ZBook Firefly 15 G8 Workstation (Core i7 + NVIDIA)', 'HP', 'Certified Grade-A+ Workstation', 210000,
     'Heavy CAD workstation for leather pattern design and surgical 3D models. Runs cool with dual fans.',
     ['Intel Core i7-1185G7 (11th Gen)', '32GB RAM • 1TB PCIe Gen4 SSD', 'NVIDIA Quadro T500 4GB Dedicated', '15.6" FHD 100% sRGB Color Accurate', 'Dual High-Flow Thermal Fans'],
     '/images/shop/laptop_hp_zbook_firefly.svg', '32GB RAM • CAD GPU',
     {'processor': 'Intel Core i7-1185G7 (11th Gen)', 'generation': '11th Gen', 'ram': '32GB DDR4', 'storage': '1TB NVMe Gen4 SSD', 'display': '15.6" FHD 100% sRGB', 'graphics': 'NVIDIA T500 4GB', 'batteryHealth': '92%+ Battery Health (7-9 Hours)'}),

    ('prod-laptop-hp-probook-450-g9', 'HP ProBook 450 G9 (12th Gen Core i5 10-Core)', 'HP', 'Open Box Like New', 155000,
     'Latest 12th Gen hybrid processor with 10 cores. Super fast app launch for office paperwork.',
     ['Intel Core i5-1235U (12th Gen 10-Core)', '16GB DDR4 RAM • 512GB SSD', '15.6" Narrow Bezel FHD IPS', 'Fast Type-C Fast Charging Support', 'Full Numeric Keypad + Backlit Keys'],
     '/images/shop/laptop_hp_probook_450.svg', '12th Gen 10-Core',
     {'processor': 'Intel Core i5-1235U (12th Gen)', 'generation': '12th Gen', 'ram': '16GB DDR4', 'storage': '512GB SSD', 'display': '15.6" FHD IPS', 'graphics': 'Intel Iris Xe', 'batteryHealth': '98% Battery Health (8-10 Hours)'}),

    ('prod-laptop-hp-830-g6', 'HP EliteBook 830 G6 Touch (8th Gen Core i5)', 'HP', 'Certified Grade-A (UAE Import)', 75000,
     'Budget-friendly touch laptop. Compact size fits easily in bag for shop billing and students.',
     ['Intel Core i5-8365U (8th Gen vPro)', '16GB DDR4 RAM • 256GB NVMe SSD', '13.3" FHD Touchscreen Glass', 'Backlit Keyboard • Metal Body', 'Light 1.3kg Form Factor'],
     '/images/shop/laptop_hp_elitebook_830.svg', 'Budget Touchscreen',
     {'processor': 'Intel Core i5-8365U (8th Gen)', 'generation': '8th Gen', 'ram': '16GB DDR4', 'storage': '256GB SSD', 'display': '13.3" FHD Touch', 'graphics': 'Intel UHD 620', 'batteryHealth': '85%+ Battery Health (5-7 Hours)'}),

    # Dell (5)
    ('prod-laptop-dell-7420', 'Dell Latitude 7420 Carbon Edition (11th Gen Core i7)', 'Dell', 'Certified Grade-A+ (Dubai Import)', 145000,
     'Carbon fiber top lid with feather-light 1.2kg weight. Silent cooling fans and comfortable keyboard.',
     ['Intel Core i7-1185G7 (11th Gen vPro)', '16GB 4266MHz RAM • 512GB SSD', '14" FHD 400 nits Matte Screen', 'Carbon Fiber Chassis (1.2kg)', 'ExpressCharge 80% in 1 Hour'],
     '/images/shop/laptop_dell_latitude_7420.svg', 'Carbon Fiber 1.2kg',
     {'processor': 'Intel Core i7-1185G7 (11th Gen)', 'generation': '11th Gen', 'ram': '16GB LPDDR4x', 'storage': '512GB NVMe SSD', 'display': '14" FHD 400 nits', 'graphics': 'Intel Iris Xe', 'batteryHealth': '92%+ Battery Health (8-10 Hours)'}),

    ('prod-laptop-dell-5430', 'Dell Latitude 5430 (12th Gen Core i5 10-Core)', 'Dell', 'Certified Grade-A (UAE Import)', 160000,
     'Solid workhorse with built-in Ethernet LAN port and two Thunderbolt ports. Built for 24/7 business uptime.',
     ['Intel Core i5-1245U (12th Gen 10-Core)', '16GB DDR4 RAM • 512GB SSD', '14.0" Full HD Anti-Glare WVA', 'RJ-45 Ethernet + HDMI 2.0', 'Privacy Shutter Webcam'],
     '/images/shop/laptop_dell_latitude_5430.svg', '12th Gen Core i5',
     {'processor': 'Intel Core i5-1245U (12th Gen)', 'generation': '12th Gen', 'ram': '16GB DDR4', 'storage': '512GB SSD', 'display': '14" FHD WVA', 'graphics': 'Intel Iris Xe', 'batteryHealth': '95%+ Battery Health (8-10 Hours)'}),

    ('prod-laptop-dell-7490', 'Dell Latitude 7490 Enterprise (8th Gen Core i5)', 'Dell', 'Certified Grade-A (UAE Import)', 72000,
     'Most reliable and durable laptop in Pakistan market. Cheap spare parts and metal hinges that last years.',
     ['Intel Core i5-8350U (8th Gen Quad-Core)', '16GB DDR4 RAM • 256GB SSD', '14.0" FHD Matte Screen (No Eye Strain)', 'Backlit Spill-Proof Keyboard', 'Durable Magnesium Frame'],
     '/images/shop/laptop_dell_latitude_7490.svg', 'Most Reliable Value',
     {'processor': 'Intel Core i5-8350U (8th Gen)', 'generation': '8th Gen', 'ram': '16GB DDR4', 'storage': '256GB SSD', 'display': '14" FHD Matte', 'graphics': 'Intel UHD 620', 'batteryHealth': '85%+ Battery Health (5-7 Hours)'}),

    ('prod-laptop-dell-3561', 'Dell Precision 3561 Heavy Workstation (11th Gen i7 8-Core)', 'Dell', 'Certified Grade-A+ CAD Workstation', 230000,
     'Heavy power for AutoCAD and surgical 3D engraving. 8 full performance cores with dedicated GPU.',
     ['Intel Core i7-11850H 8-Core (45W High-Power)', '32GB RAM • 1TB NVMe Gen4 SSD', 'NVIDIA T600 4GB GDDR6 Dedicated', '15.6" FHD 100% sRGB Color Accurate', 'Dual Heatpipes + Dual High-Speed Fans'],
     '/images/shop/laptop_dell_precision_3561.svg', '8-Core Heavy CAD',
     {'processor': 'Intel Core i7-11850H (11th Gen 8-Core)', 'generation': '11th Gen H-Series', 'ram': '32GB DDR4', 'storage': '1TB Gen4 SSD', 'display': '15.6" FHD 100% sRGB', 'graphics': 'NVIDIA T600 4GB', 'batteryHealth': '90%+ Battery Health (6-8 Hours)'}),

    ('prod-laptop-dell-xps-13', 'Dell XPS 13 9305 InfinityEdge (11th Gen Core i7)', 'Dell', 'Grade-A Premium Luxury', 190000,
     'Machined aluminum chassis with carbon fiber palm rest. Razor thin borderless screen for traveling executives.',
     ['Intel Core i7-1165G7 (11th Gen)', '16GB Dual-Channel RAM • 512GB SSD', '13.3" InfinityEdge 400 nits Glass', 'CNC Machined Aluminum Body', 'Dual Thunderbolt 4 Ports'],
     '/images/shop/laptop_dell_xps_13.svg', 'Executive Luxury',
     {'processor': 'Intel Core i7-1165G7 (11th Gen)', 'generation': '11th Gen', 'ram': '16GB LPDDR4x', 'storage': '512GB SSD', 'display': '13.3" InfinityEdge', 'graphics': 'Intel Iris Xe', 'batteryHealth': '91%+ Battery Health (8-10 Hours)'}),

    # Lenovo (5)
    ('prod-laptop-lenovo-t14-gen2', 'Lenovo ThinkPad T14 Gen 2 (11th Gen Core i5 vPro)', 'Lenovo', 'Certified Grade-A (UAE Import)', 135000,
     'The business standard. Spill-resistant keyboard, iconic red TrackPoint, and military drop certification.',
     ['Intel Core i5-1145G7 vPro (11th Gen)', '16GB DDR4 RAM • 512GB NVMe SSD', '14.0" FHD Matte IPS Screen', 'Iconic Red TrackPoint + Touchpad', 'Spill-Proof Drainage Channels'],
     '/images/shop/laptop_lenovo_thinkpad_t14.svg', 'Military Certified',
     {'processor': 'Intel Core i5-1145G7 vPro (11th Gen)', 'generation': '11th Gen', 'ram': '16GB DDR4', 'storage': '512GB NVMe SSD', 'display': '14" FHD IPS', 'graphics': 'Intel Iris Xe', 'batteryHealth': '92%+ Battery Health (8-10 Hours)'}),

    ('prod-laptop-lenovo-x1-carbon', 'Lenovo ThinkPad X1 Carbon Gen 9 (11th Gen Core i7)', 'Lenovo', 'Certified Grade-A+ Flagship', 225000,
     'Lenovo flagship ultrabook. Taller 16:10 screen shows more spreadsheet rows. Weighs only 1.13kg.',
     ['Intel Core i7-1165G7 (11th Gen)', '16GB RAM • 512GB PCIe Gen4 SSD', '14.0" 16:10 Taller Screen (1920x1200)', 'Carbon Fiber + Magnesium Sub-frame', 'Dolby Atmos 4-Speaker Audio'],
     '/images/shop/laptop_lenovo_thinkpad_x1.svg', 'Flagship 1.13kg',
     {'processor': 'Intel Core i7-1165G7 (11th Gen)', 'generation': '11th Gen', 'ram': '16GB LPDDR4x', 'storage': '512GB Gen4 SSD', 'display': '14" 16:10 WUXGA', 'graphics': 'Intel Iris Xe', 'batteryHealth': '94%+ Battery Health (10-12 Hours)'}),

    ('prod-laptop-lenovo-l14-gen3', 'Lenovo ThinkPad L14 Gen 3 (AMD Ryzen 5 Pro 6-Core)', 'Lenovo', 'Certified Grade-A (UAE Import)', 140000,
     'True 6-core 12-thread AMD processor. Stays cool even during heavy multi-tasking and billing queries.',
     ['AMD Ryzen 5 Pro 5675U (6-Core, 12-Thread)', '16GB DDR4 RAM • 512GB Gen4 SSD', 'AMD Radeon Graphics (Smooth 60FPS)', '14.0" FHD IPS Anti-Glare Screen', 'Full Size RJ-45 LAN + HDMI'],
     '/images/shop/laptop_lenovo_thinkpad_l14.svg', '6-Core AMD Ryzen',
     {'processor': 'AMD Ryzen 5 Pro 5675U', 'generation': 'Ryzen 5000 Pro', 'ram': '16GB DDR4', 'storage': '512GB SSD', 'display': '14" FHD IPS', 'graphics': 'AMD Radeon', 'batteryHealth': '93%+ Battery Health (9-11 Hours)'}),

    ('prod-laptop-lenovo-t490', 'Lenovo ThinkPad T490 Corporate (8th Gen Core i5)', 'Lenovo', 'Certified Grade-A (Dubai Import)', 70000,
     'Rock solid reliability at budget price. Built for factory inventory desks and retail cash registers.',
     ['Intel Core i5-8365U (8th Gen Quad-Core)', '16GB DDR4 RAM • 256GB NVMe SSD', '14.0" FHD IPS Display', 'Legendary Red TrackPoint + Keys', 'Full Size LAN, HDMI, Type-C'],
     '/images/shop/laptop_lenovo_thinkpad_t490.svg', 'Budget Corporate',
     {'processor': 'Intel Core i5-8365U (8th Gen)', 'generation': '8th Gen', 'ram': '16GB DDR4', 'storage': '256GB SSD', 'display': '14" FHD IPS', 'graphics': 'Intel UHD 620', 'batteryHealth': '86%+ Battery Health (5-7 Hours)'}),

    ('prod-laptop-lenovo-yoga-7i', 'Lenovo Yoga 7i 2-in-1 Touch (12th Gen Core i7 12-Core)', 'Lenovo', 'Certified Grade-A+ 360° Convertible', 195000,
     'Folds 360 degrees into a tablet for client presentations and drawing. High resolution 2.2K screen.',
     ['Intel Core i7-1260P (12th Gen 12-Core)', '16GB LPDDR5 4800MHz RAM • 512GB Gen4', '14" 2.2K 360° Touchscreen Glass', 'All-Metal Comfort Edge Design', 'Front-Facing Dolby Atmos Speakers'],
     '/images/shop/laptop_lenovo_yoga_7i.svg', '360° Touch Tablet',
     {'processor': 'Intel Core i7-1260P (12th Gen)', 'generation': '12th Gen 12-Core', 'ram': '16GB LPDDR5', 'storage': '512GB Gen4 SSD', 'display': '14" 2.2K Touch', 'graphics': 'Intel Iris Xe', 'batteryHealth': '94%+ Battery Health (8-10 Hours)'}),

    # Sony VAIO (2)
    ('prod-laptop-sony-sx14', 'Sony VAIO SX14 Magnesium Edition (10th Gen Core i7 4K)', 'Sony VAIO', 'Certified Grade-A Japanese Design', 165000,
     'Rare Japanese luxury engineering. Weighs barely 1.05kg with carbon-magnesium lid and sharp 4K display.',
     ['Intel Core i7-10710U (6-Core, 12-Thread)', '16GB RAM • 512GB PCIe NVMe SSD', '14.0" True 4K Ultra HD Display', 'Featherweight 1.05kg Magnesium Body', 'Lift-Up Ergonomic Keyboard'],
     '/images/shop/laptop_sony_vaio_sx14.svg', '4K Screen • 1.05kg',
     {'processor': 'Intel Core i7-10710U (10th Gen)', 'generation': '10th Gen 6-Core', 'ram': '16GB LPDDR3', 'storage': '512GB SSD', 'display': '14" 4K UHD', 'graphics': 'Intel UHD', 'batteryHealth': '89%+ Battery Health (6-8 Hours)'}),

    ('prod-laptop-sony-fe15', 'Sony VAIO FE15 Corporate Series (11th Gen Core i5)', 'Sony VAIO', 'Certified Grade-A (UAE Import)', 135000,
     'Clean modern look with spatial audio tuning and full numpad. Reliable performance for daily factory operations.',
     ['Intel Core i5-1135G7 (11th Gen)', '16GB DDR4 RAM • 512GB NVMe SSD', '15.6" Big FHD IPS Screen + Numpad', 'THX Spatial Audio Dual Speakers', 'Fast Type-C Data & Display'],
     '/images/shop/laptop_sony_vaio_fe15.svg', 'THX Spatial Audio',
     {'processor': 'Intel Core i5-1135G7 (11th Gen)', 'generation': '11th Gen', 'ram': '16GB DDR4', 'storage': '512GB SSD', 'display': '15.6" FHD IPS', 'graphics': 'Intel Iris Xe', 'batteryHealth': '91%+ Battery Health (7-9 Hours)'}),

    # Apple (2)
    ('prod-laptop-apple-air-m2', 'Apple MacBook Air 13.6" M2 Silicon (Midnight / Silver)', 'Apple', 'Open Box 100% Battery Cycle', 295000,
     'Zero fan noise, silent operation, and up to 16 hours of battery. The ultimate machine for software developers.',
     ['Apple M2 8-Core CPU / 8-Core GPU', '16GB Unified RAM • 512GB Fast SSD', '13.6" Liquid Retina 500 nits Screen', 'MagSafe 3 Fast Magnetic Charging', 'Silent Fanless Thermal Design'],
     '/images/shop/laptop_apple_macbook_air_m2.svg', 'Apple M2 16 Hours',
     {'processor': 'Apple M2 Chip (8-Core)', 'generation': 'Apple M2', 'ram': '16GB Unified', 'storage': '512GB SSD', 'display': '13.6" Liquid Retina', 'graphics': 'Apple 8-Core GPU', 'batteryHealth': '99% Battery Health (14-16 Hours)'}),

    ('prod-laptop-apple-pro-14', 'Apple MacBook Pro 14" M2 Pro (10-Core CPU / 16-Core GPU)', 'Apple', 'Certified Grade-A+ Studio Workstation', 420000,
     'Studio workstation. Mini-LED Liquid Retina XDR display with 120Hz ProMotion, HDMI, and SDXC slot.',
     ['Apple M2 Pro 10-Core CPU / 16-Core GPU', '16GB Unified RAM • 512GB Fast SSD', '14.2" Liquid Retina XDR 120Hz ProMotion', 'HDMI 2.1 Port + SDXC Card Slot', 'Studio Quality 6-Speaker System'],
     '/images/shop/laptop_apple_macbook_pro_14.svg', '120Hz XDR Mini-LED',
     {'processor': 'Apple M2 Pro Chip', 'generation': 'Apple M2 Pro', 'ram': '16GB Unified', 'storage': '512GB SSD', 'display': '14.2" XDR 120Hz', 'graphics': 'Apple 16-Core GPU', 'batteryHealth': '96%+ Battery Health (12-14 Hours)'}),

    # Asus & Acer (3)
    ('prod-laptop-asus-zenbook-14', 'Asus ZenBook 14 OLED UX3402 (12th Gen Core i7 2.8K)', 'Asus', 'Certified Grade-A+ (Dubai Import)', 185000,
     'Vibrant OLED panel with deep ink blacks and rich color. Built with 180 degree hinge and NumberPad.',
     ['Intel Core i7-1260P (12th Gen 12-Core)', '16GB LPDDR5 RAM • 512GB Gen4 SSD', '14.0" 2.8K 90Hz True OLED Display', 'NumberPad 2.0 Built into Trackpad', 'Harman Kardon Audio'],
     '/images/shop/laptop_asus_zenbook_14.svg', '2.8K 90Hz OLED',
     {'processor': 'Intel Core i7-1260P (12th Gen)', 'generation': '12th Gen 12-Core', 'ram': '16GB LPDDR5', 'storage': '512GB Gen4 SSD', 'display': '14" 2.8K OLED', 'graphics': 'Intel Iris Xe', 'batteryHealth': '93%+ Battery Health (7-9 Hours)'}),

    ('prod-laptop-asus-expertbook', 'Asus ExpertBook B1 Corporate Rugged (11th Gen Core i5)', 'Asus', 'Certified Grade-A (UAE Import)', 125000,
     'Military drop-test grade body. Ideal for factory floors, dusty store counters, and field inspections.',
     ['Intel Core i5-1135G7 (11th Gen)', '16GB DDR4 RAM • 512GB NVMe SSD', '14.0" FHD Anti-Glare Screen', 'Reinforced Metal Port Brackets', 'VGA + HDMI + RJ-45 LAN'],
     '/images/shop/laptop_asus_expertbook_b1.svg', 'Rugged Military Frame',
     {'processor': 'Intel Core i5-1135G7 (11th Gen)', 'generation': '11th Gen', 'ram': '16GB DDR4', 'storage': '512GB SSD', 'display': '14" FHD Anti-Glare', 'graphics': 'Intel Iris Xe', 'batteryHealth': '92%+ Battery Health (8-10 Hours)'}),

    ('prod-laptop-acer-swift-3', 'Acer Swift 3 Ultra-Thin (AMD Ryzen 7 5700U 8-Core)', 'Acer', 'Certified Grade-A (UAE Import)', 130000,
     'Real 8-core CPU power inside an ultra-slim 1.2kg aluminum frame. Smooth multi-tasking without stutter.',
     ['AMD Ryzen 7 5700U (8-Core, 16-Thread)', '16GB RAM • 512GB NVMe SSD', '14.0" FHD IPS 100% sRGB Color', 'All-Metal Magnesium-Aluminum Case', 'Fast Fingerprint Sensor'],
     '/images/shop/laptop_acer_swift_3.svg', '8-Core Ultra-Thin',
     {'processor': 'AMD Ryzen 7 5700U', 'generation': 'Ryzen 5000 Series', 'ram': '16GB LPDDR4x', 'storage': '512GB SSD', 'display': '14" FHD IPS', 'graphics': 'AMD Radeon', 'batteryHealth': '90%+ Battery Health (8-10 Hours)'}),

    # Additional 3 Laptops to reach 25
    ('prod-laptop-dell-latitude-3420', 'Dell Latitude 3420 Essential (11th Gen Core i5)', 'Dell', 'Certified Grade-A (UAE Import)', 115000,
     'Durable business notebook with full port selection, fast SSD boot, and long battery backup.',
     ['Intel Core i5-1135G7 (11th Gen)', '16GB DDR4 RAM • 512GB NVMe SSD', '14" FHD Anti-Glare Screen', 'Full Size HDMI + RJ45 LAN', 'Fast USB-C Charging'],
     '/images/shop/laptop_dell_latitude_5430.svg', 'Essential Business',
     {'processor': 'Intel Core i5-1135G7 (11th Gen)', 'generation': '11th Gen', 'ram': '16GB DDR4', 'storage': '512GB SSD', 'display': '14" FHD', 'graphics': 'Intel Iris Xe', 'batteryHealth': '90%+ (7-9 Hours)'}),

    ('prod-laptop-hp-elitebook-840-g7', 'HP EliteBook 840 G7 (10th Gen Core i5)', 'HP', 'Certified Grade-A (Dubai Import)', 110000,
     'Slim aluminum unibody with Bang & Olufsen sound, bright IPS display, and quiet cooling.',
     ['Intel Core i5-10310U (10th Gen vPro)', '16GB DDR4 RAM • 256GB SSD', '14" FHD IPS Anti-Glare', 'Backlit Keyboard • Face Unlock', 'Bang & Olufsen Dual Speakers'],
     '/images/shop/laptop_hp_elitebook_840.svg', 'Slim Aluminum',
     {'processor': 'Intel Core i5-10310U (10th Gen)', 'generation': '10th Gen', 'ram': '16GB DDR4', 'storage': '256GB SSD', 'display': '14" FHD IPS', 'graphics': 'Intel UHD', 'batteryHealth': '88%+ (6-8 Hours)'}),

    ('prod-laptop-lenovo-thinkpad-e14', 'Lenovo ThinkPad E14 Gen 4 (12th Gen Core i5)', 'Lenovo', 'Open Box Clean', 150000,
     'Modern aluminum top cover with 12th Gen 10-core speed, red TrackPoint, and Harman speakers.',
     ['Intel Core i5-1235U (12th Gen 10-Core)', '16GB DDR4 RAM • 512GB SSD', '14" FHD IPS 300 nits Display', 'Harman Audio with Dolby Support', 'FHD Camera with Privacy Shutter'],
     '/images/shop/laptop_lenovo_thinkpad_t14.svg', '12th Gen Modern',
     {'processor': 'Intel Core i5-1235U (12th Gen)', 'generation': '12th Gen', 'ram': '16GB DDR4', 'storage': '512GB SSD', 'display': '14" FHD IPS', 'graphics': 'Intel Iris Xe', 'batteryHealth': '97% (8-10 Hours)'})
]

for l in laptops:
    add_prod(l[0], l[1], 'Laptops & PCs', l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9])

# 2. DESKTOPS & WORKSTATIONS (10 MODELS)
desktops = [
    ('prod-pc-dell-optiplex-7080', 'Dell OptiPlex 7080 Micro Tiny PC (10th Gen Core i7)', 'Dell', 'Certified Grade-A (Dubai Import)', 110000,
     'Palm-sized desktop PC that mounts behind monitor. Runs quiet and draws very low electricity on UPS.',
     ['Intel Core i7-10700 8-Core (10th Gen)', '16GB DDR4 RAM • 512GB NVMe SSD', 'Supports 3 DisplayPort Monitors', 'Built-in Dual-Band Wi-Fi + Bluetooth', 'Original Dell 130W External Power'],
     '/images/shop/hardware_desktop_tower.svg', 'Micro Tiny PC',
     {'processor': 'Intel Core i7-10700 (8-Core)', 'ram': '16GB DDR4', 'storage': '512GB NVMe SSD', 'graphics': 'Intel UHD 630'}),

    ('prod-pc-dell-optiplex-5070-sff', 'Dell OptiPlex 5070 Small Form Factor (9th Gen Core i5)', 'Dell', 'Certified Grade-A (UAE Import)', 68000,
     'Compact office desktop for retail counters and data entry. Built with heavy steel chassis.',
     ['Intel Core i5-9500 6-Core (up to 4.40 GHz)', '16GB DDR4 RAM • 256GB SSD + 500GB HDD', 'Dual DisplayPort + VGA Outputs', 'Gigabit Ethernet LAN 1000Mbps', 'Heavy Duty Gold Power Supply'],
     '/images/shop/hardware_desktop_tower.svg', 'Compact Office PC',
     {'processor': 'Intel Core i5-9500 (6-Core)', 'ram': '16GB DDR4', 'storage': '256GB SSD + 500GB HDD'}),

    ('prod-pc-hp-prodesk-600-g6', 'HP ProDesk 600 G6 Microtower (10th Gen Core i5)', 'HP', 'Certified Grade-A (Dubai Import)', 95000,
     'Spacious microtower with room for multiple hard drives and dedicated graphic cards.',
     ['Intel Core i5-10500 6-Core / 12-Threads', '16GB DDR4 RAM • 512GB PCIe SSD', 'PCIe x16 Expansion Slot for GPU', 'Front USB-C 10Gbps Port', 'Original HP Internal Power Supply'],
     '/images/shop/hardware_desktop_tower.svg', 'Expandable Tower',
     {'processor': 'Intel Core i5-10500', 'ram': '16GB DDR4', 'storage': '512GB NVMe SSD'}),

    ('prod-pc-hp-elitedesk-800-g4', 'HP EliteDesk 800 G4 Desktop Mini (8th Gen Core i5)', 'HP', 'Certified Grade-A (UAE Import)', 58000,
     'Tiny footprint desktop with fast boot. Perfect for shop counters, factory gates, and call desks.',
     ['Intel Core i5-8500 6-Core 3.0GHz', '16GB DDR4 RAM • 256GB NVMe SSD', 'Dual DisplayPort 4K Output', 'Very Low Power Consumption on UPS', 'Vesa Mount Compatible'],
     '/images/shop/hardware_desktop_tower.svg', 'Budget Mini PC',
     {'processor': 'Intel Core i5-8500', 'ram': '16GB DDR4', 'storage': '256GB SSD'}),

    ('prod-pc-lenovo-thinkcentre-m720q', 'Lenovo ThinkCentre M720q Tiny (8th Gen Core i5)', 'Lenovo', 'Certified Grade-A (Dubai Import)', 60000,
     'Legendary ThinkCentre build quality in a mini 1-liter chassis. Dust shield and quiet cooling fan.',
     ['Intel Core i5-8400T 6-Core Processor', '16GB DDR4 RAM • 256GB SSD', 'DisplayPort + HDMI Video Out', 'Rugged Dust-Resistant Vents', 'Lenovo Fast Charger Included'],
     '/images/shop/hardware_desktop_tower.svg', 'ThinkCentre Tiny',
     {'processor': 'Intel Core i5-8400T', 'ram': '16GB DDR4', 'storage': '256GB SSD'}),

    ('prod-pc-hp-all-in-one-24', 'HP 24" All-in-One FHD Touchscreen PC (11th Gen Core i5)', 'HP', 'Open Box Clean (UAE Import)', 175000,
     'Sleek all-in-one computer with zero messy cables. Built-in pop-up webcam and stereo speakers.',
     ['Intel Core i5-1135G7 (11th Gen)', '16GB DDR4 RAM • 512GB NVMe SSD', '23.8" Full HD IPS Touchscreen Glass', 'Pop-Up Privacy HD Webcam', 'Wireless Keyboard & Mouse Included'],
     '/images/shop/shop_pos_touchscreen_1791023884127.jpg', '24" Touch All-in-One',
     {'processor': 'Intel Core i5-1135G7', 'ram': '16GB DDR4', 'storage': '512GB SSD', 'display': '23.8" FHD Touch'}),

    ('prod-pc-dell-precision-3640-cad', 'Dell Precision 3640 Heavy CAD Tower (Core i7 + RTX GPU)', 'Dell', 'Certified Grade-A+ Workstation', 260000,
     'Tower workstation for 3D leather mold designing, laser cutting software, and heavy video rendering.',
     ['Intel Core i7-10700K 8-Core (up to 5.10 GHz)', '32GB DDR4 3200MHz RAM • 1TB NVMe Gen4', 'NVIDIA RTX 3060 12GB Dedicated GPU', 'High-Flow Front Intake Airway', '80 PLUS Gold 550W Power Supply'],
     '/images/shop/hardware_desktop_tower.svg', 'CAD Workstation Tower',
     {'processor': 'Intel Core i7-10700K 8-Core', 'ram': '32GB DDR4', 'storage': '1TB NVMe SSD', 'graphics': 'NVIDIA RTX 3060 12GB'}),

    ('prod-pc-apple-mac-mini-m2', 'Apple Mac Mini M2 (8-Core CPU / 10-Core GPU)', 'Apple', 'Brand New In Box', 215000,
     'Apple M2 chip in a compact aluminum box. Whisper-quiet performance for graphic designers and coders.',
     ['Apple M2 8-Core CPU / 10-Core GPU', '16GB Unified RAM • 512GB Fast SSD', 'Dual Thunderbolt 4 + HDMI 2.1 Ports', 'Gigabit Ethernet + Wi-Fi 6E', 'Ultra-Low 10W Idle Power Draw'],
     '/images/shop/hardware_desktop_tower.svg', 'Apple M2 Desktop',
     {'processor': 'Apple M2 Chip', 'ram': '16GB Unified', 'storage': '512GB SSD'}),

    ('prod-pc-dell-optiplex-3060-sff', 'Dell OptiPlex 3060 SFF (8th Gen Core i3 Entry)', 'Dell', 'Certified Grade-A (UAE Import)', 45000,
     'Entry level billing computer. Handles retail POS software, receipts, and inventory spreadsheets easily.',
     ['Intel Core i3-8100 Quad-Core 3.6GHz', '8GB DDR4 RAM • 128GB Fast SSD', 'HDMI + DisplayPort Video Output', 'Very Low Power Usage on Solar / UPS', 'Plug and Play Windows 10 Pro'],
     '/images/shop/hardware_desktop_tower.svg', 'Entry POS Desktop',
     {'processor': 'Intel Core i3-8100', 'ram': '8GB DDR4', 'storage': '128GB SSD'}),

    ('prod-pc-custom-ryzen-cad-tower', 'AMD Ryzen 7 5700X Heavy Multi-Thread Tower PC', 'Desktops', 'Brand New Custom Build', 240000,
     '8-core 16-thread processing beast with 32GB RAM and dedicated GTX graphics for industrial designing.',
     ['AMD Ryzen 7 5700X 8-Core / 16-Threads', '32GB DDR4 3600MHz Dual-Channel', '1TB PCIe Gen4 NVMe M.2 SSD', 'NVIDIA GeForce GTX 1660 Super 6GB', 'Tempered Glass Case with 4 RGB Fans'],
     '/images/shop/hardware_desktop_tower.svg', 'Ryzen 8-Core Tower',
     {'processor': 'AMD Ryzen 7 5700X', 'ram': '32GB DDR4', 'storage': '1TB SSD', 'graphics': 'GTX 1660 Super 6GB'})
]

for d in desktops:
    add_prod(d[0], d[1], 'Desktops & Workstations', d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9])

# 3. PRINTERS & SCANNERS (10 MODELS)
printers = [
    ('prod-prn-80mm-thermal-lan', 'High-Speed 80mm Thermal Receipt POS Printer (USB + LAN)', 'Printers & Scanners', 'POS Thermal', 'Brand New In Box', 22500,
     'Fast 260mm/s thermal billing printer with auto-cutter and cash drawer port. Zero ink needed.',
     ['260mm/sec High-Speed Thermal Print', 'Heavy-Duty Japanese Auto-Cutter (1.5M cuts)', 'Dual Interface: USB + Ethernet LAN', 'RJ-11 Cash Drawer Port (Auto-Pop)', 'Works with All Windows POS Software'],
     '/images/shop/printer_thermal_80mm.svg', 'POS Best Seller', {'warranty': '1-Year Local Replacement'}),

    ('prod-prn-58mm-mini-usb', 'Mini 58mm USB Thermal Receipt Billing Printer', 'Printers & Scanners', 'POS Thermal', 'Brand New In Box', 12500,
     'Compact receipt printer for small bakeries, clinics, and juice bars. Fits in palm of hand.',
     ['90mm/sec Fast Direct Thermal Print', 'Compact Cash Counter Footprint', 'Zero Ink or Ribbon Maintenance', 'Plug & Play USB for Windows & Android', 'Low Power Energy Consumption'],
     '/images/shop/printer_thermal_58mm.svg', 'Compact Entry Price', {'warranty': '1-Year Local Replacement'}),

    ('prod-prn-4inch-barcode-waybill', '4-Inch Industrial Barcode & Waybill Shipping Printer', 'Printers & Scanners', 'Barcode Label', 'Brand New In Box', 38000,
     'Heavy duty shipping label printer for TCS, Leopard, DHL, and export cartons. Prints 4x6 labels.',
     ['4-Inch (108mm) Wide Label Width', '203 DPI Crisp Barcode Resolution', '127mm/sec High-Speed Industrial Motor', 'Direct Thermal & Ribbon Transfer', 'Free Barcode Label Design Software'],
     '/images/shop/printer_barcode_tsc.svg', 'Export Shipping Essential', {'warranty': '1-Year Local Replacement'}),

    ('prod-prn-workgroup-duplex-laser', 'Heavy-Duty Workgroup Duplex Monochrome Laser Printer', 'Printers & Scanners', 'Laser Printer', 'Brand New In Box', 75000,
     'High-yield office laser printer with automatic two-sided printing and gigabit network port.',
     ['38 Pages Per Minute (Monochrome Laser)', 'Automatic Two-Sided Duplex Printing', 'Gigabit Ethernet LAN & Wireless Wi-Fi', 'High-Yield 3,000 Page Replacement Toner', 'Heavy Duty 250-Sheet Paper Tray'],
     '/images/shop/printer_laser_workgroup.svg', '38 PPM Duplex', {'warranty': '1-Year Official Warranty'}),

    ('prod-prn-mfp-allinone-laser', 'All-in-One Multi-Function Laser MFP (Print, Copy, Scan)', 'Printers & Scanners', 'Laser Printer', 'Brand New In Box', 95000,
     'Complete office document center with 35-sheet automatic document feeder. Scan and print contracts fast.',
     ['3-in-1: Laser Print, Digital Copy, Flatbed Scan', '35-Sheet Auto Document Feeder (ADF)', 'Automatic Duplex 2-Sided Printing', 'High-Speed Wi-Fi & Ethernet Network', 'One-Touch ID Card Copy Feature'],
     '/images/shop/printer_mfp_allinone.svg', 'All-in-One Office', {'warranty': '1-Year Official Warranty'}),

    ('prod-prn-epson-slip-matrix', 'High-Speed POS Slip & Carbon Invoicing Matrix Printer', 'Printers & Scanners', 'Matrix Invoicing', 'Certified Grade-A (UAE Import)', 48000,
     'Impact dot-matrix printer for multi-part carbon copy delivery challans. 1 original plus 3 copies.',
     ['Multi-Part Carbon Paper (1 Original + 3 Copies)', 'Heavy-Duty 24-Pin Long Life Printhead', 'Factory Gate Pass & Warehouse Dispatches', 'Dual Friction & Tractor Feed', 'Standard USB & Parallel Interface'],
     '/images/shop/printer_epson_slip.svg', 'Multi-Part Carbon', {'warranty': '6-Month Bench Warranty'}),

    ('prod-prn-bluetooth-80mm-portable', 'Portable 80mm Mobile Bluetooth Thermal Printer', 'Printers & Scanners', 'POS Thermal', 'Brand New In Box', 18500,
     'Battery-powered pocket printer. Connects via Bluetooth to Android phone for van delivery bills.',
     ['Rechargeable 2600mAh Li-ion Battery', 'Wireless Bluetooth + Type-C USB Interface', 'Prints Receipts Anywhere in Field / Delivery Van', 'Compatible with Android Billing Apps', 'Lightweight Belt Clip Included'],
     '/images/shop/printer_thermal_58mm.svg', 'Mobile Van Billing', {'warranty': '1-Year Warranty'}),

    ('prod-prn-color-ink-tank-wifi', 'Continuous Ink Tank Wireless Color All-in-One Printer', 'Printers & Scanners', 'Color Printer', 'Brand New In Box', 62000,
     'Low-cost color printing with refillable ink tanks. Yields 7,500 color pages per bottle set.',
     ['Print, Scan & Copy with Wireless Wi-Fi', 'Ultra-Low Cost Per Page (0.50 PKR)', 'Borderless Photo & Color Document Printing', 'Spill-Free Ink Bottle Refill System', 'Print Directly from Mobile Phone'],
     '/images/shop/printer_laser_workgroup.svg', 'Eco Tank Color', {'warranty': '1-Year Warranty'}),

    ('prod-prn-desktop-barcode-2inch', 'Compact 2-Inch Thermal Barcode Price Tag Printer', 'Printers & Scanners', 'Barcode Label', 'Brand New In Box', 26000,
     'Ideal for retail garment price tags, shelf edge stickers, and jewelry labels. Direct thermal.',
     ['Up to 58mm Label Width Capacity', 'Crisp 203 DPI Barcode & Text Printing', 'Peel-Off Sensor Included', 'Drop-In Easy Label Roll Loading', 'Windows USB Plug & Play'],
     '/images/shop/printer_barcode_tsc.svg', 'Price Tag Specialist', {'warranty': '1-Year Warranty'}),

    ('prod-prn-network-heavy-duplex-45ppm', 'Enterprise 45 PPM Network Laser Printer (High-Volume)', 'Printers & Scanners', 'Laser Printer', 'Certified Grade-A (UAE Import)', 85000,
     'Workgroup speed monster. Prints 45 pages per minute for export documentation desks.',
     ['45 Pages Per Minute Heavy Duty Cycle', 'Automatic Duplex + 550-Sheet Paper Tray', 'Gigabit Network Card Built-in', '10,000 Page High-Yield Cartridge Support', 'Low Per-Page Cost'],
     '/images/shop/printer_laser_workgroup.svg', '45 PPM High-Volume', {'warranty': '6-Month Warranty'})
]

for p in printers:
    add_prod(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9], p[10])

# 4. POS HARDWARE & SCANNERS (10 MODELS)
pos_hardware = [
    ('prod-pos-terminal-touch-15', 'All-in-One 15.6" Capacitive Touch POS Billing Terminal', 'POS Hardware', 'POS Hardware', 'Brand New In Box', 78000,
     'Die-cast aluminum base touch terminal with Intel Quad-Core, 8GB RAM, and 128GB SSD for retail counters.',
     ['15.6" HD Capacitive True-Flat Touchscreen', 'Intel Quad-Core 2.0GHz J4125 Processor', '8GB DDR4 RAM • 128GB Fast SSD', 'Heavy Die-Cast Aluminum Base (No Wiggle)', '6x USB Ports • 2x Serial COM • 1x LAN'],
     '/images/shop_pos_touchscreen_1791023884127.jpg', 'Commercial Grade', {'warranty': '1-Year Local Replacement'}),

    ('prod-pos-dual-screen-terminal', 'Dual-Screen 15.6" + 11.6" Customer Display POS Terminal', 'POS Hardware', 'POS Hardware', 'Brand New In Box', 98000,
     'Main touch screen for cashier and second screen for customer ads and billing summary.',
     ['15.6" Cashier Touch + 11.6" Customer Screen', 'Intel Quad-Core J4125 CPU • 8GB RAM • 128GB SSD', 'Shows Total Bill & Promotional Images to Customer', 'Industrial Metal Stand Construction', 'Surge Protected Power Supply'],
     '/images/shop_pos_touchscreen_1791023884127.jpg', 'Dual Screen Premium', {'warranty': '1-Year Local Replacement'}),

    ('prod-pos-scanner-2d-desktop', 'Omni-Directional 1D & 2D QR Desktop Barcode Scanner', 'POS Hardware', 'POS Hardware', 'Brand New In Box', 16000,
     'Hands-free desktop scanner reading smudged carton barcodes, mobile phone screens, and QR codes.',
     ['Reads 1D Barcodes & 2D QR Codes', 'High-Speed CMOS Optical Sensor (300 scans/sec)', 'Reads Directly Off Mobile Phone Screens', 'Heavy Weighted Base with Anti-Slip Pad', 'Drop Tested from 1.5m on Concrete'],
     '/images/shop_barcode_scanner_1791023955798.jpg', 'Hands-Free 2D QR', {'warranty': '1-Year Replacement'}),

    ('prod-pos-scanner-wireless-handheld', 'Long-Range Wireless 2.4GHz + Bluetooth Barcode Scanner', 'POS Hardware', 'POS Hardware', 'Brand New In Box', 14500,
     'Cordless barcode reader with 100m wireless range. Scan cartons directly in warehouse aisles.',
     ['100m Wireless Range (2.4GHz USB Dongle + Bluetooth)', 'Built-in 2000mAh Battery (30 Hours Work)', 'Offline Storage Mode (Saves 50,000 Barcodes)', 'Instant Sync When Returning to Base', 'Rugged Rubber Shockproof Ring'],
     '/images/shop_barcode_scanner_1791023955798.jpg', '100m Wireless Range', {'warranty': '1-Year Replacement'}),

    ('prod-pos-cash-drawer-heavy', 'Heavy-Duty 5-Note 8-Coin Automatic Cash Drawer (RJ11)', 'POS Hardware', 'POS Hardware', 'Brand New In Box', 12500,
     'All-metal cash drawer with steel ball-bearing rollers. Pops open automatically after thermal print.',
     ['5 Bill Compartments with Heavy Metal Clips', '8 Removable Coin Cups for Change', 'Standard RJ-11 Cable Connects to Receipt Printer', '3-Position Key Lock (Open, Manual, Locked)', 'Tested for 1 Million Openings'],
     '/images/shop/shop_desktop_pc.svg', 'All-Steel Cash Box', {'warranty': '1-Year Replacement'}),

    ('prod-pos-scanner-1d-laser-usb', 'High-Speed Handheld 1D Laser Barcode Scanner with Stand', 'POS Hardware', 'POS Hardware', 'Brand New In Box', 6500,
     'Durable handheld scanner with automatic auto-sensing hands-free stand. Plug and play USB.',
     ['Fast 200 Scans Per Second Laser Sensor', 'Hands-Free Auto-Sensing Metal Stand Included', 'Reads Standard Retail EAN-13, UPC, Code 128', 'Shock-Resistant ABS Shell', 'Plug & Play USB for Windows & POS'],
     '/images/shop_barcode_scanner_1791023955798.jpg', 'Best Value 1D', {'warranty': '1-Year Replacement'}),

    ('prod-pos-pole-display-vfd', 'VFD Bright 2-Line Customer Pole Display (USB / RS232)', 'POS Hardware', 'POS Hardware', 'Brand New In Box', 14000,
     'Bright vacuum fluorescent blue display showing item name and change balance clearly to shoppers.',
     ['2 Lines x 20 Characters Blue-Green VFD Screen', 'Wide Viewing Angle with 360° Swivel Pole', 'Standard ESC/POS Command Support', 'Height Adjustable Aluminum Tube', 'Powered via USB (Zero Extra Adaptor)'],
     '/images/shop_pos_touchscreen_1791023884127.jpg', 'VFD Pole Display', {'warranty': '1-Year Warranty'}),

    ('prod-pos-mini-android-terminal', 'Handheld Android POS Billing Terminal with Built-in Printer', 'POS Hardware', 'POS Hardware', 'Brand New In Box', 39000,
     'All-in-one wireless POS on Android 11. Built-in 58mm thermal printer, camera scanner, and 4G SIM.',
     ['5.5" Touchscreen with Android 11 OS', 'Built-in 58mm High-Speed Receipt Printer', '5000mAh Battery (All-Day Van Delivery)', '4G LTE + Wi-Fi + Bluetooth + GPS', 'Camera Barcode & QR Code Reader'],
     '/images/shop_pos_touchscreen_1791023884127.jpg', 'Mobile Android POS', {'warranty': '1-Year Warranty'}),

    ('prod-pos-thermal-paper-bulk', '80mm Premium Thermal Billing Paper Rolls (Carton of 50)', 'POS Hardware', 'Supplies', 'Brand New Carton', 9500,
     'BPA-free high-sensitivity white thermal paper. Clear black print with no lint, saving printer heads.',
     ['80mm Width x 70mm Diameter Standard Roll', 'Carton of 50 Individually Wrapped Rolls', 'BPA-Free Japanese Thermal Coating', 'Crisp Contrast for 1D/2D Barcodes', 'Free Doorstep Delivery in Sialkot'],
     '/images/shop/shop_thermal_paper.svg', '50-Roll Carton', {'warranty': 'Quality Fresh Stock'}),

    ('prod-pos-cash-drawer-roller', 'Compact 4-Bill Metal Cash Drawer with RJ11 Trigger', 'POS Hardware', 'POS Hardware', 'Brand New In Box', 9800,
     'Space-saving cash drawer for compact counters. Smooth roller bearings and metal bill clamps.',
     ['4 Bill / 5 Coin Compartment Layout', 'Thick Gauge Cold Rolled Steel Housing', 'Connects Directly to Any 80mm/58mm Thermal Printer', 'Emergency Manual Release Lever on Bottom', 'Dual Key Set Included'],
     '/images/shop/shop_desktop_pc.svg', 'Compact Cash Box', {'warranty': '1-Year Warranty'})
]

for ph in pos_hardware:
    add_prod(ph[0], ph[1], ph[2], ph[3], ph[4], ph[5], ph[6], ph[7], ph[8], ph[9], ph[10])

# 5. RAM UPGRADES (12 MODELS)
ram_items = [
    ('prod-ram-ddr4-16gb-laptop', 'Crucial / Samsung 16GB DDR4 3200MHz Laptop RAM', 'RAM Upgrades', 'Crucial', 'Brand New Original', 11500,
     'Double your laptop speed. Instant multi-tasking without freezing when running Chrome and accounting.',
     ['16GB DDR4 3200MHz SO-DIMM (Laptop)', 'Crucial / Samsung / Kingston Tier-1 Chips', '1.2V Low Voltage Energy Efficient', 'Free Lab Fitting & Memory Diagnostic in Sialkot', 'Lifetime Brand Warranty'],
     '/images/shop/hardware_ram_ddr4.svg', 'Popular Upgrade', {'warranty': 'Lifetime Replacement Warranty'}),

    ('prod-ram-ddr4-8gb-laptop', 'Samsung / Kingston 8GB DDR4 3200MHz Laptop RAM', 'RAM Upgrades', 'Samsung', 'Brand New Original', 6500,
     'Fast RAM upgrade for budget laptops. Eliminates lag when opening multiple browser tabs.',
     ['8GB DDR4 3200MHz SO-DIMM (Laptop)', 'Original Sealed Strip with Security Hologram', 'Plug and Play Dual-Channel Support', 'Free Bench Testing in Sialkot Lab', 'Lifetime Brand Warranty'],
     '/images/shop/hardware_ram_ddr4.svg', 'Budget Speed Booster', {'warranty': 'Lifetime Replacement Warranty'}),

    ('prod-ram-ddr4-32gb-laptop', 'Crucial 32GB DDR4 3200MHz High-Capacity Laptop RAM', 'RAM Upgrades', 'Crucial', 'Brand New Original', 22500,
     'Maximum capacity single module for heavy CAD rendering, virtual machines, and video editing.',
     ['32GB Single Stick DDR4 3200MHz', 'High-Density Micron Dies with Heat Spreader', 'Designed for Workstation & Gaming Laptops', 'Tested for 24/7 Heavy Load Stability', 'Lifetime Brand Warranty'],
     '/images/shop/hardware_ram_ddr4.svg', '32GB Mega Stick', {'warranty': 'Lifetime Replacement Warranty'}),

    ('prod-ram-ddr5-16gb-laptop', 'Crucial 16GB DDR5 4800MHz / 5600MHz Laptop RAM', 'RAM Upgrades', 'Crucial', 'Brand New Original', 16500,
     'Next-generation DDR5 memory for 12th & 13th Gen laptops. Double the data bandwidth of DDR4.',
     ['16GB DDR5 4800MHz / 5600MHz High Speed', 'On-Die ECC for Built-in Data Integrity', '1.1V Ultra Low Power Consumption', 'For 12th, 13th Gen Intel & AMD 6000/7000', 'Lifetime Brand Warranty'],
     '/images/shop/hardware_ram_ddr5.svg', 'DDR5 Next-Gen', {'warranty': 'Lifetime Replacement Warranty'}),

    ('prod-ram-ddr5-32gb-laptop', 'Kingston Fury 32GB DDR5 5600MHz High-Speed Laptop RAM', 'RAM Upgrades', 'Kingston', 'Brand New Original', 32000,
     'Top tier speed for CAD workstations and developer laptops. 5600MHz blazing transfer rates.',
     ['32GB Single Stick DDR5 5600MHz SO-DIMM', 'Automatic Plug N Play Overclocking', 'On-Die ECC Stability Under Load', 'Compatible with Latest Dell Precision & ThinkPad', 'Lifetime Brand Warranty'],
     '/images/shop/hardware_ram_ddr5.svg', '5600MHz Pro', {'warranty': 'Lifetime Replacement Warranty'}),

    ('prod-ram-ddr3-8gb-laptop', 'Samsung / Hynix 8GB DDR3L 1600MHz Laptop RAM', 'RAM Upgrades', 'Samsung', 'Brand New Pull Tested', 4200,
     'Speed up older 4th, 5th, 6th Gen Dell and HP laptops. Low-voltage 1.35V module.',
     ['8GB DDR3L 1600MHz PC3L-12800S', 'Low-Voltage 1.35V (Backwards 1.5V Compatible)', 'Fixes Sluggish Performance in Older Laptops', '100% Tested with Zero Memory Errors', '1-Year Local Replacement'],
     '/images/shop/hardware_ram_ddr4.svg', 'Older Laptop Boost', {'warranty': '1-Year Replacement Warranty'}),

    ('prod-ram-ddr4-16gb-desktop', 'Corsair / Crucial 16GB DDR4 3200MHz Desktop RAM (DIMM)', 'RAM Upgrades', 'Corsair', 'Brand New Original', 11000,
     'High-speed desktop RAM with aluminum heat sink. Cool operation under heavy accounting work.',
     ['16GB DDR4 3200MHz Long-DIMM (Desktop)', 'Black Anodized Aluminum Heat Spreader', 'Intel XMP 2.0 Ready for Instant Speed', 'Compatible with All Dell, HP & Custom Towers', 'Lifetime Brand Warranty'],
     '/images/shop/hardware_ram_ddr4.svg', 'Desktop Heat Spreader', {'warranty': 'Lifetime Replacement Warranty'}),

    ('prod-ram-ddr4-8gb-desktop', 'Kingston 8GB DDR4 2666MHz / 3200MHz Desktop RAM', 'RAM Upgrades', 'Kingston', 'Brand New Original', 5800,
     'Reliable memory module for office computers and billing towers. Stable all-day running.',
     ['8GB DDR4 2666MHz / 3200MHz Desktop', 'Gold-Plated Contacts for Anti-Corrosion', '100% Factory Tested at Component Level', 'Easy Snap-In Installation in 5 Minutes', 'Lifetime Brand Warranty'],
     '/images/shop/hardware_ram_ddr4.svg', 'Office Desktop RAM', {'warranty': 'Lifetime Replacement Warranty'}),

    ('prod-ram-ddr4-32gb-desktop', 'Kingston 32GB DDR4 3200MHz Desktop Workstation RAM', 'RAM Upgrades', 'Kingston', 'Brand New Original', 21000,
     '32GB desktop stick for heavy Excel sheets with millions of rows and multi-screen workstation use.',
     ['32GB Single Long-DIMM DDR4 3200MHz', 'High-Density Low-Latency CAS Latency', 'Compatible with Intel 8th to 14th Gen & AMD Ryzen', 'Heavy Duty Multitasking Workhorse', 'Lifetime Brand Warranty'],
     '/images/shop/hardware_ram_ddr4.svg', '32GB Desktop Workhorse', {'warranty': 'Lifetime Replacement Warranty'}),

    ('prod-ram-ddr5-16gb-desktop', 'Crucial 16GB DDR5 4800MHz Desktop RAM (Long-DIMM)', 'RAM Upgrades', 'Crucial', 'Brand New Original', 16000,
     'Latest DDR5 speed for modern 12th/13th/14th Gen Intel and AMD AM5 desktop motherboards.',
     ['16GB DDR5 4800MHz Desktop Memory', '1.5x Faster than DDR4 with Higher Efficiency', 'Optimized for Multi-Core Workstations', 'Built-in PMIC Power Management IC', 'Lifetime Brand Warranty'],
     '/images/shop/hardware_ram_ddr5.svg', 'DDR5 Desktop Speed', {'warranty': 'Lifetime Replacement Warranty'}),

    ('prod-ram-ddr5-32gb-desktop', 'Corsair Vengeance 32GB DDR5 5600MHz Desktop RAM', 'RAM Upgrades', 'Corsair', 'Brand New Original', 31000,
     'High-end DDR5 with custom aluminum heat sink. Maximum bandwidth for CAD and 3D simulation.',
     ['32GB DDR5 5600MHz Performance Kit', 'Solid Aluminum Heatspreader for Rapid Cooling', 'Onboard Voltage Regulation for Overclocking', 'Optimized for Intel XMP 3.0 & AMD EXPO', 'Lifetime Brand Warranty'],
     '/images/shop/hardware_ram_ddr5.svg', '5600MHz CAD Beast', {'warranty': 'Lifetime Replacement Warranty'}),

    ('prod-ram-ddr3-8gb-desktop', 'Kingston 8GB DDR3 1600MHz Desktop RAM', 'RAM Upgrades', 'Kingston', 'Brand New Original', 3800,
     'Economical upgrade for older Core i3, i5, i7 2nd, 3rd, 4th Gen desktop towers.',
     ['8GB DDR3 1600MHz PC3-12800 Desktop DIMM', 'Standard 1.5V JEDEC Spec Compatibility', 'Cleans Up Windows Lag on Older Towers', '100% Tested in Sialkot Lab', '1-Year Local Replacement'],
     '/images/shop/hardware_ram_ddr4.svg', 'Older Desktop Boost', {'warranty': '1-Year Replacement Warranty'})
]

for r in ram_items:
    add_prod(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10])

# 6. SSD & SOLID STATE STORAGE (14 MODELS)
ssd_items = [
    ('prod-ssd-nvme-1tb-gen4', 'Samsung 980 PRO / Kingston 1TB PCIe Gen4 NVMe M.2 SSD', 'SSD & Storage', 'Samsung', 'Brand New Original Box', 24000,
     'Blazing 7000MB/s speeds. Boots Windows in 5 seconds and loads heavy files instantly.',
     ['Up to 7000MB/s Read / 5000MB/s Write Speed', 'PCIe Gen4 x4 NVMe 1.4 Interface', 'Includes 45-Min Lossless Data Clone in Sialkot', 'Nickel-Coated Controller for Heat Dissipation', '3-Year Local Replacement Warranty'],
     '/images/shop/shop_nvme_ssd.svg', '7000MB/s Gen4 Speed', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-nvme-512gb-gen4', 'Kingston NV2 / Lexar 512GB PCIe Gen4 NVMe M.2 SSD', 'SSD & Storage', 'Kingston', 'Brand New Original Box', 12500,
     'Our most popular SSD upgrade. 10x faster than old hard drives with zero moving parts.',
     ['Up to 3500MB/s Read Speed', 'Single-Sided M.2 2280 Form Factor', 'Free OS Cloning & Data Transfer in Sialkot', 'Low Power Consumption (Saves Laptop Battery)', '3-Year Local Replacement Warranty'],
     '/images/shop/shop_nvme_ssd.svg', 'Top Value SSD', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-nvme-256gb-gen3', 'Lexar / Kingston 256GB PCIe NVMe M.2 Fast SSD', 'SSD & Storage', 'Lexar', 'Brand New Original Box', 7500,
     'Budget-friendly NVMe SSD for fast Windows boot and daily office application speed.',
     ['Up to 2400MB/s High-Speed Read Speed', 'M.2 2280 Form Factor for Laptops & Desktops', 'Includes Full OS Installation and Optimization', 'Resistant to Drops and Physical Shock', '3-Year Local Replacement Warranty'],
     '/images/shop/shop_nvme_ssd.svg', 'Budget NVMe M.2', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-nvme-2tb-gen4', 'Crucial P3 Plus / Kingston 2TB PCIe Gen4 NVMe M.2 SSD', 'SSD & Storage', 'Crucial', 'Brand New Original Box', 44000,
     'Massive 2TB high-speed storage for large export databases, video projects, and CAD files.',
     ['Huge 2TB (2000GB) High-Speed Storage', 'Up to 5000MB/s PCIe Gen4 Speed', 'Micron Advanced 3D NAND Technology', 'Full System Data Migration Included', '3-Year Local Replacement Warranty'],
     '/images/shop/shop_nvme_ssd.svg', '2TB Mega Storage', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-sata-512gb-25', 'Kingston A400 / Lexar 512GB 2.5" SATA III Internal SSD', 'SSD & Storage', 'Kingston', 'Brand New Original Box', 10500,
     'Replaces slow mechanical hard drives in older laptops and desktops. 500MB/s SATA speed.',
     ['Standard 2.5" 7mm Form Factor (Fits Any Laptop/PC)', 'Up to 540MB/s Read / 500MB/s Write Speed', '10x Faster than Traditional 7200RPM HDD', 'Free Lossless HDD to SSD Cloning Bay', '3-Year Local Replacement Warranty'],
     '/images/shop/shop_nvme_ssd.svg', 'Standard 2.5" SATA', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-sata-256gb-25', 'Crucial BX500 / Kingston 256GB 2.5" SATA III SSD', 'SSD & Storage', 'Crucial', 'Brand New Original Box', 6500,
     'Breathe new life into any old computer. Boots in seconds instead of minutes.',
     ['256GB High-Speed SATA III 6Gb/s', 'Zero Noise, Low Heat, and Drop Resistant', 'Perfect for POS Billing Desktops and Laptops', 'Includes Windows 10/11 Setup and Migration', '3-Year Local Replacement Warranty'],
     '/images/shop/shop_nvme_ssd.svg', 'Breathe New Life', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-sata-1tb-25', 'Samsung 870 EVO / Lexar 1TB 2.5" SATA III SSD', 'SSD & Storage', 'Samsung', 'Brand New Original Box', 21500,
     'Industry-leading SATA SSD with consistent maximum SATA saturation speeds and high endurance.',
     ['1TB High-Endurance Solid State Storage', 'Max SATA Speed: 560MB/s Read, 530MB/s Write', 'Intelligent TurboWrite for Sustained Speeds', '3-Year Local Written Warranty in Sialkot', 'Lossless Clone Bay in 45 Mins'],
     '/images/shop/shop_nvme_ssd.svg', '1TB High Endurance', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-sata-128gb-entry', 'Kingston / Colorful 128GB 2.5" SATA III SSD', 'SSD & Storage', 'Kingston', 'Brand New Original Box', 4200,
     'Cheapest way to remove computer lag. Install Windows on this SSD and keep HDD for files.',
     ['128GB Fast SATA III 6Gbps Storage', '500MB/s Read Speed for Fast Windows Boot', 'Ideal for Shop POS Terminals and School PCs', 'Shockproof Aluminum Casing', '3-Year Local Replacement Warranty'],
     '/images/shop/shop_nvme_ssd.svg', 'Lowest Cost Upgrade', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-nvme-128gb-m2', 'SK Hynix / Samsung 128GB M.2 PCIe NVMe SSD', 'SSD & Storage', 'SK Hynix', 'Certified Pull Tested', 3800,
     'Ultra-cheap M.2 NVMe SSD. Perfect dedicated OS drive for cash registers and office PCs.',
     ['128GB PCIe NVMe M.2 2280 Interface', '1800MB/s Read Speed (3x Faster than SATA)', '100% Health with Zero Bad Blocks Tested', 'Fast Windows Setup in Sialkot Lab', '1-Year Bench Warranty'],
     '/images/shop/shop_nvme_ssd.svg', 'Dedicated OS Drive', {'warranty': '1-Year Bench Warranty'}),

    ('prod-ssd-portable-1tb-usbc', 'SanDisk Extreme / Samsung T7 1TB Portable USB-C SSD', 'SSD & Storage', 'SanDisk', 'Brand New Original Box', 28000,
     'Pocket-sized rugged external SSD. Transfer 100GB of factory backups in under 2 minutes.',
     ['1TB Portable Solid State Drive with Rugged Shell', 'Up to 1050MB/s Read Speed via USB 3.2 Gen2', 'Drop Resistant from 2 Meters with IP55 Water Resistance', 'Type-C to Type-C & Type-A Cables Included', '3-Year Local Warranty'],
     '/images/shop/shop_nvme_ssd.svg', 'Rugged Portable USB-C', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-portable-500gb-usbc', 'Samsung T7 500GB Fast External USB-C SSD', 'SSD & Storage', 'Samsung', 'Brand New Original Box', 17500,
     'Credit card sized portable drive with aluminum case and password fingerprint encryption.',
     ['500GB Fast Pocket External SSD Storage', '1000MB/s High-Speed Transfer Rates', 'Shock Resistant Solid Aluminum Unibody', 'Compatible with PC, Mac, iPad, and Android Phones', '3-Year Local Replacement Warranty'],
     '/images/shop/shop_nvme_ssd.svg', 'Credit Card Size', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-m2-sata-256gb', 'KingSpec / Western Digital 256GB M.2 SATA SSD', 'SSD & Storage', 'Western Digital', 'Brand New Original', 6800,
     'For laptops and mini PCs that require M.2 SATA (B+M Key) instead of NVMe.',
     ['256GB M.2 SATA III 6Gbps (B+M Key)', '540MB/s Sequential Read Speed', 'Direct Fit for Older HP Folio, Dell Inspiron', 'Low Power Consumption and Zero Heat', '3-Year Local Replacement Warranty'],
     '/images/shop/shop_nvme_ssd.svg', 'M.2 SATA B+M Key', {'warranty': '3-Year Local Replacement'}),

    ('prod-ssd-nvme-heatsink-thermal', 'Copper & Aluminum M.2 NVMe SSD Heatsink with Thermal Pad', 'SSD & Storage', 'Accessories', 'Brand New In Box', 1800,
     'Reduces NVMe SSD temperature by 15°C to 20°C, preventing thermal throttling in towers.',
     ['Pure Copper Core + Grooved Aluminum Fins', 'High-Conductivity Double-Sided Silicone Thermal Pads', 'Fits All 2280 NVMe SSDs (Samsung, Kingston, Lexar)', 'Prevents SSD Speed Drop During Heavy File Copies', 'Includes Screwdriver and Mounting Screws'],
     '/images/shop/shop_nvme_ssd.svg', 'SSD Cooler Heatsink', {'warranty': 'Satisfaction Guaranteed'}),

    ('prod-ssd-external-enclosure-nvme', 'Tool-Free Aluminum M.2 NVMe to USB-C External Case', 'SSD & Storage', 'Accessories', 'Brand New In Box', 4500,
     'Turn your spare NVMe SSD into an ultra-fast 10Gbps portable pen drive.',
     ['10Gbps USB 3.2 Gen2 High-Speed Bridge Chip', 'Tool-Free Sliding Aluminum Shell (Zero Screws Needed)', 'Supports M.2 NVMe and SATA (Key M & B+M)', 'Type-C to Type-C Cable + USB-A Adaptor Included', 'Protective Thermal Silicone Strip Included'],
     '/images/shop/shop_nvme_ssd.svg', '10Gbps USB-C Case', {'warranty': '1-Year Warranty'})
]

for s in ssd_items:
    add_prod(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], s[8], s[9], s[10])

# 7. HARD DISK DRIVES (HDD) (8 MODELS)
hdd_items = [
    ('prod-hdd-seagate-1tb-desktop', 'Seagate Barracuda 1TB 7200 RPM 3.5" Desktop Hard Drive', 'Hard Disk Drives (HDD)', 'Seagate', 'Brand New Original', 11500,
     'Reliable secondary storage for factory documents, accounting records, and photo archives.',
     ['1TB (1000GB) High-Capacity 3.5" Desktop Drive', '7200 RPM Spin Speed with 64MB Cache Buffer', 'SATA 6Gbps Interface with Whisper Quiet Operation', 'Tested for 100% Health with Zero Bad Sectors', '2-Year Local Replacement Warranty'],
     '/images/shop/hardware_hdd_seagate.svg', '1TB 7200 RPM', {'warranty': '2-Year Local Replacement'}),

    ('prod-hdd-seagate-2tb-desktop', 'Seagate Barracuda 2TB 7200 RPM 3.5" Hard Drive', 'Hard Disk Drives (HDD)', 'Seagate', 'Brand New Original', 17000,
     'Store years of accounting ledgers, CCTV recordings, and customer files without worrying about space.',
     ['Huge 2TB Storage Capacity with 256MB Cache', 'Fast 7200 RPM Performance for Desktop Towers', 'Multi-Tier Caching Technology for Snappy Access', 'Original Box Packing with Official Serial', '2-Year Local Replacement Warranty'],
     '/images/shop/hardware_hdd_seagate.svg', '2TB High Capacity', {'warranty': '2-Year Local Replacement'}),

    ('prod-hdd-wd-purple-4tb-cctv', 'Western Digital Purple 4TB Surveillance 24/7 Hard Drive', 'Hard Disk Drives (HDD)', 'Western Digital', 'Brand New Original', 28500,
     'Engineered for 24/7 non-stop CCTV recording in Sialkot factories and shops. Never drops frames.',
     ['4TB Heavy-Duty Surveillance Grade HDD', 'AllFrame Technology Reduces Video Frame Drops', 'Built for 24/7 Continuous High-Temperature Operation', 'Supports up to 64 HD Security Cameras', '3-Year Official Written Warranty'],
     '/images/shop/hardware_hdd_seagate.svg', '24/7 CCTV Grade', {'warranty': '3-Year Official Warranty'}),

    ('prod-hdd-wd-blue-1tb-laptop', 'Western Digital Blue 1TB 2.5" Laptop Slim Hard Drive', 'Hard Disk Drives (HDD)', 'Western Digital', 'Brand New Original', 10500,
     'Slim 7mm internal drive for laptops, external USB enclosures, and compact backup bays.',
     ['1TB Storage in Slim 7mm 2.5" Laptop Size', 'Shock-Resistant NoTouch Ramp Load Technology', 'Ultra Quiet and Low Battery Consumption', '100% Tested at Sialkot Bench', '2-Year Local Replacement Warranty'],
     '/images/shop/hardware_hdd_seagate.svg', '1TB Laptop Slim', {'warranty': '2-Year Local Replacement'}),

    ('prod-hdd-wd-blue-500gb-laptop', 'Western Digital 500GB 2.5" Laptop Hard Drive', 'Hard Disk Drives (HDD)', 'Western Digital', 'Certified Grade-A Pull', 4500,
     'Budget internal storage for student laptops, backup drives, or replacement of clicking hard disks.',
     ['500GB 2.5" Internal Laptop Hard Disk', '100% Health Tested with HD-Tune Diagnostics', 'Formatted and Ready with NTFS File System', 'Zero Clicking Noise Guarantee', '6-Month Bench Warranty'],
     '/images/shop/hardware_hdd_seagate.svg', 'Budget 500GB', {'warranty': '6-Month Bench Warranty'}),

    ('prod-hdd-external-2tb-wd-elements', 'WD Elements 2TB Portable USB 3.0 External Hard Drive', 'Hard Disk Drives (HDD)', 'Western Digital', 'Brand New Original Box', 19500,
     'Plug-and-play USB 3.0 portable hard drive. Backup your entire factory database with one click.',
     ['2TB Portable Storage with Fast USB 3.0 Speed', 'Plug and Play for Windows (Zero Driver Setup)', 'Durable Matte Black Casing with Rubber Feet', 'Lightweight Pocket-Friendly Form Factor', '3-Year Local Replacement Warranty'],
     '/images/shop/hardware_hdd_seagate.svg', '2TB Portable Backup', {'warranty': '3-Year Local Replacement'}),

    ('prod-hdd-external-1tb-transcend-shock', 'Transcend StoreJet 1TB Military Drop-Tested External HDD', 'Hard Disk Drives (HDD)', 'Transcend', 'Brand New Original Box', 14500,
     'Three-stage shock protection system with slip-resistant silicone jacket. Survives heavy drops.',
     ['1TB Rugged External Hard Drive with USB 3.1', 'Military-Grade Shock Resistance (MIL-STD-810G)', 'One-Touch Auto Backup Button on Casing', '256-Bit AES File & Folder Encryption Software', '3-Year Official Warranty'],
     '/images/shop/hardware_hdd_seagate.svg', 'Military Drop Proof', {'warranty': '3-Year Official Warranty'}),

    ('prod-hdd-caddy-laptop-sata', 'Universal 9.5mm / 12.7mm Laptop DVD to HDD/SSD Caddy', 'Hard Disk Drives (HDD)', 'Accessories', 'Brand New In Box', 1500,
     'Replace your useless laptop DVD drive with a second hard drive or SSD for extra storage.',
     ['Universal Aluminum Caddy (Available in 9.5mm & 12.7mm)', 'SATA to SATA High-Speed Transmission', 'Allows Having SSD for Windows + Big HDD for Files', 'Includes Faceplate, Screws, and Screwdriver', 'Tested for 100% SATA III Speed'],
     '/images/shop/hardware_hdd_seagate.svg', 'DVD Caddy Bay', {'warranty': 'Satisfaction Guaranteed'})
]

for h in hdd_items:
    add_prod(h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], h[8], h[9], h[10])

# 8. KEYBOARDS & MICE (10 MODELS)
kb_items = [
    ('prod-kb-hp-elitebook-replacement', 'HP EliteBook 840 G5/G6/G7 Replacement Backlit Keyboard', 'Keyboards & Mice', 'HP', 'Brand New Original OEM', 4800,
     'Restore broken or missing laptop keys. Original soft tactile feel with bright white backlight.',
     ['Original OEM Keyboard for HP 840 G5, G6, G7', 'Crisp White LED Backlight with Dual Brightness', 'English US Layout with Pointing Stick TrackPoint', 'Includes Ribbon Cable Ready to Plug', 'Free Fitting at Sialkot Bench'],
     '/images/shop/hardware_laptop_keyboard.svg', 'Original Backlit OEM', {'warranty': '6-Month Warranty'}),

    ('prod-kb-dell-latitude-replacement', 'Dell Latitude 7480/7490/5490 Replacement Backlit Keyboard', 'Keyboards & Mice', 'Dell', 'Brand New Original OEM', 4500,
     'Original Dell keyboard with smooth key travel and blue pointing stick. Water-resistant frame.',
     ['Compatible with Dell Latitude 7480, 7490, 5490, 5480', 'Bright Backlit Keys with Blue TrackStick', 'Spill-Resistant Internal Seal Membrane', 'Exact Factory Key Spacing and Travel', 'Free Installation at Sialkot Bench'],
     '/images/shop/hardware_laptop_keyboard.svg', 'Dell OEM Backlit', {'warranty': '6-Month Warranty'}),

    ('prod-kb-lenovo-thinkpad-replacement', 'Lenovo ThinkPad T480/T490/T14 Replacement Keyboard', 'Keyboards & Mice', 'Lenovo', 'Brand New Original OEM', 5500,
     'Legendary curved keycaps for deep typing comfort. Includes red TrackPoint and mouse buttons.',
     ['Original ThinkPad Curved Keycap Profile', 'Legendary Red TrackPoint + 3 Physical Mouse Keys', 'Available in Backlit and Non-Backlit Options', 'Reinforced Internal Frame for Zero Keyboard Flex', 'Free Fitting at Sialkot Bench'],
     '/images/shop/hardware_laptop_keyboard.svg', 'ThinkPad OEM Keys', {'warranty': '6-Month Warranty'}),

    ('prod-kb-wireless-combo-logitech', 'Logitech MK270 Reliable Wireless Keyboard and Mouse Combo', 'Keyboards & Mice', 'Logitech', 'Brand New Original Box', 7500,
     'Long-range 2.4GHz wireless combo. 36-month keyboard and 12-month mouse battery life.',
     ['Full-Size Keyboard with Number Pad & 8 Hotkeys', 'Compact Contoured Optical Mouse (1000 DPI)', '10m Reliable 2.4GHz Wireless USB Nano Receiver', 'Spill-Resistant Design for Busy Desks', '1-Year Official Replacement Warranty'],
     '/images/shop/hardware_wireless_mouse.svg', 'Wireless Combo Pack', {'warranty': '1-Year Official Warranty'}),

    ('prod-kb-dell-pro-wireless-km5221', 'Dell Pro Wireless Keyboard and Mouse (KM5221W)', 'Keyboards & Mice', 'Dell', 'Brand New Original Box', 9500,
     'Sleek modern desktop combo with whisper-quiet keys and up to 36 months of battery life.',
     ['Full-Size Keyboard with Discrete Quiet Keys', 'Programmable Hotkeys and 4000 DPI Precision Mouse', '36 Months Battery Life on Standard AA/AAA', 'Battery Status Indicator LED on Keyboard', '3-Year Official Dell Warranty'],
     '/images/shop/hardware_wireless_mouse.svg', 'Dell 36-Month Battery', {'warranty': '3-Year Official Warranty'}),

    ('prod-mouse-wireless-silent-click', 'Rechargeable 2.4GHz Wireless Silent Click Optical Mouse', 'Keyboards & Mice', 'Mice & Keyboards', 'Brand New In Box', 2200,
     'Silent clicking buttons with built-in rechargeable battery. Zero clicking noise in quiet offices.',
     ['90% Noise Reduction Silent Click Switches', 'Built-in USB Rechargeable Battery (No Batteries Needed)', 'Adjustable 800 / 1200 / 1600 DPI Precision', 'Ergonomic Slim Contour for Comfortable Hand Grip', 'Auto Sleep Mode Saves Power'],
     '/images/shop/hardware_wireless_mouse.svg', 'Silent Click Rechargeable', {'warranty': '6-Month Warranty'}),

    ('prod-mouse-usb-heavy-office', 'Heavy-Duty Optical USB Office Mouse (1.5m Braided Cable)', 'Keyboards & Mice', 'Mice & Keyboards', 'Brand New In Box', 1200,
     'Durable workhorse mouse for retail counters and cash registers. Smooth tracking on any desk.',
     ['1200 DPI Optical Engine (No Mousepad Needed)', 'Tested for 5 Million Clicks Lifespan', 'Reinforced 1.5m USB Cable Resists Pulling', 'Comfortable Symmetric Grip for Left & Right Hands', 'Plug and Play on Windows, Mac, Linux'],
     '/images/shop/hardware_wireless_mouse.svg', 'Durable Office Workhorse', {'warranty': '6-Month Warranty'}),

    ('prod-kb-mechanical-rgb-office', 'Mechanical Gaming & Typing Keyboard (Blue / Red Switch)', 'Keyboards & Mice', 'Keyboards', 'Brand New In Box', 9800,
     'Tactile mechanical switches with fast response. Satisfying typing click for coders and writers.',
     ['Full 104-Key Anti-Ghosting Mechanical Board', 'Choice of Tactile Blue or Smooth Silent Red Switches', 'Double-Shot Injection Keycaps Never Fade', 'RGB Backlight with 12 Lighting Modes', 'Solid Metal Top Plate Construction'],
     '/images/shop/hardware_laptop_keyboard.svg', 'Mechanical Typing Pro', {'warranty': '1-Year Warranty'}),

    ('prod-kb-silicone-keyboard-cover', 'Transparent Waterproof Silicone Laptop Keyboard Protector', 'Keyboards & Mice', 'Accessories', 'Brand New In Pack', 600,
     'Shields your expensive laptop keyboard from tea spills, dust, oil, and worn out key letters.',
     ['Ultra-Thin 0.1mm Transparent Silicone Film', 'Custom Molded for HP, Dell, and Lenovo Laptops', 'Washable and Reusable with Warm Soapy Water', 'Prevents Liquid and Dust Entry into Motherboard', 'Soft Touch Dampens Typing Noise'],
     '/images/shop/hardware_laptop_keyboard.svg', 'Spill Protector Film', {'warranty': 'Satisfaction Guaranteed'}),

    ('prod-mouse-pad-extra-large-desk', 'Extended XL Desk Mat Mouse Pad (80cm x 30cm Stitched)', 'Keyboards & Mice', 'Accessories', 'Brand New In Pack', 1500,
     'Large desk pad fits both keyboard and mouse. Smooth micro-weave cloth with non-slip rubber base.',
     ['Large 800mm x 300mm Surface Area', 'Precision Micro-Textured Cloth for Accurate Tracking', 'Anti-Fray Stitched Edges Prevent Peeling', 'Non-Slip Textured Natural Rubber Underside', 'Water-Resistant Coating Wipes Clean'],
     '/images/shop/hardware_wireless_mouse.svg', 'XL Desk Mat', {'warranty': 'Satisfaction Guaranteed'})
]

for k in kb_items:
    add_prod(k[0], k[1], k[2], k[3], k[4], k[5], k[6], k[7], k[8], k[9], k[10])

# 9. SPARE PARTS & ACCESSORIES (10 MODELS)
parts_items = [
    ('prod-part-charger-65w-usbc', 'Original 65W Type-C Laptop Fast Charger (Dell / HP / Lenovo)', 'Spare Parts & Accessories', 'Chargers', 'Brand New Original', 5500,
     'Original 65W Type-C adapter with surge protection. Powers modern laptops and phones safely.',
     ['65W Power Delivery (5V/9V/15V/20V Auto-Switch)', 'Universal Type-C Output for Dell, HP, ThinkPad, Mac', 'Over-Voltage, Short-Circuit & Thermal Protection', 'Thick Heavy Duty Copper Core Power Cable', '6-Month Bench Warranty'],
     '/images/shop/hardware_laptop_adapter.svg', 'Universal 65W Type-C', {'warranty': '6-Month Warranty'}),

    ('prod-part-charger-dell-65w-pin', 'Original Dell 65W 4.5mm Small Pin Laptop Adapter', 'Spare Parts & Accessories', 'Chargers', 'Brand New Original', 4200,
     'Original replacement adapter for Dell Latitude, Inspiron, and Vostro laptops. Blue light tip.',
     ['19.5V 3.34A 65W Genuine Dell Charger', '4.5mm x 3.0mm Blue LED Indicator Connector Tip', 'Zero Spark Safety Circuitry Protects Motherboard', 'Original 3-Pin Grounded Power Cord Included', '6-Month Bench Warranty'],
     '/images/shop/hardware_laptop_adapter.svg', 'Dell 65W Small Pin', {'warranty': '6-Month Warranty'}),

    ('prod-part-charger-hp-65w-bluepin', 'Original HP 65W 4.5mm Blue Pin Laptop Charger', 'Spare Parts & Accessories', 'Chargers', 'Brand New Original', 4200,
     'Original adapter for HP EliteBook 840, ProBook 450, and Envy series. Stable output voltage.',
     ['19.5V 3.33A 65W Output Voltage Regulation', '4.5mm x 3.0mm Blue Tip Connector', 'High-Efficiency Low Standby Energy Draw', 'Original 3-Prong AC Cable Included', '6-Month Bench Warranty'],
     '/images/shop/hardware_laptop_adapter.svg', 'HP Blue Pin Charger', {'warranty': '6-Month Warranty'}),

    ('prod-part-charger-dell-130w-pin', 'Original Dell 130W Heavy Workstation Charger (7.4mm / Type-C)', 'Spare Parts & Accessories', 'Chargers', 'Brand New Original', 8500,
     'High-amperage 130W power adapter for Dell Precision CAD laptops and heavy XPS models.',
     ['19.5V 6.67A 130W High-Current Output', 'Prevents Laptop Battery Drain While Running Heavy CAD', 'Pure Copper High-Gauge Wire with Noise Ferrite Bead', 'Heavy Duty Aluminum Heat Dissipation Shell', '6-Month Bench Warranty'],
     '/images/shop/hardware_laptop_adapter.svg', '130W Workstation Power', {'warranty': '6-Month Warranty'}),

    ('prod-part-battery-dell-latitude-7490', 'Original Replacement Laptop Battery for Dell Latitude 7490/7480', 'Spare Parts & Accessories', 'Batteries', 'Brand New Original Grade', 7500,
     'Restore 6 to 8 hours of laptop battery life. Grade-A Japanese battery cells with protection board.',
     ['60Wh 4-Cell High-Density Li-ion Pack', 'Compatible with Dell Latitude 7490, 7480, 7390', 'Built-in Protection Against Overcharge and Short-Circuit', 'Tested for Full 100% Health Cycles in Lab', '6-Month Replacement Warranty'],
     '/images/shop/hardware_laptop_adapter.svg', 'Dell 60Wh Battery', {'warranty': '6-Month Warranty'}),

    ('prod-part-battery-hp-elitebook-840-g5', 'Original Replacement Battery for HP EliteBook 840 G5/G6', 'Spare Parts & Accessories', 'Batteries', 'Brand New Original Grade', 7800,
     'Fresh battery for HP EliteBook 840 and 850 series. Eliminates swollen battery and sudden shutdowns.',
     ['50Wh 3-Cell Lithium-Polymer Chemistry', 'Direct Fit for HP 840 G5, 840 G6, 830 G5', 'Smart Battery Management IC Reports True Percentage', 'Zero Swelling Guarantee with Lab Testing', '6-Month Replacement Warranty'],
     '/images/shop/hardware_laptop_adapter.svg', 'HP EliteBook Battery', {'warranty': '6-Month Warranty'}),

    ('prod-part-thermal-paste-arctic-mx4', 'Arctic MX-4 High-Performance Thermal Paste (4g Syringe)', 'Spare Parts & Accessories', 'Accessories', 'Brand New Original Box', 2200,
     'Drop laptop temperatures by 10°C to 15°C. Carbon micro-particles ensure high heat transfer.',
     ['4-Gram High-Capacity Syringe with Spatula', 'Non-Conductive Carbon Formula (Zero Risk of Short-Circuit)', '8.5 W/mK High Thermal Conductivity Rating', 'Lasts up to 8 Years Without Drying Out', 'Ideal for Laptop Servicing and CPU/GPU Repaste'],
     '/images/shop/hardware_thermal_paste.svg', 'Drop Temp 15°C', {'warranty': 'Original Arctic Guarantee'}),

    ('prod-part-thermal-cooling-cleaning-kit', 'Laptop Fan & Heatsink Professional Servicing Kit', 'Spare Parts & Accessories', 'Accessories', 'Brand New In Box', 3500,
     'Complete tools to clean dust from laptop fans, fix overheating, and replace dried thermal paste.',
     ['Precision Screwdriver Set with Magnetic Bits', 'Anti-Static ESD Curved Tweezers & Spudgers', 'High-Density Cleaning Brush + Blower Pump', 'Includes Alcohol Wipes for Old Thermal Paste Removal', 'Step-by-Step Servicing Guide Included'],
     '/images/shop/hardware_thermal_paste.svg', 'Pro Cleaning Toolkit', {'warranty': 'Quality Tool Guarantee'}),

    ('prod-part-hub-usbc-7in1', '7-in-1 Aluminum USB-C Multi-Port Hub Adapter (HDMI 4K + LAN + USB3)', 'Spare Parts & Accessories', 'Accessories', 'Brand New In Box', 6500,
     'Connect HDMI monitor, Ethernet internet cable, SD card, and 3 USB devices to your modern laptop.',
     ['4K 30Hz HDMI Output for Big Screen & TV', '100W USB-C Power Delivery Pass-Through Charging', '1x RJ-45 Gigabit Ethernet Port for Fast Internet', '2x USB 3.0 5Gbps Ports + SD/TF MicroSD Card Slots', 'Anodized Aluminum Shell Dissipates Heat Fast'],
     '/images/shop/hardware_desktop_tower.svg', '7-in-1 USB-C Hub', {'warranty': '1-Year Warranty'}),

    ('prod-part-cable-hdmi-4k-braided', 'High-Speed 4K 60Hz HDMI 2.0 Cable (1.8m Braided Nylon)', 'Spare Parts & Accessories', 'Accessories', 'Brand New In Pack', 1400,
     'Heavy duty gold-plated HDMI cable. Crisp 4K video connection to external monitors and TVs.',
     ['18Gbps High Speed HDMI 2.0 Specification', 'Supports 4K 60Hz, 2K 144Hz, and 1080p 240Hz', '24K Gold Plated Connectors with Zinc Alloy Housing', 'Tangle-Free High-Tensile Nylon Braided Jacket', 'Compatible with Laptops, PCs, Monitors, and TVs'],
     '/images/shop/hardware_desktop_tower.svg', '4K 60Hz Braided HDMI', {'warranty': '1-Year Warranty'})
]

for pt in parts_items:
    add_prod(pt[0], pt[1], pt[2], pt[3], pt[4], pt[5], pt[6], pt[7], pt[8], pt[9], pt[10])

print(f'Total products generated: {len(products)}')

ts_code = '''import { ShopProduct } from '../types';

export const COMPREHENSIVE_STORE_PRODUCTS: ShopProduct[] = ''' + json.dumps(products, indent=2) + ''';
'''

with open('src/data/storeProducts.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print('Successfully written to src/data/storeProducts.ts!')
