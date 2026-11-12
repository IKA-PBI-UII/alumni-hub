export const STORE_CATEGORIES = ["Hats", "Tees", "Outerwear", "Accessories"] as const;
export type StoreCategory = (typeof STORE_CATEGORIES)[number];

export const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export type Product = {
  slug: string;
  name: string;
  category: StoreCategory;
  price: number; // IDR
  image: string;
  imageAlt: string;
  /** Neutral backdrop behind the product image (fixed, so products read the same in dark mode). */
  backdrop: string;
  colors: { name: string; hex: string }[];
  sizes?: readonly string[];
  tag?: "New" | "Best seller" | "Pre-order" | "Limited";
  blurb: string;
  details: string[];
};

/**
 * Sample merchandise. Images are illustrations in /public/images/store;
 * replace them with product photos later (same file names).
 */
export const products: Product[] = [
  {
    slug: "classic-cap",
    name: "Classic Dad Cap",
    category: "Hats",
    price: 95000,
    image: "/images/store/cap.svg",
    imageAlt: "Ink dad cap with an embroidered IKA PBI UII speech-bubble logo",
    backdrop: "#E7E1D4",
    colors: [
      { name: "Ink", hex: "#16231F" },
      { name: "Oat", hex: "#D9CFBC" },
    ],
    tag: "Best seller",
    blurb: "Soft, unstructured cotton twill with an embroidered logo. One size, adjustable strap.",
    details: ["100% cotton twill", "Embroidered front logo", "Adjustable brass buckle", "One size fits most"],
  },
  {
    slug: "bucket-hat",
    name: "Bucket Hat",
    category: "Hats",
    price: 110000,
    image: "/images/store/bucket-hat.svg",
    imageAlt: "Oat bucket hat with an ink band and small logo",
    backdrop: "#E4E6E0",
    colors: [{ name: "Oat", hex: "#D9CFBC" }],
    tag: "New",
    blurb: "For outdoor reunions and campus walks. Washed canvas with a contrast band.",
    details: ["Washed cotton canvas", "Contrast ink band", "Stitched brim", "Sizes M and L"],
    sizes: ["M", "L"],
  },
  {
    slug: "alumni-tee",
    name: "Alumni Tee",
    category: "Tees",
    price: 135000,
    image: "/images/store/tee-ink.svg",
    imageAlt: "Ink t-shirt printed with IKA PBI UII and a small chest logo",
    backdrop: "#ECE3D6",
    colors: [
      { name: "Ink", hex: "#16231F" },
      { name: "Off-white", hex: "#F4F0E6" },
    ],
    sizes: APPAREL_SIZES,
    tag: "Best seller",
    blurb: "The everyday tee. Heavyweight cotton, relaxed fit, printed in Yogyakarta.",
    details: ["220 gsm combed cotton", "Relaxed fit", "Water-based print", "Printed locally in Yogyakarta"],
  },
  {
    slug: "slogan-tee",
    name: "“Nobody Walks Alone” Tee",
    category: "Tees",
    price: 135000,
    image: "/images/store/tee-slogan.svg",
    imageAlt: "Off-white t-shirt printed with Nobody walks alone after graduation",
    backdrop: "#E4E6E0",
    colors: [{ name: "Off-white", hex: "#F4F0E6" }],
    sizes: APPAREL_SIZES,
    blurb: "Our tagline, front and centre. A good conversation starter at job fairs.",
    details: ["220 gsm combed cotton", "Regular fit", "Front print", "Pre-shrunk"],
  },
  {
    slug: "crewneck",
    name: "PBI UII Crewneck",
    category: "Outerwear",
    price: 245000,
    image: "/images/store/crewneck.svg",
    imageAlt: "Oat crewneck sweatshirt printed with PBI UII",
    backdrop: "#E7E1D4",
    colors: [{ name: "Oat", hex: "#D9CFBC" }],
    sizes: APPAREL_SIZES,
    tag: "New",
    blurb: "Brushed fleece for air-conditioned classrooms and late-night lesson planning.",
    details: ["280 gsm brushed fleece", "Ribbed cuffs and hem", "Puff print", "Unisex fit"],
  },
  {
    slug: "alumni-hoodie",
    name: "Alumni Hoodie",
    category: "Outerwear",
    price: 289000,
    image: "/images/store/hoodie.svg",
    imageAlt: "Ink hoodie with a kangaroo pocket and chest logo",
    backdrop: "#ECE3D6",
    colors: [{ name: "Ink", hex: "#16231F" }],
    sizes: APPAREL_SIZES,
    tag: "Best seller",
    blurb: "Heavy, warm and built to last a decade of reunions.",
    details: ["330 gsm cotton fleece", "Lined hood with drawcords", "Kangaroo pocket", "Embroidered logo"],
  },
  {
    slug: "varsity-jacket",
    name: "Varsity Jacket",
    category: "Outerwear",
    price: 495000,
    image: "/images/store/varsity-jacket.svg",
    imageAlt: "Ink varsity jacket with oat sleeves, snaps and a chenille P",
    backdrop: "#E4E6E0",
    colors: [{ name: "Ink / Oat", hex: "#16231F" }],
    sizes: APPAREL_SIZES,
    tag: "Pre-order",
    blurb: "Limited run for the Reunion Night. Wool-blend body, chenille ‘P’ and striped trims.",
    details: ["Wool-blend body, faux-leather sleeves", "Chenille letter patch", "Snap front", "Ships in 3 weeks"],
  },
  {
    slug: "coach-jacket",
    name: "Coach Jacket",
    category: "Outerwear",
    price: 365000,
    image: "/images/store/coach-jacket.svg",
    imageAlt: "Forest green coach jacket with snap buttons and chest print",
    backdrop: "#ECE3D6",
    colors: [{ name: "Forest", hex: "#2F4A40" }],
    sizes: APPAREL_SIZES,
    tag: "Limited",
    blurb: "Light, water-resistant shell for rainy-season commutes.",
    details: ["Water-resistant nylon", "Mesh lining", "Snap front", "Chest print"],
  },
  {
    slug: "canvas-tote",
    name: "Canvas Tote",
    category: "Accessories",
    price: 85000,
    image: "/images/store/tote.svg",
    imageAlt: "Natural canvas tote bag printed with the logo and Nobody walks alone",
    backdrop: "#E4E6E0",
    colors: [{ name: "Natural", hex: "#EDE3CF" }],
    blurb: "Fits a laptop, lesson plans and a water bottle.",
    details: ["12 oz cotton canvas", "Long handles", "Inner pocket", "38 × 42 cm"],
  },
  {
    slug: "enamel-mug",
    name: "Enamel Mug",
    category: "Accessories",
    price: 75000,
    image: "/images/store/mug.svg",
    imageAlt: "Off-white enamel mug with the logo and Lean · Fast",
    backdrop: "#E7E1D4",
    colors: [{ name: "Off-white", hex: "#F4F0E6" }],
    blurb: "For staffroom coffee. Chip-resistant enamel with an ink rim.",
    details: ["Enamel-coated steel", "350 ml", "Ink rim", "Hand wash"],
  },
  {
    slug: "notebook",
    name: "Lesson Notebook",
    category: "Accessories",
    price: 55000,
    image: "/images/store/notebook.svg",
    imageAlt: "Ink hardcover notebook with a terracotta elastic band",
    backdrop: "#ECE3D6",
    colors: [{ name: "Ink", hex: "#16231F" }],
    blurb: "A5 dotted pages for lesson ideas, mentoring notes and to-do lists.",
    details: ["A5, 160 dotted pages", "Hardcover with elastic band", "Ribbon marker", "Debossed logo"],
  },
  {
    slug: "sticker-sheet",
    name: "Sticker Sheet",
    category: "Accessories",
    price: 25000,
    image: "/images/store/stickers.svg",
    imageAlt: "Sticker sheet with the logo, PBI badge and Lean, Fast, Transparent pills",
    backdrop: "#E4E6E0",
    colors: [{ name: "Mixed", hex: "#B8451A" }],
    tag: "New",
    blurb: "Five vinyl stickers for laptops and water bottles. Our values, in sticker form.",
    details: ["Waterproof vinyl", "5 stickers per sheet", "Matte finish", "A6 sheet"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/** Share of each sale that funds programs (shown on the store and the ledger story). */
export const PROCEEDS_SHARE = 0.3;
