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
    data = isDriver ? { isDriver: true, driverId: driverId } : { isDriver: false };
    return this.http.post( this.apiUrl + '/getAllRideRequests', data );
  }

  checkRequestAvailability(requestId) {
    const data = { requestId: requestId };
    return this.http.post( this.apiUrl + '/checkRequestAvailability', data );
  }

  selectRide(requestId, driverId) {
    const data = { requestId: requestId, driverId: driverId };
    return this.http.post( this.apiUrl + '/selectRide', data );
  }
}
