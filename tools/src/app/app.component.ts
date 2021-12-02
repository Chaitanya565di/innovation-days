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

  public install() {
    console.log("install")
  }

  public uninstall() {
    console.log("uninstall")
  }
}
