import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild('customerForm') customerForm:NgForm;

  constructor() { }

  ngOnInit() {
  }

  bookRide() {
    console.log(this.customerForm.value);
  }
}
