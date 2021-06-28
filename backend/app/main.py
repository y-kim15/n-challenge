from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles
from fastapi_redis_cache import FastApiRedisCache, cache
import uvicorn
import logging

from .routers import records, sessions
from .database import db
from .config import get_settings

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
origins = [
    "http://localhost:*",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# code can be extended to save responses in cache in redis rather than querying database
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
    #await db.connect(url=env.mongo_url)
    logger = logging.getLogger("uvicorn.access")
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))
    logger.addHandler(handler)
    logger.setLevel(logging.DEBUG)

@app.on_event("shutdown")
async def shutdown():
    pass
    #await db.close()

@app.get("/")
async def root():
    return {"message": "Hello Simple Text Counter App"}

if __name__ == "__main__":
    
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888, log_level='trace')