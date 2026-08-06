// Dummy platform-wide orders, generated once at module load so the admin dashboard's
// charts (week/month/year filters) have realistic data spread across the past year.
// Shaped like a join of the future `orders` + `order_items` tables in database/schema.sql -
// unlike vendorOrdersData.js (single vendor's line items), an order here can span
// multiple vendors, and carries the order-level payment_status/order_status fields
// only an admin needs to see (the vendor side only ever surfaces per-item status).
import adminProductsData from './adminProductsData';
import adminVendorsData from './adminVendorsData';
import adminCustomersData from './adminCustomersData';

const ITEM_STATUS_POOL = ['pending', 'packed', 'shipped', 'delivered', 'delivered', 'delivered', 'cancelled'];
const CITIES = [
    { city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
    { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    { city: 'Bengaluru', state: 'Karnataka', country: 'India' },
    { city: 'Pune', state: 'Maharashtra', country: 'India' },
    { city: 'Delhi', state: 'Delhi', country: 'India' },
    { city: 'Kolkata', state: 'West Bengal', country: 'India' },
    { city: 'Noida', state: 'Uttar Pradesh', country: 'India' },
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

const vendorNameById = new Map(adminVendorsData.map((v) => [v.id, v.storeName]));
const sellableProducts = adminProductsData.filter((p) => p.status === 'active');

const generateOrders = () => {
    const rand = mulberry32(20260806);
    const pick = (arr) => arr[Math.floor(rand() * arr.length)];
    const now = Date.now();
    const orders = [];

    for (let i = 0; i < 140; i++) {
        const daysAgo = Math.floor(rand() * 365);
        const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000).toISOString();
        const itemCount = 1 + Math.floor(rand() * 4);
        const isVeryRecent = daysAgo < 2;
        const itemStatus = isVeryRecent ? 'pending' : pick(ITEM_STATUS_POOL);
        const customer = pick(adminCustomersData);

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
                    vendorId: product.vendorId,
                    vendorName: vendorNameById.get(product.vendorId) ?? 'Unknown Vendor',
                    quantity,
                    unitPrice: product.price,
                    itemStatus,
                });
            }
        }

        const items = [...itemsByProduct.values()];
        const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        const allCancelled = items.every((item) => item.itemStatus === 'cancelled');
        const someCancelled = !allCancelled && items.some((item) => item.itemStatus === 'cancelled');

        let orderStatus;
        let paymentStatus;
        if (isVeryRecent) {
            orderStatus = 'pending';
            paymentStatus = 'pending';
        } else if (allCancelled) {
            orderStatus = 'cancelled';
            paymentStatus = pick(['refunded', 'refunded', 'failed']);
        } else if (someCancelled) {
            orderStatus = 'confirmed';
            paymentStatus = 'paid';
        } else {
            orderStatus = 'completed';
            paymentStatus = 'paid';
        }

        orders.push({
            id: `aord-${i + 1}`,
            customerId: customer.id,
            customerName: customer.name,
            shippingAddress: pick(CITIES),
            createdAt,
            paymentStatus,
            orderStatus,
            subtotal: Number(subtotal.toFixed(2)),
            total: Number(subtotal.toFixed(2)),
            items,
        });
    }

    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const adminOrdersData = generateOrders();

export default adminOrdersData;
