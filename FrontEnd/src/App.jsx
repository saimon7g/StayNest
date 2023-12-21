import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      isLogin: false,
    };
  }

  // componentDidMount = () => {
  //   this.getSession();
  // }


  getSession = () => {
    fetch("/api/session") , {
      credentials : "same-origin",
    }
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.isautheticated) {
        this.setState({ isLogin: true });
      }
      else {
        this.setState({ isLogin: false });
      }
    })
    .catch((err) => console.log(err));
  }

  whoami = () => {
    fetch("/api/whoami"), {
      Headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    }
    .then((res) => res.json())
    .then((data) => {
      console.log("whoami", data);
    })
    .catch((err) => console.log(err));
  }

  hamdlePassWordChsnge = (e) => {
    this.setState({ password: e.target.value });
  }
  handleUserNameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  ifResponseOk = (response) => {
    if (response.staus >= 200 && response.status < 300) {
      return response.json();
    }
    else {
      throw Error(response.statusText);
    }
  }
  login = () => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
    .then(this.ifResponseOk)
    .then((data)=> {
      console.log(data);
      this.setState({ isautheticated: true,username: "", password: "" });
    })
    .catch((err) => {
      console.log(err);
      this.setState({ error: "Invalid Credentials" });
    });
  }
  logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
    .then(this.ifResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({ isautheticated: false });
    })
    .catch((err) => console.log(err));
  }
  render(){
    return (
      <div>

        <h1>React Django Authentication</h1>
       

      </div>
    );
  }
}

export default App;



      

