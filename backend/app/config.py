from pydantic import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    app_name: str = "Text Search Server"
    domain: str = "127.0.0.1"
    database_name: str
    mongo_url: str
    #redis_url: str
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()