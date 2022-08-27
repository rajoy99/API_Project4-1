// News Feed
import NavBar from "../navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ActionAreaCard, { Cartcard } from "./card";
import "./feed.css";
import { Button, Card } from "@mui/material";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ItemCard from "./itemcard";

const Feed = () => {


    const navigate = useNavigate()
    let cookstring=document.cookie
    let first=cookstring.split('~')[0]
    let emaild=first.split('=')[1]
  

    // const [items, setitems] = useState([])
    const [cartitems, setcartitems] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [items, setitems] = useState([]);
    const [prid,setprid]=useState([]);
    const [sid,setsid]=useState([]);
    const [carttotal,setcartotal]=useState(0)
  
  

  const checkout = (e) => {

    axios
    .post("http://192.168.2.104:3006/giventoken/validity/available", {
      userid: emaild,cartState:cartitems
    })
    .then((response) => {
      console.log("Checkout confirmation : ");
      console.log(response.data);
      

      navigate('/checkout',{state:{cookstring:document.cookie,pricetotal:response.data.price,invoiceid:response.data.invoice}});
      
      
    });

  };

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


    console.log("Grab by",e.currentTarget.id);
    setRefreshKey((oldKey) => oldKey + 1);
    let nameofitem = "";
    let priceofitem = 0;
    let suppID=""
    let quantity=0

    for (let i = 0; i < 4; i++) {
      
      let item = items[i];
      console.log("Item ID: ",item.ProductId);
      if (item.productId == e.currentTarget.id) {
        nameofitem = item.productName;
        priceofitem = item.price;
        suppID=item.supplierId;
        console.log("first", nameofitem);
        break;
      }
    }
    console.log("here: ", nameofitem);
    let newcartitems = cartitems;
    let new_json={}
    let dupchecker = newcartitems.find(item => item.prodID == e.currentTarget.id)
    if(dupchecker){
      console.log("Type check $$$$$$$$$",typeof(dupchecker.quantity))
      dupchecker['quantity'] = dupchecker['quantity'] + 1 || 1;
      new_json = dupchecker

      newcartitems = newcartitems.filter(function(object) {
        return object.prodID !== e.currentTarget.id;
      }) 
    }
    else{
       new_json = {
        name: nameofitem,
        price: priceofitem,
        prodID: e.currentTarget.id,
        quantity:1
      };
    }


    console.log(new_json);
    newcartitems.push(new_json);
    console.log("newcart", newcartitems);
    setcartitems(newcartitems);
    console.log("just Before ",e.currentTarget.id)
    let pid=e.currentTarget.id
    ///  For Backend
    setprid(prid => [...prid, pid])
    setsid(sid => [...sid, suppID])


    console.log(cartitems.length);
    for (let i = 0; i < cartitems.length; i++) {
      console.log("cart item no:",i," th", cartitems[i]);
    }
  };


  useEffect(() => {
    const getItem = async () => {
      axios
        .post("http://192.168.2.104:3006/giventoken/validity/feed", {
          cookstring: document.cookie,
        })
        .then((response) => {
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
    return accumulator + parseInt(object.price*object.quantity);
  }, 0);

  return (
    <div>
      <NavBar />

        {/* <div style={{marginTop:'16px'}}>
        <h3 > &nbsp;&nbsp; &nbsp;&nbsp; List of all items for you to buy:</h3>
        </div> */}
        <br></br>
        <div
          style={{
            width: "50%",
            float: "left",
            display: "inline-block",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "black",
          }}
          align="center"
        >
          <Alert variant="secondary">
          <h3 > &nbsp;&nbsp; &nbsp;&nbsp; List of all items for you to buy:</h3>
            <ol>
              {items.map((item) => (
                <li>
                  <ActionAreaCard
                    id={item.productId}
                    vendorid={item.supplierId}
                    name={item.productName}
                    price={item.price}
                    description={item.Productdetail}
                    addtocart={addtoCart}
                  /> 
                  <ItemCard />
                </li>
              ))}
            </ol>
          </Alert>
        </div>
        <div
          style={{
            width: "50%",
            float: "left",
            display: "inline-block",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "black",
          }}
        >
          <Alert variant="success">
            <Alert.Heading>Your Cart <ShoppingCartIcon/> </Alert.Heading>
            <ol>
              {cartitems.map((data) => (
                <li>
                  {" "}
                  <Cartcard
                    id={data.id}
                    name={data.name}
                    price={data.price}
                    quantity={data.quantity}
                    remove={removefromCart}
                  />
                </li>
              ))}
            </ol>

            <Alert key="info" variant="info">
              Total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {sum} $ <hr></hr>
              <Button variant="contained" endIcon={<SendIcon />}  onClick={checkout}>
                Proceed to checkout
              </Button>
            </Alert>
          </Alert>
        </div>
      </div>

  );
};

export default Feed;
