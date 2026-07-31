import React from 'react';
import { Skeleton } from 'primereact/skeleton';

// Placeholder row matching an InfoRow's label + value stack
const InfoRowSkeleton = () => (
  <div>
    <Skeleton width="40%" height="0.75rem" className="mb-2" />
    <Skeleton width="70%" height="1rem" />
  </div>
);

const UserDetailsSkeleton = () => {
  return (
    <div>
      {/* Personal Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Skeleton shape="circle" width="72px" height="72px" />
            <div className="space-y-2">
              <Skeleton width="10rem" height="1.1rem" />
              <Skeleton width="8rem" height="0.75rem" />
            </div>
          </div>
          <Skeleton width="1.25rem" height="1.25rem" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <InfoRowSkeleton key={index} />
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <Skeleton width="6rem" height="0.75rem" />
          <Skeleton width="1.25rem" height="1.25rem" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <InfoRowSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDetailsSkeleton;
