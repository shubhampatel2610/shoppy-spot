# ShoppySpot — Product Listing App

A React-based e-commerce product listing and detail page application.

Live demo link: <a href="https://shoppy-spot.vercel.app/" target="_blank" rel="noopener noreferrer">Click here</a> OR paste this URL in your browser: `https://shoppy-spot.vercel.app/`

---

## Setup Instructions

```bash
# 1. Clone the repo
git clone <github-repo-url>
cd shoppy-spot

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build
```

Requires **Node.js >= 18**.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI — functional components + hooks |
| React Router v6 | Client-side routing (`/`, `/product/:id`) |
| MobX + mobx-react-lite | Global state management |
| PrimeReact | Input components (Checkbox, InputText, Button) |
| Tailwind CSS | Utility-first responsive styling |
| Vite | Build tool |
| DummyJSON API | Product data source |

---

## Architecture Decisions

### Service Layer (`src/services/productService.js`)
- The service layer is intentionally kept very lightweight. Each function is responsible for calling a single API endpoint for particular features and returning the response data without handling UI logic, state management, or side effects. 
- This separation makes the code easier to maintain and test, and it also allows future changes—such as updating the API base URL, adding authentication headers, or mocking API calls during testing—without affecting the rest of the application.

### MobX Store (`src/stores/productStore.js`)
- The MobX store acts as the central place for managing product-related state and business logic. 
- It handles all interactions with the service layer while also storing UI state such as filters, loading states, and selected product data. 
- It contains computed properties like `filteredProducts`, `paginatedProducts`, `totalPages`, and `availableBrands` are derived automatically from the existing state, which keeps the implementation clean and avoids unnecessary `useEffect` hooks or manual recalculations.

### Filtering Strategy
- All product data is fetched once using `/products?limit=0` and stored globally in `allProducts` variable in mobx store. 
- After the initial fetch, all filtering operations—such as category, brand, price range, and search—are handled on the client side through MobX computed values. 
- This approach reduces repeated API calls and provides a much smoother and faster user experience when users interact with filters.
- The product search by query feature is implemented using debounce logic to improve performance by avoiding unnecessary re-computations and prevents excessive reactive updates.

### Filter State Persistence
- The product store is implemented as a singleton at the module level, which means its state remains intact while navigating between pages. 
- Because of this, users can open a product detail page and return to the product listing without losing their previously selected filters or search inputs.

### Global Loading / Error State
- Separate loading states are maintained for the product listing page and the product detail page using `loading` and `detailLoading`. This allows the UI to handle asynchronous operations more accurately and independently. 
- Reusable components such as `<LoadingSpinner />` and `<ErrorMessage />` are displayed at the page level to provide consistent feedback during loading or error scenarios.

### PrimeReact Input Components
- PrimeReact components including `Checkbox`, `InputText`, and `Button` are used within the components to create a more polished and consistent user interface. 
- These components are directly connected to MobX observables, so any user interaction immediately updates the state and triggers reactive UI updates automatically.

---

## Assumptions Made

- The DummyJSON API supports `limit=0`, which returns the complete product dataset.
- Brand filtering is implemented on the client side because the API does not provide a dedicated endpoint for filtering by brand.
- Product reviews are taken directly from the `reviews` field included in the DummyJSON product response.

---

## Improvements Given More Time

- Add product sorting options such as price (low to high / high to low), highest rating, and newest products to improve product discovery and browsing experience.
- Implement cart functionality using a dedicated MobX CartStore to manage cart items, quantities, and pricing in a centralized and scalable way.
- Add a payment section on the cart page with support for coupon codes and promotional offer application to simulate a more complete e-commerce checkout flow.
- Replace the current loading spinner with skeleton loading cards to improve perceived performance and provide a smoother user experience during data fetching.
- Add image zoom and lightbox functionality on the product detail page to allow users to view product images more clearly and interactively.
- Migrate the application to Next.js to take advantage of Server-Side Rendering (SSR), improved performance optimization, faster page loading, and better SEO capabilities for a more scalable and production-ready architecture.