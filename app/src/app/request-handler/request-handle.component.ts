import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'payments-request-handle',
  templateUrl: './request-handle.component.html',
  styleUrls: ['./request-handle.component.scss']
})
export class RequestHandleComponent implements OnInit {
  public requestHandleForm: FormGroup;
  public amount: number = 30.23;
  public currency: string = 'Eur';
  public merchantName: string = "Domino's Pizza";
  public selectedCard: string = '';
  public creditCards = [
    {cardNumber: '123456789009'},
    {cardNumber:'908765432112'},
    {cardNumber: '345678901234'},
  ];

  public constructor() {
    this.requestHandleForm = new FormGroup({
      selectedCard: new FormControl('', [Validators.required])
    });
  }

  public ngOnInit(): void {}
}
