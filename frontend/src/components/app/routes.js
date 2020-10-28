import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../../utils/constants/routes.json"
import {LoginSelect} from "../../routes/login/login";
import {StudentRoute} from "../../routes/student/student";
import {AdminRoute} from "../../routes/admin/admin";


export const GlobalRouter = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path={routes.LOGIN} component={LoginSelect} />
                <Route path={routes.STUDENT} component={StudentRoute} />
                <Route path={routes.ADMIN} component={AdminRoute} />
            </Switch>
        </Router>
    );
};