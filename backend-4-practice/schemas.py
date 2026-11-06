from pydantic import BaseModel, Field, field_validator


class ServiceCreate(BaseModel):
    categoryId: int = Field(gt=0)
    title: str = Field(min_length=1, max_length=100)
    desc: str = Field(min_length=1, max_length=100)
    duration: int = Field(ge=30, le=180)
    price: float = Field(gt=0)

    @field_validator("title", "desc")
    @classmethod
    def check_not_blank(cls, value):
        value = value.strip()
        if not value:
            raise ValueError("Поле не может быть пустым")
        return value


class ServiceRead(BaseModel):
    id: int
    categoryId: int
    title: str
    desc: str
    duration: int
    price: float


class AppointmentCreate(BaseModel):
    clientName: str = Field(min_length=1, max_length=100)
    masterId: int = Field(gt=0)
    serviceId: int = Field(gt=0)
    time: str = Field(pattern=r"^\d{2}:\d{2}$")
