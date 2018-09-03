# frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

### Prerequisites / Assumptions

- Node 7.5.x or above, npm 4.1.x or above
- Server is currently configured to run only locally

### Steps to run UI server

- Install all dependencies - `npm install`
- Create code build - `npm run build`
- Start server - `node ui_server.js`
- UI starts on port 4000, go to URL in browser - `http://localhost:4000`
- UI will auto-ridect to URL `/home` which will have options for choosing dashboard / customer / driver app
- Dashboard URL - `http://localhost:4000/dashboard`
- Customer App URL - `http://localhost:4000/customer`
- Driver 1 App URL - `http://localhost:4000/driver/1` (Replace number in URL to go to respective driver page)



