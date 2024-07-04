import { IBasketData, IProduct } from "../types";

export class BasketData implements IBasketData {
  protected basketList: IProduct[];

  constructor() {
    this.basketList = [];
  }

  set basketProducts(data: IProduct[]) {
    this.basketList = data;
  }

  get basketProducts() {
    return this.basketList;
  }

  getTotalSum() {
    return this.basketProducts.reduce((sum, item) => sum + item.price, 0);
  }

  getCounter() {
    return this.basketProducts.length;
  }

  addSelectedProduct(data: IProduct) {
    this.basketList.push(data);
  }

  clearBasket() {
    this.basketProducts = []
  }

  removeProductFromBasket(productId: string) {
    this.basketList = this.basketList.filter(product => product.id !== productId);
  }
}