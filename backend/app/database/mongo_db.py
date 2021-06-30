import logging
import os
from typing import List
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from .models import RecordModel, SessionModel
from config import get_settings


env = get_settings()

class MongoDB():
    mongo_client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None
    
    async def connect(self, url) -> AsyncIOMotorDatabase:
        self.client = AsyncIOMotorClient(
            url,
            maxPoolSize=15,
            minPoolSize=10,
        )
        
        self.db = self.client[env.database_name]
        #return db
    
    async def close(self):
        self.client.close()
        logging.info("Closed connection")

    async def get_collection(self, name):
        return self.db.get_collection(name)

    async def add_record(self, record: RecordModel) -> RecordModel:  
        record_col = await self.get_collection("records")
        new_record = await record_col.insert_one(record)
        created_record = await record_col.find_one({"_id": new_record.inserted_id})
        return created_record

    async def get_record(self, record_id:str) -> RecordModel: 
        record_col = await self.get_collection("records")
        returned_record = await record_col.find_one({"_id": record_id})
        return returned_record

    async def get_all_matching_records(self, cookie: str) -> List[RecordModel]:
        record_col = await self.get_collection("records")
        records = await record_col.find({"cookie":cookie})
        return records
        

    async def add_session(self, session: SessionModel):
        session_col = await self.get_collection("sessions")
        created_session = await session_col.insert_one(session_col)
        
        
    async def update_session(self, cookie: str, record_id:str) -> SessionModel:
        session_col = await self.get_collection("sessions")
        session = await session_col.find_one({"cookie":cookie})
        updated_session = await session_col.update_one({"_id": session.id}, {"$push": { "urls": record_id}})
        return True if updated_session else False
