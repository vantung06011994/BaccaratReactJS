import * as React from "react";

import { Redirect, withRouter } from "react-router-dom";
import { findKey, get, isEmpty } from "lodash";

import { ROUTE_PATH } from "../routes/RoutePath";
import { connect } from "react-redux";

const getAuthStatus = (user, pathname, objRoutes) => {
    /*logic compare role of User*/
    const k = findKey(objRoutes, { URL: pathname });
    const matched = get(objRoutes, [k]);

    const authenticated = matched && matched.AUTH && matched.AUTH.length ? matched.AUTH.includes(user.role) : true;
    return authenticated;
};

const AuthGuard = (props) => {
    const { location, history, user } = props;
    const authenticated = React.useMemo(() => {
        return getAuthStatus(user, location.pathname, ROUTE_PATH);
    }, [location.pathname, user]);
    React.useEffect(() => {
        if (!authenticated && isEmpty(user)) {
            history.push({
                pathname: ROUTE_PATH.LOGIN.URL,
                state: { redirectUrl: location.pathname },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated, user]);

    return authenticated ? <React.Fragment>{props.children}</React.Fragment> : <Redirect to={ROUTE_PATH.LOGIN.URL} />;
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
