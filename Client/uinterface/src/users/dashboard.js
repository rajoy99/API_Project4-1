import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import NavBar from '../navbar';
import { useState, useEffect } from "react";
import axios from 'axios';
import PlaceIcon from '@mui/icons-material/Place';


const userprofile = [{
  "name":"shovo ",
  "location":"3114, Kumilla"
}
]

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

const Greeting = (props) => {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {    return <UserGreeting />;  }
  else  
  return <GuestGreeting />;}


const DashBoard = () => {

  
  let cookstring=document.cookie
  let first=cookstring.split('~')[0]
  let emaild=first.split('=')[1]

  const [details,setdetails]=useState('')
  const [iden,setiden]=useState('')
  const[items,setitems]=useState([])
  console.log("cookie ",cookstring,emaild)


  useEffect(()=>{ 

      axios.post("http://192.168.2.104:3006/giventoken/validity/userdetails",{email:emaild,cookstring:cookstring})
      .then(response => {
        console.log("promise fulfilled");
        console.log(response.data.Email)
        setdetails(response.data.Email)
        console.log("details",details)
      }).
      catch(err=>{
        console.log(err)
      })
  }, []);


    return (
      <div>
        <NavBar />
        <div className="content">
          <h1>User DashBoard</h1>
         <div align='center'>
            <MultiActionAreaCard name={details} location={userprofile[0].location} />
          </div>
        </div>
      </div>
    );
  };






function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Welcome {props.name} ! 
           </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            <PlaceIcon></PlaceIcon>Address : {props.location}
          </Typography> */}
        </CardContent>
      
      <CardActions>
        {/* <Button size="small" color="primary">
          Edit Details
        </Button> */}
      </CardActions>
    </Card>
  );
}


export default DashBoard;