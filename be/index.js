import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import url from 'url';
import getRecalculatedCurrencies from './utils/getRecalculatedCurrencies.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
let exchangeRates;

app.get('/', async (req, res) => {
  try {
    const { base, value } = url.parse(req.url, true).query;
    if (!base || !value) {
      return res.sendStatus(400);
    }

    if (!exchangeRates) {
      const requestURL = `${process.env.REQUESTURL}?base=USD&amount=${value}`;
      const response = await fetch(requestURL);
      exchangeRates = await response.json();
      res.status(200).type('application/json');
      return res.send(exchangeRates);
    }

    if (exchangeRates) {
      const result = getRecalculatedCurrencies(exchangeRates, base, value);
      res.status(200).type('application/json');
      return res.send(result);
    }
  } catch(e) {
    res.sendStatus(500);
  }
})

app.use((req, res, next) => {
  res.sendStatus(404);
})

app.listen(PORT, () => {
  console.log('server has been started');
})
