import { Modal } from "./common/Modal";
import { IEvents } from "./base/events";
import { IProduct } from "../types";


export class ProductPreview extends Modal<IProduct> {
  protected productCategory: HTMLSpanElement;
  protected productTitle: HTMLElement;
  protected productText: HTMLParagraphElement;
  protected productImage: HTMLImageElement;
  protected productPrice: HTMLSpanElement;
  protected productBuyButton: HTMLButtonElement;
  protected productId: string;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events)

    this.productCategory = this.container.querySelector('.card__category');
    this.productTitle = this.container.querySelector('.card__title');
    this.productText = this.container.querySelector('.card__text');
    this.productImage = this.container.querySelector('.card__image');
    this.productPrice = this.container.querySelector('.card__price');
    this.productBuyButton = this.container.querySelector('.card__button');

    console.log(this.productCategory)

    // this.productBuyButton.addEventListener('click', () =>
    //   this.events.emit('product:buy', { product: this })
    // );
  }

  set preview(productData: IProduct) {
    this.productCategory.textContent = productData.category;
    this.productTitle.textContent = productData.title;
    this.productText.textContent = productData.description;
    this.productImage.src = require(`../images${productData.image}`);
    this.productImage.alt = productData.title;
    this.productPrice.textContent = `${productData.price} синапсов`;
    super.open();
  }
}

