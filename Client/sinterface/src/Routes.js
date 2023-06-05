import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./users/Login";
import Signup from "./users/Signup";
import NavBar from "./navbar";
import Feed from "./users/feed";
import DashBoard from "./users/dashboard";
import { useContext } from "react";
import { UserContext } from "./App";
import "./App.css";

function RoutesComp() {
  const userContext = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        {userContext.email && (
          <Route exact path="/home" element={<DashBoard />} />
        )}
        {!userContext.email && (
          <>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </>
        )}
        <Route exact path="/home" element={<DashBoard />} />
        <Route exact path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComp;
