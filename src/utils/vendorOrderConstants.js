// Shared between VendorOrderListPage and VendorOrderDetailPage.
export const ORDER_STATUS_FILTER_OPTIONS = [
    { label: 'All statuses', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Packed', value: 'packed' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
];

export const ORDER_STATUS_BADGE_CLASS = {
    pending: 'bg-amber-50 text-amber-700',
    packed: 'bg-blue-50 text-blue-700',
    shipped: 'bg-violet-50 text-violet-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
};
