import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  credential:any;

  public async registerCredential() {
    console.log("register credential");

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

    this.credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
    });

    console.log(this.credential);
  }

  public async authenticate() {
    const publicKeyCredentialRequestOptions:any = {
      challenge: Uint8Array.from(
          "randomStringFromServer", c => c.charCodeAt(0)),
      rpId: "localhost",
      allowCredentials: [{
          id: this.credential.rawId,
          type: 'public-key',
      }],
      userVerification: 'required',
      timeout: 60000,
  }

  const assertion = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions
  });

    console.log(assertion);
  }

  public async install() {
    console.log("install")
    // Feature detection
    if ('serviceWorker' in navigator) {
      // Register a service worker
      navigator.serviceWorker.register(
        // A service worker JS file is separate
        'http://localhost:8000/service-worker.js'
      );
      // PaymentManager requires the service worker to be active.
      // One simple method to activate a service worker is through
      // a `ready` promise.
      const registration:any = await navigator.serviceWorker.ready;

            // Feature detection
      if (!registration.paymentManager) return;


      await registration.paymentManager.instruments.set(
        // Payment instrument key
        'kbc',
        // Payment instrument details
        {
          // This parameter will be ignored in Chrome
          name: 'Payment Handler KBC Example',
          // This parameter will be used to match against
          // the PaymentRequest.
          method: 'http://localhost:8000/payment-manifest-local.json'
        }
      );

      await registration.paymentManager.instruments.set(
        // Payment instrument key
        'WL',
        // Payment instrument details
        {
          // This parameter will be ignored in Chrome
          name: 'Payment Handler 2 Example',
          // This parameter will be used to match against
          // the PaymentRequest.
          method: 'http://localhost:8000/payment-manifest-local2.json'
        }
      );
    }
  }

  public uninstall() {
    console.log("uninstall")
  }
}
