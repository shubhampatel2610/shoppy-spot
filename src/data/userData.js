// Dummy user data shaped like a future GET /user API response.
// Replace this with a real API call once the backend is ready - the shape stays the same.
const userData = {
    firstName: "Shubham",
    middleName: "",
    lastName: "Patel",
    email: "shubham.patel@example.com",
    phone: "9876543210",
    gender: "male", // "male" | "female" | "other" | "" (no image selected)
    address: {
        buildingNo: "221B",
        streetName: "Baker Street",
        landmark: "Near Central Park",
        city: "Ahmedabad",
        pincode: "380001",
        state: "Gujarat",
        country: "India",
    },
};

export default userData;
