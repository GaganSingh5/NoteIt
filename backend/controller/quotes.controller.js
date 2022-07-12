const fetch = require('node-fetch');

const getQuotePromise = function () {
  return fetch(`${process.env.ZENQUOTES_URL}${process.env.ZENQUOTES_API_KEY}`);
};

exports.getQuote = async function (req, res) {
  getQuotePromise()
    .then((data) => data.json())
    .then((quoteResponse) => res.status(200).json(quoteResponse[0]))
    .catch((err) => res.status(500).json({
      statusCode: '500',
      description: 'Unexpected error occured while getting quote',
      status: 'Internal Server Error',
      error: err,
    }));
};
