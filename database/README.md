# database


### Assumption/Prerequisites

- A working MySQL database set up in the machine

### User credentials
  Username: `root` 
  Password: `cabapp`

### Databse set up for the project
- The SQL script(db.sql) contains the DB/schema structure used by the project
- Script should be run before starting UI/backend servers
- Everytime the script is run it will clear previous schemas and create/poplute DBs
- This command will prompt the password, on entering which the required set up be will be done
  ```mysql -u root -p < db.sql```
