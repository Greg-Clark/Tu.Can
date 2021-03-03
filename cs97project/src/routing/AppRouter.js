import LoginPage from "../components/LoginPage";
import App from "../components/App";
import RegisterPage from "../components/RegisterPage";
import NotFoundPage from "../components/NotFoundPage";
import About from "../components/About"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { AuthProvider } from "../services/Auth";
import { UserProvider } from "../contexts/UserProvider";
import PrivateRoute from "../components/PrivateRoute";

const AppRouter = () => (
    <Router>
        <div>
            <UserProvider>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <PrivateRoute path="/messaging" component={App} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/about" component={About} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </UserProvider>
        </div>
    </Router>
);

export default AppRouter;