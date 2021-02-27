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
          <Route path="/" exact={true}/>
            <LoginPage />
          <Route path="/messaging" />
            <App />
          <Route path='/register' />
            <RegisterPage />
        </Switch>
      </div>
    </Router>
  );

  export default AppRouter;