// Dummy orders containing the demo vendor's products, generated once at module load
// so dashboard charts (week/month/year filters) have realistic data spread across the
// past year. Shaped like a join of the future `orders` + `order_items` tables in
// database/schema.sql, scoped down to a single vendor's line items.
import vendorProductsData, { VENDOR_ID } from "./vendorProductsData";

const ORDER_ITEM_STATUSES = ["pending", "packed", "shipped", "delivered", "delivered", "delivered", "cancelled"];
const CUSTOMER_NAMES = [
    "Ava Thompson", "Liam Chen", "Noah Patel", "Emma Rodriguez", "Olivia Kim",
    "Ethan Müller", "Sophia Rossi", "Mason Dubois", "Isabella Silva", "James Novak",
];
const CITIES = [
    { city: "Ahmedabad", state: "Gujarat", country: "India" },
    { city: "Mumbai", state: "Maharashtra", country: "India" },
    { city: "Bengaluru", state: "Karnataka", country: "India" },
    { city: "Pune", state: "Maharashtra", country: "India" },
    { city: "Delhi", state: "Delhi", country: "India" },
];

// Small seeded PRNG (mulberry32) so the generated order history stays stable
// across dev reloads instead of reshuffling every time this module re-evaluates.
const mulberry32 = (seed) => () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const sellableProducts = vendorProductsData.filter((p) => p.status === "active");

const generateOrders = () => {
    const rand = mulberry32(20260804);
    const pick = (arr) => arr[Math.floor(rand() * arr.length)];
    const now = Date.now();
    const orders = [];

    for (let i = 0; i < 90; i++) {
        const daysAgo = Math.floor(rand() * 365);
        const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000).toISOString();
        const itemCount = 1 + Math.floor(rand() * 3);
        // Orders older than a week are past the "pending" stage in real life.
        const itemStatus = daysAgo < 2 ? "pending" : pick(ORDER_ITEM_STATUSES);
        // Keyed by productId so picking the same product twice merges into one
        // line item (with a higher quantity) instead of two duplicate rows.
        const itemsByProduct = new Map();

        for (let j = 0; j < itemCount; j++) {
            const product = pick(sellableProducts);
            const quantity = 1 + Math.floor(rand() * 3);
            const existing = itemsByProduct.get(product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                itemsByProduct.set(product.id, {
                    productId: product.id,
                    productTitle: product.title,
                    quantity,
                    unitPrice: product.price,
                    itemStatus,
                });
            }
        }

        const items = [...itemsByProduct.values()];
        const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

        orders.push({
            id: `vord-${i + 1}`,
            customerName: pick(CUSTOMER_NAMES),
            shippingAddress: pick(CITIES),
            createdAt,
            subtotal: Number(subtotal.toFixed(2)),
            total: Number(subtotal.toFixed(2)),
            items,
        });
    }

    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const vendorOrdersData = generateOrders();

export default vendorOrdersData;
export { VENDOR_ID };
