import React from "react";
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import ReactDOM from "react-dom";
import "./../styles.css";

class RegisterPage extends React.Component {
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
    
          <div className="RegisterBox"> 
          
          <h1>Register</h1>
        
          <form onSubmit={this.submitHandler}>
            {/*username*/}
            <p>username:</p>
            <input type="text" name="username" onChange={this.myChangeHandler} />
    
            {/*password*/}
            <p>password:</p>
            <input type="text" name="password" onChange={this.myChangeHandler} />
            <br></br>
            {/*input*/}
            <Link to="/">
              <input type="submit" value="Register Account"/>
            </Link>
            <Link to="/">
              <input type="submit" value="Cancel"/>
            </Link>
    
          </form>
          </div>
        );
      }
}

export default RegisterPage;