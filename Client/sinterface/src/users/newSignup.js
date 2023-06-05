import React, { Component } from "react";
import styles from "./signup.module.scss";
import axios from "axios";
import AnchorIcon from "@mui/icons-material/Anchor";
import TelegramIcon from "@mui/icons-material/Telegram";

class NewSignup extends Component {
  state = {
    email: "",
    password: "",
  };
  /* This is where the magic happens
   */

  handleSubmit = async (event) => {
    event.preventDefault();

    var Hashes = require("jshashes");
    let encrypted_password = new Hashes.SHA1().b64(this.state.password);
    console.log(this.state.email);

    axios
      .post("http://192.168.2.104:3001/register", {
        email: this.state.email,
        password: this.state.password,
        usertype:'Suser'
      })
      .then((res) => {
        if (res.status == 200) {
          window.location = "/login";
        }
      });

    //   const res = await fetch('http://192.168.2.104:3001/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin':'*'
    //     },
    //     body: JSON.stringify({
    //       email: this.state.email,
    //       password: encrypted_password,
    //       usertype:'Suser'
    //     }),
    //   })

    //   if (!res.ok) {
    //   console.log(res.status)
    //   if(res.status==200){
    //     window.location = "/login"
    //   }
    // }
  };

  handleChangeemail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangepwd = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <section>
        <div>
          <h3 style={{ color: "black" }}>Supplier Sign UP </h3>
          <div className="square" style={{ "--i": "0" }}></div>
          <div className="square" style={{ "--i": "1" }}></div>

          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange={this.handleChangeemail}
                />
                <i className="fas fa-user-circle"></i>
              </div>
              <br></br>
              <div className=" password">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={this.handleChangepwd}
                />
              </div>
              &nbsp;&nbsp;
              <button
                type="submit"
                style={{
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "3px",
                  padding: "15px 32px",
                  fontSize: "16px",
                  marginTop: "6px",
                  fontSize: "24px",
                }}
              >
                {" "}
                Sign Up <TelegramIcon />
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default NewSignup;
