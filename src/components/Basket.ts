import { IEvents } from "./base/events";
import { createElement } from "../utils/utils";
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
    this.basketTitle = this.container.querySelector('.modal__title');
    this.basketList = this.container.querySelector('.basket__list');
    this.basketButton = this.container.querySelector('.basket__button');
    this.basketPrice = this.container.querySelector('.basket__price');
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
    this.basketButton.classList.toggle('disabled', !items.length);
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