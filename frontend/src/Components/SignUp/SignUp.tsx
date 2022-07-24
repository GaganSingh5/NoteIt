import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import PropTypes from "prop-types";
import "./SignUp.less";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

    interface SignUpProps {
    signUp: any;
    }

    const SignUp = (props: SignUpProps) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
    });

    const [isDisabled, setIsDisabled] = useState(false);

    const signUpHandler = (data: any) => {
        // e.preventDefault();
        setIsDisabled(true);
        console.log(data);
        props
        .signUp(data)
        .then((res: any) => {
            console.log(res);
            if (res.data.statusCode == '201') {
                navigate("/login");
            }
        })
        .catch((err: AxiosError) => {
            setIsDisabled(false)
            console.log(err);
            const errorData: any = err.response.data;
            console.log(errorData.error.errors.username.name);
            
            if (errorData.error.code === 11000 && errorData.error.keyPattern.email === 1) {
                console.log("executed");
                
                setError('email',{ type: 'duplicate', message: 'Email Already Exists' })
            }
            else if (errorData.error.code === 11000 && errorData.error.keyPattern.username === 1) {
                console.log("executed");
                
                setError('username',{ type: 'duplicate', message: 'Username Already Exists'})
            }
            else if (errorData.error.errors.username.name === "ValidatorError") {
                setError('username',{ type: 'validation', message: 'Special Characters not Allowed'})
            }
        });
    };
    return (
        <div className="signup-container">
            <div className="signup-card">
            <div className="signup-header">
                <h3>Sign Up</h3>
            </div>
            <form onSubmit={handleSubmit(signUpHandler)} className="signup-form">
                <div className="signup-text-input">
                    {
                        (errors.firstname) && 
                        (<div className="signup-error">
                            <ErrorMessage
                                errors={errors}
                                name="firstname"
                                render={({ message }) => <p>{message}</p>}
                            />
                        </div>)
                    }
                    
                    <input
                        className={errors.firstname?"error-input":""}
                        disabled={ isDisabled }
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="FirstName"
                        {...register("firstname", { required: 'Required' })}
                    />
                </div>
                <div className="signup-text-input">
                    {
                        (errors.lastname) && 
                        (<div className="signup-error">
                            <p>Required</p>
                        </div>)
                    }
                <input
                    className={errors.lastname?"error-input":""}
                    disabled={isDisabled}
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="LastName"
                    {...register("lastname", { required: 'Required' })}
                />
                </div>
                <div className="signup-text-input">
                    {
                        (errors.email) && 
                        (<div className="signup-error">
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ message }) => <p>{message}</p>}
                            />
                        </div>)
                    }
                <input
                    className={errors.email?"error-input":""}
                    disabled={isDisabled}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    {...register("email", { required: 'Required', pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid Email"
                                            } })}
                />
                </div>
                <div className="signup-text-input">
                    {
                        (errors.username) && 
                        (<div className="signup-error">
                            <ErrorMessage
                                errors={errors}
                                name="username"
                                render={({ message }) => <p>{message}</p>}
                            />
                        </div>)
                    }
                <input
                    className={errors.username?"error-input":""}
                    disabled={isDisabled}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    {...register("username", { required: 'Required' })}
                />
                </div>
                <div className="signup-text-input">
                    {
                        (errors.password) && 
                        (<div className="signup-error">
                            <p>Required</p>
                        </div>)
                    }
                <input
                    className={errors.password?"error-input":""}
                    disabled={isDisabled}
                    type="password"
                    autoComplete="true"
                    name="password"
                    id="password"
                    placeholder="Password"
                    {...register("password", { required: 'Required' })}
                />
                </div>
                <div className="signup-button">
                <button disabled={isDisabled} className="">
                    SignUp
                </button>
                </div>
            </form>
            <div className="login-footer">
                <p>
                Already a User? <span>👉</span>
                <Link className={isDisabled?"disabled-link":""} to="/login">Log In</Link>
                </p>
            </div>
            </div>
        </div>
    );
};

SignUp.propTypes = { SignUp: PropTypes.func };

export default SignUp;
