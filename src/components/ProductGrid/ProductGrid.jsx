import React from 'react';
import { observer } from 'mobx-react-lite';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import productStore from '../../stores/productStore';
import AppConstants from '../../utils/AppConstants';
import ProductCard from './_components/ProductCard';

const ProductGrid = observer(() => {
  if (productStore.loading) {
    return <LoadingSpinner message={AppConstants.PRODUCT_LOADING_TEXT} />;
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