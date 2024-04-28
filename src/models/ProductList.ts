import { IProductList, IProduct } from "../types/index";

class ProductList implements IProductList {
  constructor(
    public total: number,
    public items: IProduct[]) {
    this.total = total;
    this.items = items;
  }
}

export default ProductList;