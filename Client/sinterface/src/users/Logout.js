import React, { useState } from "react";
import { Link as RouterLink, useNavigate, Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../navbar";
import { Alert } from "react-bootstrap";

const getCookie = (name) => {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
};

const deleteCookie = (name, path, domain) => {
  if (getCookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};

const Logout = () => {
  const [cookies, setCookie, removeCookies] = useCookies(["name"]);
  const [userSession, setUserSession] = useState(true);

  const sess_id = cookies["session-id"];
  console.log("Cook from react logout ", sess_id);
  console.log("Js cook from logout", document.cookie);

  const handlelogout = (event) => {
    axios
      .post("http://192.168.2.104:3002/logout", {
        session_idr: document.cookie,
      })
      .then((res) => {
        console.log(res.data.signal);
        if (res.data.signal == true) {
          window.location.replace("http://192.168.2.103:3001/login");
        }
        setUserSession(false);
        document.cookie =
          "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      });

    //   const res = await fetch('http://192.168.2.104:3002/logout', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         session_idr:document.cookie
    //     })

    //   })
    //   console.log(res.status)
    //   deleteCookie(document.cookie)
    //   if(res.status==200){
    //     setUserSession(false)
    //     console.log(userSession)
    //     // console.log(res.status)
    //     // deleteCookie(document.cookie)
    //     console.log("hellow")
    //     let d = new Date();
    //     d.setTime(d.getTime());
    //     setCookie({path: "/", expires: d})
    //     console.log(document.cookie)
    // }
  };

  return (
    <div align="center">
      <NavBar />

      <Alert key='info' variant='info' style={{height:'290px',width:'340px',marginTop:'130px'}}>
        <h2> Confirm Logout pressing this button : </h2>

        <Button variant="outlined" color="error" onClick={handlelogout}>
          Logout
        </Button>
      </Alert>
    </div>
  );
};

export default Logout;
