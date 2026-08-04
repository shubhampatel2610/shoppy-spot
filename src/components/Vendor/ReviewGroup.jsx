import React from 'react';
import StarRating from '../common/StarRating';
import ProductReview from '../ProductReview/ProductReview';

// One product's reviews, as its own card - keeps products visually separated on
// VendorReviewsPage instead of a single flat list with just a text label between them.
const ReviewGroup = (props) => {
  const { productTitle, reviews } = props;
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <h2 className="text-sm font-bold text-[#1e3a5f]">{productTitle}</h2>
        <div className="flex items-center gap-2 shrink-0">
          <StarRating rating={averageRating} />
          <span className="text-xs text-gray-400">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {reviews.map((review, i) => (
          <div key={i} className="border-t border-gray-100 pt-3 first:border-0 first:pt-0">
            <ProductReview review={review} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewGroup;
