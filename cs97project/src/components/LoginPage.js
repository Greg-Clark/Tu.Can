import React from "react";
//import ReactDOM from "react-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: null
    };
  }
  myChangeHandler = (event) => {
    let user = event.target.name;
    let pass = event.target.value;
    this.setState({ [user]: pass });
  };

  submitHandler = (event) => {
    alert(
      "a name was submitted: " + this.state.username +
      "and a password was submitted: " +  this.state.password
    );

    event.preventDefault();
  };

  render() {
    return (
      <div style={
        {
          backgroundColor: "navy",
          width: "500px",
          height: "400px",
          alignItems: "center",
          justifyContent: "center",
          position: 'absolute', left: '50%', top: '50%',
        }
      }>
        <h1 style={{
          color: "white"
        }}>Yuh</h1>
        <form onSubmit={this.submitHandler}>
          {/*username*/}
          <p>username:</p>
          <input type="text" name="username" onChange={this.myChangeHandler} />

          {/*password*/}
          <p>password:</p>
          <input type="text" name="password" onChange={this.myChangeHandler} />
          <br></br>
          {/*input*/}
          <input type="submit" value="Login" />

          {/*button for switching between login/username*/}
          <button>hello</button>
        </form>
      </div>
    );
  }
}

export default LoginPage

//ReactDOM.render(<LoginPage />, document.getElementById("root"));
