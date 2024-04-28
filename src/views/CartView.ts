import { ICartView, IOrder } from "../types/index";

export class CartView implements ICartView {
  showCartItems(order: IOrder): void {
    // Реализация отображения товаров в корзине
  }

  showOrderPopup(): void {
    // Реализация отображения окна оформления заказа
  }
}
