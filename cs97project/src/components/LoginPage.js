import React from "react";
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import ReactDOM from "react-dom";
import "./../styles.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }

  changeHandler = (event) => {
    let user = event.target.name;
    let pass = event.target.value;
    this.setState({ [user]: pass });
  };

  //handler for Login Button
  submitHandler = (event) => {
    // alert(
    //   "a name was submitted: " +
    //     this.state.username +
    //     " and a password was submitted: " +
    //     this.state.password
    // );
    
    //event.preventDefault();
  };

  render() {
    
    return (

      <div className="LoginBox"> 
      
      <h1>Yung Milk</h1>
    
      <form onSubmit={this.submitHandler}>
        {/*username*/}
        <p>username:</p>
        <input type="text" name="username" onChange={this.myChangeHandler} />

        {/*password*/}
        <p>password:</p>
        <input type="text" name="password" onChange={this.myChangeHandler} />
        <br></br>
        {/*input*/}
        <input type="submit" value="Login"/>

      </form>
      </div>
    );
  }
}




function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users"><button>Users</button></Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (

    <div className="LoginBox"> 
    
    <h1>Yung Milk</h1>
  
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
      </form>
    </div>
  );
}

function About() {
  return <h2> about page placeholder </h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default LoginPage;
//ReactDOM.render(<App />, document.getElementById("root"));

