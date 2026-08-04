// Pure aggregation helpers for the vendor dashboard charts - kept separate from the
// page component since the date-bucketing logic is the non-trivial part here.

export const DASHBOARD_RANGES = [
  { label: 'Week', value: 'week', days: 7, bucket: 'day' },
  { label: 'Month', value: 'month', days: 30, bucket: 'day' },
  { label: 'Year', value: 'year', days: 365, bucket: 'month' },
];

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const filterOrdersInRange = (orders, days) => {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return orders.filter((order) => new Date(order.createdAt).getTime() >= cutoff);
}

// Buckets order totals by day (week/month ranges) or by month (year range).
export const buildRevenueSeries = (orders, rangeConfig) => {
  const { days, bucket } = rangeConfig;
  const buckets = [];

  if (bucket === 'day') {
    for (let i = days - 1; i >= 0; i--) {
      const date = startOfDay(new Date(Date.now() - i * 24 * 60 * 60 * 1000));
      buckets.push({
        key: date.toDateString(),
        label: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        total: 0,
      });
    }
    orders.forEach((order) => {
      const key = startOfDay(new Date(order.createdAt)).toDateString();
      const bucketEntry = buckets.find((b) => b.key === key);
      if (bucketEntry) {
        bucketEntry.total += order.total;
      }
    });
  } else {
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - i);
      buckets.push({
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' }),
        total: 0,
      });
    }
    orders.forEach((order) => {
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const bucketEntry = buckets.find((b) => b.key === key);
      if (bucketEntry) {
        bucketEntry.total += order.total;
      }
    });
  }

  return buckets;
}

// Counts order line items by fulfillment status.
export const buildOrderStatusCounts = (orders) => {
  const counts = { pending: 0, packed: 0, shipped: 0, delivered: 0, cancelled: 0 };
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (counts[item.itemStatus] !== undefined) {
        counts[item.itemStatus] += 1;
      }
    });
  });
  return counts;
}

// Ranks products by units sold within the given orders.
export const buildTopSellingProducts = (orders, limit = 5) => {
  const unitsByProduct = new Map();
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const current = unitsByProduct.get(item.productId) ?? { title: item.productTitle, units: 0 };
      current.units += item.quantity;
      unitsByProduct.set(item.productId, current);
    });
  });

  return [...unitsByProduct.values()].sort((a, b) => b.units - a.units).slice(0, limit);
}
