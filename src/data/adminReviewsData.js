// Dummy customer reviews across every vendor's products, for admin moderation.
// Shaped like the future `reviews` table in database/schema.sql. Extends the
// existing single-vendor vendorReviewsData.js with a vendorId on each row plus
// reviews for the other demo vendors' products (adminProductsData.js).
import vendorReviewsData from './vendorReviewsData';

const VENDOR_ID = 'u-vendor-1';

const ownVendorReviews = vendorReviewsData.map((review) => ({ ...review, vendorId: VENDOR_ID }));

const otherVendorReviews = [
    { productId: 'ap-1', productTitle: 'Portable Bluetooth Speaker', vendorId: 'v-2', reviewerName: 'James Novak', rating: 4, comment: 'Great sound for the size, battery lasts as advertised.' },
    { productId: 'ap-2', productTitle: '65W USB-C Fast Charger', vendorId: 'v-2', reviewerName: 'Mason Dubois', rating: 5, comment: 'Charges my laptop and phone from the same brick, love it.' },
    { productId: 'ap-3', productTitle: 'Wireless Gaming Mouse', vendorId: 'v-2', reviewerName: 'Olivia Kim', rating: 3, comment: 'Good for the price but the scroll wheel feels a bit loose.' },
    { productId: 'ap-4', productTitle: 'Aloe Vera Gel', vendorId: 'v-3', reviewerName: 'Isabella Silva', rating: 5, comment: 'Very soothing, my go-to after a day in the sun.' },
    { productId: 'ap-5', productTitle: 'Charcoal Face Cleanser', vendorId: 'v-3', reviewerName: 'Sophia Rossi', rating: 4, comment: 'Cleared up my breakouts within a couple of weeks.' },
    { productId: 'ap-7', productTitle: "Women's Floral Summer Dress", vendorId: 'v-4', reviewerName: 'Ava Thompson', rating: 5, comment: 'Fits true to size and the fabric breathes really well.' },
    { productId: 'ap-8', productTitle: "Men's Slim Fit Chinos", vendorId: 'v-4', reviewerName: 'Liam Chen', rating: 4, comment: 'Comfortable and holds its shape after washing.' },
    { productId: 'ap-9', productTitle: 'Unisex Canvas Sneakers', vendorId: 'v-4', reviewerName: 'Noah Patel', rating: 2, comment: 'Sole started peeling after a month of light use.' },
    { productId: 'ap-10', productTitle: 'Adjustable Dumbbell Set', vendorId: 'v-5', reviewerName: 'Ethan Müller', rating: 5, comment: 'Saves so much space compared to a full rack.' },
    { productId: 'ap-12', productTitle: 'Resistance Bands Set', vendorId: 'v-5', reviewerName: 'Emma Rodriguez', rating: 4, comment: 'Good tension range, the door anchor is a nice touch.' },
    { productId: 'ap-13', productTitle: 'Non-Stick Frying Pan', vendorId: 'v-6', reviewerName: 'Sophia Rossi', rating: 5, comment: 'Nothing sticks even on medium-high heat, very happy with it.' },
    { productId: 'ap-14', productTitle: 'Bamboo Cutting Board Set', vendorId: 'v-6', reviewerName: 'James Novak', rating: 5, comment: 'Sturdy boards, look great on the counter too.' },
];

const adminReviewsData = [...ownVendorReviews, ...otherVendorReviews].map((review, index) => ({
    id: `rev-${index + 1}`,
    ...review,
}));

export default adminReviewsData;
