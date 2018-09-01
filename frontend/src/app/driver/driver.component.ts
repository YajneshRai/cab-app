import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
