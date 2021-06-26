from pydantic import BaseSettings
from functools import lru_cache

class Env(BaseSettings):
    app_name: str = "Text Search Server"
    domain: str
    redis_url: str
    mongodb_url: str
    
    class Env:
        env_file = ".env"

@lru_cache()
def get_env():
    return Env()