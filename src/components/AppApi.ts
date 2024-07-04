import { IApi, IOrderData, IProduct, IProductsList } from "../types";

export class AppApi {
  private _baseApi: IApi;

  constructor(baseApi: IApi) {
    this._baseApi = baseApi;
  }

  getProducts(): Promise<IProduct[]>{
    return this._baseApi.get<IProductsList>('/product').then((response: IProductsList) => response.items);
  }

  postPurchase(order: Partial<IOrderData>) {
    return this._baseApi.post(`/order`, order).then((res) => console.log(res));
  }
}

