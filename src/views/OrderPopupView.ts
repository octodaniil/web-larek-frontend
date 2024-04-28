import { IOrderPopupView, IOrder } from "../types/index";

export class OrderPopupView implements IOrderPopupView {
  showPaymentMethods(): void {
    // Реализация отображения доступных способов оплаты
  }

  showOrderForm(): void {
    // Реализация отображения формы для ввода информации о заказе
  }

  getOrderDetails(): IOrder {
    // Реализация получения деталей о заказе из формы
    return {} as IOrder;
  }
}
