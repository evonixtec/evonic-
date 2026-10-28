import urllib.request
import os
import sys

TARGET_DIR = "public/images/shop"
os.makedirs(TARGET_DIR, exist_ok=True)

# Curated, verified Unsplash high-resolution tech hardware photos
PHOTO_MAP = {
    # Laptops
    "laptop_hp_business.jpg": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=85", # HP/silver laptop
    "laptop_dell_latitude.jpg": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=85", # Dell Latitude / XPS
    "laptop_dell_workstation.jpg": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=85", # Heavy workstation laptop
    "laptop_dell_xps.jpg": "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop&q=85", # Dell XPS ultra slim
    "laptop_thinkpad.jpg": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=85", # ThinkPad / dark pro laptop
    "laptop_macbook.jpg": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=85", # MacBook Apple
    "laptop_asus_zenbook.jpg": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=85", # Asus Zenbook / slim
    "laptop_sony_vaio.jpg": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=85", # Clean modern laptop on desk
    "laptop_acer_swift.jpg": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=85", # Silver ultraportable laptop
    "laptop_yoga.jpg": "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&auto=format&fit=crop&q=85", # 2-in-1 laptop touch

    # Desktops & Workstations
    "desktop_pc_tower.jpg": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=85", # Desktop PC tower
    "desktop_micro_pc.jpg": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=85", # Mini PC / hardware
    "desktop_workstation_cad.jpg": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=85", # Heavy PC workstation setup

    # Printers & Scanners
    "printer_laser_office.jpg": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=85", # Laser printer
    "printer_thermal_receipt.jpg": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=85", # Receipt printer POS
    "printer_barcode_label.jpg": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=85", # Barcode label printer / warehouse
    "printer_epson_ecotank.jpg": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=85", # All-in-one printer scanner
    "printer_mfp_workgroup.jpg": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=85", # Heavy office multi-function printer

    # POS Hardware
    "pos_terminal_screen.jpg": "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop&q=85", # POS terminal checkout
    "pos_barcode_scanner.jpg": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=85", # Laser scanner / tech
    "pos_cash_drawer.jpg": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&auto=format&fit=crop&q=85", # Retail cash register drawer
    "pos_thermal_rolls.jpg": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=85", # Paper rolls / packing

    # RAM Upgrades
    "ram_laptop_sodimm.jpg": "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=85", # RAM memory sticks
    "ram_desktop_fury.jpg": "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=800&auto=format&fit=crop&q=85", # High speed RAM module
    "ram_ddr5_performance.jpg": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=85", # DDR5 performance chip

    # SSD & Storage
    "ssd_nvme_m2.jpg": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=85", # NVMe M.2 SSD stick
    "ssd_sata_internal.jpg": "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=85", # SATA SSD 2.5 inch
    "ssd_samsung_980.jpg": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=85", # High tech circuit board / chip

    # Hard Disk Drives (HDD)
    "hdd_internal_seagate.jpg": "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&auto=format&fit=crop&q=85", # Internal 3.5 hard disk
    "hdd_external_portable.jpg": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=85", # Portable external drive

    # Keyboards & Mice
    "keyboard_mouse_combo.jpg": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=85", # Keyboard and mouse clean desk
    "mouse_optical_usb.jpg": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=85", # Ergonomic computer mouse
    "keyboard_mechanical_rgb.jpg": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=85", # Mechanical keyboard

    # Spare Parts & Accessories
    "charger_laptop_usbc.jpg": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=85", # USB-C power adapter / cable
    "thermal_paste_grease.jpg": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=85", # Computer electronics tool / paste
    "laptop_fan_cooler.jpg": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=85", # Cooling fan / hardware
}

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

success = 0
failed = 0

for filename, url in PHOTO_MAP.items():
    filepath = os.path.join(TARGET_DIR, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(filepath, "wb") as f:
                f.write(data)
        print(f"Downloaded: {filename} ({len(data)} bytes)")
        success += 1
    except Exception as e:
        print(f"Failed {filename}: {e}")
        failed += 1

print(f"\nCompleted: {success} downloaded, {failed} failed.")
