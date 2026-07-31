import React from 'react';
import { Skeleton } from 'primereact/skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="h-40 bg-gray-50 flex items-center justify-center p-3">
        <Skeleton width="100%" height="100%" />
      </div>
      <div className="p-3 border-t border-gray-50 space-y-2">
        <Skeleton width="80%" height="1rem" />
        <div className="flex items-center gap-2">
          <Skeleton width="3rem" height="1.25rem" />
          <Skeleton width="4rem" height="1rem" />
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton;
