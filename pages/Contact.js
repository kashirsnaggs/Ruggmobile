import React from 'react';
import Link from 'next/link';

const Contact = () => {
  return (
    <div>
      {' '}
      <div className="success-wrapper">
        <div className="success">
          <h2>Contact us !</h2>
          <p className="email-msg">Contact us at Ruggmobile</p>
          <p className="description">
            if you have any questions, please email
            <a className="email" href="mailto:snaggs.kashir@gmail.com">
              Ruggmobile
            </a>
          </p>
          <Link href="/">
            <a>
              <button type="button" width="300px" className="btn">
                Continue Shopping
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
