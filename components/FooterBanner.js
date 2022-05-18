import React from "react";
import Link from "next/link";
import { urlFor } from "../Lib/client";

const FooterBanner = ({ footer }) => {
  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    desc,
    buttonText,
    image,
  } = footer;
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <a>
              <button type="button">{buttonText}</button>
            </a>
          </Link>
        </div>
        <img src={urlFor(image)} className="footer-banner-image" alt="icon" />
      </div>
    </div>
  );
};

export default FooterBanner;
