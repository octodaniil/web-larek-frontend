import { IProduct } from "../types/index";

class Product implements IProduct {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public image: string,
    public category: string,
    public price: number,) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.category = category;
    this.price = price;
  }
}

export default Product;