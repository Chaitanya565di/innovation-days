const origin = location.origin;

class PromiseResolver {
  constructor() {
    this.promise_ = new Promise((resolve, reject) => {
      this.resolve_ = resolve;
      this.reject_ = reject;
    })
  }
  get promise() { return this.promise_ } 
  get resolve() { return this.resolve_ }
  get reject() { return this.reject_ }
}

let payment_request_event;
let resolver;
let client;

// `self` is the global object in service worker
self.addEventListener('paymentrequest', async e => {

  // Preserve the event for future use.
  payment_request_event = e;

  // Retain a promise for future resolution
  // Polyfill for PromiseResolver is provided below.
  resolver = new PromiseResolver();

  // Pass a promise that resolves when payment is done.
  e.respondWith(resolver.promise);
  // Open the checkout page.
  try {
    // Open the window and preserve the client
    const merchantName = encodeURIComponent(payment_request_event.methodData[0].data.merchantName);
    client = await e.openWindow('/pay/?merchantName=' + merchantName);
    if (!client) {
      // Reject if the window fails to open
      throw 'Failed to open window.';
    }
  } catch (error) {
    // Reject the promise on failure
    console.log(error);
  }
});

// Define a convenient `postMessage()` method
const postMessage = (type, contents = {}) => {
  if (client) client.postMessage({ type, ...contents });
}

// Received a message from the frontend
self.addEventListener('message', async e => {
  try {
    switch (e.data.type) {
      case 'PAYMENT_AUTHORIZED': {
        console.log('payment authorized')
        // Resolve the payment request event promise
        // with a payment response object
        const response = {
          methodName: e.data.paymentMethod,
          details: { id: 'payment credential comes here' },
        }
        let { paymentOptions } = payment_request_event;
        if (paymentOptions.requestPayerEmail) {
          response.payerEmail = e.data.payerEmail;
        }
        if (paymentOptions.requestPayerName) {
          response.payerName = e.data.payerName;
        }
        if (paymentOptions.requestPayerPhone) {
          response.payerPhone = e.data.payerPhone;
        }
        resolver.resolve(response);
        // Don't forget to initialize.
        payment_request_event = null;
        break;
      }
      case 'CANCEL_PAYMENT':
        console.log('payment cancelled')
        // Resolve the payment request event promise
        // with null
        resolver.resolve(null);
        // Don't forget to initialize.
        payment_request_event = null;
        break;
    }
  } catch (error) {
    console.log(error)
  }
});
