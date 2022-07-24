import axios from "axios";
// import qs from 'qs';


const getQuoteURL = "http://localhost:5000/api/quote/today";

const getQuoteHandler = () => {
    return axios.get(getQuoteURL);
};

export default getQuoteHandler;
