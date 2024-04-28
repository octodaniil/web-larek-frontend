import { IOrder, IProduct } from "../types/index";

class Order implements IOrder {
  constructor(
    public payment: string,
    public email: string,
    public phone: string,
    public address: string,
    public total: number,
    public items: IProduct[]) {
    this.payment = payment;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.total = total;
    this.items = items;
  }
}

export default Order;