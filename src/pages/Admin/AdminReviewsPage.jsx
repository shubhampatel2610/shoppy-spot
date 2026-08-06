import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import adminReviewStore from '../../stores/adminReviewStore';
import adminVendorStore from '../../stores/adminVendorStore';
import componentStore from '../../stores/componentStore';
import SearchBox from '../../components/common/SearchBox';
import PageShell from '../../components/common/PageShell';
import FormDropdownField from '../../components/common/FormDropdownField';
import StarRating from '../../components/common/StarRating';
import { REVIEW_RATING_FILTER_OPTIONS } from '../../utils/adminReviewConstants';

// Groups the flat, already-filtered review list by product - same approach as
// VendorReviewsPage's groupByProduct, just over the cross-vendor store.
const groupByProduct = (reviews) => {
  const groups = new Map();
  reviews.forEach((review) => {
    const existing = groups.get(review.productId);
    if (existing) {
      existing.reviews.push(review);
    } else {
      groups.set(review.productId, {
        productId: review.productId,
        productTitle: review.productTitle,
        vendorId: review.vendorId,
        reviews: [review],
      });
    }
  });
  return [...groups.values()];
}

// Doesn't reuse ReviewGroup/ProductReview from the vendor side - those are
// read-only, and this page needs a delete action per review for moderation.
const AdminReviewsPage = observer(() => {
  const vendorOptions = [
    { label: 'All vendors', value: '' },
    ...adminVendorStore.vendors.map((v) => ({ label: v.storeName, value: v.id })),
  ];
  const vendorNameById = new Map(adminVendorStore.vendors.map((v) => [v.id, v.storeName]));

  const groups = groupByProduct(adminReviewStore.filteredReviews);

  const handleDelete = (review) => {
    componentStore.openConfirmDialog({
      header: 'Delete Review',
      message: `Delete ${review.reviewerName}'s review? This cannot be undone.`,
      onConfirm: () => adminReviewStore.deleteReview(review.id),
    });
  }

  const header = (
    <>
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-800">Reviews</h1>
        <p className="text-xs text-gray-400">Customer feedback across every vendor</p>
      </div>

      <div className="flex items-end gap-3 mb-4 flex-wrap">
        <SearchBox
          value={adminReviewStore.searchQuery}
          onChange={adminReviewStore.setSearchQuery}
          placeholder="Search reviews by product..."
          className="flex-1 min-w-48"
        />
        <div className="w-44">
          <FormDropdownField field={adminReviewStore.vendorFilterField} options={vendorOptions} />
        </div>
        <div className="w-40">
          <FormDropdownField field={adminReviewStore.ratingFilterField} options={REVIEW_RATING_FILTER_OPTIONS} />
        </div>
      </div>
    </>
  );

  return (
    <PageShell header={header}>
      {groups.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
          No reviews found.
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => {
            const averageRating = group.reviews.reduce((sum, r) => sum + r.rating, 0) / group.reviews.length;
            return (
              <div key={group.productId} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="min-w-0">
                    <h2 className="text-sm font-bold text-[#1e3a5f] truncate">{group.productTitle}</h2>
                    <p className="text-xs text-gray-400 truncate">{vendorNameById.get(group.vendorId) ?? 'Unknown Vendor'}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StarRating rating={averageRating} />
                    <span className="text-xs text-gray-400">({group.reviews.length} review{group.reviews.length !== 1 ? 's' : ''})</span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {group.reviews.map((review) => (
                    <div key={review.id} className="flex items-start justify-between gap-3 border-t border-gray-100 pt-3 first:border-0 first:pt-0">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-medium text-sm text-gray-800">{review.reviewerName}</span>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-sm text-gray-500">{review.comment}</p>
                      </div>
                      <Button
                        icon="pi pi-trash"
                        aria-label="Delete review"
                        onClick={() => handleDelete(review)}
                        text
                        severity="danger"
                        className="shrink-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageShell>
  )
})

export default AdminReviewsPage;
