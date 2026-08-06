// Order-level statuses (order_status / order_payment_status in database/schema.sql) -
// only the admin side surfaces these; the vendor side only ever shows per-item status
// (see ORDER_STATUS_BADGE_CLASS in vendorOrderConstants.js, reused below for the
// admin order detail page's line items).
export { ORDER_STATUS_BADGE_CLASS as ITEM_STATUS_BADGE_CLASS } from './vendorOrderConstants';

export const ORDER_STATUS_FILTER_OPTIONS = [
    { label: 'All statuses', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
];

export const ORDER_STATUS_BADGE_CLASS = {
    pending: 'bg-amber-50 text-amber-700',
    confirmed: 'bg-blue-50 text-blue-700',
    completed: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
};

export const PAYMENT_STATUS_FILTER_OPTIONS = [
    { label: 'All payment statuses', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Paid', value: 'paid' },
    { label: 'Failed', value: 'failed' },
    { label: 'Refunded', value: 'refunded' },
];

export const PAYMENT_STATUS_BADGE_CLASS = {
    pending: 'bg-amber-50 text-amber-700',
    paid: 'bg-green-50 text-green-700',
    failed: 'bg-red-50 text-red-700',
    refunded: 'bg-gray-100 text-gray-600',
};
