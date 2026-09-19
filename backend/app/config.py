from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://bob:bob@localhost:5432/bob"
    secret_key: str = "change-me-to-a-random-secret"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    class Config:
        env_file = ".env"


settings = Settings()
