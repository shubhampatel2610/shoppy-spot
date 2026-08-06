import React, { useMemo, useState } from 'react';
import vendorReviewsData from '../../data/vendorReviewsData';
import SearchBox from '../../components/common/SearchBox';
import ReviewGroup from '../../components/Vendor/ReviewGroup';
import PageShell from '../../components/common/PageShell';
import useDebouncedValue from '../../hooks/useDebouncedValue';

// Groups the flat review list by product, once - reused for both the initial
// render and to know which products exist before any search is applied.
const groupByProduct = (reviews) => {
  const groups = new Map();
  reviews.forEach((review) => {
    const existing = groups.get(review.productId);
    if (existing) {
      existing.reviews.push(review);
    } else {
      groups.set(review.productId, { productId: review.productId, productTitle: review.productTitle, reviews: [review] });
    }
  });
  return [...groups.values()];
}

const VendorReviewsPage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 350);

  const allGroups = useMemo(() => groupByProduct(vendorReviewsData), []);
  const visibleGroups = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) {
      return allGroups;
    }
    return allGroups.filter((group) => group.productTitle.toLowerCase().includes(query));
  }, [allGroups, debouncedSearch]);

  const header = (
    <>
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-800">Reviews</h1>
        <p className="text-xs text-gray-400">Customer feedback on your products</p>
      </div>

      <SearchBox
        value={search}
        onChange={setSearch}
        placeholder="Search reviews by product..."
        className="mb-4 w-full max-w-xs"
      />
    </>
  );

  return (
    <PageShell header={header}>
      {visibleGroups.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
          No reviews found.
        </div>
      ) : (
        <div className="space-y-4">
          {visibleGroups.map((group) => (
            <ReviewGroup key={group.productId} productTitle={group.productTitle} reviews={group.reviews} />
          ))}
        </div>
      )}
    </PageShell>
  )
}

export default VendorReviewsPage;
