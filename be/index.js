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

let state;

app.get('/', async (req, res) => {
  try {
    const {base, value} = url.parse(req.url, true).query;
    if (!state) {
      const requestURL = `https://api.exchangerate.host/latest?base=USD&amount=${value}`;
      const response = await fetch(requestURL);
      state = await response.json();
      res.send(state);
    } else {
      const result = getRecalculatedCurrencies(state, base, value);
      res.send(result);
    }
  } catch(e) {
    res.sendStatus(500);
  }
  
})

app.listen(PORT, () => {
  console.log('server has been started');
})

