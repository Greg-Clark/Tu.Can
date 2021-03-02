import LoginPage from "../components/LoginPage";
import App from "../components/App";
import RegisterPage from "../components/RegisterPage";
import NotFoundPage from "../components/NotFoundPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { AuthProvider } from "../services/Auth";

const AppRouter = () => (
    <Router>
        <div>
            <AuthProvider>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/messaging" component={App} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </AuthProvider>
        </div>
    </Router>
);

export default AppRouter;