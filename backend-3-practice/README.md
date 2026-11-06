# Задание 3. SQLAlchemy и мастера

REST API салона красоты на FastAPI. Мастера хранятся в SQLite через SQLAlchemy, остальные данные остаются в памяти.

## Что работает

- `GET /masters` - список всех мастеров из базы данных;
- `GET /masters?specialization=Парикмахер` - фильтр по специализации;
- `GET /masters/{master_id}` - один мастер по id;
- если мастер не найден, возвращается 404 с текстом `Master not found`;
- `GET /categories` и `GET /categories/{category_id}` - категории услуг;
- `GET /services` и `GET /services/{service_id}` - услуги;
- `GET /appointments` и `POST /appointments` - записи клиентов.

## Запуск

```
pip install -r requirements.txt
uvicorn main:app --reload
```

Документация: http://127.0.0.1:8000/docs

При первом запуске создаётся файл `salon.db` и таблица `masters` заполняется мастерами.

## Структура

- `main.py` - FastAPI-приложение и endpoint'ы;
- `database.py` - подключение к SQLite и сессии;
- `models.py` - модель `Master` и классы предметной области;
- `data.py` - данные, инициализация базы и бизнес-логика.

## Технологии

Python 3.14, FastAPI, Pydantic, SQLAlchemy, SQLite, Uvicorn.
