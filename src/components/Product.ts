import { IProduct } from "../types";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";


export class Product extends Component<IProduct> {
  protected events: IEvents;
  protected productCategory: HTMLSpanElement;
  protected productTitle: HTMLElement;
  protected productImage: HTMLImageElement;
  protected productPrice: HTMLSpanElement;
  protected productId: string;

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container)
    this.events = events;

    this.productCategory = this.container.querySelector('.card__category');
    this.productTitle = this.container.querySelector('.card__title');
    this.productImage = this.container.querySelector('.card__image');
    this.productPrice = this.container.querySelector('.card__price');

    this.container.addEventListener('click', () =>
      this.events.emit('product:select', { product: this })
    );
  }

  render(productData: Partial<IProduct> | undefined) {
    if (!productData) return this.container;
    const { title, price, ...otherProductData } = productData;
    if (title) this.title = `${title}`;
    if (price) this.price = price;
    return super.render(otherProductData);
  }

  set category(category: string) {
    this.productCategory.textContent = category;
  }

  set title(title: string) {
    this.productTitle.textContent = title;
  }

  set image(image: string) {
    this.productImage.src = require(`../images${image}`);
    this.productImage.alt = this.title;
  }

  set price(price: number) {
    if (price) {
      this.productPrice.textContent = `${price} синапсов`;
    } else {
      this.productPrice.textContent = 'Бесценно';
    }
  }

  set id(id: string) {
    this.productId = id;
  }

  get id() {
    return this.productId;
  }
}