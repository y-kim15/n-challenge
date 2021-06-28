from pydantic import BaseModel, Field
from bson import ObjectId
from datetime import datetime
from typing import List, Optional

# credits to MongoDB team
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)
    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")
        
# credit to https://github.com/samuelcolvin/pydantic/issues/2152
# enables to use builder pattern on the model
class BuildBaseModel(BaseModel):
    def __init__(self, **data):
        object.__setattr__(self, '__build_values__', data)
    def __setattr__(self, key, value):
        if hasattr(self, '__build_values__'):
            self.__build_values__[key] = value
        else:
            super().__setattr__(key, value)
    def build(self):
        if not hasattr(self, '__build_values__'):
            # The model has already been built
            return
        super().__init__(**self.__build_values__)
    
class RecordModel(BuildBaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    url: str = Field(...)
    results: str
    cookie: str
    date: datetime
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "url": "https://www.bbc.co.uk/news",
                "results": {"a": 2, "b": 3},
                "cookie": "xxxx",
            }
        }
        
class SessionModel(BuildBaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    cookie: str
    urls: List[PyObjectId]
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "urls": [""],
                "cookie": "xxxx",
            }
        }

def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

