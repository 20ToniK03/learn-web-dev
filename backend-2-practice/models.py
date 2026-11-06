class Master:
    def __init__(self, master_id, name, specialization):
        self.master_id = master_id
        self.name = name
        self.specialization = specialization

    def to_dict(self):
        return {
            "id": self.master_id,
            "name": self.name,
            "specialization": self.specialization
        }


class Category:
    def __init__(self, category_id, name):
        self.category_id = category_id
        self.name = name

    def to_dict(self, services_count):
        return {
            "id": self.category_id,
            "name": self.name,
            "servicesCount": services_count
        }


class Service:
    def __init__(self, service_id, category_id, title, desc, duration, price):
        self.service_id = service_id
        self.category_id = category_id
        self.title = title
        self.desc = desc
        self.duration = duration
        self.price = price

    def to_dict(self):
        return {
            "id": self.service_id,
            "categoryId": self.category_id,
            "title": self.title,
            "desc": self.desc,
            "duration": self.duration,
            "price": self.price
        }


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
