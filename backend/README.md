# backend

This directory contains node controllers for cab-app

### Prerequisites / Assumptions

- Node 7.5.x or above, npm 4.1.x or above
- MySQL DB 
- DB user is `root`

### Steps to run the server

- If database uses password, export it in environment - `export DB_PASSWD=<db_password>`
- Install node modules - `npm install`
- If the node version is above 8, then simply run - `node server.js`
- If the node version is below 8, then use the command - `node --harmony-async-await server.js`
- Server will start listening on port `3000`

### REST APIs used in application
All the REST APIs are implemented as POST methods

- <b>`/createId`</b>
  <br><br>
  - Create Customer ID if does not exist  <br>
  - Also create a new request with associated Customer ID <br>
  - Returns success message OR server error with status 500 <br>
  - Parameter : customer_id (string) <br><br>
  Example: <br>
  Body parameter: `customer_id: "1122"` <br>
  Response:`{"success": true}`
  
   <hr>
   
- <b>`/getAllRideRequests`</b>
  #### For driver page
   - Returns all ride requests 
   - The flag is_driver is passed to indicate if the result being fetched is for a driver
   - In case of driver, pass driver_id along with is_driver = false 
   - Parameter 1: is_driver (boolean)
   - Parameter 2: driver_id (number)
   - Returns object containing arrays (waiting/ongoing/complete) with request data OR server error with status 500 <br><br>
  Example: <br>
  Body parameter 1: `is_driver: true` <br>
  Body parameter 2: `driver_id: 1` <br>
  Response:
  ```javacript
  {"waiting":[{"request_id":8,"request_time":"2018-09-02T12:22:46.000Z","customer_id":"7711","status":"1","start_time":null,"end_time":null,"driver_id":null}],"ongoing":[{"request_id":6,"request_time":"2018-09-02T12:19:48.000Z","customer_id":"5577","status":"2","start_time":"2018-09-02T12:20:08.000Z","end_time":"2018-09-02T12:25:08.000Z","driver_id":1}],"complete":[{"request_id":1,"request_time":"2018-09-02T11:34:48.000Z","customer_id":"8899","status":"3","start_time":"2018-09-02T11:35:17.000Z","end_time":"2018-09-02T11:40:17.000Z","driver_id":1}]} 
  ```
 
   #### For dashboard page
    - Parameter: is_driver (boolean)
    - Returns an array containing request object OR server error with status 500 <br><br>
    Example: <br>
    Body parameter 1: `is_driver: false` <br>
    Response:
    ```javacript
    [{"request_id":8,"request_time":"2018-09-02T12:22:46.000Z","customer_id":"7711","status":"1","start_time":null,"end_time":null,"driver_id":null},{"request_id":7,"request_time":"2018-09-02T12:21:25.000Z","customer_id":"0057","status":"3","start_time":"2018-09-02T12:21:40.000Z","end_time":"2018-09-02T12:26:40.000Z","driver_id":3},{"request_id":6,"request_time":"2018-09-02T12:19:48.000Z","customer_id":"5577","status":"3","start_time":"2018-09-02T12:20:08.000Z","end_time":"2018-09-02T12:25:08.000Z","driver_id":1},{"request_id":5,"request_time":"2018-09-02T11:52:54.000Z","customer_id":"9977","status":"3","start_time":"2018-09-02T11:53:09.000Z","end_time":"2018-09-02T11:58:09.000Z","driver_id":3}]
   ```
    <hr>
    
 - <b>`/checkRequestAvailability`</b>
    <br><br>
    - Check if the request is still available (waiting state) <br>
    - Retuns an object with single property available = true/false OR server error with status 500 <br>
    - Parameter 1: request_id (number) <br><br>
    Example: <br>
    Body parameter: `request_id: 1` <br>
    Response:`{"available": true}`
    
     <hr>
     
  - <b>`/selectRide`</b>
    <br><br>
    - Driver selects the ride request <br>
    - Retuns an object with single property success = true/false OR server error with status 500 <br>
    - Parameter 1: request_id (number) <br>
    - Parameter 2: driver_id (number) <br><br>
    Example: <br>
    Body parameter 1 : `request_id: 1` <br>
    Body parameter 2: `driver_id: 3` <br>
    Response:`{"success": true}`
   

### Controller methods called by REST APIs
  - <b>`createRide()`</b> <br>
    - Creates a ride request in ride table <br>
    - Retuns the response/error  <br>
    - Parameter 1: data (new request information) <br><br>
    
  - <b>`startRide()`</b> <br>
    - Starts a ride for passed driver <br>
    - Retuns the response/error  <br> 
    - Parameter 1: data (ride information) <br><br>
  
  - <b>`completeRide()`</b> <br>
    - Completes the ride for passed driver and updates the ride status
    - Retuns the response/error  
    - Parameter 1: rideId (number)
    
 
