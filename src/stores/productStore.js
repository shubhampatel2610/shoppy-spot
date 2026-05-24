import { makeAutoObservable } from 'mobx';

class ProductStore {
  // Listing Page States
  allProducts = [];
  categories = [];
  selectedProduct = null;

  constructor() {
    makeAutoObservable(this);
  }
}

const productStore = new ProductStore();

export default productStore;