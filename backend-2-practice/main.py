from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from data import (
    APPOINTMENTS,
    CATEGORIES,
    MASTERS,
    SERVICES,
    create_appointment,
    get_category,
    get_master,
    get_service,
    services_count
)

app = FastAPI(title="Салон красоты")


class AppointmentCreate(BaseModel):
    clientName: str = Field(min_length=1, max_length=100)
    masterId: int = Field(gt=0)
    serviceId: int = Field(gt=0)
    time: str = Field(pattern=r"^\d{2}:\d{2}$")


@app.get("/")
def read_root():
    return {"service": "Салон красоты", "docs": "/docs"}


@app.get("/masters")
def read_masters():
    return [master.to_dict() for master in MASTERS]


@app.get("/masters/{master_id}")
def read_master(master_id: int):
    master = get_master(master_id)
    if master is None:
        raise HTTPException(status_code=404, detail="Master not found")
    return master.to_dict()


@app.get("/categories")
def read_categories():
    return [category.to_dict(services_count(category.category_id)) for category in CATEGORIES]


@app.get("/categories/{category_id}")
def read_category(category_id: int):
    category = get_category(category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category.to_dict(services_count(category.category_id))


@app.get("/services")
def read_services():
    return [service.to_dict() for service in SERVICES]


@app.get("/services/{service_id}")
def read_service(service_id: int):
    service = get_service(service_id)
    if service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return service.to_dict()


@app.get("/appointments")
def read_appointments():
    return [appointment.to_dict() for appointment in APPOINTMENTS]


@app.post("/appointments", status_code=201)
def add_appointment(payload: AppointmentCreate):
    appointment = create_appointment(
        payload.clientName,
        payload.masterId,
        payload.serviceId,
        payload.time
    )
    if appointment is None:
        raise HTTPException(status_code=400, detail="Некорректные данные записи")
    return appointment.to_dict()
