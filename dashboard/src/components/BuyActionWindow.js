import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1); //default value is 1 because we cannot buy 0 stock
  const [stockPrice, setStockPrice] = useState(0.0);//0.0 because its value is set by user. If we want, we can take its value as props along with uid that is default market value
  //   Case 2: Limit Order (what your code is doing)
  // User says: “I want to buy this stock at ₹100, not more”
  // So: If current price = ₹105 → order waits  || If price drops to ₹100 → order executes
  const handleBuyClick = () => {
    axios.post("http://localhost:3002/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",//sell ke liyemode sell kar dege 
      //sell ke liye logic will be same, we will add a check for that qty is actually available or not
    });

    GeneralContext.closeBuyWindow(); //jaise hi order place ho gaya successfully window apne ap close ho jayega
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}//e	-> event object,  target ->	the input box  ,value ->	what user typed
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
