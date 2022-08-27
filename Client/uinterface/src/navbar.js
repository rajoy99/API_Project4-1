
import { NavLink } from "react-router-dom";
import "./App.css"
import BalanceIcon from '@mui/icons-material/Balance';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import LogoutIcon from '@mui/icons-material/Logout';
import Assignment from '@mui/icons-material/Assignment';

// The Navigation Bar
// This component will be used on all three pages: Home, About, and Contact
const NavBar = () => {
    return (

        <nav>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <CoPresentIcon/> &nbsp;&nbsp;
          DashBoard
        </NavLink>
        <NavLink
          to="/feed"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <BalanceIcon/> &nbsp;&nbsp;
          Feed 
        </NavLink>
        <NavLink
          to="/pending"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <Assignment/> &nbsp;&nbsp;
          Pending
        </NavLink>
        <NavLink
          to="/logout"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
          style={{marginLeft:'389px'}}
        >
          <LogoutIcon/> &nbsp;&nbsp; Log Out
        </NavLink>
      </nav>
    );
  };

  export default NavBar;
