// Aggregation helpers for the admin dashboard. The range/order-shaped helpers
// (DASHBOARD_RANGES, filterOrdersInRange, buildRevenueSeries, buildOrderStatusCounts,
// buildTopSellingProducts) are generic over any orders array shaped like
// { createdAt, total, items: [{ productId, productTitle, quantity, itemStatus }] } -
// admin orders satisfy that shape too, so they're reused as-is rather than duplicated.
// Only the genuinely admin-only aggregations (cross-vendor ranking, category mix)
// live here.
export {
  DASHBOARD_RANGES,
  filterOrdersInRange,
  buildRevenueSeries,
  buildOrderStatusCounts,
  buildTopSellingProducts,
} from './vendorAnalytics';

// Ranks vendors by revenue within the given orders, spreading multi-vendor orders'
// totals across their line items (an order's `total` isn't per-vendor, so each
// vendor is credited for the subtotal of just their own items in that order).
export const buildTopVendors = (orders, vendorNameById, limit = 5) => {
  const revenueByVendor = new Map();
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const lineTotal = item.unitPrice * item.quantity;
      const current = revenueByVendor.get(item.vendorId) ?? {
        vendorId: item.vendorId,
        name: vendorNameById.get(item.vendorId) ?? 'Unknown Vendor',
        revenue: 0,
      };
      current.revenue += lineTotal;
      revenueByVendor.set(item.vendorId, current);
    });
  });

  return [...revenueByVendor.values()]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit)
    .map((v) => ({ ...v, revenue: Number(v.revenue.toFixed(2)) }));
}

// Counts active products per category, for the dashboard's category mix chart.
export const buildCategoryDistribution = (products, categories) => {
  const nameBySlug = new Map(categories.map((c) => [c.slug, c.name]));
  const counts = new Map();
  products.forEach((product) => {
    const key = product.category;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, name: nameBySlug.get(slug) ?? slug, count }))
    .sort((a, b) => b.count - a.count);
}
