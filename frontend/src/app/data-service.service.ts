import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log(this.apiUrl)
   }

  createId(customerId, locationX, locationY) : Observable<any> { 
    const data = { customer_id: customerId, location_x: locationX, location_y: locationY };
    return this.http.post( this.apiUrl + '/createId', data );
  }

  getAllRequests(isDriver, driverId?) : Observable<any> {
    let data = {};
    data = isDriver ? { is_driver: true, driver_id: driverId } : { is_driver: false };
    return this.http.post( this.apiUrl + '/getAllRideRequests', data );
  }

  checkRequestAvailability(requestId) : Observable<any> {
    const data = { request_id: requestId };
    return this.http.post( this.apiUrl + '/checkRequestAvailability', data );
  }

  selectRide(requestId, driverId) : Observable<any> {
    const data = { request_id: requestId, driver_id: driverId };
    return this.http.post( this.apiUrl + '/selectRide', data );
  }
}
