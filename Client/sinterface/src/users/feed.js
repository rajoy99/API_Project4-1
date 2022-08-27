// News Feed
import NavBar from "../navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import MarketCard, { Cartcard } from "./card";
import "./feed.css";
import { Button, Card } from "@mui/material";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import { SupplyCard } from "./card";
import { Navigate } from "react-router-dom";

const Feed = ({userSession}) => {
  // items = [
  //   {
  //     name: "Arto Hellas",
  //     description: "040-123456",
  //     id: 1,
  //     price: 900,
  //   },
  //   {
  //     name: "Ada Lovelace",
  //     description: "39-44-5323523",
  //     id: 2,
  //     price: 700,
  //   },
  //   {
  //     name: "Dan Abramov",
  //     description: "12-43-234345",
  //     id: 3,
  //     price: 300,
  //   },
  //   {
  //     name: "Mary Poppendieck",
  //     description: "39-23-6423122",
  //     id: 4,
  //     price:800
  //   },
  // ];




  const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex((el) => {
      return el.id === String(id);
    });
    if (requiredIndex === -1) {
      return false;
    }
    return !!arr.splice(requiredIndex, 1);
  };

  const removefromCart = (e) => {
    console.log(e.currentTarget.id);

    let newcartitems = cartitems;
    removeById(newcartitems, e.currentTarget.id);
    setcartitems(newcartitems);

    setRefreshKey((oldKey) => oldKey + 1);
  };

  const addtoCart = (e) => {
    console.log(e.currentTarget.id);
    setRefreshKey((oldKey) => oldKey + 1);
    let nameofitem = "";
    let priceofitem = 0;

    for (let i = 0; i < 4; i++) {
      let item = items[i];
      console.log(item.id);
      if (item.id == e.currentTarget.id) {
        nameofitem = item.name;
        priceofitem = item.price;
        console.log("first", nameofitem);
        break;
      }
    }
    console.log("here: ", nameofitem);
    let newcartitems = cartitems;
    const new_json = {
      name: nameofitem,
      price: priceofitem,
      id: e.currentTarget.id,
    };
    console.log(new_json);
    newcartitems.push(new_json);
    console.log("newcart", newcartitems);
    setcartitems(newcartitems);

    console.log(cartitems.length);
    for (let i = 0; i < cartitems.length; i++) {
      console.log("cart item", cartitems[i]);
    }
  };

  // const [items, setitems] = useState([])
  const [cartitems, setcartitems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [items, setitems] = useState([]);

  useEffect(()=>{ 
    const getItem = async () => {
      axios.post("http://localhost:3000/items").then((response) => {
        console.log("promise fulfilled");
        setitems((prevState) => response.data);
        console.log("Item list: ", items);
        console.log(response.data);
      });
    };
    getItem();
  }, []);
  // items=items

  const getcartlength = () => {
    return cartitems.length;
  };

  useEffect(() => {}, [refreshKey]);
  const sum = cartitems.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);


  return (
    <div>
      <NavBar />
      <div style={{ display: "block", width: "100%" }}>
        <h3> &nbsp;&nbsp; &nbsp;&nbsp; Current State of the market : </h3>
        <br></br>
        <div
          style={{
            width: "80%",
            float: "left",
            display: "inline-block",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "black",
          }}

          align='center'
        >
          <Alert variant="secondary">
          <ol>
            {items.map((item) => (
              <li>
                <MarketCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  vendor={item.vendor}
                  addtocart={addtoCart}
                />
              </li>
            ))}
          </ol>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default Feed;
