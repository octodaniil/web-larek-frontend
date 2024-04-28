import { ICartPresenter, IOrder, IProduct } from "../types/index";

class CartPresenter implements ICartPresenter {
  private cartItems: Map<string, IProduct>; // Хранение товаров в корзине

  constructor() {
    this.cartItems = new Map();
  }

  // Метод для добавления товара в корзину
  addToCart(product: IProduct): void {

  }

  // Метод для удаления товара из корзины по его ID
  removeFromCart(productId: string): void {

  }

  // Метод для оформления заказа
  checkout(order: IOrder): void {
    
  }
}

export default CartPresenter;
