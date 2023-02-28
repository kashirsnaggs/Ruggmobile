import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_live_51MSlJ6Hs3winMsXJViUAkyIzjj4CLCfIPozqxsfHGg9Bj6j26voITcO2ZOD61wvZOXsojBtsI4F9jddoBDoWit3x00BdRAs1cO'
    );
  }

  return stripePromise;
};

export default getStripe;
