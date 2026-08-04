// Dummy account directory - stands in for a real auth backend until one exists.
// Each entry's email/password pair matches AppConstants.DEMO_ACCOUNTS shown in the login page's info tooltip.
const authData = [
    {
        id: "u-admin-1",
        name: "Admin User",
        email: "admin@shoppyspot.com",
        password: "Admin@123",
        role: "admin",
    },
    {
        id: "u-vendor-1",
        name: "Vendor User",
        email: "vendor@shoppyspot.com",
        password: "Vendor@123",
        role: "vendor",
    },
    {
        id: "u-customer-1",
        name: "Customer User",
        email: "customer@shoppyspot.com",
        password: "Customer@123",
        role: "customer",
    },
];

export default authData;
