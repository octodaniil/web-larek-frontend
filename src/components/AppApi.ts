import { IApi, IProduct, IProductsList } from "../types";

export class AppApi {
  private _baseApi: IApi;

  constructor(baseApi: IApi) {
    this._baseApi = baseApi;
  }

  getProducts(): Promise<IProduct[]>{
    return this._baseApi.get<IProductsList>('/product').then((response: IProductsList) => response.items);
  }
}

