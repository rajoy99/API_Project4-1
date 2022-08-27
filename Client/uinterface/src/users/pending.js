import React from "react";
import { useState,useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../navbar";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import DoneOutlineIcon  from "@mui/icons-material/DoneOutline";


const confirmationfunction = (event) => {
  event.preventDefault();

    console.log("Button ID",event.currentTarget.id)

    axios.post("http://192.168.2.104:9006/user/orderRecieved",
    {
        invoicenumber:event.currentTarget.id
    })
    .then((response)=> {
      console.log("Transaction Confirmation : ");
      console.log(response.data);
      // navigate('/pending')
    })

}


const Pendingcard = (props) => {


  const navigate=useNavigate()

  return (
    <Card bg="success" style={{ width: "38rem" }} text={"white"} className="mb-2">
    <Card.Header>Order Details</Card.Header>
    <Card.Body>
      <Card.Text>
              Invoice Number : {props.vouchernumber}
              <br></br>
              Total Price : {props.price} $
              <br></br>
              <Button variant='info' id={props.vouchernumber} onClick={confirmationfunction}> Confirm Received <DoneOutlineIcon/> </Button>
      </Card.Text>
    </Card.Body>
  </Card>
  )

}





const Pending = () => {

  

  const [penditems,setpenditems] = useState([])

  let cookstring=document.cookie
  let first=cookstring.split('~')[0]
  let emaild=first.split('=')[1]
  const ar=[]
  var valar=[]


  useEffect(() => {

    const getpendItem = async () => {
      axios
        .post("http://192.168.2.104:9006/userOrder/pending", {
          payeeID:emaild
        })
        .then((response) => {
          // console.log(typeof(response.data[0]));
          // const newpend = response.data[0]
          // console.log("Newpend",newpend)
          // console.log(typeof(newpend));
          // setpenditems(prev => [...prev,...newpend])
          // console.log("Item list: ", penditems);
          response.data.forEach(console.log)
          console.log(typeof(response.data))
          
          for(let item=0;item<response.data.length;item+=1)
          {
            ar.push(response.data[item])
          }
          valar=Object.entries(response.data)
          console.log("Another valar",valar[0][1])
          console.log("Arrayed Form",ar)
          console.log(typeof(ar),typeof(ar[0]))
          setpenditems(valar)
          console.log("PENDITEMS : -> ",penditems)
          
        });
    };
    getpendItem();
  }, []);


  return (
    <div>
      <NavBar />

      <h2>Pending Page Here ! </h2>
      {valar[0]}

      <div align="center">
      <ol>
              {penditems.map((data) => (
                <li key={data[1].vouchernumber}>
                  {" "}
                  <Pendingcard
                    vouchernumber = {data[1].vouchernumber}
                    price={data[1].pricetotal}
                  />
                </li>
              ))}
            </ol>
      </div>
    </div>
  );
};





export default Pending;
