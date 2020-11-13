import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import routes from "../../utils/constants/routes.json"
import {LoginSelect} from "../../routes/login/login";
import {UserRoute} from "../../routes/user/user";
import {AdminRoute} from "../../routes/admin/admin";
import {AboutRoute} from "../../routes/about/about";
import {NavBar} from "../navbar/navbar";


export const GlobalRouter = (props) => {
    return (<>

            <Router>
                <Switch>
                    <Route exact path={routes.LOGIN} component={LoginSelect}/>
                    <Route path={routes.USER} component={UserRoute}/>
                    <Route path={routes.ADMIN} component={AdminRoute}/>
                    <Route path={routes.ABOUT} component={AboutRoute}/>
                </Switch>
            </Router></>
    );
};