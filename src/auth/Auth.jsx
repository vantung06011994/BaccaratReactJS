import LoginPage from "pages/LoginPage";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { loginSuccessAction } from "store/actions/UserAction";
import presenter from "../core/adapters/presenters";

// import firebaseAuthService from "../services/firebase/firebaseAuthService";
const checkJwtAuth = async (setUserDispatch, token, partnerId, type) => {
    if (token === undefined) return null;
    const user = await presenter.jwt.loginWithTokenToWSProxy(token, partnerId, type);
    if (user) setUserDispatch(user, type);
    // history.push({
    //     pathname: ROUTE_PATH.LOGIN.URL,
    // });
    else return user;
};

// const checkFirebaseAuth = () => {
//   firebaseAuthService.checkAuthStatus(user => {
//     if (user) {
//       console.log(user.uid);
//       console.log(user.email);
//       console.log(user.emailVerified);
//     } else {
//       console.log("not logged in");
//     }
//   });
// };

const Auth = (props: { children: any, setUserDispatch: any, user: IUserState }) => {
    const queryString = require("query-string");
    const parsed = queryString.parse(window.location.search);
    const { token, partnerId, type } = parsed;

    const { children, setUserDispatch, user } = props;
    const [tokenLoginState, setTokenLoginState] = React.useState({
        isLoading: true,
        isLoginSuccess: false,
    });

    React.useEffect(() => {
        if (!isEmpty(user)) {
            setTokenLoginState({
                isLoading: false,
                isLoginSuccess: true,
            });
        } else {
            checkJwtAuth(setUserDispatch, token, partnerId, type)
                .then((userRes) => {
                    if (isEmpty(userRes) === false) {
                        setTokenLoginState({
                            isLoading: false,
                            isLoginSuccess: true,
                        });
                    } else {
                        setTokenLoginState({
                            isLoading: false,
                            isLoginSuccess: false,
                        });
                    }
                })
                .catch((error) => {
                    setTokenLoginState({
                        isLoading: false,
                        isLoginSuccess: false,
                    });
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setUserDispatch, user]);

    return tokenLoginState.isLoading ? (
        token !== undefined ? (
            <b>LoginState...loading</b>
        ) : (
            <LoginPage></LoginPage>
        )
    ) : (
        <React.Fragment>{children}</React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    setUserDispatch: PropTypes.func.isRequired,
    user: state.user,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setUserDispatch: (user, type) => dispatch(loginSuccessAction(user, type)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
