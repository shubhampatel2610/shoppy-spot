// Shared between VendorProductListPage and the vendorProductStore's filter field.
export const PRODUCT_STATUS_FILTER_OPTIONS = [
    { label: 'All statuses', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Draft', value: 'draft' },
    { label: 'Archived', value: 'archived' },
];

export const PRODUCT_STATUS_BADGE_CLASS = {
    active: 'bg-green-50 text-green-700',
    draft: 'bg-gray-100 text-gray-600',
    archived: 'bg-amber-50 text-amber-700',
};
