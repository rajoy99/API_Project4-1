import React from "react";
import { useState } from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";
import NavBar from "../navbar";

const Checkout = () => {

  const navigate=useNavigate()
  const location = useLocation();
  const [bankdetails, setbankdetails] = useState("");
  const [bankpin, setbankpin] = useState("");

  const handlebankdetails = (event) => {
    setbankdetails(event.target.value);
  };

  const handlebankpin = (event) => {
    setbankpin(event.target.value);
  };

  const transact = (event) => {
    event.preventDefault();

    console.log("Before sending ->> ",bankdetails,bankpin)

    axios.post("http://192.168.2.104:3006/giveninvoice/confirm",
    {
      invoice:location.state.invoiceid
    })
    .then((response)=> {
      console.log("Transaction Confirmation : ");
      console.log(response.data);
    })

    axios
    .post("http://192.168.2.104:9001/bank/Customerdata", 
    {
      invoice:location.state.invoiceid,
      bankaccnumber : bankdetails,
      pin:bankpin

    })
    .then((response) => {

      console.log("Success Bank : ");
      console.log(response.data);
      navigate('/pending')

    });


  };
  return (
    <div>
      <NavBar/>
      <h1 align="center">Checkout</h1>

      <div
        style={{
          width: "900px",
          height: "900px",
          padding: "50px",
          border: "6px solid #8a4875",
          marginLeft: "240px",
          fontSize: "24px",
          lineHeight: "30px"
        }}
      >
        Total Price : {location.state.pricetotal} {location.state.invoiceid} $ 
        <form onSubmit={transact}>
          <div>
            <input
              type="text"
              name="bdetails"
              placeholder="Bank account number"
              onChange={handlebankdetails}
            />
          </div>
          <div style={{marginTop: "30px"}}>
            <input
              type="password"
              name="bpin"
              placeholder="Bank PIN"
              onChange={handlebankpin}
            />
          </div>
          <div>
            <button
              type="submit"
              style={{
                backgroundColor: "#8a4875",
                border: "none",
                color: "white",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: "pointer",
                padding:"14px 40px",
                fontFamily:"cursive",
                fontWeight:'900'
              }}
            >
              Confirm Payment{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
