import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';

const REFRESH_INTERVAL = 20000;

@Injectable()
export class DataService {

  apiUrl = environment.apiUrl;
  timer1: any; timer2: any;
  
  driverDataSubscription: ISubscription;
  driverData: Subject<any>;
  
  rideDataSubscription: ISubscription;
  rideData: Subject<any>;
  
  constructor(private http: HttpClient) {
    console.log(this.apiUrl);
    
    this.driverData = new Subject<any>();
    this.driverData.next({ waiting: [], ongoing: [], complete: [] });

    this.rideData = new Subject<any>();
    this.rideData.next([]);
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

  startDriverDataIntervalFetching(driverId) {
    
    const data = { is_driver: true, driver_id: driverId } 

    this.timer1 = Observable.timer(0, REFRESH_INTERVAL);
    this.driverDataSubscription = this.timer1.subscribe( tick => {
      //console.log('interval polling tick', tick);
      this.http.post(this.apiUrl + '/getAllRideRequests', data)
        .subscribe( response => {  
          this.driverData.next(response)
        }, error => { console.log(error); }
      ); 
    })
  };

  startRideDataIntervalFetching() {
    
    const data = { is_driver: false };

    this.timer2 = Observable.timer(0, REFRESH_INTERVAL);
    this.rideDataSubscription = this.timer2.subscribe( tick => {
      //console.log('interval polling tick', tick);
      this.http.post(this.apiUrl + '/getAllRideRequests', data)
        .subscribe( response => {  
          this.rideData.next(response);
        }, error => { console.log(error); }
      ); 
    })
  };

  getDriverData() : Observable<any> {
    return this.driverData.asObservable();
  }
  
  getRideData() : Observable<any> {
    return this.rideData.asObservable();
  }

  stopDriverDataFetching() {
    this.driverData.unsubscribe();
    this.driverDataSubscription.unsubscribe();
  }

  stopRideDataFetching() {
    this.rideData.unsubscribe();
    this.rideDataSubscription.unsubscribe();
  }
}
