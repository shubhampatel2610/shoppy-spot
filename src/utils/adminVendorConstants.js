// Shared between AdminVendorListPage and the adminVendorStore's filter field.
// Vendors don't have a raw "status" field (just isActive) - these are the display
// strings derived from that boolean, kept in one place so the row/badge/filter
// options never drift from each other.
export const VENDOR_STATUS_FILTER_OPTIONS = [
    { label: 'All statuses', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Suspended', value: 'suspended' },
];

export const VENDOR_STATUS_BADGE_CLASS = {
    active: 'bg-green-50 text-green-700',
    suspended: 'bg-red-50 text-red-700',
};

export const vendorStatusLabel = (isActive) => (isActive ? 'active' : 'suspended');
