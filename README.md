# Documentation

https://web.dev/payments/

# WorldLine

Demo bank app (for installation and uninstall of WorldLine payment app):

https://labs.worldline-solutions.com/qualif/w3cpay/bankB/login.html

Demo shop:

https://labs.worldline-solutions.com/qualif/w3cpay/KBCshop/checkout.html


# Test E2E locally

## Build angular app

```
cd app
ng build
```

## Run simple python server

```
python -m SimpleHTTPServer
```

## Test via payment request test page

https://paymentrequest-demo.glitch.me/

Add payment method identifier `http://localhost:8000/payment-manifest-local.json`

Click `pay` button next to the new identifier

## Clear serviceworker

```
navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
  registration.unregister()
} })
```

# Test Angular app locally

```
cd app
ng serve
```

# Test E2E via AWS sandbox account

## Update code

Update code on S3 bucket (with correct and logged in credentials)
```
./update.sh
```

## Test via payment request test page

https://paymentrequest-demo.glitch.me/

Add payment method identifier `https://kbc-future-of-online-payments.s3.eu-west-1.amazonaws.com/payment-manifest.json`

Click `pay` button next to the new identifier

## Clear serviceworker (and cache)

It might be necessary to clear the serviceworkers (see above) and browser cache/cookies in order to make the changes visible