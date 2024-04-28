import { IProductCatalogView, IProduct, IProductList } from "../types/index";

export class ProductCatalogView implements IProductCatalogView {
  showProductList(productList: IProductList): void {
    productList.items.forEach(item => {
      console.log(item)
    })
  }

  showProductDetails(product: IProduct): void {
    // Реализация отображения деталей о товаре
  }
}

export default ProductCatalogView;