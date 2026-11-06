from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from data import APPOINTMENTS, Appointment, init_db, is_working_time
from database import get_db
from models import Category, Master, Service
from schemas import AppointmentCreate, ServiceCreate, ServiceRead


@asynccontextmanager
async def lifespan(app):
    init_db()
    yield


app = FastAPI(title="Салон красоты", lifespan=lifespan)


def services_count(db, category_id):
    query = select(func.count()).select_from(Service).where(Service.category_id == category_id)
    return db.scalar(query)


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
def read_categories(db: Session = Depends(get_db)):
    categories = db.scalars(select(Category).order_by(Category.id)).all()
    return [category.to_dict(services_count(db, category.id)) for category in categories]


@app.get("/categories/{category_id}")
def read_category(category_id: int, db: Session = Depends(get_db)):
    category = db.get(Category, category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category.to_dict(services_count(db, category.id))


@app.get("/services")
def read_services(db: Session = Depends(get_db)):
    services = db.scalars(select(Service).order_by(Service.id)).all()
    return [service.to_dict() for service in services]


@app.get("/services/{service_id}")
def read_service(service_id: int, db: Session = Depends(get_db)):
    service = db.get(Service, service_id)
    if service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return service.to_dict()


@app.post("/services", response_model=ServiceRead, status_code=201)
def create_service(payload: ServiceCreate, db: Session = Depends(get_db)):
    category = db.get(Category, payload.categoryId)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")

    service = Service(
        category_id=payload.categoryId,
        title=payload.title,
        desc=payload.desc,
        duration=payload.duration,
        price=payload.price
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service.to_dict()


@app.get("/appointments")
def read_appointments():
    return [appointment.to_dict() for appointment in APPOINTMENTS]


@app.post("/appointments", status_code=201)
def add_appointment(payload: AppointmentCreate, db: Session = Depends(get_db)):
    master = db.get(Master, payload.masterId)
    service = db.get(Service, payload.serviceId)

    if master is None or service is None or not is_working_time(payload.time):
        raise HTTPException(status_code=400, detail="Некорректные данные записи")

    appointment = Appointment(
        len(APPOINTMENTS) + 1,
        payload.clientName.strip(),
        master.id,
        service.id,
        payload.time
    )
    APPOINTMENTS.append(appointment)
    return appointment.to_dict()
