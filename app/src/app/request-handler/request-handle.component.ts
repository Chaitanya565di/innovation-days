import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  public selectedCard: string = '';
  public creditCards = [
    {cardNumber: '123456789009'},
    {cardNumber:'908765432112'},
    {cardNumber: '345678901234'},
  ];

  @Input()
  public merchant: string = '';

  public constructor() {
    this.requestHandleForm = new FormGroup({
      selectedCard: new FormControl('', [Validators.required])
    });
  }

  public ngOnInit(): void {}

  public postMessage = (type:any, contents = {}) => {
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({ type, ...contents });
    } else {
      console.log('service worker not found');
    }
  }

  public async onPay() {
    await this.sign();
    this.postMessage('PAYMENT_AUTHORIZED', {
      paymentMethod: 'method',              // Payment method identifier
      shippingOptionId: 'id',           // Shipping option id
      payerName: 'name',   // Payer name
      payerPhone: 'phone', // Payer Phone
      payerEmail: 'email', // Payer Email
    });
  }

  public onCancel() {
    postMessage('CANCEL_PAYMENT');
  }

  public async sign() {
    console.log("sign");

    const publicKeyCredentialCreationOptions: any = {
      challenge: Uint8Array.from(
          "randomStringFromServer", c => c.charCodeAt(0)),
      rp: {
          name: "Localhost",
          id: "localhost",
      },
      user: {
          id: Uint8Array.from(
              "UZSL85T9AFC", c => c.charCodeAt(0)),
          name: "lee@webauthn.guide",
          displayName: "Lee",
      },
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: 'required',
        requireResidentKey: false
    },
      pubKeyCredParams: [{alg: -7, type: "public-key"}],
      timeout: 60000,
      attestation: "none"
    };

    await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
    });
  }
}
