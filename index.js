require("dotenv").config();

const express = require("express");
const playersRoute = require('./routes/players');
const quotesRoute = require('./routes/quotes');

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

app.use('/players', playersRoute);
app.use('/quotes', quotesRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
