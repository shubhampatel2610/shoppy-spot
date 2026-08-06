// Dummy platform-wide coupons, admin-managed. Migrates what used to be the hardcoded
// AppConstants.AVAILABLE_COUPONS list into a proper mock dataset shaped like a future
// `coupons` table would be, so an admin can add/edit/retire codes instead of them
// being fixed in source. CheckoutPage's coupon logic can be pointed at this list
// (via adminCouponStore) as a follow-up wiring step.
const adminCouponsData = [
    { id: 'cp-1', code: 'SAVE10', type: 'percent', value: 10, label: '10% off your order', isActive: true, expiresAt: '2026-12-31T23:59:59.000Z' },
    { id: 'cp-2', code: 'SAVE20', type: 'percent', value: 20, label: '20% off your order', isActive: true, expiresAt: '2026-12-31T23:59:59.000Z' },
    { id: 'cp-3', code: 'FLAT50', type: 'flat', value: 50, label: '$50 off your order', isActive: true, expiresAt: '2026-12-31T23:59:59.000Z' },
    { id: 'cp-4', code: 'WELCOME15', type: 'percent', value: 15, label: '15% off for new customers', isActive: false, expiresAt: '2026-01-31T23:59:59.000Z' },
    { id: 'cp-5', code: 'FESTIVE25', type: 'percent', value: 25, label: '25% off festive season sale', isActive: true, expiresAt: '2026-11-15T23:59:59.000Z' },
];

export default adminCouponsData;
