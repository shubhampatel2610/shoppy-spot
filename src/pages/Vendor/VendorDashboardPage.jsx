import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { SelectButton } from 'primereact/selectbutton';
import vendorOrderStore from '../../stores/vendorOrderStore';
import vendorProductStore from '../../stores/vendorProductStore';
import RevenueChart from '../../components/Vendor/RevenueChart';
import OrderStatusChart from '../../components/Vendor/OrderStatusChart';
import TopProductsChart from '../../components/Vendor/TopProductsChart';
import StockSnapshotChart from '../../components/Vendor/StockSnapshotChart';
import StatCard from '../../components/common/StatCard';
import PageShell from '../../components/common/PageShell';
import {
  DASHBOARD_RANGES,
  filterOrdersInRange,
  buildRevenueSeries,
  buildOrderStatusCounts,
  buildTopSellingProducts,
} from '../../utils/vendorAnalytics';

const VendorDashboardPage = observer(() => {
  const [range, setRange] = useState('week');
  const rangeConfig = DASHBOARD_RANGES.find((r) => r.value === range);

  const ordersInRange = filterOrdersInRange(vendorOrderStore.orders, rangeConfig.days);
  const revenueSeries = buildRevenueSeries(ordersInRange, rangeConfig);
  const statusCounts = buildOrderStatusCounts(ordersInRange);
  const topProducts = buildTopSellingProducts(ordersInRange, 5);
  const activeProducts = vendorProductStore.products.filter((p) => p.status === 'active');
  const totalRevenue = ordersInRange.reduce((sum, o) => sum + o.total, 0);

  const header = (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
      <div>
        <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
        <p className="text-xs text-gray-400">Overview of your store's performance</p>
      </div>
      <SelectButton
        value={range}
        onChange={(e) => e.value && setRange(e.value)}
        options={DASHBOARD_RANGES.map((r) => ({ label: r.label, value: r.value }))}
      />
    </div>
  );

  return (
    <PageShell header={header}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard icon="pi-dollar" label={`Revenue (${rangeConfig.label.toLowerCase()})`} value={`$${totalRevenue.toFixed(2)}`} />
        <StatCard icon="pi-shopping-bag" label={`Orders (${rangeConfig.label.toLowerCase()})`} value={ordersInRange.length} />
        <StatCard icon="pi-box" label="Active Products" value={activeProducts.length} />
        <StatCard icon="pi-exclamation-triangle" label="Low Stock Items" value={vendorProductStore.lowStockProducts.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <RevenueChart series={revenueSeries} rangeLabel={`Showing ${rangeConfig.label.toLowerCase()} view`} />
        <OrderStatusChart counts={statusCounts} />
        <TopProductsChart products={topProducts} />
        <StockSnapshotChart products={activeProducts} />
      </div>
    </PageShell>
  )
})

export default VendorDashboardPage;
