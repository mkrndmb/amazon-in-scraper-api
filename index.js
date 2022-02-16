const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3010;

const getScraperURL = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to API');
});

app.get('/products/:productId', async (req, res) => {
  const {productId} = req.params
  const {api_key} = req.query
  try {
    const response = await axios.get(`${getScraperURL(api_key)}&url=https://www.amazon.in/dp/${productId}`)
    res.send(response.data);
  } catch (err) {
    res.json(err);
  }
});

app.get('/products/:productId/reviews', async (req, res) => {
    const {productId} = req.params
    const {api_key} = req.query
    try {
      const response = await axios.get(`${getScraperURL(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`)
      res.send(response.data);
    } catch (err) {
      res.json(err);
    }
  });

  app.get('/products/:productId/offers', async (req, res) => {
    const {productId} = req.params
    const {api_key} = req.query
    try {
      const response = await axios.get(`${getScraperURL(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`)
      res.send(response.data);
    } catch (err) {
      res.json(err);
    }
  });

  app.get('/search/:searchQuery', async (req, res) => {
    const {searchQuery} = req.params
    const {api_key} = req.query
    try {
      const response = await axios.get(`${getScraperURL(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`)
      res.send(response.data);
    } catch (err) {
      res.json(err);
    }
  });

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
