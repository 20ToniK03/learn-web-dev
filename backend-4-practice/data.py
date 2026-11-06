from datetime import datetime

from sqlalchemy import select

from database import Base, SessionLocal, engine
from models import Category, Master, Service

SALON_OPEN_MINUTES = 8 * 60
SALON_CLOSE_MINUTES = 20 * 60

APPOINTMENTS = []

CATEGORIES = [
    Category(id=1, name="Стрижки и укладки"),
    Category(id=2, name="Маникюр и педикюр"),
    Category(id=3, name="Брови и ресницы"),
    Category(id=4, name="Спа-процедуры")
]

SERVICES = [
    Service(id=1, category_id=1, title="Женская стрижка", desc="Стрижка с укладкой", duration=60, price=2500.0),
    Service(id=2, category_id=1, title="Мужская стрижка", desc="Классическая мужская стрижка", duration=45, price=1800.0),
    Service(id=3, category_id=1, title="Укладка", desc="Вечерняя укладка", duration=40, price=1500.0),
    Service(id=4, category_id=1, title="Окрашивание", desc="Окрашивание в один тон", duration=120, price=4500.0),
    Service(id=5, category_id=1, title="Детская стрижка", desc="Стрижка для детей до 12 лет", duration=30, price=1200.0),
    Service(id=6, category_id=2, title="Маникюр", desc="Классический маникюр", duration=60, price=2000.0),
    Service(id=7, category_id=2, title="Педикюр", desc="Классический педикюр", duration=90, price=3000.0),
    Service(id=8, category_id=2, title="Гель-лак", desc="Покрытие гель-лаком", duration=60, price=2500.0),
    Service(id=9, category_id=2, title="Наращивание ногтей", desc="Наращивание ногтей гелем", duration=120, price=4000.0),
    Service(id=10, category_id=2, title="Снятие покрытия", desc="Снятие гель-лака", duration=30, price=800.0),
    Service(id=11, category_id=3, title="Коррекция бровей", desc="Коррекция формы бровей", duration=30, price=1000.0),
    Service(id=12, category_id=3, title="Окрашивание бровей", desc="Окрашивание бровей краской", duration=40, price=1200.0),
    Service(id=13, category_id=3, title="Наращивание ресниц", desc="Классическое наращивание ресниц", duration=90, price=2500.0),
    Service(id=14, category_id=3, title="Ламинирование ресниц", desc="Ламинирование и окрашивание", duration=60, price=2200.0),
    Service(id=15, category_id=4, title="Общий массаж", desc="Расслабляющий массаж тела", duration=60, price=3500.0),
    Service(id=16, category_id=4, title="Массаж лица", desc="Массаж лица и шеи", duration=40, price=2000.0),
    Service(id=17, category_id=4, title="Скраб для тела", desc="Очищающий скраб", duration=30, price=1500.0),
    Service(id=18, category_id=4, title="Обёртывание", desc="Питательное обёртывание", duration=60, price=2800.0)
]

MASTERS = [
    Master(id=1, name="Анна", specialization="Парикмахер"),
    Master(id=2, name="Мария", specialization="Визажист"),
    Master(id=3, name="Ольга", specialization="Парикмахер"),
    Master(id=4, name="Елена", specialization="Мастер маникюра")
]


class Appointment:
    def __init__(self, appointment_id, client_name, master_id, service_id, time):
        self.id = appointment_id
        self.client_name = client_name
        self.master_id = master_id
        self.service_id = service_id
        self.time = time

    def to_dict(self):
        return {
            "id": self.id,
            "clientName": self.client_name,
            "masterId": self.master_id,
            "serviceId": self.service_id,
            "time": self.time
        }


def init_db():
    Base.metadata.create_all(bind=engine)

    with SessionLocal() as db:
        if db.scalar(select(Category.id).limit(1)) is None:
            db.add_all(CATEGORIES)
            db.commit()

        if db.scalar(select(Master.id).limit(1)) is None:
            db.add_all(MASTERS)
            db.commit()

        if db.scalar(select(Service.id).limit(1)) is None:
            db.add_all(SERVICES)
            db.commit()


def is_working_time(value):
    try:
        parsed = datetime.strptime(value, "%H:%M")
    except (TypeError, ValueError):
        return False

    minutes = parsed.hour * 60 + parsed.minute
    return SALON_OPEN_MINUTES <= minutes <= SALON_CLOSE_MINUTES
