import React, { Component } from "react";

import axios from "axios";
import styles from "./login.module.css";

class SubmitForm extends Component {
  state = {
    email: "",
    password: "",
  };



  
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
      user: "Guser",
    };
    axios.post("http://192.168.2.104:3005/login", { user }).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log("validation check: ", res.data.validate);
      // window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
      if (res.data.validate) {
        document.cookie = cookstring;
        axios
          .post("http://192.168.2.104:3005/login/token/confirmation", {
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
      <div className={styles.logbody}>
        <div className={styles.center}>
          <h1> Customer Login </h1>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.inputbox}>
              {" "}
              <input
                type="text"
                name="email"
                placeholder="email"
                onChange={this.handleChangeemail}
              />
            </div>
            <div className={styles.inputbox}>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={this.handleChangepwd}
              />
            </div>
            &nbsp;&nbsp;
            <div className={styles.inputbox}>
              <button type="submit"> Log In </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default SubmitForm;
