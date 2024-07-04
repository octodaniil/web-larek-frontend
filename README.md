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
- src/blocks/index.css — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении

Карточка

```
export interface ICard {
	likes: IUser[];
	_id: string;
	name: string;
	link: string;
	owner: IUser;
	createdAt: string;
}
```

Пользователь

```
export interface IUser {
	name: string;
	about: string;
	avatar: string;
	_id: string;
	cohort: string;
}
```

Интерфейс для модели данных карточек

```
export interface ICardsData {
	cards: ICard[];
	preview: string | null;
}
```

Данные карточки, используемые в форме при создании новой карточки

```
export type TCardInfo = Pick<ICard, 'name' | 'link'>;
```

Основные данные пользователя, которые можно редактировать

```
export type TUserPublicInfo = Pick<IUser, 'name' | 'about' | 'avatar'>;
```

Данные пользователя в форме редактирования профиля

```
export type TUserBaseInfo = Pick<IUser, 'name' | 'about'>;
```

Аватар пользователя

```
export type TUserAvatar = Pick<IUser, 'avatar'>;
```


## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP:
- слой представления, отвечает за отображение данных на странице,
- слой данных, отвечает за хранение и изменение данных
- презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы:
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

### Слой данных


### IProduct
Описание: Интерфейс, определяющий структуру данных для продукта.

Свойства:
- id: string: Уникальный идентификатор продукта.
- description: string: Описание продукта.
- image: string: URL изображения продукта.
- title: string: Название продукта.
- category: string: Категория продукта.
- price: number: Цена продукта.

### IProductsData
Описание: Интерфейс, определяющий состояние данных о продуктах.

Свойства:
- products: IProduct[]: Массив продуктов.
- preview: string | null: Идентификатор продукта, выбранного для предварительного просмотра.

### IProductsList
Описание: Интерфейс, определяющий структуру данных для списка продуктов.

Свойства:
- total: number: Общее количество продуктов.
- items: IProduct[]: Массив продуктов.

### IModal
Описание: Интерфейс, определяющий методы и свойства модального окна.

Свойства:
- modalContainer: HTMLElement: Контейнер модального окна.
- modalContent: HTMLElement: Содержимое модального окна.
- closeButton: HTMLElement: Кнопка закрытия модального окна.

Методы:
- open(): void: Открывает модальное окно.
- close(): void: Закрывает модальное окно.
- handleEscUp(evt: KeyboardEvent): void: Обработчик события нажатия клавиши Esc для закрытия модального окна.
- render(): HTMLElement: Возвращает HTML-элемент, представляющий модальное окно.

### IBasketData
Описание: Интерфейс, определяющий данные и методы для корзины.

Свойства:
- basketProducts: IProduct[]: Массив продуктов, добавленных в корзину.

Методы:
- getTotalSum(): number: Возвращает общую сумму продуктов в корзине.
- getCounter(): number: Возвращает количество продуктов в корзине.
- addSelectedProduct(data: IProduct): void: Добавляет выбранный продукт в корзину.
- clearBasket(): void: Очищает корзину.
- removeProductFromBasket(product: string): void: Удаляет продукт из корзины.

### IBasket
Описание: Интерфейс, определяющий структуру и методы для компонента корзины.

Свойства:
- basket: HTMLElement: Контейнер для корзины.
- basketTitle: HTMLElement: Заголовок корзины.
- basketList: HTMLElement: Список продуктов в корзине.
- basketButton: HTMLButtonElement: Кнопка корзины.
- basketPrice: HTMLElement: Элемент для отображения общей суммы корзины.
- headerBasketButton: HTMLButtonElement: Кнопка корзины в header.
- headerBasketCounter: HTMLElement: Элемент для отображения количества продуктов в корзине.

Методы:
- updateBasketCounter(value: number): void: Обновляет счётчик количества продуктов в корзине.
- setTotalSum(totalSum: number): void: Устанавливает общую сумму продуктов в корзине.
- render(): HTMLElement: Возвращает HTML-элемент, представляющий компонент корзины.

### IBasketItem
Описание: Интерфейс, определяющий структуру и методы для элемента корзины.

Свойства:
- basketItem: HTMLElement: Контейнер для элемента корзины.
- index: HTMLElement: Элемент для отображения индекса продукта.
- basketCardTitle: HTMLElement: Элемент для отображения названия продукта.
- basketCardPrice: HTMLElement: Элемент для отображения цены продукта.
- basketCardButtonDelete: HTMLButtonElement: Кнопка для удаления продукта из корзины.

Методы:
- render(data: IProduct, item: number): HTMLElement: Возвращает HTML-элемент, представляющий элемент корзины.

### Errors
Описание: Тип, определяющий структуру ошибок для формы заказа.

Тип: Partial<Record<keyof IOrderData, string>>

### IOrderForm
Описание: Интерфейс, определяющий структуру и методы для формы заказа.

Свойства:
- orderForm: HTMLFormElement: Форма заказа.
- payment: string: Выбранный метод оплаты.
- errors: HTMLElement: Элемент для отображения ошибок.
- buttons: HTMLButtonElement[]: Кнопки формы.

Методы:
- render(): HTMLElement: Возвращает HTML-элемент, представляющий форму заказа.

### IOrderData
Описание: Интерфейс, определяющий структуру данных для заказа.

Свойства:
- payment: string: Выбранный метод оплаты.
- address: string: Адрес доставки.
- phone: string: Номер телефона.
- email: string: Электронная почта.
- total: number: Общая сумма заказа.
- items: string[]: Список идентификаторов продуктов в заказе.

Методы:
- setOrderForm(fieldAndValue: { field: string; value: string }): void: Устанавливает значение для поля формы заказа.
- validateOrderForm(): boolean: Проверяет валидность формы заказа.
- setContactForm(fieldAndValue: { field: string; value: string }): void: Устанавливает значение для поля формы контактов.
- validateContactForm(): boolean: Проверяет валидность формы контактов.
- getPurchase(): object: Возвращает объект с данными для оформления покупки.

### IContactsForm
Описание: Интерфейс, определяющий структуру и методы для формы контактов.

Свойства:
- contactsForm: HTMLFormElement: Форма контактов.
- inputs: HTMLInputElement[]: Массив полей ввода.
- submitButton: HTMLButtonElement: Кнопка отправки формы.
- errors: HTMLElement: Элемент для отображения ошибок.

Методы:
- render(): HTMLElement: Возвращает HTML-элемент, представляющий форму контактов.

### IOrderFinal
Описание: Интерфейс, определяющий структуру и методы для финального экрана заказа.

Свойства:
- final: HTMLElement: Контейнер для финального экрана.
- description: HTMLElement: Элемент для отображения описания.
- button: HTMLButtonElement: Кнопка для возврата на главную страницу.

Методы:
- render(total: number): HTMLElement: Возвращает HTML-элемент, представляющий финальный экран заказа.