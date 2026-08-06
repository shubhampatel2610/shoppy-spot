// Seed category list - base option set for the vendor product form's category picker.
// Vendors can add new categories from the form itself (see CategoryComboField).
const categoriesData = [
    { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    { id: "cat-home-kitchen", name: "Home & Kitchen", slug: "home-kitchen" },
    { id: "cat-fashion", name: "Fashion", slug: "fashion" },
    { id: "cat-beauty", name: "Beauty", slug: "beauty" },
    { id: "cat-sports-outdoors", name: "Sports & Outdoors", slug: "sports-outdoors" },
    // No product references this one - every other category is in use, so this is
    // the only one AdminCategoriesPage can actually delete (its delete button is
    // otherwise disabled). Kept around to exercise that flow.
    { id: "cat-toys-games", name: "Toys & Games", slug: "toys-games" },
];

export default categoriesData;
