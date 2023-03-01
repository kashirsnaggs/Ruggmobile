import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { toast } from 'react-hot-toast';
import getStripe from '../Lib/getStripe';
import sanityClient from '@sanity/client';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../Lib/client';
import paypal from 'paypal-rest-sdk';
import { client } from '../Lib/client';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  // const handlePaymentSuccess = async (details, data) => {
  //   // Make an API call to process the payment on the server
  //   const response = await fetch('/api/paypal', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       orderId: data.orderID,
  //       payerId: data.payerID,
  //       paymentId: data.paymentID
  //     })
  //   });

  //   if (response.ok) {
  //     // Clear the cart state

  //     // Update the cart state or show a success message
  //     setPaid(true);
  //   }
  // };

  // const handlePayPalCheckout = async () => {
  //   const paypalOrder = {
  //     intent: 'CAPTURE',
  //     purchase_units: [
  //       {
  //         amount: {
  //           currency_code: 'USD',
  //           value: totalPrice
  //         },
  //         description: 'Order description'
  //       }
  //     ]
  //   };

  //   const onPayPalScriptLoad = () => {
  //     window.paypal
  //       .Buttons({
  //         createOrder: (data, actions) => {
  //           return actions.order.create(paypalOrder);
  //         },
  //         onSuccess: handlePaymentSuccess
  //       })
  //       .render('#paypal-button-container');
  //   };

  //   if (window.paypal) {
  //     // PayPal SDK script is already loaded
  //     onPayPalScriptLoad();
  //   } else {
  //     // PayPal SDK script is not loaded yet
  //     // load it dynamically and then render the button
  //     const script = document.createElement('script');
  //     script.src =
  //       'https://www.paypal.com/sdk/js?client-id=AXiAocBCcJvq5sGlobUyKNHJO3v9bENGdpExywV2g7n7V1T7n-zxLMafi_CIrQXwapuMn6fjTpqoC3Ck&currency=USD';
  //     script.addEventListener('load', onPayPalScriptLoad);
  //     document.body.appendChild(script);
  //   }
  // };

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting....');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">
            ({totalQuantities} {totalQuantities === 1 ? 'item' : 'items'})
          </span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <a>
                <button type="button" onClick={() => setShowCart(false)} className="btn">
                  Continue Shopping
                </button>
              </a>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map(item => (
              <div className="product" key={item._id}>
                <img src={urlFor(item?.image[0])} className="cart-product-image" alt="icon" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal: </h3>
              <p>${totalPrice}</p>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
            {/* <div className="btn-container">
              <div type="button" className="btn " id="paypal-button-container" onClick={handlePayPalCheckout}>
                Pay with Paypal
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
