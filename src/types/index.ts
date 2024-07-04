export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  baseUrl: string;
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface IProductsData {
  products: IProduct[];
	preview: string | null;
}

export interface IProductsList {
  total: number;
  items: IProduct[];
}

export interface IModal {
  modalContainer: HTMLElement;
  modalContent: HTMLElement;
  closeButton: HTMLElement;
  open(): void;
  close(): void;
  handleEscUp(evt: KeyboardEvent): void;
  render(): HTMLElement;
}

export interface IBasketData {
  basketProducts: IProduct[];
  getTotalSum(): number;
  getCounter(): number;
  addSelectedProduct(data: IProduct): void;
  clearBasket(): void
  removeProductFromBasket(product: string): void;
}

export interface IBasket {
  basket: HTMLElement;
  basketTitle: HTMLElement;
  basketList: HTMLElement;
  basketButton: HTMLButtonElement;
  basketPrice: HTMLElement;
  headerBasketButton: HTMLButtonElement;
  headerBasketCounter: HTMLElement;
  updateBasketCounter(value: number): void;
  setTotalSum(totalSum: number): void;
  render(): HTMLElement;
}

export interface IBasketItem {
  basketItem: HTMLElement;
	index: HTMLElement;
	basketCardTitle: HTMLElement;
	basketCardPrice: HTMLElement;
	basketCardButtonDelete: HTMLButtonElement;
	render(data: IProduct, item: number): HTMLElement;
}

export type Errors = Partial<Record<keyof IOrderData, string>>;

export interface IOrderForm {
  orderForm: HTMLFormElement;
  payment: string;
  errors: HTMLElement;
  buttons: HTMLButtonElement[];
  render(): HTMLElement;
}

export interface IOrderData {
  payment: string;
  address: string;
  phone: string;
  email: string;
  total: number;
  items: string[];
  setOrderForm(fieldAndValue: { field: string; value: string }): void
  validateOrderForm(): boolean;
  setContactForm(fieldAndValue: { field: string; value: string }): void
  validateContactForm(): boolean;
  getPurchase(): object;
}

export interface IContactsForm {
  contactsForm: HTMLFormElement;
  inputs: HTMLInputElement[];
  submitButton: HTMLButtonElement;
  errors: HTMLElement;
  render(): HTMLElement;
}

export interface IOrderFinal {
  final: HTMLElement;
  description: HTMLElement;
  button: HTMLButtonElement;
  render(total: number): HTMLElement;
}