// Интерфейс модели товара
export interface IProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
}

// Интерфейс модели списка товаров
export interface IProductList {
  total: number;
  items: IProduct[];
}

// Интерфейс модели заказа
export interface IOrder {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: IProduct[];
}

// Презентер товара
export interface IProductPresenter {
  // Получить список товаров
  getProductList(): void;
  // Получить детали о товаре по его ID
  getProductDetails(productId: string): void;
}

// Презентер корзины
export interface ICartPresenter {
  // Добавить товар в корзину
  addToCart(product: IProduct): void;
  // Удалить товар из корзины по его ID
  removeFromCart(productId: string): void;
  // Оформить заказ
  checkout(order: IOrder): void;
}

// Презентер оформления заказа
export interface IOrderPresenter {
  // Отправить заказ на сервер
  submitOrder(order: IOrder): void;
}

// Представление каталога товаров
export interface IProductCatalogView {
  // Отобразить список товаров
  showProductList(productList: IProductList): void;
  // Отобразить детали о товаре
  showProductDetails(product: IProduct): void;
}

// Представление корзины
export interface ICartView {
  // Отобразить товары в корзине
  showCartItems(order: IOrder): void;
  // Показать окно оформления заказа
  showOrderPopup(): void;
}

// Представление оформления заказа
export interface IOrderPopupView {
  // Показать доступные способы оплаты
  showPaymentMethods(): void;
  // Показать форму для ввода информации о заказе
  showOrderForm(): void;
  // Получить детали о заказе из формы
  getOrderDetails(): IOrder;
}

// Представление подтверждения заказа
export interface IOrderConfirmationPopupView {
  // Показать сообщение о подтверждении заказа
  showConfirmationMessage(): void;
}
