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
  msg: string = '';
  
  constructor(private dataService: DataService) { }
  
  ngOnInit() {
  }

  bookRide() {
    this.msg = 'Booking your ride...';
    this.dataService.createId(this.customerForm.value.custId).subscribe(
      data => { console.log(data); 
      this.customerForm.reset();
      this.msg = 'Booked!!';
      setTimeout(() => { this.msg = ''; }, 2000);
      }
    )
  }
}
