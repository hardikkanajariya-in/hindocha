import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { categories, products, productImages, settings } from "../lib/db/schema";
import "dotenv/config";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const CATEGORIES_DATA = [
  {
    name: "Artificial Flowers",
    slug: "artificial-flowers",
    description: "Beautiful artificial flowers for all occasions — roses, marigolds, jasmine, lotus, and more.",
    image: "/images/categories/artificial-flowers.jpg",
    displayOrder: 1,
  },
  {
    name: "Garlands",
    slug: "garlands",
    description: "Traditional and decorative garlands for weddings, festivals, and daily pooja.",
    image: "/images/categories/garlands.jpg",
    displayOrder: 2,
  },
  {
    name: "Wedding Decorations",
    slug: "wedding-decorations",
    description: "Complete wedding stage, mandap, and entrance decoration sets.",
    image: "/images/categories/wedding-decorations.jpg",
    displayOrder: 3,
  },
  {
    name: "Festival Decorations",
    slug: "festival-decorations",
    description: "Festive decoration items for Diwali, Navratri, Ganesh Chaturthi, and more.",
    image: "/images/categories/festival-decorations.jpg",
    displayOrder: 4,
  },
  {
    name: "Door Hangings (Toran)",
    slug: "door-hangings-toran",
    description: "Traditional and modern torans and door hanging decorations.",
    image: "/images/categories/door-hangings-toran.jpg",
    displayOrder: 5,
  },
  {
    name: "Decoration Cloth",
    slug: "decoration-cloth",
    description: "Decorative fabrics, drapes, and cloth for stage and venue decoration.",
    image: "/images/categories/decoration-cloth.jpg",
    displayOrder: 6,
  },
  {
    name: "Pooja Items",
    slug: "pooja-items",
    description: "Essential pooja decoration items, temple accessories, and worship materials.",
    image: "/images/categories/pooja-items.jpg",
    displayOrder: 7,
  },
  {
    name: "Seasonal Decorations",
    slug: "seasonal-decorations",
    description: "Seasonal and holiday decoration products for every time of the year.",
    image: "/images/categories/seasonal-decorations.jpg",
    displayOrder: 8,
  },
];

interface ProductSeed {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: string | null;
  isFeatured: boolean;
}

const PRODUCTS_BY_CATEGORY: Record<string, ProductSeed[]> = {
  "artificial-flowers": [
    { name: "Red Rose Bunch - Premium", slug: "red-rose-bunch-premium", shortDescription: "12 premium artificial red roses with realistic petals", description: "Beautiful bunch of 12 premium quality artificial red roses. Each rose features realistic velvet-touch petals with natural-looking green leaves and stems. Perfect for home decoration, gifting, or event arrangements. Fade-resistant and long-lasting.", price: "350", isFeatured: true },
    { name: "Yellow Marigold Flowers Pack", slug: "yellow-marigold-flowers-pack", shortDescription: "50 loose artificial marigold flowers", description: "Pack of 50 vibrant yellow artificial marigold flowers. Ideal for making garlands, rangoli decoration, festival arrangements, and pooja setups. Made from high-quality silk fabric for a natural look.", price: "180", isFeatured: false },
    { name: "White Jasmine Flower String", slug: "white-jasmine-flower-string", shortDescription: "5ft artificial jasmine flower string", description: "Delicate 5-foot artificial jasmine flower string with realistic white blooms. Perfect for hair decoration, pooja room decor, and traditional arrangements. Flexible wire core for easy shaping.", price: "120", isFeatured: true },
    { name: "Pink Lotus Flower - Large", slug: "pink-lotus-flower-large", shortDescription: "Large floating artificial lotus flower", description: "Beautiful large artificial pink lotus flower designed for water bowls and urli decoration. Realistic petal design with gradient pink coloring. Waterproof and suitable for floating arrangements.", price: "250", isFeatured: false },
    { name: "Orange Marigold Bunch", slug: "orange-marigold-bunch", shortDescription: "Bright orange artificial marigold bunch", description: "Vibrant orange artificial marigold bunch with 8 large blooms. Traditional design perfect for temple decoration, festival arrangements, and home decor. UV-resistant for both indoor and outdoor use.", price: "220", isFeatured: false },
    { name: "Mixed Flower Basket Arrangement", slug: "mixed-flower-basket-arrangement", shortDescription: "Pre-arranged mixed flower basket", description: "Ready-to-display mixed artificial flower basket featuring roses, daisies, and greenery in a decorative wicker basket. Perfect centerpiece for living rooms, dining tables, or office spaces.", price: "550", isFeatured: true },
    { name: "Purple Orchid Stem", slug: "purple-orchid-stem", shortDescription: "Single stem artificial purple orchid", description: "Elegant single stem artificial purple orchid with 7 blooms. Premium quality with realistic texture and natural-looking stem. Perfect for modern home decor and minimalist arrangements.", price: "180", isFeatured: false },
    { name: "Sunflower Bunch - 6 Stems", slug: "sunflower-bunch-6-stems", shortDescription: "6 large artificial sunflowers", description: "Cheerful bunch of 6 large artificial sunflowers with realistic brown centers and bright yellow petals. Each stem is 18 inches tall. Perfect for brightening any room or creating summer-themed arrangements.", price: "300", isFeatured: false },
    { name: "Artificial Tulip Set - Multicolor", slug: "artificial-tulip-set-multicolor", shortDescription: "Set of 10 multicolor tulips", description: "Beautiful set of 10 artificial tulips in assorted colors including red, pink, yellow, and white. Real-touch material provides incredibly realistic feel. Complete with green leaves and stems.", price: "400", isFeatured: false },
    { name: "Mini Rose Bouquet - Pastel", slug: "mini-rose-bouquet-pastel", shortDescription: "Petite bouquet of pastel roses", description: "Delicate mini bouquet featuring 15 small pastel-colored roses in soft pink, lavender, and cream tones. Wrapped in decorative paper with ribbon. Perfect gift or table accent.", price: "280", isFeatured: false },
  ],
  "garlands": [
    { name: "Marigold Garland - 5ft Yellow", slug: "marigold-garland-5ft-yellow", shortDescription: "Traditional yellow marigold garland, 5 feet", description: "Classic 5-foot artificial yellow marigold garland. Dense flower arrangement with consistent bloom size. Ideal for pooja room decoration, door frames, and festive occasions. Durable and reusable.", price: "150", isFeatured: true },
    { name: "Rose Petal Garland - Red", slug: "rose-petal-garland-red", shortDescription: "Luxurious red rose petal garland", description: "Premium 4-foot red rose petal garland with cascading petals. Perfect for wedding decoration, romantic settings, and special occasions. Each petal is hand-arranged for a natural cascade effect.", price: "280", isFeatured: true },
    { name: "Jasmine & Marigold Mixed Garland", slug: "jasmine-marigold-mixed-garland", shortDescription: "Traditional mixed flower garland", description: "Beautiful 5-foot mixed garland combining white jasmine flowers with yellow marigolds. Traditional design used in South Indian festivals and temple decorations. Wire core for flexible draping.", price: "200", isFeatured: false },
    { name: "Rajnigandha Garland - White", slug: "rajnigandha-garland-white", shortDescription: "Elegant white rajnigandha flower garland", description: "Graceful 4-foot artificial rajnigandha (tuberose) garland. Pristine white flowers arranged in traditional style. Perfect for welcome decoration, deity offerings, and elegant events.", price: "180", isFeatured: false },
    { name: "Orange Marigold Garland Heavy", slug: "orange-marigold-garland-heavy", shortDescription: "Dense orange marigold garland, 5ft", description: "Heavy-density 5-foot orange marigold garland with tightly packed large blooms. Extra thick design for grand decoration at weddings, temples, and festivals. Fade-resistant fabric.", price: "200", isFeatured: false },
    { name: "Multicolor Flower Garland String", slug: "multicolor-flower-garland-string", shortDescription: "Colorful mixed flower garland with beads", description: "Vibrant 6-foot multicolor flower garland with decorative beads and pearls interspersed between blooms. Features roses, daisies, and filler flowers in pink, yellow, and white. Perfect for modern decoration.", price: "320", isFeatured: false },
    { name: "Mogra Gajra - Set of 3", slug: "mogra-gajra-set-3", shortDescription: "Artificial mogra gajra for hair", description: "Set of 3 artificial mogra (Arabian jasmine) gajras. Each gajra is 12 inches long with tightly clustered white buds. Flexible and comfortable for hair decoration. Reusable for multiple occasions.", price: "150", isFeatured: false },
    { name: "Chrysanthemum Garland - Gold", slug: "chrysanthemum-garland-gold", shortDescription: "Golden chrysanthemum garland, 4ft", description: "Stunning 4-foot golden chrysanthemum garland with large, full blooms. Luxurious appearance perfect for wedding mandap decoration, reception stages, and premium events. Easy to drape and hang.", price: "250", isFeatured: false },
    { name: "Temple Garland Set - Traditional", slug: "temple-garland-set-traditional", shortDescription: "Set of 4 traditional temple garlands", description: "Complete set of 4 traditional temple garlands in different styles: jasmine string, marigold chain, rose cascade, and mixed flower design. Each garland is 3 feet long. Perfect for daily deity decoration.", price: "400", isFeatured: true },
    { name: "Lily Garland - White & Pink", slug: "lily-garland-white-pink", shortDescription: "Elegant lily flower garland", description: "Elegant 4-foot garland featuring alternating white and pink lily flowers. Sophisticated design suitable for modern weddings, corporate events, and contemporary home decoration.", price: "280", isFeatured: false },
  ],
  "wedding-decorations": [
    { name: "Wedding Stage Flower Panel", slug: "wedding-stage-flower-panel", shortDescription: "Large flower panel for stage backdrop", description: "Stunning 4x4 feet artificial flower panel featuring roses, hydrangeas, and peonies in blush pink, white, and cream tones. Perfect for wedding stage backdrop, photo booth backdrop, or reception decoration. Easy to mount with included hooks.", price: "2500", isFeatured: true },
    { name: "Mandap Decoration Set - Gold", slug: "mandap-decoration-set-gold", shortDescription: "Complete mandap flower decoration set", description: "Complete artificial flower decoration set for wedding mandap including 4 pillar wraps, 1 ceiling canopy, and 4 corner arrangements. Gold and white color scheme with roses, orchids, and greenery. Comes with installation ties.", price: "4500", isFeatured: true },
    { name: "Wedding Car Decoration Kit", slug: "wedding-car-decoration-kit", shortDescription: "Car flower decoration for weddings", description: "Complete wedding car decoration kit with flower hood arrangement, door handles, mirror decorations, and trunk bouquet. Features artificial roses in red and white with ribbon and tulle. Easy suction cup attachment.", price: "800", isFeatured: false },
    { name: "Artificial Flower Chandelier", slug: "artificial-flower-chandelier", shortDescription: "Hanging flower chandelier for reception", description: "Luxurious hanging artificial flower chandelier ring (24-inch diameter) with cascading wisteria and roses. Creates a stunning ceiling centerpiece for wedding receptions, sangeet nights, or engagement parties. Includes suspension chain.", price: "1800", isFeatured: false },
    { name: "Wedding Gate Arch Flowers", slug: "wedding-gate-arch-flowers", shortDescription: "Arch decoration with mixed flowers", description: "Large artificial flower arrangement designed for wedding entrance arches. Features a lush mix of peonies, roses, hydrangeas, and eucalyptus in romantic pastel colors. Attaches with adjustable ties. Covers approximately 3 feet of arch.", price: "1500", isFeatured: false },
    { name: "Bridal Bouquet - Premium Rose", slug: "bridal-bouquet-premium-rose", shortDescription: "Keepsake artificial bridal bouquet", description: "Exquisite artificial bridal bouquet with 24 premium real-touch roses in ivory and blush pink. Wrapped with satin ribbon and pearl pins. Unlike fresh flowers, this bouquet lasts forever as a keepsake.", price: "650", isFeatured: false },
    { name: "Table Runner Flower Garland", slug: "table-runner-flower-garland", shortDescription: "6ft flower garland for table decoration", description: "Elegant 6-foot artificial flower garland designed as a table runner. Features roses, peonies, and eucalyptus leaves in a natural cascading arrangement. Perfect for wedding reception tables, head table, or buffet decoration.", price: "900", isFeatured: false },
    { name: "Mehndi Decoration Umbrella Set", slug: "mehndi-decoration-umbrella-set", shortDescription: "Set of 3 decorative umbrellas", description: "Set of 3 colorful decorated umbrellas with artificial flowers, tassels, and mirror work. Perfect for mehndi ceremony decoration, sangeet night ambiance, or photo booth props. Available in vibrant pink, orange, and yellow.", price: "750", isFeatured: false },
    { name: "Rajasthani Wedding Backdrop", slug: "rajasthani-wedding-backdrop", shortDescription: "Traditional Rajasthani style backdrop", description: "Traditional Rajasthani-style wedding backdrop panel (6x8 feet) with artificial marigold strings, mirror work, and colorful fabric draping. Creates an authentic Indian wedding atmosphere. Easy assembly with frame support.", price: "3500", isFeatured: false },
    { name: "Wedding Welcome Board Frame", slug: "wedding-welcome-board-frame", shortDescription: "Flower-decorated welcome board frame", description: "Elegant frame for wedding welcome board decorated with artificial roses, peonies, and greenery. Fits standard 24x36 inch boards. Romantic blush pink and ivory color palette. Board not included.", price: "550", isFeatured: false },
  ],
  "festival-decorations": [
    { name: "Diwali Toran Set - Premium", slug: "diwali-toran-set-premium", shortDescription: "Premium Diwali door decoration set", description: "Premium Diwali toran set with mango leaf garland, marigold strings, and decorative bells. Includes 1 door toran (3ft), 2 side hangings, and 1 threshold rangoli sticker. Gold and orange color theme. Complete festive door makeover.", price: "450", isFeatured: true },
    { name: "Navratri Decoration Kit", slug: "navratri-decoration-kit", shortDescription: "Complete Navratri garba decoration", description: "Complete Navratri decoration kit including colorful ceiling hangings, mirror work garland, artificial flower strings, and backdrop drapes. Vibrant colors of red, green, and yellow. Perfect for garba and dandiya nights.", price: "800", isFeatured: true },
    { name: "Ganesh Chaturthi Backdrop", slug: "ganesh-chaturthi-backdrop", shortDescription: "Backdrop for Ganesh mandal decoration", description: "Beautiful backdrop for Ganesh Chaturthi mandal decoration. Features artificial marigold garlands, green leaf arrangements, and golden ornamental elements. Approximately 5x5 feet. Creates a divine atmosphere for Bappa.", price: "1200", isFeatured: false },
    { name: "Rangoli Floor Sticker Set", slug: "rangoli-floor-sticker-set", shortDescription: "Set of 4 decorative rangoli stickers", description: "Set of 4 beautiful rangoli floor stickers in traditional Kolam designs. Each sticker is 18 inches in diameter. Easy to apply and remove without residue. Perfect for Diwali, Pongal, or any festive occasion.", price: "250", isFeatured: false },
    { name: "Onam Pookalam Flowers Pack", slug: "onam-pookalam-flowers-pack", shortDescription: "Artificial flowers for Onam pookalam", description: "Special pack of 200 assorted artificial flower petals in 8 colors for creating Onam pookalam designs. Includes yellow, orange, red, white, purple, and green petals. Reusable year after year.", price: "300", isFeatured: false },
    { name: "Christmas Wreath - Traditional", slug: "christmas-wreath-traditional", shortDescription: "Traditional green Christmas wreath", description: "Classic 18-inch artificial Christmas wreath with pine branches, red berries, pine cones, and a velvet bow. Pre-decorated and ready to hang. Suitable for doors, walls, or windows. Festive and evergreen.", price: "500", isFeatured: false },
    { name: "Holi Color Flower Garland Set", slug: "holi-color-flower-garland-set", shortDescription: "Multicolor garlands for Holi decoration", description: "Set of 6 vibrant multicolor artificial flower garlands (3ft each) in Holi-inspired rainbow colors. Perfect for party decoration, photo backdrop, or festive ambiance. Includes red, yellow, blue, green, orange, and pink.", price: "350", isFeatured: false },
    { name: "Ugadi Mango Leaf Toran", slug: "ugadi-mango-leaf-toran", shortDescription: "Traditional mango leaf door decoration", description: "Traditional 4-foot artificial mango leaf toran with marigold flowers and decorative beads. Perfect for Ugadi, Gudi Padwa, and other new year celebrations. Realistic green leaves with golden accents.", price: "280", isFeatured: false },
    { name: "Eid Crescent Moon Decoration", slug: "eid-crescent-moon-decoration", shortDescription: "Decorative crescent moon with flowers", description: "Beautiful decorative crescent moon and star piece adorned with artificial flowers and LED lights (battery operated). Perfect for Eid decoration, table centerpiece, or wall mounting. Gold-finished metal frame.", price: "650", isFeatured: false },
    { name: "Pongal Sugarcane Decoration Set", slug: "pongal-sugarcane-decoration-set", shortDescription: "Artificial sugarcane decoration for Pongal", description: "Set of 4 artificial sugarcane stalks (4ft each) with green leaves for Pongal decoration. Includes 2 bunches of artificial turmeric and a decorative kolam sticker. Traditional South Indian harvest festival decoration.", price: "400", isFeatured: false },
  ],
  "door-hangings-toran": [
    { name: "Mango Leaf Toran - Classic", slug: "mango-leaf-toran-classic", shortDescription: "Traditional artificial mango leaf toran", description: "Classic 3-foot artificial mango leaf toran with golden bells and decorative beads. Traditional auspicious door hanging for daily use and special occasions. High-quality leaves that look fresh year-round.", price: "200", isFeatured: true },
    { name: "Marigold Toran - Heavy Garland", slug: "marigold-toran-heavy-garland", shortDescription: "Dense marigold door hanging toran", description: "Heavy-density artificial marigold toran with 5 marigold flower drops and golden coconut centerpiece. Traditional design for weddings, festivals, and housewarming celebrations. Approximately 3.5 feet wide.", price: "350", isFeatured: true },
    { name: "Beaded Crystal Toran", slug: "beaded-crystal-toran", shortDescription: "Modern crystal bead door hanging", description: "Elegant modern toran with crystal beads, acrylic pearls, and small artificial flowers. Creates a sophisticated entrance decoration. Approximately 3 feet wide with 5 hanging strands. Perfect for contemporary homes.", price: "400", isFeatured: false },
    { name: "Rajasthani Mirror Work Toran", slug: "rajasthani-mirror-work-toran", shortDescription: "Colorful Rajasthani style toran", description: "Vibrant Rajasthani-style toran with mirror work, fabric patchwork, and decorative tassels. Handcrafted design with rich colors of red, green, and gold. Approximately 3 feet wide. Traditional Indian craftsmanship.", price: "450", isFeatured: false },
    { name: "Tulsi Mala Door Hanging", slug: "tulsi-mala-door-hanging", shortDescription: "Artificial tulsi bead door decoration", description: "Sacred artificial tulsi (holy basil) bead toran with golden Om pendants. Auspicious door decoration for Hindu households. Traditional green beads with golden chain link design. Approximately 2.5 feet wide.", price: "250", isFeatured: false },
    { name: "Peacock Feather Toran", slug: "peacock-feather-toran", shortDescription: "Decorative peacock feather door hanging", description: "Beautiful toran featuring artificial peacock feathers with golden accents and small bells. Unique and eye-catching door decoration. Approximately 3 feet wide. Adds an elegant natural touch to your entrance.", price: "380", isFeatured: false },
    { name: "Fabric Bandarwal Toran - Gold", slug: "fabric-bandarwal-toran-gold", shortDescription: "Gold fabric bandarwal style toran", description: "Premium gold fabric bandarwal-style toran with embroidered motifs, sequin work, and tassel drops. Luxurious door decoration for weddings and festive occasions. Approximately 4 feet wide. Easy hanging with included hooks.", price: "500", isFeatured: false },
    { name: "Rose Flower Toran - Pink", slug: "rose-flower-toran-pink", shortDescription: "Pink rose flower door hanging", description: "Romantic pink rose toran with 7 rose drops and green leaf garland base. Perfect for engagement ceremonies, Valentine decoration, or feminine home decor. Approximately 3 feet wide. Soft pastel pink color.", price: "300", isFeatured: false },
    { name: "Coconut Shell Toran", slug: "coconut-shell-toran", shortDescription: "Natural coconut shell door decoration", description: "Eco-inspired toran made with decorative coconut shell pieces, wooden beads, and artificial green leaves. Rustic and natural design for earth-toned home decor. Approximately 3 feet wide. Lightweight and easy to hang.", price: "280", isFeatured: false },
    { name: "LED Light Toran - Diwali Special", slug: "led-light-toran-diwali-special", shortDescription: "Illuminated LED toran for festivals", description: "Festive toran with artificial marigold flowers and integrated warm-white LED lights (battery operated). Creates a beautiful illuminated entrance for Diwali and other festivals. Approximately 3.5 feet wide. Timer function for automatic on/off.", price: "550", isFeatured: false },
  ],
  "decoration-cloth": [
    { name: "Red Velvet Drape - 5 Yards", slug: "red-velvet-drape-5-yards", shortDescription: "Premium red velvet decoration fabric", description: "5 yards of premium quality red velvet decoration fabric. Rich, deep red color with soft texture. Perfect for stage draping, mandap decoration, and backdrop creation. Width: 44 inches. Machine washable.", price: "600", isFeatured: true },
    { name: "Gold Organza Fabric - 10 Yards", slug: "gold-organza-fabric-10-yards", shortDescription: "Sheer gold organza for decoration", description: "10 yards of beautiful gold organza fabric with subtle shimmer. Ideal for ceiling draping, table swags, chair decoration, and creating romantic ambiance. Width: 58 inches. Lightweight and easy to drape.", price: "500", isFeatured: false },
    { name: "Satin Ribbon Roll Set - 6 Colors", slug: "satin-ribbon-roll-set-6-colors", shortDescription: "Set of 6 wide satin decoration ribbons", description: "Set of 6 satin ribbon rolls in popular decoration colors: red, gold, white, silver, pink, and purple. Each roll is 2 inches wide and 25 yards long. Perfect for gift wrapping, chair ties, and venue decoration.", price: "350", isFeatured: false },
    { name: "Sequin Backdrop Curtain - Gold", slug: "sequin-backdrop-curtain-gold", shortDescription: "Gold sequin photo backdrop curtain", description: "Stunning 6x8 feet gold sequin curtain backdrop. Creates a glamorous photo booth or stage backdrop with sparkling effect. Easy rod-pocket hanging. Perfect for weddings, birthdays, and celebrations.", price: "1200", isFeatured: true },
    { name: "Tulle Roll - White 100 Yards", slug: "tulle-roll-white-100-yards", shortDescription: "Large white tulle roll for decoration", description: "100-yard roll of soft white tulle fabric, 6 inches wide. Essential decoration material for wedding pew bows, favor wrapping, centerpiece accents, and ceiling decoration. High-quality non-fraying edges.", price: "300", isFeatured: false },
    { name: "Bandhani Print Fabric - 5 Yards", slug: "bandhani-print-fabric-5-yards", shortDescription: "Traditional bandhani tie-dye fabric", description: "5 yards of authentic-look bandhani (tie-dye) printed fabric in traditional red and yellow pattern. Perfect for Rajasthani theme decoration, traditional backdrops, and cultural events. Width: 44 inches. Poly-cotton blend.", price: "400", isFeatured: false },
    { name: "Mirror Work Lace Border - 10m", slug: "mirror-work-lace-border-10m", shortDescription: "Decorative mirror work trim border", description: "10 meters of decorative mirror work lace border in gold with small round mirrors. Width: 2 inches. Perfect for embellishing decoration cloth, creating traditional backdrops, and adding sparkle to fabric drapes.", price: "280", isFeatured: false },
    { name: "Net Fabric - Multicolor Pack", slug: "net-fabric-multicolor-pack", shortDescription: "Assorted color net fabric pack", description: "Pack of 5 net fabric pieces (2 yards each) in red, blue, green, yellow, and pink. Ideal for stage decoration, ceiling canopy, and venue styling. Width: 44 inches each. Versatile and easy to work with.", price: "450", isFeatured: false },
    { name: "Brocade Fabric - Royal Blue 3Y", slug: "brocade-fabric-royal-blue-3y", shortDescription: "Royal blue brocade decoration fabric", description: "3 yards of luxurious royal blue brocade fabric with golden floral pattern. Rich and opulent material for premium stage decoration, mandap draping, and VIP lounge styling. Width: 44 inches.", price: "550", isFeatured: false },
    { name: "Chiffon Decoration Swag - Ivory", slug: "chiffon-decoration-swag-ivory", shortDescription: "Pre-made ivory chiffon decoration swag", description: "Pre-made ivory chiffon decoration swag (18 feet length). Ready to hang for ceiling decoration, table head backdrop, or ceremony arch draping. Lightweight, flowing fabric with elegant gathered ends.", price: "400", isFeatured: false },
  ],
  "pooja-items": [
    { name: "Complete Pooja Decoration Set", slug: "complete-pooja-decoration-set", shortDescription: "Full pooja room decoration kit", description: "Complete pooja room decoration set including: artificial flower garlands (4), door toran, small flower arrangements (2), LED diya (2), and decorative backdrop cloth. Traditional yellow and red color theme. Everything needed for a beautiful pooja setup.", price: "800", isFeatured: true },
    { name: "Artificial Flower Haar Set", slug: "artificial-flower-haar-set", shortDescription: "Set of deity garlands for pooja", description: "Set of 4 small artificial flower deity garlands (haar) in different colors: yellow marigold, white jasmine, red rose, and orange chrysanthemum. Each garland is 8 inches long. Perfect for daily deity worship and special occasions.", price: "200", isFeatured: true },
    { name: "Temple Decoration Hanging Set", slug: "temple-decoration-hanging-set", shortDescription: "Decorative hangings for home temple", description: "Set of 6 small decorative hangings for home temple or pooja room. Includes bell chains (2), flower strings (2), and pearl bead strings (2). Each hanging is approximately 12 inches long. Creates a divine ambiance.", price: "350", isFeatured: false },
    { name: "Artificial Tulsi Plant", slug: "artificial-tulsi-plant", shortDescription: "Realistic artificial tulsi (holy basil) plant", description: "Realistic artificial tulsi (holy basil) plant in a decorative pot. Height: 12 inches. Sacred plant for Hindu households that requires no maintenance. Features realistic leaves and stems with a traditional clay-style pot.", price: "300", isFeatured: false },
    { name: "Decorative Diya Set - LED", slug: "decorative-diya-set-led", shortDescription: "Set of 6 LED decorative diyas", description: "Set of 6 decorative LED diyas with flower designs. Battery operated with flickering flame effect. Safe alternative to traditional diyas for daily pooja and festival decoration. Assorted colors with golden accents.", price: "250", isFeatured: false },
    { name: "Pooja Thali Decoration Kit", slug: "pooja-thali-decoration-kit", shortDescription: "Decorative elements for pooja thali", description: "Complete pooja thali decoration kit with small artificial flowers, decorative pearls, mirror chips, and golden border tape. Transform a plain thali into a beautiful pooja platter. Includes step-by-step instruction card.", price: "180", isFeatured: false },
    { name: "Rangoli Flower Decoration Set", slug: "rangoli-flower-decoration-set", shortDescription: "Artificial flowers for rangoli designs", description: "Set of 100 small artificial flowers in 5 colors for creating rangoli patterns. Includes petals, small marigold buds, and filler flowers. Creates beautiful floor decorations for pooja room entrance and festivals.", price: "200", isFeatured: false },
    { name: "Ganesh Idol Decoration Set", slug: "ganesh-idol-decoration-set", shortDescription: "Decoration kit for Ganesh idol", description: "Specially designed decoration kit for Ganesh idol singhasan. Includes mini flower garlands, backdrop cloth (2x2 ft), decorative umbrella, and artificial flower shower. Creates a divine setting for Ganpati Bappa.", price: "450", isFeatured: false },
    { name: "Mandir Backdrop Cloth", slug: "mandir-backdrop-cloth", shortDescription: "Decorative cloth for home mandir", description: "Embroidered decorative backdrop cloth (2x3 feet) for home mandir/temple. Features traditional motifs in gold thread on red velvet base. Fits standard home temple dimensions. Adds a rich, divine touch to your worship space.", price: "350", isFeatured: false },
    { name: "Pooja Room Door Curtain", slug: "pooja-room-door-curtain", shortDescription: "Decorative beaded curtain for pooja room", description: "Beautiful decorative beaded curtain for pooja room entrance. Features wooden beads, acrylic pearls, and small golden bells. Creates a traditional partition while allowing easy passage. Height: 7 feet, Width: 3 feet.", price: "500", isFeatured: false },
  ],
  "seasonal-decorations": [
    { name: "Diwali Complete Decoration Kit", slug: "diwali-complete-decoration-kit", shortDescription: "All-in-one Diwali decoration package", description: "Complete Diwali decoration package including: marigold garlands (4), door toran, LED string lights (2), rangoli stickers (3), hanging lanterns (2), and table decoration items. Everything you need for a festive Diwali celebration.", price: "1500", isFeatured: true },
    { name: "Spring Garden Flower Set", slug: "spring-garden-flower-set", shortDescription: "Colorful spring-themed flower decoration", description: "Vibrant spring-themed artificial flower set with mixed blooms in fresh pastels. Includes tulips, daffodils, and cherry blossoms arranged in a decorative pot. Perfect for refreshing your home decor for the spring season.", price: "500", isFeatured: true },
    { name: "Monsoon Green Leaf Garlands", slug: "monsoon-green-leaf-garlands", shortDescription: "Fresh green leaf garland set for monsoon", description: "Set of 4 lush green artificial leaf garlands (5ft each) featuring tropical monstera, fern, and ivy leaves. Perfect for creating a fresh monsoon-inspired green decoration. Ideal for home, office, or event venue.", price: "400", isFeatured: false },
    { name: "Harvest Festival Decoration Set", slug: "harvest-festival-decoration-set", shortDescription: "Autumn harvest theme decoration", description: "Harvest festival decoration set featuring artificial autumn leaves garland, wheat stalks bundle, small pumpkin decorations (3), and golden fabric runner. Perfect for Makar Sankranti, Pongal, or Baisakhi celebrations.", price: "600", isFeatured: false },
    { name: "Summer Tropical Party Set", slug: "summer-tropical-party-set", shortDescription: "Tropical themed party decoration", description: "Tropical party decoration set including artificial palm leaves (10), hibiscus flowers (6), pineapple centerpiece, and flamingo table decorations (2). Vibrant colors perfect for pool parties, birthday celebrations, and summer events.", price: "550", isFeatured: false },
    { name: "Rakhi Decoration Hanging Set", slug: "rakhi-decoration-hanging-set", shortDescription: "Raksha Bandhan themed decoration", description: "Raksha Bandhan themed decoration set with colorful hanging torans, small decorative rakhis for decoration, and thali embellishments. Festive pink, red, and gold color scheme. Creates a warm celebration atmosphere.", price: "300", isFeatured: false },
    { name: "New Year Party Decoration Kit", slug: "new-year-party-decoration-kit", shortDescription: "Complete New Year celebration decor", description: "Complete New Year party decoration kit with gold and silver star garlands, metallic balloon garland (DIY kit), sequin curtain backdrop, and table confetti. Glamorous and easy to set up for a memorable celebration.", price: "700", isFeatured: false },
    { name: "Valentine Rose Decoration Set", slug: "valentine-rose-decoration-set", shortDescription: "Romantic Valentine themed decoration", description: "Romantic Valentine's Day decoration set with artificial red rose petals (200 pieces), heart-shaped garland, rose bouquet arrangement, and love banner. Creates a beautiful romantic ambiance for the special day.", price: "450", isFeatured: false },
    { name: "Independence Day Tricolor Set", slug: "independence-day-tricolor-set", shortDescription: "Tricolor themed decoration set", description: "Indian tricolor themed decoration set with saffron-white-green garlands (3), tricolor flower bouquet, flag bunting, and decorative badges. Perfect for Independence Day and Republic Day celebrations at home, school, or office.", price: "350", isFeatured: false },
    { name: "Winter Wonderland Decoration Kit", slug: "winter-wonderland-decoration-kit", shortDescription: "White and silver winter themed decor", description: "Winter wonderland decoration kit featuring white artificial snowflakes (20), silver glitter branches (6), white berry garland, and frosted pine cone set. Creates a magical winter atmosphere for events and seasonal home decoration.", price: "600", isFeatured: false },
  ],
};

async function seed() {
  console.log("🌱 Starting seed...\n");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(productImages);
  await db.delete(products);
  await db.delete(categories);
  await db.delete(settings);

  // Insert settings
  console.log("Creating settings...");
  await db.insert(settings).values({
    shopName: "Vinod Season Shop",
    tagline: "Make Every Occasion Special",
    phone: "9427573299",
    whatsapp: "9427240241",
    instagram: "https://www.instagram.com/vinod_season_shop12/",
    address: "Gujarat, India",
    about: "Vinod Season Shop specializes in artificial flowers, wedding decorations, pooja items, seasonal decorations, decorative fabrics, garlands, torans, and festival decoration products. With years of experience and a passion for celebrations, we bring you the finest quality products to make every occasion memorable.",
    businessHours: "Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM",
  });

  // Insert categories
  console.log("Creating categories...");
  const insertedCategories = await db
    .insert(categories)
    .values(CATEGORIES_DATA)
    .returning();

  console.log(`  ✓ Created ${insertedCategories.length} categories`);

  // Curated Unsplash images for products by category
  const UNSPLASH_PRODUCT_IMAGES: Record<string, string[]> = {
    "artificial-flowers": [
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490750967868-882361d1b86c?w=600&auto=format&fit=crop"
    ],
    "garlands": [
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop"
    ],
    "wedding-decorations": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225495810-7512c696505a?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505232458729-26417ff63c00?w=600&auto=format&fit=crop"
    ],
    "festival-decorations": [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&auto=format&fit=crop"
    ],
    "door-hangings-toran": [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop"
    ],
    "decoration-cloth": [
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop"
    ],
    "pooja-items": [
      "https://images.unsplash.com/photo-1609137144814-6d9b4b0e8c75?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608976478546-d24930d4a9bf?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&auto=format&fit=crop"
    ],
    "seasonal-decorations": [
      "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop"
    ]
  };

  // Insert products
  let totalProducts = 0;
  let totalImages = 0;
  for (const category of insertedCategories) {
    const categoryProducts = PRODUCTS_BY_CATEGORY[category.slug];
    if (!categoryProducts) continue;

    console.log(`\nCreating products for "${category.name}"...`);

    const unsplashList = UNSPLASH_PRODUCT_IMAGES[category.slug] || UNSPLASH_PRODUCT_IMAGES["artificial-flowers"];

    for (let i = 0; i < categoryProducts.length; i++) {
      const productData = categoryProducts[i];

      // Create random date within the last 6 months
      const daysAgo = Math.floor(Math.random() * 180);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);

      const [newProd] = await db.insert(products).values({
        name: productData.name,
        slug: productData.slug,
        shortDescription: productData.shortDescription,
        description: productData.description,
        categoryId: category.id,
        price: productData.price,
        isFeatured: productData.isFeatured,
        isPublished: true,
        displayOrder: i,
        createdAt,
        updatedAt: createdAt,
      }).returning();

      // Insert multiple images for this product (2 images each)
      const imagesToInsert = [
        `/images/products/${productData.slug}-1.jpg`,
        `/images/products/${productData.slug}-2.jpg`
      ];

      for (let j = 0; j < imagesToInsert.length; j++) {
        await db.insert(productImages).values({
          productId: newProd.id,
          cloudinaryPublicId: `local_${productData.slug}_${j}`,
          url: imagesToInsert[j],
          altText: `${productData.name} - View ${j + 1}`,
          displayOrder: j,
        });
        totalImages++;
      }

      totalProducts++;
    }

    console.log(`  ✓ Created ${categoryProducts.length} products`);
  }

  console.log(`\n✅ Seed complete!`);
  console.log(`   Categories: ${insertedCategories.length}`);
  console.log(`   Products: ${totalProducts}`);
  console.log(`   Product Images: ${totalImages}`);
  console.log(`   Settings: 1`);
  console.log(`\n💡 Note: Seed completed successfully with realistic sample data and placeholder images.\n`);

  await pool.end();
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
