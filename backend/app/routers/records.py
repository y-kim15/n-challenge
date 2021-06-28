from fastapi import APIRouter, Depends, HTTPException, Cookie, Query
from fastapi.encoders import jsonable_encoder
from typing import Optional
from datetime import datetime
from .dependencies import check_cookies
from ..solver import count_from_url, sort_result
from ..database import MongoDB, get_db
from ..database.models import RecordModel
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class URLParams(BaseModel):
    url: str
    sort: Optional[str] = "lex"
    order: Optional[int] = 1
    
@router.get(
    "/",
    dependencies = [Depends(check_cookies)],
    response_description = "Returns computed text count for givne url",
    response_model = RecordModel
) #@cache_one_hour() #async
def get_result(url: str = Query(None),
                     sort: Optional[str] = "alp",
                     order: Optional[int] = 1, cookie: str=Cookie(None),
                     db: MongoDB = Depends(get_db)):
    
    output_dict = count_from_url(url, sort, order)
    # generate record id and send with the output 
    record = RecordModel()
    record.url = url
    record.cookie = cookie
    record.results = jsonable_encoder(output_dict)
    record.date = datetime.now()
    record.build()
    record = jsonable_encoder(record)
    #created_record = await db.add_record(record)
    #_ = await db.update_user(cookie, created_record.id)
    return record #created_record
    
@router.get(
    "/{record_id}",
    dependencies = [Depends(check_cookies)],
    response_description = "Get a record by id",
    response_model = RecordModel
) #@cache_one_hour()
async def read_record(record_id:str,  sort: Optional[str] = "alp",
                     order: Optional[int] = 0, cookie: str=Cookie(None), db: MongoDB = Depends(get_db)):
    if (record := await db.get_record(record_id)) is not None:
        record.results = sort_result(record.results, sort, order)
        return record
    raise HTTPException(status_code=404, detail=f"Record {id} not found")
