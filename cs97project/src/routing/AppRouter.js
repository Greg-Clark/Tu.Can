import LoginPage from "../components/LoginPage";
import App from "../components/App";
import RegisterPage from "../components/RegisterPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

const AppRouter = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" >
                    <LoginPage />
                </Route>
                <Route path="/messaging" >
                    <App />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;