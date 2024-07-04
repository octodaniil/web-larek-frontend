import { IOrderFinal } from "../types";
import { IEvents } from "./base/events";

export class OrderFinal implements IOrderFinal {
  final: HTMLElement;
  description: HTMLElement;
  button: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.final = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
    this.description = this.final.querySelector('.order-success__description');
    this.button = this.final.querySelector('.order-success__close');

    this.button.addEventListener('click', () => { events.emit('final:close') });
  }

  render(total: number) {
    this.description.textContent = String(`Списано ${total} синапсов`);
    return this.final
  }
}