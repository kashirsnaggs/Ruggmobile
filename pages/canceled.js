import React from 'react'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import { MdShoppingCart } from 'react-icons/md'
import Link from 'next/link'

const canceled = () => {
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="emo">
          <HiOutlineEmojiSad size={200} />
        </p>
        <h2>You canceled your order!</h2>
        <p className="email-msg">Why did you cancel?</p>
        <p className="description">
          Return to home or || Contact if needed
          <a className="email" href="mailto:snaggs.kashir@gmail.com">
            snaggs.kashir@gmail.com
          </a>
        </p>
        <Link href="/">
          <a>
            <button type="button" width="300px" className="btn">
              <MdShoppingCart size={15} /> Continue Shopping
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default canceled
