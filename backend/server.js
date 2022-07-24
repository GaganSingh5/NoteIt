const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const corsOptions = {
  origin: 'https://noteit--app.herokuapp.com',
  credentials: true,
};
const PORT = process.env.PORT || 5000;
const mongooseURI = process.env.ATLAS_URI;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.static(`${__dirname}/public`));

mongoose.connect(mongooseURI, { useNewUrlParser: true });

const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB connection established');
});

require('./routes/api/auth/auth.routes')(app);
require('./routes/api/posts/posts.routes')(app);
require('./routes/api/quotes/quotes.routes')(app);

app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
