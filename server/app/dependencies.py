from typing import Optional
from fastapi import Header, HTTPException, Request

async def check_cookies(request: Request, cookie: Optional[str]):
    if cookie is None:
        raise HTTPException(status_code=400, detail="Invalid request without session")
