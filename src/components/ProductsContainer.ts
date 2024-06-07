import { Component } from "./base/Component";

interface IProductsContainer {
  gallery: HTMLElement[];
}

export class ProductsContainer extends Component<IProductsContainer>{
  protected _gallery: HTMLElement;

  constructor(protected container: HTMLElement) {
    super(container)
  }

  set gallery(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}