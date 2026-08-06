// Shared between AdminCustomerListPage and the adminCustomerStore's filter field.
export const CUSTOMER_STATUS_FILTER_OPTIONS = [
    { label: 'All statuses', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Suspended', value: 'suspended' },
];

export const CUSTOMER_STATUS_BADGE_CLASS = {
    active: 'bg-green-50 text-green-700',
    suspended: 'bg-red-50 text-red-700',
};

export const customerStatusLabel = (isActive) => (isActive ? 'active' : 'suspended');
