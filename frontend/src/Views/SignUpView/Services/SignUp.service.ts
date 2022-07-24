import axios from "axios";
import qs from "qs";

const signUpURL = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SIGNUP_URI}`;
const signUpHandler = (userRequest: SignUpModel) => {
    const requestBody = {
        firstname: userRequest.firstname,
        lastname: userRequest.lastname,
        email: userRequest.email,
        username: userRequest.username,
        password: userRequest.password
    };

    console.log(requestBody, signUpURL);
    

    const requestHeader = {
        "content-type": "application/x-www-form-urlencoded"
    };

    return axios.post(signUpURL, qs.stringify(requestBody), {
        headers: requestHeader
    })
};

// const SignUpService = {
//     signUpHandler
// };

// module.exports = SignUpService;
export default signUpHandler;
