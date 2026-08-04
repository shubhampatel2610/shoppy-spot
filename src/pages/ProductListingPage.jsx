import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Dropdown } from 'primereact/dropdown';
import productStore from '../stores/productStore';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import AppConstants from '../utils/AppConstants';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import Pagination from '../components/Pagination/Pagination';

const ProductListingPage = observer(() => {
  useEffect(() => {
    if (productStore.allProducts.length === 0) {
      productStore.loadAllProducts();
    }
    if (productStore.allCategories.length === 0) {
      productStore.loadAllCategories();
    }
  }, []);

  return (
    <main className="max-w-full mx-auto px-4 py-6">
      <div className="flex gap-5">
        {/* Filter Panel */}
        <div className="hidden md:block w-56 shrink-0 sticky top-20 self-start">
          <FilterPanel />
        </div>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {productStore.hasActiveFilters ? AppConstants.FILTERED_PRODUCTS_HEADER : AppConstants.ALL_PRODUCTS_HEADER}
              </h1>
              {!productStore.loading && (
                <p className="text-xs text-gray-400">
                  {`${productStore.filteredProducts.length} ${productStore.filteredProducts.length !== 1 ? AppConstants.PLURAL_PRODUCT_LABEL : AppConstants.SINGULAR_PRODUCT_LABEL} ${AppConstants.FOUND_POSTFIX}`}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Dropdown
                value={productStore.sortBy}
                options={AppConstants.SORT_OPTIONS}
                onChange={(e) => productStore.setSortBy(e.value)}
                placeholder={AppConstants.SORT_LABEL}
                className="h-9 text-sm w-44 sm:w-52 flex items-center"
              />

              {/* Mobile filter toggle */}
              <details className="md:hidden relative">
                <summary className="cursor-pointer px-3 py-1.5 bg-[#1e3a5f] text-white text-sm rounded flex items-center gap-1 list-none h-9">
                  <i className="pi pi-sliders-h" /> {AppConstants.FILTERS_LABEL}
                </summary>
                <div className="absolute right-0 top-full mt-1 z-40 w-64 max-h-[calc(100vh-3rem)] overflow-y-auto shadow-lg">
                  <FilterPanel />
                </div>
              </details>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid />

          {/* Pagination */}
          <Pagination
            currentPage={productStore.currentPage}
            totalPages={productStore.totalPages}
            onPageChange={productStore.setPage}
          />
        </div>
      </div>
    </main>
  )
})

export default ProductListingPage;