import { IContactsForm } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class ContactsForm extends Component<IContactsForm> {
  inputs: HTMLInputElement[];
  submitButton: HTMLButtonElement;
  errors: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container)
    this.inputs = Array.from(this.container.querySelectorAll('.form__input'));
    this.submitButton = ensureElement<HTMLButtonElement>('.button', this.container);
    this.errors = ensureElement<HTMLElement>('.form__errors', this.container);

    this.inputs.forEach(item => {
      item.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        this.events.emit('contacts:inputChange', { field: name, value });
      });
    });

    this.container.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('final:open');
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  render() {
    return this.container
  }
}