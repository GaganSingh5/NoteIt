import React from 'react'
import PropTypes from 'prop-types'
import Login from '../../Components/Login/Login'

import signInHandler from './Services/SignIn.service';

function SignInView(props: any) {
  const signIn = (signInData: LoginModel) => {
    console.log(signInData);
    return signInHandler(signInData);
  };
  return (
    <div><Login signIn = {signIn} /></div>
  )
}

// SignInView.propTypes = {}

export default SignInView
