
import { NavLink } from "react-router-dom";

// The Navigation Bar
// This component will be used on all three pages: Home, About, and Contact
const NavBar = () => {
    return (
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          DashBoard
        </NavLink>
        <NavLink
          to="/feed"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          Feed
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          Contact
        </NavLink>
      </nav>
    );
  };

  export default NavBar;