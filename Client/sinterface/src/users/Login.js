import React, { Component } from "react";
import styles from "./signup.module.scss";
import axios from "axios";
import AnchorIcon from '@mui/icons-material/Anchor';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Card } from "react-bootstrap";

class SubmitForm extends Component {
  state = {
    email: "",
    password: "",
  };
  /* This is where the magic happens
   */
  handleSubmit = (event) => {
    event.preventDefault();

    var Hashes = require("jshashes");

    //cookie generation
    let cookstring = "user=" + this.state.email + "~" + this.state.password;
    console.log(cookstring);
    document.cookie = cookstring;

    let encrypted_password = new Hashes.SHA1().b64(this.state.password);

    const user = {
      email: this.state.email,
      password: encrypted_password,
      user: "Suser",
    };
    axios.post("http://192.168.2.104:3002/login", { user }).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log("validation check: ", res.data.validate);
      // window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
      if (res.data.validate) {
        document.cookie = cookstring;
        axios
          .post("http://192.168.2.104:3002/login/token/confirmation", {
            email: this.state.email,
            password: this.state.password,
            cookstring: cookstring,
          })
          .then((res) => {
            console.log("cookie set");
            console.log(res);
            if (res.data.tokensuccess) {
              window.location = "/home";
            }
          });
      }
    });
    console.log("Email : ", user.email);
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
        <Card bg="success" style={{ width: "24rem" }} text={"white"} className="mb-2">
    <Card.Header>Supplier Login </Card.Header>
    <Card.Body>
      <Card.Text>
 <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                placeholder="email"
                onChange={this.handleChangeemail}
                style={{width: '100%'}}
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
                style={{width: '100%'}}
              />
            </div>
            &nbsp;&nbsp;
            
            <button
              type="submit"
              style={{
                color: "black",
                backgroundColor: "white",
                borderRadius: "2px",
                padding: "12px 24px",
                fontSize:"12px",
                marginTop:"12px",
                fontSize:'18 px'
   
              }}
            >
              {" "}
              Log In <TelegramIcon/> 
            </button>
          </form>

      </Card.Text>
    </Card.Body>
  </Card>
      
</div>
</section>
    

    );
  }
}

export default SubmitForm;
