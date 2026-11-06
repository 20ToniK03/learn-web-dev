from sqlalchemy import Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class Master(Base):
    __tablename__ = "masters"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    specialization: Mapped[str] = mapped_column(String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "specialization": self.specialization
        }


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)

    services = relationship("Service", back_populates="category")

    def to_dict(self, services_count):
        return {
            "id": self.id,
            "name": self.name,
            "servicesCount": services_count
        }


class Service(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    desc: Mapped[str] = mapped_column("description", String(100), nullable=False)
    duration: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)

    category = relationship("Category", back_populates="services")

    def to_dict(self):
        return {
            "id": self.id,
            "categoryId": self.category_id,
            "title": self.title,
            "desc": self.desc,
            "duration": self.duration,
            "price": self.price
        }
