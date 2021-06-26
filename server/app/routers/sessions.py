from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi.encoders import jsonable_encoder
from typing import List
import secrets

from dependencies import check_cookies
from database import MongoDB, get_db
from database.models import SessionModel, RecordModel
from config import get_settings



router = APIRouter()

DOMAIN = get_settings().domain

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


@router.get("/token", response_description="Register a new session")
async def create_session(response: Response, db: MongoDB = Depends(get_db)):
    # for real, to use jwt to use encrypted version
    rand = secrets.token_urlsafe(16)
    
    session = SessionModel()
    session.cookie = rand
    session.urls = []
    session.build()
    session = jsonable_encoder(session)
    #new_user = await db.add_session(session)
    response.set_cookie(
        "Accessed",
        value=rand,
        domain=DOMAIN,
        httponly=True,
        max_age=3600,
        expires=3600
    )
    return response
