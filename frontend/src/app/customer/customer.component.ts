import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild('customerForm') customerForm:NgForm;
  msg: string = ''; errMsg:string = '';
  
  constructor(private dataService: DataService) { }
  
  ngOnInit() {
  }

  bookRide() {
    let locXErr = this.customerForm.value.locX < 1 || this.customerForm.value.locX > 5;
    let locYErr = this.customerForm.value.locY < 1 || this.customerForm.value.locY > 5;
    this.errMsg = '';
    if(locXErr || locYErr) {
      this.errMsg = 'Invalid location co-ordinates';
      return;
    }
    this.msg = 'Booking your ride...';
    this.dataService.createId(this.customerForm.value.custId, this.customerForm.value.locX, this.customerForm.value.locY).subscribe(
      data => { 
        if(data.success) {
          this.msg = 'Booked!!';
          setTimeout(() => { this.msg = ''; }, 2000);
        }
        else {
          this.msg = '';
          this.errMsg = 'Rides not available, please try later...';
          setTimeout(() => { this.errMsg = ''; }, 4000);
        }  
        this.customerForm.reset();
      }
    );
  }
}
