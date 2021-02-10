import LoginPage from "../components/LoginPage";
import Messaging from "../components/Messaging";
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
        </Switch>
      </div>
    </Router>
  );

  export default AppRouter;