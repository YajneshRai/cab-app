import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class DataService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log(this.apiUrl)
   }

  createId(customerId) { 
    const data = { customer_id: customerId, location_x: 2, location_y: 3 };
    return this.http.post( this.apiUrl + '/createId', data );
  }

  getAllRequests(driverId) {
    const data = { driverId: driverId };
    return this.http.post( this.apiUrl + '/getAllRideRequests', data );
  }
}
