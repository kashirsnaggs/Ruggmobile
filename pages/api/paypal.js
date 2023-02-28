import { PayPalClient } from '@paypal/checkout-server-sdk';

const payPalClient = new PayPalClient({
  clientId: process.env.PAYPAL_CLIENT_ID,
  clientSecret: process.env.PAYPAL_CLIENT_SECRET,
  environment: process.env.PAYPAL_ENVIRONMENT || 'sandbox'
});

const createOrder = async cartItems => {
  // Create an order object with the necessary details
  const order = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: cartItems.reduce((total, item) => total + item.price, 0)
        },
        items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          unit_amount: {
            currency_code: 'USD',
            value: item.price
          }
        }))
      }
    ],
    application_context: {
      shipping_preference: 'NO_SHIPPING'
    }
  };

  // Create an order request with the order object
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody(order);

  // Send the order request to PayPal and get the response
  const response = await payPalClient.execute(request);

  return response.result.id;
};

const captureOrder = async orderId => {
  // Create an order capture request with the order ID
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.prefer('return=representation');

  // Send the capture request to PayPal and get the response
  const response = await payPalClient.execute(request);

  return response.result;
};

export default async (req, res) => {
  try {
    // Get the cart items from the request body
    const { cartItems } = req.body;

    // Create a PayPal order with the cart items
    const orderId = await createOrder(cartItems);

    // Capture the PayPal order to process the payment
    const captureResult = await captureOrder(orderId);

    // Send a success response with the capture result
    res.status(200).json({ success: true, captureResult });
  } catch (err) {
    // Handle any errors and send an error response
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
