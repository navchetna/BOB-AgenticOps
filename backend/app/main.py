from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import auth, forms

Base.metadata.create_all(bind=engine)

app = FastAPI(title="BOB API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(forms.router)


@app.get("/health")
def health():
    return {"status": "ok"}
