from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from potato_ornot import router as potato_router
from app import router as disease_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(potato_router)
app.include_router(disease_router)
