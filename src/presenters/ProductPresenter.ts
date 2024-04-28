import { IProductPresenter, IProduct, IProductList } from "../types/index";
import { apiConst } from '../components/base/api';
// import { ProductList } from "../models/ProductList";
// import { ProductCatalogView } from "../views/ProductCatalogView";

class ProductPresenter implements IProductPresenter {
  // Получить список товаров
  getProductList(): Promise<IProductList>{
    const productListPromise = apiConst.get('/product')
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error(error);
        return error;
      });
      console.log(Promise.)
      return productListPromise;
  }
  // Получить детали о товаре по его ID
  getProductDetails(productId: string): IProduct | null {

  }
}

export default ProductPresenter;

