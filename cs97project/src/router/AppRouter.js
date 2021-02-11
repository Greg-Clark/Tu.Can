import LoginPage from "../components/LoginPage";
import Messaging from "../components/Messaging";
import Register from "../components/RegisterPage";
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
          <Route path="/" component={LoginPage} exact={true}/>
          <Route path="/messaging" component={Messaging} />
          <Route path='/register' component={Register} />
        </Switch>
      </div>
    </Router>
  );

  export default AppRouter;