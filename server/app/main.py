from fastapi import APIRouter
from fastapi_redis_cache import FastApiRedisCache, cache
import uvicorn

from routers import records, sessions
from database import db
from config import get_settings

app = APIRouter()

#REDIS_URL = "redis://127.0.0.1:6379"
# @router.on_event("startup")
# def startup():
#     cache = FastApiRedisCache()
#     cache.init(
#         host_url=os.environ.get("REDIS_URL", REDIS_URL),
#         #prefix="nate-cache",
#         response_header="X-Nate-Cache",
#         ignore_arg_types=[Request, Response, Session]
#     )

app.include_router(
    records.router,
    prefix = "/records",
    tags = ["records"],
    responses = {404: {"description": "Not found"}},
)
    
app.include_router(
    sessions.router,
    prefix = "/sessions",
    tags = ["sessions"],
    responses = {404: {"description": "Not found"}},
)
    

@app.on_event("startup")
async def startup():
    env = get_settings()
    await db.connect(url=env.mongo_url)

@app.on_event("shutdown")
async def shutdown():
    await db.close()

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)