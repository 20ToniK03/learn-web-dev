from dataclasses import dataclass
from datetime import datetime

SALON_OPEN_MINUTES = 8 * 60
SALON_CLOSE_MINUTES = 20 * 60


@dataclass(frozen=True)
class Master:
    master_id: int
    name: str
    specialization: str


@dataclass(frozen=True)
class Service:
    service_id: int
    category_id: int
    title: str
    desc: str
    duration: int
    price: float


MASTERS = [
    Master(1, "Анна", "Парикмахер"),
    Master(2, "Мария", "Визажист"),
    Master(3, "Ольга", "Парикмахер"),
    Master(4, "Елена", "Мастер маникюра")
]

SERVICES = [
    Service(1, 1, "Женская стрижка", "Стрижка с укладкой", 60, 2500.0),
    Service(2, 1, "Мужская стрижка", "Классическая мужская стрижка", 45, 1800.0),
    Service(3, 1, "Укладка", "Вечерняя укладка", 40, 1500.0),
    Service(4, 1, "Окрашивание", "Окрашивание в один тон", 120, 4500.0),
    Service(5, 1, "Детская стрижка", "Стрижка для детей до 12 лет", 30, 1200.0),
    Service(6, 2, "Маникюр", "Классический маникюр", 60, 2000.0),
    Service(7, 2, "Педикюр", "Классический педикюр", 90, 3000.0),
    Service(8, 2, "Гель-лак", "Покрытие гель-лаком", 60, 2500.0),
    Service(9, 2, "Наращивание ногтей", "Наращивание ногтей гелем", 120, 4000.0),
    Service(10, 2, "Снятие покрытия", "Снятие гель-лака", 30, 800.0),
    Service(11, 3, "Коррекция бровей", "Коррекция формы бровей", 30, 1000.0),
    Service(12, 3, "Окрашивание бровей", "Окрашивание бровей краской", 40, 1200.0),
    Service(13, 3, "Наращивание ресниц", "Классическое наращивание ресниц", 90, 2500.0),
    Service(14, 3, "Ламинирование ресниц", "Ламинирование и окрашивание", 60, 2200.0),
    Service(15, 4, "Общий массаж", "Расслабляющий массаж тела", 60, 3500.0),
    Service(16, 4, "Массаж лица", "Массаж лица и шеи", 40, 2000.0),
    Service(17, 4, "Скраб для тела", "Очищающий скраб", 30, 1500.0),
    Service(18, 4, "Обёртывание", "Питательное обёртывание", 60, 2800.0)
]

appointments = []


def get_master(master_id):
    return next((master for master in MASTERS if master.master_id == master_id), None)


def get_service(service_id):
    return next((service for service in SERVICES if service.service_id == service_id), None)


class Appointment:
    def __init__(self, appointment_id, client_name, master_id, service_id, time):
        self.id = appointment_id
        self.client_name = client_name
        self.master_id = master_id
        self.service_id = service_id
        self.time = time

    def __repr__(self):
        return f"Appointment(id={self.id}, client_name={self.client_name!r}, time={self.time!r})"


def is_working_time(value):
    try:
        parsed = datetime.strptime(value, "%H:%M")
    except (TypeError, ValueError):
        return False

    minutes = parsed.hour * 60 + parsed.minute
    return SALON_OPEN_MINUTES <= minutes <= SALON_CLOSE_MINUTES


def create_appointment(client_name, master_id, service_id, time):
    master = get_master(master_id)
    service = get_service(service_id)

    if master is None or service is None:
        return None

    if not isinstance(client_name, str) or not client_name.strip():
        return None

    if not is_working_time(time):
        return None

    appointment = Appointment(
        len(appointments) + 1,
        client_name.strip(),
        master.master_id,
        service.service_id,
        time
    )
    appointments.append(appointment)
    return appointment


if __name__ == "__main__":
    first_appointment = create_appointment("Иванова А.А.", 1, 1, "10:00")
    second_appointment = create_appointment("Петрова А.А.", 1, 1, "11:00")

    print("Список записей:")
    for appointment in appointments:
        print(appointment.client_name, appointment.time)

    no_correct_appointment = create_appointment("", 1, 1, "12:00")
    print("Некорректная запись:", no_correct_appointment)
    print("Всего записей:", len(appointments))

    no_correct_time = create_appointment("Сидорова А.А.", 1, 1, "00:00")
    print("Запись вне рабочих часов:", no_correct_time)
    print("Всего записей:", len(appointments))
