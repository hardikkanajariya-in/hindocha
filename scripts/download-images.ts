import fs from "fs";
import path from "path";
import https from "https";

const PUBLIC_DIR = path.join(__dirname, "../public");
const CATEGORIES_DIR = path.join(PUBLIC_DIR, "images/categories");
const PRODUCTS_DIR = path.join(PUBLIC_DIR, "images/products");

// Category cover images (High-quality Unsplash decoration images)
const CATEGORY_IMAGES: Record<string, string> = {
  "artificial-flowers": "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&auto=format&fit=crop&q=80",
  "garlands": "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&auto=format&fit=crop&q=80",
  "wedding-decorations": "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
  "festival-decorations": "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80",
  "door-hangings-toran": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
  "decoration-cloth": "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80",
  "pooja-items": "https://images.unsplash.com/photo-1608976478546-d24930d4a9bf?w=800&auto=format&fit=crop&q=80",
  "seasonal-decorations": "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=800&auto=format&fit=crop&q=80",
};

// Base product images to download and clone per category to make unique-looking local images
const PRODUCT_BASE_IMAGES: Record<string, string[]> = {
  "artificial-flowers": [
    "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?w=600&auto=format&fit=crop&q=80"
  ],
  "garlands": [
    "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80"
  ],
  "wedding-decorations": [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519225495810-7512c696505a?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505232458729-26417ff63c00?w=600&auto=format&fit=crop&q=80"
  ],
  "festival-decorations": [
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&auto=format&fit=crop&q=80"
  ],
  "door-hangings-toran": [
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80"
  ],
  "decoration-cloth": [
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80"
  ],
  "pooja-items": [
    "https://images.unsplash.com/photo-1609137144814-6d9b4b0e8c75?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608976478546-d24930d4a9bf?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&auto=format&fit=crop&q=80"
  ],
  "seasonal-decorations": [
    "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80"
  ]
};

// Download helper
function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      fs.unlink(destPath, () => {}); // Delete local temp file
      reject(err);
    });
  });
}

// Product lists for copying
const PRODUCTS_BY_CATEGORY: Record<string, string[]> = {
  "artificial-flowers": [
    "red-rose-bunch-premium", "yellow-marigold-flowers-pack", "white-jasmine-flower-string",
    "pink-lotus-flower-large", "orange-marigold-bunch", "mixed-flower-basket-arrangement",
    "purple-orchid-stem", "sunflower-bunch-6-stems", "artificial-tulip-set-multicolor", "mini-rose-bouquet-pastel"
  ],
  "garlands": [
    "marigold-garland-5ft-yellow", "rose-petal-garland-red", "jasmine-marigold-mixed-garland",
    "rajnigandha-garland-white", "orange-marigold-garland-heavy", "multicolor-flower-garland-string",
    "mogra-gajra-set-3", "chrysanthemum-garland-gold", "temple-garland-set-traditional", "lily-garland-white-pink"
  ],
  "wedding-decorations": [
    "wedding-stage-flower-panel", "mandap-decoration-set-gold", "wedding-car-decoration-kit",
    "artificial-flower-chandelier", "wedding-gate-arch-flowers", "bridal-bouquet-premium-rose",
    "table-runner-flower-garland", "mehndi-decoration-umbrella-set", "rajasthani-wedding-backdrop", "wedding-welcome-board-frame"
  ],
  "festival-decorations": [
    "diwali-toran-set-premium", "navratri-decoration-kit", "ganesh-chaturthi-backdrop",
    "rangoli-floor-sticker-set", "onam-pookalam-flowers-pack", "christmas-wreath-traditional",
    "holi-color-flower-garland-set", "ugadi-mango-leaf-toran", "eid-crescent-moon-decoration", "pongal-sugarcane-decoration-set"
  ],
  "door-hangings-toran": [
    "mango-leaf-toran-classic", "marigold-toran-heavy-garland", "beaded-crystal-toran",
    "rajasthani-mirror-work-toran", "tulsi-mala-door-hanging", "peacock-feather-toran",
    "fabric-bandarwal-toran-gold", "rose-flower-toran-pink", "coconut-shell-toran", "led-light-toran-diwali-special"
  ],
  "decoration-cloth": [
    "red-velvet-drape-5-yards", "gold-organza-fabric-10-yards", "satin-ribbon-roll-set-6-colors",
    "sequin-backdrop-curtain-gold", "tulle-roll-white-100-yards", "bandhani-print-fabric-5-yards",
    "mirror-work-lace-border-10m", "net-fabric-multicolor-pack", "brocade-fabric-royal-blue-3y", "chiffon-decoration-swag-ivory"
  ],
  "pooja-items": [
    "complete-pooja-decoration-set", "artificial-flower-haar-set", "temple-decoration-hanging-set",
    "artificial-tulsi-plant", "decorative-diya-set-led", "pooja-thali-decoration-kit",
    "rangoli-flower-decoration-set", "ganesh-idol-decoration-set", "mandir-backdrop-cloth", "pooja-room-door-curtain"
  ],
  "seasonal-decorations": [
    "diwali-complete-decoration-kit", "spring-garden-flower-set", "monsoon-green-leaf-garlands",
    "harvest-festival-decoration-set", "summer-tropical-party-set", "rakhi-decoration-hanging-set",
    "new-year-party-decoration-kit", "valentine-rose-decoration-set", "independence-day-tricolor-set", "winter-wonderland-decoration-kit"
  ]
};

async function main() {
  console.log("📂 Creating directories...");
  fs.mkdirSync(CATEGORIES_DIR, { recursive: true });
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });

  const tempDir = path.join(__dirname, "../scratch/temp");
  fs.mkdirSync(tempDir, { recursive: true });

  console.log("📸 Downloading category cover images...");
  for (const [slug, url] of Object.entries(CATEGORY_IMAGES)) {
    const dest = path.join(CATEGORIES_DIR, `${slug}.jpg`);
    console.log(`Downloading category image: ${slug}...`);
    try {
      await downloadFile(url, dest);
    } catch (err: any) {
      console.error(`Failed to download ${slug}: ${err.message}`);
    }
  }

  console.log("\n📸 Downloading base product images...");
  const localBaseImages: Record<string, string[]> = {};
  for (const [category, urls] of Object.entries(PRODUCT_BASE_IMAGES)) {
    localBaseImages[category] = [];
    for (let i = 0; i < urls.length; i++) {
      const tempPath = path.join(tempDir, `${category}_base_${i}.jpg`);
      console.log(`Downloading base image for ${category} [${i}]...`);
      try {
        await downloadFile(urls[i], tempPath);
        localBaseImages[category].push(tempPath);
      } catch (err: any) {
        console.error(`Failed to download base ${category} [${i}]: ${err.message}`);
      }
    }
  }

  console.log("\n⚡ Generating local product images (cloning base files)...");
  for (const [category, productSlugs] of Object.entries(PRODUCTS_BY_CATEGORY)) {
    const bases = localBaseImages[category] || [];
    if (bases.length === 0) continue;

    for (let i = 0; i < productSlugs.length; i++) {
      const slug = productSlugs[i];
      
      const img1Base = bases[i % bases.length];
      const img2Base = bases[(i + 1) % bases.length];

      const dest1 = path.join(PRODUCTS_DIR, `${slug}-1.jpg`);
      const dest2 = path.join(PRODUCTS_DIR, `${slug}-2.jpg`);

      fs.copyFileSync(img1Base, dest1);
      fs.copyFileSync(img2Base, dest2);
    }
  }

  // Clean up temp files
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}

  console.log("\n🎉 All product and category images downloaded & copied locally!");
}

main().catch(console.error);
