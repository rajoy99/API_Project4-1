
import { NavLink } from "react-router-dom";
import NextWeekIcon from '@mui/icons-material/NextWeek';
import StairsIcon from '@mui/icons-material/Stairs';
import DomainIcon from '@mui/icons-material/Domain';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LogoutIcon from '@mui/icons-material/Logout';
// The Navigation Bar
// This component will be used on all three pages: Home, About, and Contact
const NavBar = () => {
    return (
      <nav>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
        <DomainIcon/> &nbsp;&nbsp; Supplier DashBoard 
        </NavLink>
        <NavLink
          to="/pending"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
        <PendingActionsIcon/> &nbsp;&nbsp; Pending Orders
        </NavLink>
        <NavLink
          to="/feed"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <NextWeekIcon/>  &nbsp;&nbsp; Watch The Market 
        </NavLink>
        <NavLink
          to="/logout"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
          style={{marginLeft:'290px'}}
        >
          <LogoutIcon/> &nbsp; Logout
        </NavLink>
      </nav>
    );
  };

  export default NavBar;