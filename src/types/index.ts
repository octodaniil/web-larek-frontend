interface IProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;

  addProductToBasket(productId: string): void;
  removeProductToBasket(productId: string): void;
}

interface IProductList {
  total: number;
  items: IProduct[];

  getProduct(productId: string): IProduct;
}

interface IBasket {
  total: number;
  items: IProduct[];

  checkout(): void;
}

interface IOrder {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: IProduct[];
}