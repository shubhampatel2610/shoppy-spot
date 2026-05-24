import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import productStore from '../stores/productStore';
import ProductGrid from '../components/ProductGrid/ProductGrid';

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
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-5">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {'All Products'}
              </h1>
            </div>
          </div>

          <ProductGrid />
        </div>
      </div>
    </main>
  )
})

export default ProductListingPage;