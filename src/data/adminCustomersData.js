// Dummy customer directory for the admin panel. Shaped like the future `profiles`
// table in database/schema.sql, filtered to role = 'customer'.
//
// The first entry mirrors the single demo customer used elsewhere in the app
// (authData.js id "u-customer-1") so that account is consistent across the app.
// Order counts/spend are derived from adminOrdersData.js at read time (see
// adminCustomerStore.js) rather than duplicated here.
const adminCustomersData = [
    { id: "u-customer-1", name: "Customer User", email: "customer@shoppyspot.com", phone: "9000000001", joinedAt: "2025-08-05T10:00:00.000Z", isActive: true },
    { id: "c-2", name: "Ava Thompson", email: "ava.thompson@example.com", phone: "9000000002", joinedAt: "2025-08-15T10:00:00.000Z", isActive: true },
    { id: "c-3", name: "Liam Chen", email: "liam.chen@example.com", phone: "9000000003", joinedAt: "2025-08-22T10:00:00.000Z", isActive: true },
    { id: "c-4", name: "Noah Patel", email: "noah.patel@example.com", phone: "9000000004", joinedAt: "2025-09-03T10:00:00.000Z", isActive: true },
    { id: "c-5", name: "Emma Rodriguez", email: "emma.rodriguez@example.com", phone: "9000000005", joinedAt: "2025-09-14T10:00:00.000Z", isActive: true },
    { id: "c-6", name: "Olivia Kim", email: "olivia.kim@example.com", phone: "9000000006", joinedAt: "2025-10-01T10:00:00.000Z", isActive: true },
    { id: "c-7", name: "Ethan Müller", email: "ethan.muller@example.com", phone: "9000000007", joinedAt: "2025-10-19T10:00:00.000Z", isActive: false },
    { id: "c-8", name: "Sophia Rossi", email: "sophia.rossi@example.com", phone: "9000000008", joinedAt: "2025-11-02T10:00:00.000Z", isActive: true },
    { id: "c-9", name: "Mason Dubois", email: "mason.dubois@example.com", phone: "9000000009", joinedAt: "2025-11-20T10:00:00.000Z", isActive: true },
    { id: "c-10", name: "Isabella Silva", email: "isabella.silva@example.com", phone: "9000000010", joinedAt: "2025-12-08T10:00:00.000Z", isActive: true },
    { id: "c-11", name: "James Novak", email: "james.novak@example.com", phone: "9000000011", joinedAt: "2025-12-22T10:00:00.000Z", isActive: true },
];

export default adminCustomersData;
