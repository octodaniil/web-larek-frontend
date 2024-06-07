import './scss/styles.scss';
import { AppApi } from './components/AppApi';
import { IApi } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ProductsData } from './components/ProductsData';
import { Product } from './components/Product';
import { ProductsContainer } from './components/ProductsContainer';
import { cloneTemplate } from './utils/utils';
import { ProductPreview } from './components/ProductPreview';

const events = new EventEmitter();

const productTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const productsContainer = new ProductsContainer(document.querySelector('.gallery'));
const productPreview = new ProductPreview(document.querySelector('.modal__preview'), events);

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const productsData = new ProductsData(events);

events.onAll((event) => {
  console.log(event.eventName, event.data)
})

api.getProducts()
  .then((res) => {
    productsData.products = res;
    events.emit('initialData:loaded')
  })
  .catch((err) =>
    { console.log(err) });

events.on('initialData:loaded', () => {
	const productsArray = productsData.products.map((product) => {
		const productInstant = new Product(cloneTemplate(productTemplate), events);
		return productInstant.render(product);
	});

	productsContainer.render({ gallery: productsArray });
});

events.on('product:select', () => {
  productPreview.preview;
  productPreview.open();
})