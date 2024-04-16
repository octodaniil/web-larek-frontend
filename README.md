# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

## Сборка

```
npm run build
```

## Описание структуры

1. Модели данных:

 - ProductList:
   - Данные:
    - total: number - общее количество товаров
    - items: IProduct[] - массив товаров
   - Методы:
    - getProduct(productId: string): IProduct - получение товара по id

 - Product:
   - Данные:
    - id: string - айди товара
    - title: string - заголовок товара
    - description: string - описание товара
    - image: string - ссылка на картинку товара
    - category: string - категория товара
    - price: number - цена товара
   - Методы:
    - addProductToBasket(productId: string): void - добавление товара в коризну
    - removeProductFromBasket(productId: string): void - удаление товара из корзины

- Basket:
   - Данные:
    - total: number - сумма заказа
    - items: IProduct[] - список товаров
  - Методы:
    - checkout(): void - оформление заказа

 - Order:
   - Данные:
    - payment: string - способ оплаты заказа
    - email: string - адрес электронной почты
    - phone: string - номер телефона
    - address: string - адрес
    - total: number - сумма заказа
    - items: IProduct[] - список товаров
  - Методы: