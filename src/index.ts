import './scss/styles.scss';
import { AppApi } from './components/AppApi';
import { IApi, IOrderData, IProduct } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ProductsData } from './components/ProductsData';
import { Product } from './components/Product';
import { ProductsContainer } from './components/ProductsContainer';
import { cloneTemplate } from './utils/utils';
import { Modal } from "./components/common/Modal";
import { Basket } from './components/Basket';
import { BasketData } from './components/BasketData';
import { BasketItem } from './components/BasketItem';
import { OrderData } from './components/OrderData';
import { OrderForm } from './components/OrderForm';
import { ContactsForm } from './components/ContactsForm';
import { OrderFinal } from './components/OrderFinal';

const events = new EventEmitter();

const productTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const productPreviewTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const productBasketTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const orderTemplate: HTMLTemplateElement = document.querySelector('#order');
const contactsTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const finalTemplate: HTMLTemplateElement = document.querySelector('#success');

const productsContainer = new ProductsContainer(document.querySelector('.gallery'));
const modalContainer: HTMLElement = document.querySelector('#modal-container');

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const productsData = new ProductsData(events);
const modal = new Modal(modalContainer, events);
const basket = new Basket(cloneTemplate(basketTemplate), events)
const basketData = new BasketData();
const orderData = new OrderData(events);
const order = new OrderForm(cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);


// events.onAll((event) => {
//   console.log(event.eventName, event.data)
// })

api.getProducts()
  .then((res) => {
    productsData.products = res;
    events.emit('initialData:loaded');
  })
  .catch((err) => { console.log(err) });

events.on('initialData:loaded', () => {
  const productsArray = productsData.products.map((product) => {
    const productInstant = new Product(cloneTemplate(productTemplate), events);
    return productInstant.render(product);
  });

  productsContainer.render({ gallery: productsArray });
});

events.on('product:select', (data: { product: IProduct }) => {
  const { product } = data;
  const productToRender = productsData.getProduct(product.id);
  const productPreview = new Product(cloneTemplate(productPreviewTemplate), events);
  modal.content = productPreview.render(productToRender);
  modal.render();
});

events.on('modal:open', () => {
  modal.locked = true;
});

events.on('modal:close', () => {
  modal.locked = false;
});

events.on('product:buy', (data: { product: IProduct }) => {
  const { product } = data;
  basketData.addSelectedProduct(productsData.getProduct(product.id));
  basket.updateBasketCounter(basketData.getCounter());
  modal.close();
});

events.on('basket:open', () => {
  const totalSum = basketData.getTotalSum();
  basket.setTotalSum(totalSum);

  basket.items = basketData.basketProducts.map((product, index) => {
    const basketItem = new BasketItem(productBasketTemplate, events);
    return basketItem.render(product, index + 1);
  });

  modal.content = basket.render();
  modal.render();
});

events.on('product:remove', (productId: { id: string}) => {
  basketData.removeProductFromBasket(productId.id);
  basket.updateBasketCounter(basketData.getCounter());
  basket.setTotalSum(basketData.getTotalSum());

  basket.items = basketData.basketProducts.map((product, index) => {
    const basketItem = new BasketItem(productBasketTemplate, events);
    return basketItem.render(product, index + 1);
  });

  modal.content = basket.render();
  modal.render();
})

events.on('order:open', () => {
  modal.content = order.render();
  modal.render();
  orderData.items = basketData.basketProducts.map(item => item.id);
});

events.on('order:payment', (button: HTMLButtonElement) => { orderData.payment = button.name })

events.on('order:address', (fieldAdnValue: { field: string, value: string }) => {
  orderData.setOrderForm(fieldAdnValue);
});

events.on('errors:orderForm', (errors: Partial<IOrderData>) => {
  const { address, payment } = errors;
  const isValid = !(address || payment);
  const formErrorsMessages = [address, payment]
    .filter(Boolean)
    .join(', ');

  order.valid = isValid;
  order.errors.textContent = formErrorsMessages;
})

events.on('contactsForm:open', () => {
  orderData.total = basketData.getTotalSum();
  modal.content = contactsForm.render();
  modal.render();
});

events.on(`contacts:inputChange`, (fieldAdnValue: { field: string, value: string }) => {
  orderData.setContactForm(fieldAdnValue);
});

events.on('errors:inputChange', (errors: Partial<IOrderData>) => {
  const { email, phone } = errors;
  const isValid = !(email || phone);
  const formErrorsMessages = [email, phone]
    .filter(Boolean)
    .join(', ');

  contactsForm.valid = isValid;
  contactsForm.errors.textContent = formErrorsMessages;
})

events.on('final:open', () => {
  api.postPurchase(orderData.getPurchase())
    .then(() => {
      const success = new OrderFinal(finalTemplate, events);
      modal.content = success.render(basketData.getTotalSum());
      basketData.clearBasket();
      basket.updateBasketCounter(basketData.getCounter());
      modal.render();
    })
    .catch(error => console.log(error));
});

events.on('final:close', () => modal.close());
