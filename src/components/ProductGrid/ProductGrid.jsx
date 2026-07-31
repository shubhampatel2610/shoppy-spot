import React from 'react';
import { observer } from 'mobx-react-lite';
import ProductCardSkeleton from '../common/ProductCardSkeleton';
import ErrorMessage from '../common/ErrorMessage';
import productStore, { ITEMS_PER_PAGE } from '../../stores/productStore';
import ProductCard from '../ProductCard/ProductCard';

const ProductGrid = observer(() => {
  if (productStore.loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (productStore.error) {
    return <ErrorMessage
      message={productStore.error}
      onRetry={productStore.loadAllProducts}
    />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {productStore.paginatedProducts.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
})

export default ProductGrid;
