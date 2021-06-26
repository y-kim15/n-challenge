from fastapi import APIRouter
from fastapi_redis_cache import FastApiRedisCache, cache

from routers import records, sessions
from .database.mongo_db import MongoDB
from .env import get_env

app = APIRouter()
db = None

REDIS_URL = "redis://127.0.0.1:6379"
# @router.on_event("startup")
# def startup():
#     cache = FastApiRedisCache()
#     cache.init(
#         host_url=os.environ.get("REDIS_URL", REDIS_URL),
#         #prefix="nate-cache",
#         response_header="X-Nate-Cache",
#         ignore_arg_types=[Request, Response, Session]
#     )

app.include_router(records.router)
app.include_router(sessions.router)
    

@app.on_event("startup")
async def startup():
    env = get_env()
    db = await MongoDB.connect(env=env.mongo_url)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}