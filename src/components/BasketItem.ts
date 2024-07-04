import { IEvents } from "./base/events";
import { IBasketItem, IProduct } from "../types";
import { formatNumber } from "../utils/utils";

export class BasketItem implements IBasketItem {
  basketItem: HTMLElement;
	index: HTMLElement;
	basketCardTitle: HTMLElement;
	basketCardPrice: HTMLElement;
	basketCardButtonDelete: HTMLButtonElement;

  constructor (template: HTMLTemplateElement, protected events: IEvents) {
    this.basketItem = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
		this.index = this.basketItem.querySelector('.basket__item-index');
		this.basketCardTitle = this.basketItem.querySelector('.card__title');
		this.basketCardPrice = this.basketItem.querySelector('.card__price');
		this.basketCardButtonDelete = this.basketItem.querySelector('.basket__item-delete');

		this.basketCardButtonDelete.addEventListener('click', () =>
			this.events.emit('product:remove', {id: this.index.id}))
  }

	protected setPrice(price: number | null) {
    if (price) {
      return `${formatNumber(price)} синапсов`;
    } else {
      return 'Бесценно';
    }
  }

	render(data: IProduct, item: number) {
		this.index.textContent = `${item}`;
		this.index.id = data.id;
		this.basketCardTitle.textContent = data.title;
		this.basketCardPrice.textContent = `${this.setPrice(data.price)}`;
		return this.basketItem;
	}
}