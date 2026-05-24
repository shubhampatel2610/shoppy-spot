import React from 'react';
import { observer } from 'mobx-react-lite';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import productStore from '../../stores/productStore';

const ProductGrid = observer(() => {
  if (productStore.loading) {
    return <LoadingSpinner message="Fetching products..." />;
  }

  if (productStore.error) {
    return <ErrorMessage
      message={productStore.error}
      onRetry={productStore.loadAllProducts}
    />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      GRID
    </div>
  )
})

export default ProductGrid
