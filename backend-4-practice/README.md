# Задание 4. Pydantic и услуги

REST API салона красоты на FastAPI. Услуги, категории и мастера хранятся в SQLite через SQLAlchemy, добавлена Pydantic-модель для создания услуги.

## Что работает

- `POST /services` - создание услуги с кодом 201;
- Pydantic-модель `ServiceCreate` проверяет поля:
  - `categoryId` - идентификатор существующей категории;
  - `title` и `desc` - не пустые, не длиннее 100 символов;
  - `duration` - от 30 до 180 минут;
  - `price` - больше 0;
- при некорректных данных возвращается 422;
- `GET /services` и `GET /services/{service_id}` - список и одна услуга;
- `GET /categories` и `GET /categories/{category_id}` - категории с количеством услуг;
- `GET /masters` и `GET /masters/{master_id}` - мастера;
- `GET /appointments` и `POST /appointments` - записи клиентов.

## Запуск

```
pip install -r requirements.txt
uvicorn main:app --reload
```

Документация: http://127.0.0.1:8000/docs

При первом запуске создаётся файл `salon.db` и таблицы заполняются начальными данными.

## Проверка

Корректный запрос:

```
POST /services
{
  "categoryId": 3,
  "title": "Наращивание ресниц",
  "desc": "Огромные ресницы уже через 30 минут",
  "duration": 30,
  "price": 1500.00
}
```

Ответ: 201.

Некорректный запрос с `"price": "бесплатно"` или с пустым `desc`, `duration: 0`, отрицательной ценой: ответ 422.

## Структура

- `main.py` - FastAPI-приложение и endpoint'ы;
- `database.py` - подключение к SQLite и сессии;
- `models.py` - модели SQLAlchemy;
- `schemas.py` - Pydantic-модели;
- `data.py` - начальные данные и бизнес-логика.

## Технологии

Python 3.14, FastAPI, Pydantic, SQLAlchemy, SQLite, Uvicorn.
