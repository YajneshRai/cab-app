# database

This directory contains the SQL file with database schema used by the application

### Prerequisites

- A working MySQL database set up in the machine

### User credentials
  Username: `root` <br>
  Password: optional <br>
  Database name: `cabapp`
  
### Databse set up for the project
- The SQL script(db.sql) contains the DB/schema structure used by the project.
- Script should be run before starting UI/backend servers.
- Everytime the script is run it will clear previous schemas and create/poplute DBs.
- If the password is set to database, use the command - `mysql -u root -p < db.sql` ; else use `mysql -u root < db.sql`

### Schema information

Database name: `cabapp` <br>

Tables used (columns listed below): 
- `customer` - stores the id of customer
  - `customer_id` varchar (id of customer) <br><br>
  
- `driver` - stores the id of driver
  - `driver_id` integer (id of driver)
  - `location_x` integer (location x value) 
  - `location_y` integer (location y value) 
  - `available` enum (0 - not available, 1 - available) <br><br>
  
- `ride` - stores the information of ride request
  - `request_id` integer (id of request)
  - `request_time` timestamp (time of request creation)
  - `location_x` integer (location x value)
  - `location_y` integer (location Y value)
  - `customer_id` varchar (Foreign key referring to cutomer.customer_id)
  - `status` enum (1 - waiting, 1 - ongoing, 2 - complete) <br><br>
  
- `ride_taken` - stores the information of ride requests that are served/being served
  - `id` integer (id of table)
  - `request_id` integer (Foreign key referring to ride.request_id)
  - `driver_id` integer (Foreign key referring to driver.driver_id)
  - `start_time` timestamp (Start time of ride)
  - `end_time` timestamp (End time of ride) <br><br>
  

### Assumption

- `dricer.driver_id` and `ride.request_id` are auto-incremented integers starting from 1 to N
- `driver` table is pre-populated with the records when the sql script is run
