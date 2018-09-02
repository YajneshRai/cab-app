import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rideInfo: any = [];
  refreshOn: boolean = false;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.refreshOn = true;
    this.dataService.getAllRequests(false).subscribe(
      data => { console.log(data); this.rideInfo = data; this.refreshOn = false; }
    );
  }

  getTime(time) {
    const now = moment(new Date());
    const start = moment(time);
    return start.from(now);
  }

  getStatus(status) {
    return status == '1' ? 'Waiting' : status == 2 ? 'Ongoing' : 'Complete';
  }
}
