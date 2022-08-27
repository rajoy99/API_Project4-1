import { useState, useEffect, createContext } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './styles/theme'
// import Routes from './Routes'
import { useCookies } from 'react-cookie';
import Login from "./users/Login";
import Signup from "./users/Signup";
import Logout from "./users/Logout";
import NavBar from "./navbar";
import Feed from "./users/feed";
import DashBoard from "./users/dashboard";
import Checkout from './users/Checkout';
import Pending from './users/pending';
import Emptypage from './emptypage';
import { BrowserRouter, Routes, Route, NavLink,Navigate } from "react-router-dom";
import './App.css'




export const UserContext = createContext({})

function App() {

  
  const [loading, setLoading] = useState(true)
  const [userSession, setUserSession] = useState(false)
  const [cookies, setCookie] = useCookies(['name']);
  const [iden,setiden]=useState('')
  console.log("JS cookie: ",document.cookie)
  const sess_id=cookies['session-id']
  console.log("Cook from react ",sess_id)


  // useEffect(() => {
  //   const fetchUserAuth = async () => {
  //     try {
  //       setLoading(true)
  //       const res = await fetch('http://localhost:5001/api/isAuth', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           session_idr:sess_id
  //         }),
  //         credentials: 'include'
  
  //       })
  //       var body = await res.json();
  //       console.log(" reponse from front end : ",body.identity)
  //       if (!body) return setLoading(false)
  //       setiden(body.identity)
  //       if(body.identity)
  //       { 
  //         setUserSession(true)
  //         return;
  //       }

  //       console.log("cur state of usersession",userSession)
  //       setLoading(false)
  //      }
  //      catch (error) {
  //       setLoading(false)
  //       console.error('There was an error fetch auth', error)
  //       return
  //     }
  //   }
  //   fetchUserAuth()
  // }, [])



  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/login"   element={<Login />}/>
      <Route exact path="/signup"   element={<Signup/>}/>
      <Route exact path="/home" element={<DashBoard iden={iden} />} />
      <Route exact path="/feed" element={<Feed userSession={userSession} />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/pending" element={<Pending/>} />
      <Route exact path="/checkout" element={<Checkout/>} />
      <Route path="*" element={<Emptypage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
