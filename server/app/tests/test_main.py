from fastapi.testclient import TestClient

from ..main import router

client = TestClient(router)

def test_create_session():
    res = client.post(
        "/sessions/" 
    )
    assert res.status.code == 200
    assert res.cookie is not None
    

def test_get_result():
    res = client.get("/records/")