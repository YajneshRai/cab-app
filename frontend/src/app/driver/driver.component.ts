import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driverId: string;

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.driverId = this.route.snapshot.params['id'] 
    });
  }

}
