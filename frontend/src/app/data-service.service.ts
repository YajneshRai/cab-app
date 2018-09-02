import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class DataService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log(this.apiUrl)
   }

  createId(customerId) : any { 
    const data = { customer_id: customerId, location_x: 2, location_y: 3 };
    return this.http.post( this.apiUrl + '/createId', data );
  }

  getAllRequests(isDriver, driverId?) {
    let data = {};
    data = isDriver ? { is_driver: true, driver_id: driverId } : { is_driver: false };
    return this.http.post( this.apiUrl + '/getAllRideRequests', data );
  }

  checkRequestAvailability(requestId) {
    const data = { request_id: requestId };
    return this.http.post( this.apiUrl + '/checkRequestAvailability', data );
  }

  selectRide(requestId, driverId) {
    const data = { request_id: requestId, driver_id: driverId };
    return this.http.post( this.apiUrl + '/selectRide', data );
  }
}
