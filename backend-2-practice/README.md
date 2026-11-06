# Задание 2. Категории услуг

REST API салона красоты на FastAPI. Услуги сгруппированы по категориям, добавлены endpoint'ы для категорий.

## Что работает

- `GET /categories` - список категорий с количеством услуг `servicesCount`;
- `GET /categories/{category_id}` - информация о категории;
- если категория не найдена, возвращается 404 с текстом `Category not found`;
- `GET /masters` и `GET /masters/{master_id}` - мастера;
- `GET /services` и `GET /services/{service_id}` - услуги;
- `GET /appointments` и `POST /appointments` - записи клиентов;
- запись создаётся только с 08:00 до 20:00.

## Запуск

```
pip install -r requirements.txt
uvicorn main:app --reload
```

Документация: http://127.0.0.1:8000/docs

## Структура

- `main.py` - FastAPI-приложение и endpoint'ы;
- `models.py` - классы предметной области;
- `data.py` - данные и бизнес-логика.

## Технологии

Python 3.14, FastAPI, Pydantic, Uvicorn.
