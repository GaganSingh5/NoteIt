import './SignUpView.less';
import SignUp from '../../Components/SignUp/SignUp';
import React from 'react';
import signUpHandler from "./Services/SignUp.service";

// import PropTypes from 'prop-types'

const SignUpView = (props: any) => {
    
    const signUp = (signUpData: SignUpModel) => {
        console.log(signUpData);
        return signUpHandler(signUpData);
    };
    return (<div className="signup_view_container">
        <SignUp signUp={signUp} />
    </div>);
};

// LoginView.propTypes = {}

export default SignUpView;
