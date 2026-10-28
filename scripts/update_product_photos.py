import re
import json
import os

with open("src/data/storeProducts.ts", "r") as f:
    content = f.read()

# Parse the products array JSON block from the typescript file
match = re.search(r"export const COMPREHENSIVE_STORE_PRODUCTS: ShopProduct\[\] = (\[.*\]);", content, re.DOTALL)
if not match:
    print("Could not find COMPREHENSIVE_STORE_PRODUCTS")
    exit(1)

products_json = match.group(1)
products = json.loads(products_json)

def assign_real_photo(p):
    cat = p.get("category", "")
    name = p.get("name", "").lower()
    brand = p.get("brand", "").lower()
    
    if cat == "Laptops & PCs":
        if "macbook" in name or "apple" in brand:
            return "/images/shop/laptop_macbook.jpg"
        if "thinkpad" in name or "lenovo" in brand:
            if "yoga" in name:
                return "/images/shop/laptop_yoga.jpg"
            return "/images/shop/laptop_thinkpad.jpg"
        if "xps" in name:
            return "/images/shop/laptop_dell_xps.jpg"
        if "precision" in name or "workstation" in name or "cad" in name or "zbook" in name:
            return "/images/shop/laptop_dell_workstation.jpg"
        if "dell" in brand or "latitude" in name:
            return "/images/shop/laptop_dell_latitude.jpg"
        if "hp" in brand or "elitebook" in name or "probook" in name:
            return "/images/shop/laptop_hp_business.jpg"
        if "vaio" in name or "sony" in brand:
            return "/images/shop/laptop_sony_vaio.jpg"
        if "zenbook" in name or "asus" in brand or "expertbook" in name:
            return "/images/shop/laptop_asus_zenbook.jpg"
        if "swift" in name or "acer" in brand:
            return "/images/shop/laptop_acer_swift.jpg"
        return "/images/shop/laptop_hp_business.jpg"

    elif cat == "Desktops & Workstations":
        if "mini" in name or "micro" in name or "tiny" in name or "sff" in name:
            return "/images/shop/desktop_micro_pc.jpg"
        if "workstation" in name or "rig" in name or "heavy" in name or "cad" in name or "rtx" in name:
            return "/images/shop/desktop_workstation_cad.jpg"
        return "/images/shop/desktop_pc_tower.jpg"

    elif cat == "Printers & Scanners":
        if "thermal" in name or "receipt" in name or "bill" in name:
            return "/images/shop/printer_thermal_receipt.jpg"
        if "barcode" in name or "label" in name or "shipping" in name or "waybill" in name or "tsc" in name or "zebra" in name or "xprinter" in name:
            return "/images/shop/printer_barcode_label.jpg"
        if "ecotank" in name or "epson" in name or "ink" in name:
            return "/images/shop/printer_epson_ecotank.jpg"
        if "mfp" in name or "all-in-one" in name or "brother" in name:
            return "/images/shop/printer_mfp_workgroup.jpg"
        return "/images/shop/printer_laser_office.jpg"

    elif cat == "POS Hardware":
        if "scanner" in name or "laser" in name or "orbit" in name:
            return "/images/shop/pos_barcode_scanner.jpg"
        if "drawer" in name or "cash" in name:
            return "/images/shop/pos_cash_drawer.jpg"
        if "paper" in name or "roll" in name:
            return "/images/shop/pos_thermal_rolls.jpg"
        return "/images/shop/pos_terminal_screen.jpg"

    elif cat == "RAM Upgrades":
        if "ddr5" in name:
            return "/images/shop/ram_ddr5_performance.jpg"
        if "desktop" in name or "fury" in name or "corsair" in name:
            return "/images/shop/ram_desktop_fury.jpg"
        return "/images/shop/ram_laptop_sodimm.jpg"

    elif cat == "SSD & Storage":
        if "samsung" in name or "980" in name or "970" in name:
            return "/images/shop/ssd_samsung_980.jpg"
        if "sata" in name or "2.5" in name or "bx500" in name:
            return "/images/shop/ssd_sata_internal.jpg"
        return "/images/shop/ssd_nvme_m2.jpg"

    elif cat == "Hard Disk Drives (HDD)":
        if "external" in name or "portable" in name or "expansion" in name or "usb" in name:
            return "/images/shop/hdd_external_portable.jpg"
        return "/images/shop/hdd_internal_seagate.jpg"

    elif cat == "Keyboards & Mice":
        if "mouse" in name and "combo" not in name and "keyboard" not in name:
            return "/images/shop/mouse_optical_usb.jpg"
        if "mechanical" in name or "rgb" in name or "gaming" in name:
            return "/images/shop/keyboard_mechanical_rgb.jpg"
        return "/images/shop/keyboard_mouse_combo.jpg"

    elif cat == "Spare Parts & Accessories":
        if "charger" in name or "adapter" in name or "power" in name:
            return "/images/shop/charger_laptop_usbc.jpg"
        if "paste" in name or "grease" in name or "thermal" in name:
            return "/images/shop/thermal_paste_grease.jpg"
        return "/images/shop/laptop_fan_cooler.jpg"

    return "/images/shop/laptop_hp_business.jpg"

# Update each product's imageUrl
for p in products:
    photo_path = assign_real_photo(p)
    p["imageUrl"] = photo_path
    # check file exists
    full_path = "public" + photo_path
    if not os.path.exists(full_path):
        print(f"Warning: {full_path} does not exist!")

# Reconstruct file content
new_products_json = json.dumps(products, indent=2)
new_content = "import { ShopProduct } from '../types';\n\nexport const COMPREHENSIVE_STORE_PRODUCTS: ShopProduct[] = " + new_products_json + ";\n"

with open("src/data/storeProducts.ts", "w") as f:
    f.write(new_content)

print(f"Successfully updated {len(products)} products with genuine photographic images!")
