import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  
function LoginPage() {
    return (
        <div>         
        <h1>In progress : Login Page</h1>
        <form>
            {/*username*/}
            <p>username:</p>
            <input type="text" name="username"/>
            {/*password*/}
            <p>password:</p>
            <input type="text" name="password"/>
            <br></br>
            {/*input*/}
            <Link to="/messaging">
            <input type="submit" value="Login"/>
            </Link>
            <Link to="/register">
            <input type="submit" value="Register"/>
            </Link>
            </form>
        </div>
    );
}

export default LoginPage;