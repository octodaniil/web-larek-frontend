import './scss/styles.scss';
import ProductPresenter from '../src/presenters/ProductPresenter';
import ProductCatalogView from './views/ProductCatalogView';

const productPresenter = new ProductPresenter();
const productCatalogView = new ProductCatalogView();

const productList = productPresenter.getProductList();
console.log(productList)
productCatalogView.showProductList(productList);
