import { IEvents } from "./base/events";
import { createElement, ensureElement } from "../utils/utils";
import { IBasket } from "../types";
import { Component } from "./base/Component";

export class Basket extends Component<IBasket> {
  basketTitle: HTMLElement;
  basketList: HTMLElement;
  basketButton: HTMLButtonElement;
  basketPrice: HTMLElement;
  headerBasketButton: HTMLButtonElement;
  headerBasketCounter: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container)
    this.basketTitle = ensureElement<HTMLElement>('.modal__title', this.container);
    this.basketList = ensureElement<HTMLElement>('.basket__list', this.container);
    this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.container);
    this.headerBasketButton = document.querySelector('.header__basket');
    this.headerBasketCounter = document.querySelector('.header__basket-counter');

    this.basketButton.addEventListener('click', () =>
      this.events.emit('order:open'));
    this.headerBasketButton.addEventListener('click', () =>
      this.events.emit('basket:open'));

    this.items = [];
  }

  set items(items: HTMLElement[]) {
    this.basketList.replaceChildren(
      ...(items.length
        ? items
        : [createElement<HTMLParagraphElement>('p', { textContent: 'Пустота' })]
      )
    );
    this.basketButton.disabled = !items.length;
  }

  updateBasketCounter(value: number) {
    this.headerBasketCounter.textContent = `${value}`;
  }

  setTotalSum(totalSum: number) {
    this.basketPrice.textContent = `${totalSum} синапсов`;
  }

  render() {
    this.basketTitle.textContent = 'Корзина';
    return this.container;
  }
}