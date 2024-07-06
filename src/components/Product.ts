import { IProduct } from "../types";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";
import { formatNumber, ensureElement } from "../utils/utils";


export class Product extends Component<IProduct> {
  protected productCategory: HTMLSpanElement;
  protected productTitle: HTMLElement;
  protected productDescription: HTMLElement | null;
  protected productImage: HTMLImageElement;
  protected productPrice: HTMLSpanElement;
  protected buyButton: HTMLButtonElement;
  protected productId: string;
  protected _colors = <Record<string, string>>{
    "дополнительное": "additional",
    "софт-скил": "soft",
    "кнопка": "button",
    "хард-скил": "hard",
    "другое": "other",
  }

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container)
    this.events = events;

    this.productCategory = ensureElement<HTMLSpanElement>('.card__category', this.container);
    this.productTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.productImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.productPrice = ensureElement<HTMLSpanElement>('.card__price', this.container);
    this.productDescription = this.container.querySelector('.card__text');
    this.buyButton = this.container.querySelector('.card__button');

    if (this.buyButton != null) {
      this.buyButton.addEventListener('click', () =>
        this.events.emit('product:buy', { product: this }))
    } else {
      this.container.addEventListener('click', () =>
        this.events.emit('product:select', { product: this }))
    }
  }

  getElement(): HTMLElement {
    return this.container;
  }

  render(productData: Partial<IProduct>) {
    if (!productData) return this.container;
    const { title, price, ...otherProductData } = productData;
    if (title) this.title = `${title}`;
    this.price = price;
    return super.render(otherProductData);
  }

  set category(category: string) {
    this.productCategory.textContent = category;
    this.productCategory.className = `card__category card__category_${this._colors[category]}`
  }

  set title(title: string) {
    this.productTitle.textContent = title;
  }

  set description(description: string) {
    if (this.productDescription) this.productDescription.textContent = description;
  }

  set image(image: string) {
    this.productImage.src = require(`../images${image}`);
    this.productImage.alt = this.title;
  }

  set price(price: number | null) {
    if (!price) {
      if (this.buyButton) {
        this.buyButton.disabled = true;
      }
      this.productPrice.textContent = 'Бесценно';
    } else {
      if (this.buyButton) {
        this.buyButton.disabled = false;
      }
      this.productPrice.textContent = `${formatNumber(price)} синапсов`;
    }
  }

  set id(id: string) {
    this.productId = id;
  }

  get id() {
    return this.productId;
  }
}