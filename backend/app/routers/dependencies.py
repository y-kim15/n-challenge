from typing import Optional
from fastapi import Header, HTTPException, Request
from urllib.parse import unquote

async def check_cookies(request: Request, cookie: Optional[str]):
    if cookie is None:
        raise HTTPException(status_code=400, detail="Invalid request without session")

async def decode_url(request: Request):
     encoded = request.query_params["url"]
     print(f"encoded {encoded}")
     request.query_params["url"] = unquote(encoded)
     return request
    
    
