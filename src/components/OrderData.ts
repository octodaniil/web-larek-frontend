import { IEvents } from './base/events';
import { Errors, IOrderData } from '../types/index'

export class OrderData implements IOrderData {
  payment: string;
  address: string;
  phone: string;
  email: string;
  total: number;
  items: string[];
  Errors: Errors = {};

  constructor(protected events: IEvents) {
    this.payment = '';
    this.address = '';
    this.phone = '';
    this.email = '';
    this.total = 0;
    this.items = [];
  }

  setOrderForm(fieldAndValue: { field: string; value: string }) {
    const { field, value } = fieldAndValue;
    if (field === 'address') {
      this.address = value;
    }

    if (this.validateOrderForm()) {
      this.events.emit('order:done', this.getPurchase());
    }
  }

  validateOrderForm() {
    this.Errors = {
      address: !this.address ? 'Укажите адрес' : '',
      payment: !this.payment ? 'Выберите способ оплаты' : '',
    };
    this.events.emit('errors:orderForm', this.Errors);
    return Object.keys(this.Errors).length === 0;
  }

  setContactForm(fieldAndValue: { field: string; value: string }) {
    const { field, value } = fieldAndValue;
    switch (field) {
      case 'email':
        this.email = value;
        break;
      case 'phone':
        this.phone = value;
        break;
    }

    if (this.validateContactForm()) {
      this.events.emit('order:done', this.getPurchase());
    }
  }

  validateContactForm(): boolean {
    const regexpEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexpPhone = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;

    this.Errors = {
      email: this.email ? (regexpEmail.test(this.email) ? null : 'Некорректный адрес электронной почты') : 'Укажите email',
      phone: this.phone ? (regexpPhone.test(this.phone) ? null : 'Некорректный номер телефона') : 'Укажите телефон',
    };

    this.events.emit('errors:inputChange', this.Errors);
    return !this.Errors.email && !this.Errors.phone;
  }


  getPurchase() {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
      total: this.total,
      items: this.items,
    }
  }
}