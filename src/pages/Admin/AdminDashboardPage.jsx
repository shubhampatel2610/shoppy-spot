import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { SelectButton } from 'primereact/selectbutton';
import adminOrderStore from '../../stores/adminOrderStore';
import adminProductStore from '../../stores/adminProductStore';
import adminVendorStore from '../../stores/adminVendorStore';
import adminCustomerStore from '../../stores/adminCustomerStore';
import categoriesData from '../../data/categoriesData';
import { LOW_STOCK_THRESHOLD } from '../../stores/vendorProductStore';
import RevenueChart from '../../components/Vendor/RevenueChart';
import OrderStatusChart from '../../components/Vendor/OrderStatusChart';
import TopProductsChart from '../../components/Vendor/TopProductsChart';
import TopVendorsChart from '../../components/Admin/TopVendorsChart';
import CategoryDistributionChart from '../../components/Admin/CategoryDistributionChart';
import AdminOrderCard from '../../components/Admin/AdminOrderCard';
import StatCard from '../../components/common/StatCard';
import PageShell from '../../components/common/PageShell';
import {
  DASHBOARD_RANGES,
  filterOrdersInRange,
  buildRevenueSeries,
  buildOrderStatusCounts,
  buildTopSellingProducts,
  buildTopVendors,
  buildCategoryDistribution,
} from '../../utils/adminAnalytics';

const AdminDashboardPage = observer(() => {
  const [range, setRange] = useState('week');
  const rangeConfig = DASHBOARD_RANGES.find((r) => r.value === range);

  const ordersInRange = filterOrdersInRange(adminOrderStore.orders, rangeConfig.days);
  const revenueSeries = buildRevenueSeries(ordersInRange, rangeConfig);
  const statusCounts = buildOrderStatusCounts(ordersInRange);
  const topProducts = buildTopSellingProducts(ordersInRange, 5);
  const vendorNameById = new Map(adminVendorStore.vendors.map((v) => [v.id, v.storeName]));
  const topVendors = buildTopVendors(ordersInRange, vendorNameById, 5);
  const activeProducts = adminProductStore.products.filter((p) => p.status === 'active');
  const categoryDistribution = buildCategoryDistribution(activeProducts, categoriesData);
  const lowStockCount = activeProducts.filter((p) => p.stock < LOW_STOCK_THRESHOLD).length;
  const totalRevenue = ordersInRange.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = adminOrderStore.orders.slice(0, 5);

  const header = (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
      <div>
        <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
        <p className="text-xs text-gray-400">Platform-wide overview across every vendor</p>
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
        <StatCard icon="pi-shopping-bag" label={`Orders (${rangeConfig.label.toLowerCase()})`} value={ordersInRange.length} />
        <StatCard icon="pi-shop" label="Active Vendors" value={adminVendorStore.activeVendorCount} />
        <StatCard icon="pi-box" label="Active Products" value={activeProducts.length} />
        <StatCard icon="pi-users" label="Total Customers" value={adminCustomerStore.customers.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start mb-5">
        <RevenueChart series={revenueSeries} rangeLabel={`Showing ${rangeConfig.label.toLowerCase()} view`} />
        <OrderStatusChart counts={statusCounts} />
        <TopVendorsChart vendors={topVendors} />
        <TopProductsChart products={topProducts} />
        <CategoryDistributionChart categories={categoryDistribution} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Recent Orders</h2>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <AdminOrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </PageShell>
  )
})

export default AdminDashboardPage;
