import axios from "axios";
// import qs from 'qs';


const getQuoteURL = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_QUOTE_URI}`;

const getQuoteHandler = () => {
    return axios.get(getQuoteURL);
};

export default getQuoteHandler;
