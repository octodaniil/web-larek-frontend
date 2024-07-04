import { IModal } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Modal extends Component<IModal> {
  protected modalContainer: HTMLElement;
  protected modalContent: HTMLElement;
  protected closeButton: HTMLElement;
  protected wrapper: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.events = events;
    this.modalContainer = this.container;
    this.modalContent = this.modalContainer.querySelector('.modal__content');
    this.closeButton = this.modalContainer.querySelector('.modal__close');
    this.wrapper = document.querySelector('.page__wrapper');
    this.closeButton.addEventListener('click', this.close.bind(this));

    this.container.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    this.handleEscUp = this.handleEscUp.bind(this);
  }

  set content(content: HTMLElement) {
    this.modalContent.replaceChildren(content);
  }

  set locked(value: boolean) {
    if (value) {
      this.wrapper.classList.add('page__wrapper_locked');
    } else {
      this.wrapper.classList.remove('page__wrapper_locked');
    }
  }

  open() {
    this.modalContainer.classList.add("modal_active");
    document.addEventListener("keyup", this.handleEscUp);
    this.events.emit('modal:open');
  }

  close() {
    this.modalContainer.classList.remove("modal_active");
    this.content = null;
    document.removeEventListener("keyup", this.handleEscUp);
    this.events.emit('modal:close');
  }

  handleEscUp(evt: KeyboardEvent) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  render(): HTMLElement {
    this.modalContent;
    this.open();
    return this.container;
  }
}