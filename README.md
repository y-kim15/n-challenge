# N-Challenge

#### Structure
Client-server application as per requirement, designed to be extended from the current MVP design. 
Frontend is written in React and backend is written in FastAPI using Python. FastAPI was an suitable option considering that it is capable of quick handling of requests like Node, while utilising its strength in computation and data manipulation. 

Frontend will send a requst on launch after checking whether there is a saved cookie in local storge to request information of previous request history from the backend, otherwise will get a new cookie from the backend. Components are reused if possible.
Backend will manage all data in MongoDB and can be extended to use Redis for caching requests. The solver accepts a url to fetch the text and process to count and sort the final outcome. Sorting is defaulted to lexicographical, ascending order while this can be reqeusted to use counts or ascending/descending orders.

It is designed that only high level information will be displayed as previous responses at land and will fetch detailed output when collapsible table is expanded, which has taken into account extendibility as the output becomes larges and there is a large number of previous reqeusts to display at landing. 


### Instruction

##### Frontend Development
```
cd frontend
npm install
npm start
```
Open http://localhost:3000

##### Frontend Tests
```
cd frontend
npm install
npm test
```
Test covers the scenarios where: 
* at landing, given there is an existing saved token, display previous requests
* when user enters a new URL, request for result and display the result on screen
* snapshots can be taken
* coverage shown as test-coverage-snap.png

##### Backend Development

```
cd backend
python app/main.py
```

##### Backend Tests
```
cd backend
pytest
```

For standalone testing of computing algorithm that generates the output of text occurrence counts: 
```
cd backend
python app/main.py
# open a separate cmd 
python search_solver.py
```
This command will run the sample test using static file hosted and print out the result on cmd.

Test covers the scenarios where:
* request submitted for new session token
* validates cookie exists in request using middleware check
* solver returns the expected output as expected

### Improvements
* For parsing html text, backend currently uses BeautifulSoup package in 'solver'. This can be updated to be async function to receive and parse in chunks. (the existing method to process the text and count uses generators for minimal memory)
* Redis and mongodb database can be fully active for persistency and user authentification can be added to make cookies more secure with encrypted versions to be used. 
* Local storage in the frontend to store cookies could be updated with redis. 
