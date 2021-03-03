import LoginPage from "../components/LoginPage";
import App from "../components/App";
import RegisterPage from "../components/RegisterPage";
import NotFoundPage from "../components/NotFoundPage";
import About from "../components/About"
import Header from '../components/Header';
import FilesList from '../components/FilesList';
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
                    <Route path="/about" component={About} />
                    <Route path="/upload" component={Header} />
                    <Route path="/list" component={FilesList} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </AuthProvider>
        </div>
    </Router>
);

export default AppRouter;