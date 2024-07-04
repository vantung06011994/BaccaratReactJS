import { ROUTE_PATH } from "../routes/RoutePath";
import React from "react";
import { Redirect } from "react-router-dom";
import presenter from "../core/adapters/presenters/index";
import { useDispatch } from "react-redux";
import { userLogout } from "store/actions/UserAction";

export default function LogoutPage() {
    const [isLogout, setIsLogout] = React.useState(false);
    const dispatch = useDispatch();
    React.useEffect(() => {
        presenter.jwt.logout();
        dispatch(userLogout());
        setIsLogout(true);
    }, [dispatch]);
    return <>{isLogout ? <h1>logout....</h1> : <Redirect to={ROUTE_PATH.LOGIN.URL} />}</>;
}
