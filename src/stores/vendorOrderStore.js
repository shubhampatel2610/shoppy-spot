import { makeAutoObservable, reaction } from 'mobx';
import Field from '../models/Field';
import vendorOrdersData from '../data/vendorOrdersData';

export const ORDERS_PER_PAGE = 6;
const ORDER_STATUS_FLOW = ['pending', 'packed', 'shipped', 'delivered'];

class VendorOrderStore {
  orders = vendorOrdersData.map((order) => ({ ...order, items: order.items.map((item) => ({ ...item })) }));

  currentPage = 1;
  statusFilterField = new Field({ name: 'statusFilter', label: 'Status', type: 'text', value: '' });

  constructor() {
    makeAutoObservable(this);
    reaction(() => this.statusFilterField.value, () => { this.currentPage = 1; });
  }

  get filteredOrders() {
    if (!this.statusFilterField.value) {
      return this.orders;
    }
    return this.orders.filter((order) => order.items.some((item) => item.itemStatus === this.statusFilterField.value));
  }

  get paginatedOrders() {
    const start = (this.currentPage - 1) * ORDERS_PER_PAGE;
    return this.filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredOrders.length / ORDERS_PER_PAGE));
  }

  setPage = (page) => {
    this.currentPage = page;
  }

  getOrderById = (id) => this.orders.find((order) => order.id === id);

  // Moves a single line item to the next stage in the fulfillment flow.
  // Cancelled items and items already at the final stage are left untouched.
  advanceItemStatus = (orderId, productId) => {
    this.orders = this.orders.map((order) => {
      if (order.id !== orderId) {
        return order;
      }
      return {
        ...order,
        items: order.items.map((item) => {
          if (item.productId !== productId || item.itemStatus === 'cancelled') {
            return item;
          }
          const currentIndex = ORDER_STATUS_FLOW.indexOf(item.itemStatus);
          const isAtFinalStage = currentIndex === -1 || currentIndex === ORDER_STATUS_FLOW.length - 1;
          return isAtFinalStage ? item : { ...item, itemStatus: ORDER_STATUS_FLOW[currentIndex + 1] };
        }),
      };
    });
  }
}

const vendorOrderStore = new VendorOrderStore();

export default vendorOrderStore;
