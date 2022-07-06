const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const envVariables = {
  API_Key: process.env.Api_Key,
};

export default envVariables;
