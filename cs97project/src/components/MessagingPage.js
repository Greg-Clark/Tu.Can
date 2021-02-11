import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import "./../styles.css";

class MessagingPage extends React.Component {
    render() {
        return(
            <div className="MessagingBox">
                <form>
                <Link to="/">
                    <input type="submit" value="Back to Home"/>
                </Link>
                </form>
                <h1>In progress : Messaging</h1>
                <h2>Add additional messages here</h2>
            </div>
        );
    }
}

export default MessagingPage;
