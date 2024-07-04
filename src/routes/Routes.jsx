import * as React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import GamePage from "pages/GamePage";
import LoginPage from "pages/LoginPage";
import LogoutPage from "pages/LogoutPage";
import NotFoundPage from "pages/NotFoundPage";
import { ROUTE_PATH } from "./RoutePath";

const Routes: React.FC = () => {
    return (
        <>
            <Switch>
                <Redirect exact={true} from="/" to={ROUTE_PATH.GAME.URL} />
                <Route path={ROUTE_PATH.LOGIN.URL} component={LoginPage} />
                <Route path={ROUTE_PATH.LOGOUT.URL} component={LogoutPage} />
                <Route path={ROUTE_PATH.GAME.URL} component={GamePage} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </>
    );
};

export default Routes;
