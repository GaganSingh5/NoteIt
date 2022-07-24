require('dotenv').config();

module.exports = {
    env: {
        BASE_URL: process.env.REACT_APP_BACKEND_URL,
        SIGNUP_URL: process.env.REACT_APP_SIGNUP_URI
    }
};
