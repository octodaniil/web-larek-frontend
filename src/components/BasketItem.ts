import { IEvents } from "./base/events";
import { IBasketItem, IProduct } from "../types";
import { ensureElement, formatNumber } from "../utils/utils";

export class BasketItem implements IBasketItem {
	basketItem: HTMLElement;
	index: HTMLElement;
	basketCardTitle: HTMLElement;
	basketCardPrice: HTMLElement;
	basketCardButtonDelete: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.basketItem = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
		this.index = ensureElement<HTMLElement>('.basket__item-index', this.basketItem);
		this.basketCardTitle = ensureElement<HTMLElement>('.card__title', this.basketItem);
		this.basketCardPrice = ensureElement<HTMLElement>('.card__price', this.basketItem);
		this.basketCardButtonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.basketItem);

		this.basketCardButtonDelete.addEventListener('click', () =>
			this.events.emit('product:remove', { id: this.index.id }))
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