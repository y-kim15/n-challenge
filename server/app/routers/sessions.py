from fastapi import APIRouter, Depends, HTTPException
from ..dependencies import check_cookies
from ..models import SessionModel, RecordModel
from ..database.mongo_db import MongoDB, get_db
from ..env import get_env
import secrets


router = APIRouter(
    prefix = "/sessions",
    tages = ["sessions"],
    responses = {404: {"description": "Not found"}}
)

DOMAIN = get_env().domain

@router.get(
    "/", 
    response_description = "Get all previous records",
    response_model = List[RecordModel],
)#@cache(expire=30)
async def get_all(request: Request, cookie: str, db: MongoDB = Depends(get_db)):
    result = None
    if (results := await db.get_all_matching_records(cookie)) is not None:
        return results
    raise HTTPException(status_code=404, detail=f"No Records with Session {id} found")


@router.post("/", response_description="Register a new session")
async def create_session(response: Response, db: MongoDB = Depends(get_db)):
    # for real, to use jwt to use encrypted version
    rand = secrets.token_urlsafe(16)
    
    session = SessionModel()
    session.cookie = rand
    session.url = []
    session.build()
    
    new_user = await db.add_session(session)
    response.set_cookie(
        "Accessed",
        value=rand,
        domain=DOMAIN,
        httponly=True,
        max_age=3600,
        expires=3600
    )
    return response
