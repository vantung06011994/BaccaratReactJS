import { getDefaultText, getDefaultTextLoginByToken } from "constraints/TextConst";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { isEmptyUserSelector } from "store/selector/UserSelector";
import { loginSuccessAction } from "store/actions/UserAction";
import { onClickAudio } from "utils";
import presenter from "core/adapters/presenters/index";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const isEmptyUser = useSelector(isEmptyUserSelector);
    // presenter.jwt.connectToWS();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            type: "FUN",
        },
        validate(values) {
            const errors = {};
            if (!values.username) {
                errors.username = "Required";
            }
            if (values.username.length > 25) {
                errors.username = "Maximum username length is 25";
            }
            if (!values.password) {
                errors.password = "Required";
            }
            if (values.password.length > 90) {
                errors.password = "Maximum password length is 90";
            }
            return errors;
        },
        onSubmit(values, { isSubmitting, setSubmitting, setErrors }) {
            setTimeout(() => {
                presenter.jwt
                    .loginWithEmailAndPassword(values.username, values.password, values.type)
                    .then((res) => {
                        if (res.data.status === "ok") {
                            dispatch(loginSuccessAction(res.data, values.type));
                        } else {
                            const statusCode = res.data.code !== undefined ? res.data.code : res.data.status;
                            setErrors({
                                loginApiErrorCode: getDefaultText(statusCode),
                            });
                        }
                    })
                    .catch((err) => {
                        setErrors({
                            loginApiErrorCode: getDefaultText(500),
                        });
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }, 2000);

            //alert(JSON.stringify(values, null, 2));
        },
        onHandleChangeType(e, value) {},
    });
    React.useEffect(() => {
        if (window.loginTokenError) {
            formik.setErrors({
                loginApiErrorCode: getDefaultTextLoginByToken(window.loginTokenError),
            });
            window.loginTokenError = null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(() => {
        if (isEmptyUser === false) {
            history.push("/");
        }
    }, [isEmptyUser, history]);

    return (
        <div className="full-container">
            <div className="login">
                <form className="login-form" onSubmit={formik.handleSubmit} noValidate>
                    <h2 className="text-center m-y">Login</h2>
                    <input
                        type="text "
                        placeholder="Enter Username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                    />
                    <div className="error-msg">{formik.errors.username}</div>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                    />
                    <div className="error-msg">{formik.errors.password}</div>
                    <div className="display-flex">
                        <input
                            type="radio"
                            className="width-real-cool"
                            name="type"
                            value="REAL"
                            onChange={formik.handleChange}
                            defaultChecked={formik.values.type === "REAL"}
                            disabled={formik.isSubmitting}
                        />
                        <label htmlFor="real" className="colorBlackText">
                            Real
                        </label>
                    </div>
                    <div className="display-flex">
                        <input
                            type="radio"
                            className="width-real-cool"
                            name="type"
                            value="FUN"
                            onChange={formik.handleChange}
                            defaultChecked={formik.values.type === "FUN"}
                            disabled={formik.isSubmitting}
                        />
                        <label htmlFor="fun" className="colorBlackText">
                            Fun
                        </label>
                    </div>
                    <input
                        onClick={() => {
                            onClickAudio();
                        }}
                        type="submit"
                        className={formik.isSubmitting ? "btn-dark" : "submit"}
                        disabled={formik.isSubmitting}
                    />
                    <div className="error-msg">{formik.errors.loginApiErrorCode}</div>
                </form>
            </div>
        </div>
    );
}
