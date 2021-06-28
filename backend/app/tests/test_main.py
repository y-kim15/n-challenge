from fastapi.testclient import TestClient
import datetime
from ..main import app

client = TestClient(app)
BASE_URL = "http://localhost.com:8888"
search_url = {
    "url": BASE_URL+"/static/rand.html"
}

def test_create_session():
    res = client.post(
        "/sessions/token" 
    )
    assert res.status.code == 200
    assert res.cookie is not None
    

def test_get_result_no_token():
    res = client.get("/records/?url="+search_url)
    assert res.status_code == 400
    assert res.json() == {"detail":"Invalid request without session"}

def test_get_result_with_token():
    res = client.post(
        "/sessions/token" 
    )
    response = client.get("/records/", query={"url": search_url["url"]}, cookie={res.cookies})
    assert response.status_code == 200
    assert response.json() == {
            "id": "random",
            "date": datetime.now(),
            "result": "'heading': 1, 'irrelevant': 1, 'is': 2, 'this': 2, 'very': 1",
            "cookie": res.cookies
        }