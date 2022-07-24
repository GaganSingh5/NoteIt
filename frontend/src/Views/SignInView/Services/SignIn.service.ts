import axios from "axios";
import qs from "qs";

const signInURL = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGIN_URI}`;
const signInHandler = (userRequest: LoginModel) => {
  const requestBody = {
    username: userRequest.username,
    password: userRequest.password,
  };

  console.log(requestBody, signInURL);

  const requestHeader = {
    "content-type": "application/x-www-form-urlencoded",
  };

  return axios.post(signInURL, qs.stringify(requestBody), {
    headers: requestHeader,
    withCredentials: true
  });
};
export default signInHandler;
