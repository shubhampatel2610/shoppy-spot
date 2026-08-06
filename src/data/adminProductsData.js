// Cross-vendor product catalog for the admin panel. Shaped like the future `products`
// table in database/schema.sql, scoped to every vendor instead of just one.
//
// Reuses the existing vendor-side catalog (vendorProductsData.js) for "u-vendor-1" so
// that data stays a single source of truth, then adds a handful of products for each
// of the other demo vendors in adminVendorsData.js.
import vendorProductsData from './vendorProductsData';

const PLACEHOLDER = (label) => `https://placehold.co/400x400/1e3a5f/white?text=${encodeURIComponent(label)}`;

const otherVendorProducts = [
    // TechNest Electronics (v-2)
    {
        id: "ap-1", vendorId: "v-2", title: "Portable Bluetooth Speaker",
        description: "Compact speaker with 12-hour battery life and deep bass.",
        category: "electronics", brand: "TechNest", sku: "TN-ELE-001",
        price: 39.99, discountPercentage: 5, stock: 80,
        images: [PLACEHOLDER("Speaker")], status: "active", rating: 4.3, createdAt: "2025-09-10T10:00:00.000Z",
    },
    {
        id: "ap-2", vendorId: "v-2", title: "65W USB-C Fast Charger",
        description: "Compact GaN charger, fast-charges laptops and phones alike.",
        category: "electronics", brand: "TechNest", sku: "TN-ELE-002",
        price: 22.5, discountPercentage: 0, stock: 150,
        images: [PLACEHOLDER("Charger")], status: "active", rating: 4.6, createdAt: "2025-09-18T10:00:00.000Z",
    },
    {
        id: "ap-3", vendorId: "v-2", title: "Wireless Gaming Mouse",
        description: "Low-latency wireless mouse with adjustable DPI.",
        category: "electronics", brand: "TechNest", sku: "TN-ELE-003",
        price: 29.99, discountPercentage: 10, stock: 4,
        images: [PLACEHOLDER("Mouse")], status: "active", rating: 4.1, createdAt: "2025-10-02T10:00:00.000Z",
    },

    // GreenLeaf Organics (v-3)
    {
        id: "ap-4", vendorId: "v-3", title: "Aloe Vera Gel",
        description: "100% pure soothing aloe vera gel for skin and hair.",
        category: "beauty", brand: "GreenLeaf", sku: "GL-BEA-001",
        price: 12.99, discountPercentage: 0, stock: 100,
        images: [PLACEHOLDER("Aloe+Gel")], status: "active", rating: 4.5, createdAt: "2025-09-25T10:00:00.000Z",
    },
    {
        id: "ap-5", vendorId: "v-3", title: "Charcoal Face Cleanser",
        description: "Deep-cleansing charcoal face wash for oily skin.",
        category: "beauty", brand: "GreenLeaf", sku: "GL-BEA-002",
        price: 15.5, discountPercentage: 8, stock: 60,
        images: [PLACEHOLDER("Cleanser")], status: "active", rating: 4.2, createdAt: "2025-10-12T10:00:00.000Z",
    },
    {
        id: "ap-6", vendorId: "v-3", title: "Herbal Hair Oil",
        description: "Ayurvedic hair oil blend for stronger, shinier hair.",
        category: "beauty", brand: "GreenLeaf", sku: "GL-BEA-003",
        price: 18.0, discountPercentage: 0, stock: 2,
        images: [PLACEHOLDER("Hair+Oil")], status: "active", rating: 4.4, createdAt: "2025-11-01T10:00:00.000Z",
    },

    // Urban Threads Apparel (v-4)
    {
        id: "ap-7", vendorId: "v-4", title: "Women's Floral Summer Dress",
        description: "Lightweight floral dress, perfect for warm weather.",
        category: "fashion", brand: "UrbanThreads", sku: "UT-FAS-001",
        price: 45.0, discountPercentage: 12, stock: 25,
        images: [PLACEHOLDER("Dress")], status: "active", rating: 4.3, createdAt: "2025-10-15T10:00:00.000Z",
    },
    {
        id: "ap-8", vendorId: "v-4", title: "Men's Slim Fit Chinos",
        description: "Wrinkle-resistant chinos with a modern slim fit.",
        category: "fashion", brand: "UrbanThreads", sku: "UT-FAS-002",
        price: 38.0, discountPercentage: 0, stock: 40,
        images: [PLACEHOLDER("Chinos")], status: "active", rating: 4.0, createdAt: "2025-11-05T10:00:00.000Z",
    },
    {
        id: "ap-9", vendorId: "v-4", title: "Unisex Canvas Sneakers",
        description: "Everyday canvas sneakers with a cushioned insole.",
        category: "fashion", brand: "UrbanThreads", sku: "UT-FAS-003",
        price: 55.0, discountPercentage: 0, stock: 0,
        images: [PLACEHOLDER("Sneakers")], status: "active", rating: 4.5, createdAt: "2025-12-10T10:00:00.000Z",
    },

    // SportFlex Gear (v-5) - vendor is suspended, so this store's catalog skews draft/thin
    {
        id: "ap-10", vendorId: "v-5", title: "Adjustable Dumbbell Set",
        description: "Space-saving dumbbell set, adjustable from 5-25 lbs.",
        category: "sports-outdoors", brand: "SportFlex", sku: "SF-SPO-001",
        price: 89.99, discountPercentage: 0, stock: 15,
        images: [PLACEHOLDER("Dumbbells")], status: "active", rating: 4.6, createdAt: "2025-11-15T10:00:00.000Z",
    },
    {
        id: "ap-11", vendorId: "v-5", title: "Foldable Camping Chair",
        description: "Lightweight folding chair with a built-in cup holder.",
        category: "sports-outdoors", brand: "SportFlex", sku: "SF-SPO-002",
        price: 27.5, discountPercentage: 0, stock: 30,
        images: [PLACEHOLDER("Chair")], status: "draft", rating: 0, createdAt: "2025-12-01T10:00:00.000Z",
    },
    {
        id: "ap-12", vendorId: "v-5", title: "Resistance Bands Set",
        description: "5-piece resistance band set with varying tension levels.",
        category: "sports-outdoors", brand: "SportFlex", sku: "SF-SPO-003",
        price: 14.99, discountPercentage: 5, stock: 70,
        images: [PLACEHOLDER("Bands")], status: "active", rating: 4.2, createdAt: "2025-12-08T10:00:00.000Z",
    },

    // HomeStyle Living (v-6)
    {
        id: "ap-13", vendorId: "v-6", title: "Non-Stick Frying Pan",
        description: "28cm non-stick frying pan, induction compatible.",
        category: "home-kitchen", brand: "HomeStyle", sku: "HS-HK-001",
        price: 21.99, discountPercentage: 0, stock: 55,
        images: [PLACEHOLDER("Frying+Pan")], status: "active", rating: 4.4, createdAt: "2025-12-05T10:00:00.000Z",
    },
    {
        id: "ap-14", vendorId: "v-6", title: "Bamboo Cutting Board Set",
        description: "Set of 3 eco-friendly bamboo cutting boards.",
        category: "home-kitchen", brand: "HomeStyle", sku: "HS-HK-002",
        price: 17.5, discountPercentage: 10, stock: 45,
        images: [PLACEHOLDER("Cutting+Boards")], status: "active", rating: 4.7, createdAt: "2025-12-12T10:00:00.000Z",
    },
    {
        id: "ap-15", vendorId: "v-6", title: "LED Table Lamp",
        description: "Dimmable LED table lamp with a USB charging port.",
        category: "home-kitchen", brand: "HomeStyle", sku: "HS-HK-003",
        price: 32.0, discountPercentage: 0, stock: 6,
        images: [PLACEHOLDER("Lamp")], status: "active", rating: 4.3, createdAt: "2025-12-20T10:00:00.000Z",
    },
];

const adminProductsData = [...vendorProductsData, ...otherVendorProducts];

export default adminProductsData;
