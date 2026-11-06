from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from data import (
    APPOINTMENTS,
    CATEGORIES,
    SERVICES,
    create_appointment,
    get_category,
    get_service,
    init_db,
    services_count
)
from database import get_db
from models import Master


@asynccontextmanager
async def lifespan(app):
    init_db()
    yield


app = FastAPI(title="Салон красоты", lifespan=lifespan)


class AppointmentCreate(BaseModel):
    clientName: str = Field(min_length=1, max_length=100)
    masterId: int = Field(gt=0)
    serviceId: int = Field(gt=0)
    time: str = Field(pattern=r"^\d{2}:\d{2}$")


@app.get("/")
def read_root():
    return {"service": "Салон красоты", "docs": "/docs"}


@app.get("/masters")
def read_masters(specialization: str | None = None, db: Session = Depends(get_db)):
    query = select(Master)

    if specialization:
        query = query.where(Master.specialization == specialization)

    masters = db.scalars(query.order_by(Master.id)).all()
    return [master.to_dict() for master in masters]


@app.get("/masters/{master_id}")
def read_master(master_id: int, db: Session = Depends(get_db)):
    master = db.get(Master, master_id)
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
def add_appointment(payload: AppointmentCreate, db: Session = Depends(get_db)):
    master = db.get(Master, payload.masterId)

    if master is None:
        raise HTTPException(status_code=400, detail="Некорректные данные записи")

    appointment = create_appointment(
        payload.clientName,
        master.id,
        payload.serviceId,
        payload.time
    )
    if appointment is None:
        raise HTTPException(status_code=400, detail="Некорректные данные записи")
    return appointment.to_dict()
