import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driverId: string;
  rideInfo: any = { waiting: [], ongoing: [], complete: [] };
  msg: string = '';
  errMsg: string = ''; 
  curRequest: number = -1;
  refreshOn: boolean = false;

  waitingList = [
    { reqid: 1, custid: 5, reqtime: ''},
    { reqid: 1, custid: 8, reqtime: ''},
    { reqid: 1, custid: 9, reqtime: ''}
  ];

  ongoingList =  [
    { reqid: 1, custid: 5, reqtime: '', starttime: ''},
    { reqid: 1, custid: 8, reqtime: '', starttime: ''},
    { reqid: 1, custid: 9, reqtime: '', starttime: ''}
  ];

  completeList =  [
    { reqid: 1, custid: 5, reqtime: ''},
    { reqid: 1, custid: 8, reqtime: ''},
    { reqid: 1, custid: 9, reqtime: ''}
  ];

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.driverId = this.route.snapshot.params['id'] 
    });

    this.getData();
  }

  getData() {
    this.refreshOn = true;
    this.dataService.getAllRequests(true, this.driverId).subscribe(
      data => { console.log(data); this.rideInfo = data; this.refreshOn = false; }
    );
  }

  getTime(time) {
    const now = moment(new Date());
    const start = moment(time);
    return start.from(now);
  }

  checkRequestAvailability(requestId, idx) {
    this.curRequest = idx;
    this.msg = 'Checking availability...';
    this.errMsg = '';
    this.dataService.checkRequestAvailability(requestId).subscribe(
      data => {
        if(data.available) {
          this.msg = 'Ride request has been assigned to you.'
          setTimeout(() => { 
            this.selectRide(requestId); 
          }, 2000);
        }
        else {
          this.msg = '';
          this.errMsg = 'Sorry!! Request is no longer available';
          setTimeout(() => { 
            this.errMsg=''; 
            this.curRequest = -1; 
            this.getData(); 
          }, 2000);
        }
      },
      error => { this.errMsg='Something went wrong'; },
      () => { }
    );
  }

  selectRide(requestId) {
    this.dataService.selectRide(requestId, this.driverId).subscribe(
      data => {
        if(data.success) {
          this.msg = ''; 
          this.curRequest = -1; 
          console.log(data);
          this.getData(); 
        }
      }
    );
  }
}
