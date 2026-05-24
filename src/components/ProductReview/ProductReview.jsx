import React from 'react';
import StarRating from '../common/StarRating';

const ProductReview = (props) => {
    const { review } = props;

    return (
        <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-sm text-gray-800">
                    {review.reviewerName}
                </span>
                <StarRating rating={review.rating} />
            </div>
            <p className="text-sm text-gray-500">{review.comment}</p>
        </div>
    )
}

export default ProductReview;