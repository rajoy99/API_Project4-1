import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, } from '@mui/material';
import NavBar from '../navbar';
import { useState, useEffect } from "react";
import axios from 'axios';
import PlaceIcon from '@mui/icons-material/Place';
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { ComplexGrid, SupplyCard } from './card';
import AdditemForm from './additemform';
import { BrowserRouter, Routes, Route, NavLink,Navigate } from "react-router-dom";


const items = [
  {
    "name": "5G antenna",
    "description": "040-123456",
    "id": 1,
    "price": 900,
    "vendor": "QualComm",
    "quantity": 89
  },
  {
    "name": "CMOS",
    "description": "12-43-234345",
    "id": 3,
    "price": 300,
    "vendor": "QualComm",
    "quantity": 800
  },
  {
    "name": "Chip cutter",
    "description": "39-23-6423122",
    "id": 4,
    "price": 800,
    "vendor": "QualComm",
    "quantity": 55
  },
  {
    "name": "Jamali ",
    "price": "56",
    "quantity": "67900000",
    "id": 8
  },
  {
    "name": "Yara",
    "price": "99",
    "quantity": "6634444",
    "id": 9
  },
  {
    "name": "Najafi ",
    "price": "80",
    "quantity": "5000000",
    "description": "A good bang",
    "id": 10
  },
  {
    "name": "Nokia 500",
    "price": "7800",
    "quantity": "6200",
    "description": "Good Phone ",
    "id": 11
  },
  {
    "name": "hUWAEI",
    "price": "13423532",
    "quantity": "214124",
    "description": "12SFFADFSDF",
    "id": 12
  }
]

const addtosupplylist = () => {
  return (
    <AdditemForm/>
  )
}

const DashBoard = ({userSession}) => {


  let cookstring=document.cookie
  let first=cookstring.split('~')[0]
  let emaild=first.split('=')[1]

  let email2ndterm=""
  const [details,setdetails]=useState('')
  const [iden,setiden]=useState('')
  const[items,setitems]=useState([])
  console.log("cookie ",cookstring,emaild)
  useEffect(()=>{ 

      axios.post("http://192.168.2.104:3003/giventoken/validity",{ cookstring:cookstring,user:'Suser' })
      .then(response => {

        console.log("validity check ",response.data.valid)
        if(response.data.valid){
            console.log("valid")
            axios.post("http://192.168.2.104:3003/giventoken/userdetail",{cookstring:cookstring,user:'Suser',email:emaild})
            .then(response=>{
                console.log("userdetails ",response.data)
                setdetails(response.data.Email)
                email2ndterm=response.data.Email
                setiden(response.data._id)
                console.log("detail hook",details," AND ",iden)
                console.log("2nd term email",email2ndterm)
                console.log("Before sending the data for details",emaild)
                axios.post("http://192.168.2.104:3003/supplierproducts/details",{id:emaild}).
                then((response) => {
                  console.log("raw ",response)
                  console.log("promise fulfilled");
                  setitems((prevState) => response.data);
                  console.log("Item list: ", items);
                  console.log(response.data);
                });
            })
          }
        else{
          window.location = "/login"
        }
      }).
      catch(err=>{
        console.log(err)
      })

  }, []);

  useEffect(()=>{ 
    const getItem =  () => {
      axios.post("http://192.168.2.104:3003/supplierproducts/details",{id:iden}).
      then((response) => {
        console.log("raw ",response)
        console.log("promise fulfilled");
        setitems((prevState) => response.data);
        console.log("Item list: ", items);
        console.log(response.data);
      });
    };
    getItem();
  }, []);



    return (
      <div>
        <NavBar />
        <div className="content">
          <h1>Supplier DashBoard</h1>
          <p>Welcome !</p>
         <div align='center'>
            <MultiActionAreaCard name={details}  />
          </div>
          <div>
          <Alert key='warning' variant='warning'>
      <h2>Configure the type and quantity of items that you are willing to sell :</h2>

      <ol>
            {items.map((item) => (
              <li>
                <SupplyCard
                  id={item.productId}
                  name={item.productName}
                  price={item.price}
                  description={item.Productdetail}
                  quantity={item.total}
                />
              </li>
            ))}
          </ol>



    </Alert>
    <Alert key='success' variant='success'>
    {/* <Button variant="outlined" color="success" onClick={addtosupplylist}>
                  Add to supply list &nbsp; <LibraryAddIcon/>
          </Button> */}
          <AdditemForm  id={emaild}/>
    </Alert>
          </div>
        </div>
      </div>
    );
  };






function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ericsson_logo.svg/2341px-Ericsson_logo.svg.png"
          alt="green iguana"
        />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Name : {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
    
          </Typography>
        </CardContent>
      
      <CardActions>
        <Button size="small" color="primary">
          Edit Details
        </Button>
      </CardActions>
    </Card>
  );
}


export default DashBoard;