import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import PropTypes from 'prop-types';
import "./Login.less";

import AuthContext from "../../Context/AuthProvider";
import { AxiosError } from "axios";
import { ErrorMessage } from "@hookform/error-message";

const Login = ({ signIn }: any) => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [isDisabled, setIsDisabled] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
    });

    const loginHandler = (loginData: LoginModel) => {
        setIsDisabled(true);
        // e.preventDefault();
        console.log(loginData);
        signIn(loginData)
        .then((res: any) => {
            console.log(res);
            if (res.status == 200) {
            setAuth(res?.data);
            navigate("/notes");
            }
        })
        .catch((err: AxiosError) => {
            setIsDisabled(false);
            console.log(err);
            const errorData: any = err.response.data;
            // console.log(errorData.error.errors.username.name);

            if (errorData?.statusCode === 401) {
            console.log("executed");

            setError("exception", {
                type: "unauthorized",
                message: "Invalid Username or Password",
            });
            } else {
            setError("exception", {
                type: "serverError",
                message: "Unexpected Server Error",
            });
            }
        });
    };

    const clearExceptionErrors = () => {
        if (errors.exception) {
        clearErrors();
        }
    };
    return (
        <div className="login-container">
        <div className="login-card">
            <div className="login-header">
            <h3>Login</h3>
            </div>
            {errors.exception && (
            <div className="error-container">
                <ErrorMessage
                errors={errors}
                name="exception"
                render={({ message }) => <p>{message}</p>}
                />
            </div>
            )}

            <form onSubmit={handleSubmit(loginHandler)} className="login-form">
            <div className="login-text-input">
                {errors.username && (
                <div className="login-error">
                    <ErrorMessage
                    errors={errors}
                    name="username"
                    render={({ message }) => <p>{message}</p>}
                    />
                </div>
                )}
                <input
                className={errors.username ? "error-input" : ""}
                type="text"
                disabled={isDisabled}
                id="username"
                autoComplete="off"
                placeholder="Username"
                {...register("username", {
                    required: "Required",
                    onChange: () => clearExceptionErrors(),
                })}
                />
            </div>
            <div className="login-text-input">
                {errors.password && (
                <div className="login-error">
                    <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => <p>{message}</p>}
                    />
                </div>
                )}
                <input
                autoComplete="on"
                onChange={clearExceptionErrors}
                className={errors.password ? "error-input" : ""}
                type="password"
                disabled={isDisabled}
                name="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                    required: "Required",
                    onChange: () => clearExceptionErrors(),
                })}
                />
            </div>
            <div className="login-button">
                <button disabled={isDisabled} className="">
                Login
                </button>
            </div>
            </form>

            <div className="login-footer">
            <p>
                New Here? <span>👉</span>
                <Link className={isDisabled ? "disabled-link" : ""} to="/signup">
                SignUp
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
};

// Login.propTypes = {};

export default Login;
