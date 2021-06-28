from .mongo_db import MongoDB

db = MongoDB()

async def get_db() -> MongoDB:
    return db