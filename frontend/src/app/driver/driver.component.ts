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
  rideInfo: any = { waiting: [], progress: [], complete: [] };

  waitingList = [
    { reqid: 1, custid: 5, reqtime: ''},
    { reqid: 1, custid: 8, reqtime: ''},
    { reqid: 1, custid: 9, reqtime: ''}
  ];

  progressList =  [
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
    this.dataService.getAllRequests(this.driverId).subscribe(
      data => { console.log(data); this.rideInfo = data; }
    );
  }

  getTime(time) {
    const now = moment(new Date());
    const start = moment(time);
    return start.from(now);
  }
}
