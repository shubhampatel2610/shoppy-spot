class AppConstants {
    // Navbar Constants
    static LOGO_TEXT = "ShoppySpot";
    static SEARCH_BAR_PLACEHOLDER = "Search products...";

    // Common Component Constants
    static RETRY_LABEL = "Retry";

    // ProductListing Page Constants
    static ALL_PRODUCTS_HEADER = "All Products";
    static FILTERED_PRODUCTS_HEADER = "Filtered Products";
    static SINGULAR_PRODUCT_LABEL = "product";
    static PLURAL_PRODUCT_LABEL = "products";
    static FOUND_POSTFIX = 'found';
    static FILTERS_LABEL = "Filters";

    // Sort Constants
    static SORT_LABEL = "Sort by";
    static SORT_OPTIONS = [
        { label: "Default", value: "" },
        { label: "Price: Low to High", value: "price_asc" },
        { label: "Price: High to Low", value: "price_desc" },
        { label: "Highest Rated", value: "rating_desc" },
        { label: "Newest First", value: "newest" },
    ];

    // ProductDetail Page Constants
    static BACK_LABEL = "Back";
    static BRAND_HEADER = "Brand";
    static CATEGORY_HEADER = "Category";
    static IN_STOCK_POSTFIX = "in stock";
    static OUT_OF_STOCK_POSTFIX = "Out of stock";
    static DESCRIPTION_HEADER = "Description";
    static REVIEWS_HEADER = "Reviews";
    static ADD_TO_CART_LABEL = "Add to Cart";
    static ADD_TO_WISHLIST_LABEL = "Add to Wishlist";
    static MORE_IMAGES_LABEL = "More Images";
    static ADD_TO_CART_TOAST_SUMMARY = "Added to cart";
    static ADD_TO_CART_TOAST_DETAIL_SUFFIX = "has been added to your cart.";

    // FilterPanel Constants
    static CLEAR_LABEL = "Clear Filters";
    static CATEGORIES_HEADER = "Categories";
    static CATEGORIES_LOADING_TEXT = "Loading categories...";
    static PRICE_RANGE_HEADER = "Price Range";
    static MIN_PLACEHOLDER = "Min";
    static MAX_PLACEHOLDER = "Max";
    static APPLY_BUTTON_LABEL = "Apply";
    static CLEAR_PRICE_LABEL = "Clear Price Filter";
    static BRANDS_HEADER = "Brands";
    static NO_BRANDS_TEXT = "No brands available";

    // Pagination Constants
    static PREVIOUS_LABEL = "Previous";
    static NEXT_LABEL = "Next";

    // Cart Page Constants
    static CART_PAGE_TITLE = "Shopping Cart";
    static CART_EMPTY_TITLE = "Your cart is empty";
    static CART_EMPTY_SUBTEXT = "Looks like you haven't added anything yet.";
    static CONTINUE_SHOPPING_LABEL = "Continue Shopping";
    static REMOVE_LABEL = "Remove";
    static ITEMS_IN_CART_SUFFIX = "item(s) in cart";

    // Order Summary / Coupon Constants
    static ORDER_SUMMARY_HEADER = "Order Summary";
    static SUBTOTAL_LABEL = "Subtotal";
    static DISCOUNT_LABEL = "Discount";
    static TOTAL_LABEL = "Total";
    static COUPON_PLACEHOLDER = "Enter coupon code";
    static APPLY_COUPON_LABEL = "Apply";
    static REMOVE_COUPON_LABEL = "Remove";
    static INVALID_COUPON_MESSAGE = "Invalid or expired coupon code.";
    static COUPON_APPLIED_PREFIX = "Coupon applied:";
    static CHECKOUT_LABEL = "Proceed to Checkout";
    static ORDER_PLACED_MESSAGE = "Your order has been placed successfully!";
    static VIEW_COUPONS_LABEL = "View All Coupons";
    static AVAILABLE_COUPONS_HEADER = "Available Coupons";
    static COUPON_MIN_ORDER_PREFIX = "Add";
    static COUPON_MIN_ORDER_SUFFIX = "more to your cart to use this coupon.";
    static COUPON_AUTO_REMOVED_MESSAGE = "Your coupon was removed because the order no longer qualifies for it.";
    static AVAILABLE_COUPONS = [
        { code: "SAVE10", type: "percent", value: 10, label: "10% off your order" },
        { code: "SAVE20", type: "percent", value: 20, label: "20% off your order" },
        { code: "FLAT50", type: "flat", value: 50, label: "$50 off your order" },
    ];

    // Error Boundary Constants
    static ERROR_BOUNDARY_TITLE = "Something went wrong";
    static ERROR_BOUNDARY_MESSAGE = "An unexpected error occurred while rendering this page. Please reload and try again.";
    static RELOAD_LABEL = "Reload Page";

    // User Profile Field Constants
    static FIRST_NAME_FIELD = { name: "firstName", label: "First Name", placeholder: "Enter first name", type: "text" };
    static MIDDLE_NAME_FIELD = { name: "middleName", label: "Middle Name", placeholder: "Enter middle name", type: "text" };
    static LAST_NAME_FIELD = { name: "lastName", label: "Last Name", placeholder: "Enter last name", type: "text" };
    static EMAIL_FIELD = { name: "email", label: "Email", placeholder: "Enter email address", type: "email" };
    static PHONE_FIELD = { name: "phone", label: "Phone No", placeholder: "Enter phone number", type: "tel" };
    static GENDER_FIELD = { name: "gender", label: "Gender", placeholder: "Select gender", type: "text" };
    static GENDER_OPTIONS = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    // User Address Field Constants
    static BUILDING_NO_FIELD = { name: "buildingNo", label: "Building No", placeholder: "Enter building/flat no", type: "text" };
    static STREET_NAME_FIELD = { name: "streetName", label: "Street Name", placeholder: "Enter street name", type: "text" };
    static LANDMARK_FIELD = { name: "landmark", label: "Landmark", placeholder: "Enter landmark", type: "text" };
    static CITY_FIELD = { name: "city", label: "City", placeholder: "Enter city", type: "text" };
    static PINCODE_FIELD = { name: "pincode", label: "Pincode", placeholder: "Enter pincode", type: "text" };
    static STATE_FIELD = { name: "state", label: "State", placeholder: "Enter state", type: "text" };
    static COUNTRY_FIELD = { name: "country", label: "Country", placeholder: "Enter country", type: "text" };

    // Field Validation Message Constants
    static REQUIRED_POSTFIX = "is required";
    static MINIMUM_PREFIX = "Minimum";
    static MAXIMUM_PREFIX = "Maximum";
    static CHARS_REQUIRED_POSTFIX = "characters required";
    static CHARS_ALLOWED_POSTFIX = "characters allowed";
    static REQUEST_ENTER_PREFIX = "Please enter a";
    static VALID_URL_POSTFIX = "valid URL";
    static VALID_EMAIL_POSTFIX = "valid email address";
    static VALID_PHONE_POSTFIX = "valid 10 digit phone number";

    // User Details Page Constants
    static USER_DETAILS_TITLE = "My Profile";
    static PERSONAL_INFO_HEADER = "Personal Information";
    static ADDRESS_HEADER = "Address";
    static EDIT_PROFILE_TITLE = "Edit Profile";
    static EDIT_ADDRESS_TITLE = "Edit Address";
    static SAVE_LABEL = "Save";
    static CANCEL_LABEL = "Cancel";
    static NOT_PROVIDED_TEXT = "Not provided";
    static NO_ADDRESS_TEXT = "No address added yet";

    // Auth Field Constants
    static NAME_FIELD = { name: "name", label: "Full Name", placeholder: "Enter your full name", type: "text" };
    static AUTH_EMAIL_FIELD = { name: "email", label: "Email", placeholder: "Enter your email address", type: "email" };
    static PASSWORD_FIELD = { name: "password", label: "Password", placeholder: "Enter your password", type: "password" };
    static CONFIRM_PASSWORD_FIELD = { name: "confirmPassword", label: "Confirm Password", placeholder: "Re-enter your password", type: "password" };

    // Login Page Constants
    static LOGIN_TITLE = "Welcome Back";
    static LOGIN_SUBTITLE = "Sign in to continue to your account";
    static SIGN_IN_LABEL = "Sign In";
    static SIGNING_IN_LABEL = "Signing in...";
    static NO_ACCOUNT_TEXT = "Don't have an account?";
    static SIGN_UP_LABEL = "Sign Up";
    static INVALID_CREDENTIALS_MESSAGE = "Invalid email or password. Try one of the demo accounts.";
    static DEMO_CREDENTIALS_TOOLTIP_HEADER = "Demo Login Credentials";
    static DEMO_CREDENTIALS_HINT_TEXT = "Click an account to autofill the form.";
    static DEMO_ACCOUNTS = [
        { role: "Admin", email: "admin@shoppyspot.com", password: "Admin@123" },
        { role: "Vendor", email: "vendor@shoppyspot.com", password: "Vendor@123" },
        { role: "Customer", email: "customer@shoppyspot.com", password: "Customer@123" },
    ];

    // Signup Page Constants
    static SIGNUP_TITLE = "Create Account";
    static SIGNUP_SUBTITLE = "Sign up to start shopping with ShoppySpot";
    static CREATE_ACCOUNT_LABEL = "Create Account";
    static CREATING_ACCOUNT_LABEL = "Creating account...";
    static HAVE_ACCOUNT_TEXT = "Already have an account?";
    static EMAIL_ALREADY_EXISTS_MESSAGE = "An account with this email already exists.";
    static PASSWORD_MISMATCH_MESSAGE = "Passwords do not match.";
    static SIGNUP_SUCCESS_TOAST_SUMMARY = "Account created";
    static SIGNUP_SUCCESS_TOAST_DETAIL = "Welcome to ShoppySpot!";

    // Auth Branding Panel Constants
    static AUTH_BRAND_HEADLINE = "Shop smarter, faster, better.";
    static AUTH_BRAND_SUBTEXT = "Join thousands of shoppers discovering great products every day.";

    // Navbar Auth Constants
    static LOGOUT_LABEL = "Logout";
    static MY_PROFILE_LABEL = "My Profile";
    static LOGGED_OUT_TOAST_SUMMARY = "Logged out";
    static LOGGED_OUT_TOAST_DETAIL = "You have been signed out successfully.";

    // API / HTTP Error Constants
    static NETWORK_ERROR_MESSAGE = "Unable to connect to the server. Please check your internet connection.";
    static TIMEOUT_ERROR_MESSAGE = "Request timed out. Please try again.";
    static CANCELLED_ERROR_MESSAGE = "Request was cancelled.";
    static BAD_REQUEST_MESSAGE = "Invalid request. Please check your input.";
    static UNAUTHORIZED_MESSAGE = "You are not authorized. Please log in again.";
    static FORBIDDEN_MESSAGE = "You do not have permission to perform this action.";
    static NOT_FOUND_MESSAGE = "The requested resource was not found.";
    static CONFLICT_MESSAGE = "This action conflicts with existing data.";
    static VALIDATION_ERROR_MESSAGE = "Some fields are invalid. Please review and try again.";
    static TOO_MANY_REQUESTS_MESSAGE = "Too many requests. Please slow down and try again.";
    static SERVER_ERROR_MESSAGE = "Something went wrong on our end. Please try again later.";
    static SERVICE_UNAVAILABLE_MESSAGE = "Server is currently unavailable. Please try again later.";
    static GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";
}

export default AppConstants;
