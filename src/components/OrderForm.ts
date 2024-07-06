import { IOrderForm } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class OrderForm extends Component<IOrderForm> {
  orderButton: HTMLButtonElement;
  buttons: HTMLButtonElement[];
  errors: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container)
    this.orderButton = ensureElement<HTMLButtonElement>('.order__button', this.container);
    this.buttons = Array.from(this.container.querySelectorAll('.button_alt'));
    this.errors = ensureElement<HTMLElement>('.form__errors', this.container);

    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        this.payment = button.name;
        this.events.emit('order:payment', button);
      });
    });

    this.container.addEventListener('input', (event: Event) => {
      const { name, value } = event.target as HTMLInputElement;
      this.events.emit('order:address', { field: name, value });
    });

    this.container.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('contactsForm:open');
    });
  }

  set payment(paymentOption: string) {
    this.buttons.forEach(item => {
      item.classList.toggle('button_alt-active', item.name === paymentOption);
    })
  }

  set valid(value: boolean) {
    this.orderButton.disabled = !value;
  }

  render() {
    return this.container
  }
}