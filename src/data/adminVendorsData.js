// Dummy vendor directory for the admin panel. Shaped like a join of the future
// `profiles` + `vendor_profiles` tables in database/schema.sql - vendors are
// admin-provisioned there (see schema.sql's note on vendor_profiles.is_active),
// so this is the admin's source of truth for every store on the platform.
//
// The first entry mirrors the single demo vendor used on the vendor side
// (authData.js id "u-vendor-1" / vendorProfileData.js) so that account shows up
// consistently whether you're looking at it from the vendor or the admin side.
const adminVendorsData = [
    {
        id: "u-vendor-1",
        ownerName: "Vendor User",
        email: "vendor@shoppyspot.com",
        storeName: "Shubham's Multi-Store",
        storeDescription: "Quality electronics, home goods, fashion and beauty essentials at honest prices.",
        logoUrl: "",
        businessAddress: "221B Baker Street, Ahmedabad, Gujarat, India - 380001",
        phone: "9876543210",
        isActive: true,
        joinedAt: "2025-08-01T10:00:00.000Z",
    },
    {
        id: "v-2",
        ownerName: "Riya Sharma",
        email: "riya@technest.com",
        storeName: "TechNest Electronics",
        storeDescription: "Latest gadgets and electronic accessories at competitive prices.",
        logoUrl: "",
        businessAddress: "45 MG Road, Bengaluru, Karnataka, India - 560001",
        phone: "9123456780",
        isActive: true,
        joinedAt: "2025-09-01T10:00:00.000Z",
    },
    {
        id: "v-3",
        ownerName: "Kabir Anand",
        email: "kabir@greenleaforganics.com",
        storeName: "GreenLeaf Organics",
        storeDescription: "Organic skincare and eco-friendly home essentials.",
        logoUrl: "",
        businessAddress: "12 Linking Road, Mumbai, Maharashtra, India - 400050",
        phone: "9988776655",
        isActive: true,
        joinedAt: "2025-09-20T10:00:00.000Z",
    },
    {
        id: "v-4",
        ownerName: "Meera Iyer",
        email: "meera@urbanthreads.com",
        storeName: "Urban Threads Apparel",
        storeDescription: "Trendy apparel and footwear for the modern wardrobe.",
        logoUrl: "",
        businessAddress: "78 FC Road, Pune, Maharashtra, India - 411005",
        phone: "9871234560",
        isActive: true,
        joinedAt: "2025-10-05T10:00:00.000Z",
    },
    {
        id: "v-5",
        ownerName: "Arjun Verma",
        email: "arjun@sportflexgear.com",
        storeName: "SportFlex Gear",
        storeDescription: "Performance sportswear and outdoor gear.",
        logoUrl: "",
        businessAddress: "9 Sector 18, Noida, Uttar Pradesh, India - 201301",
        phone: "9765432109",
        // Suspended by admin - keeps at least one non-active vendor in the mock data
        // so the status filter/toggle has something to show.
        isActive: false,
        joinedAt: "2025-11-10T10:00:00.000Z",
    },
    {
        id: "v-6",
        ownerName: "Sneha Kulkarni",
        email: "sneha@homestyleliving.com",
        storeName: "HomeStyle Living",
        storeDescription: "Modern kitchen and home decor essentials.",
        logoUrl: "",
        businessAddress: "23 Camac Street, Kolkata, West Bengal, India - 700016",
        phone: "9654321098",
        isActive: true,
        joinedAt: "2025-12-01T10:00:00.000Z",
    },
];

export default adminVendorsData;
