import React from 'react';
import { Skeleton } from 'primereact/skeleton';

const ProductDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 bg-gray-50 flex items-center justify-center p-8 min-h-72">
          <Skeleton width="100%" height="16rem" />
        </div>

        <div className="md:w-3/5 p-6 space-y-4">
          <Skeleton width="70%" height="1.75rem" />
          <Skeleton width="40%" height="2.25rem" />
          <Skeleton width="90%" height="1rem" />
          <Skeleton width="85%" height="1rem" />
          <Skeleton width="60%" height="1rem" />
          <div className="flex gap-3 pt-2">
            <Skeleton width="100%" height="2.5rem" />
            <Skeleton width="3rem" height="2.5rem" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailSkeleton;
