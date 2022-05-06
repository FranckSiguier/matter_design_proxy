const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const URL = process.env.URL;
const TOKEN = process.env.TOKEN;
const POWERFUL_TOKEN = process.env.TOKEN_TO_MODIFY;

const HEADERS = {
  "X-Auth-Token": TOKEN,
  "Content-Type": "application/json",
};

const POWERFUL_HEADERS = {
  "X-Auth-Token": POWERFUL_TOKEN,
  "Content-Type": "application/json",
};

app.get("/products", async (req, res) => {
  const response = await axios({
    method: "get",
    url: URL,
    headers: HEADERS,
  });
  const products = response.data.data;

  res.json(products);
});

app.get("/products/:productId/images", async (req, res) => {
  const productId = req.params.productId;

  const response = await axios({
    method: "get",
    url: `${URL}/${productId}/images`,
    headers: HEADERS,
  });
  const images = response.data.data;

  res.json(images);
});

app.get("/products/:productId/bulk-pricing-rules", async (req, res) => {
  const productId = req.params.productId;

  const response = await axios({
    method: "get",
    url: `${URL}/${productId}/bulk-pricing-rules`,
    headers: HEADERS,
  });

  res.json(response.data);
});

app.post("/products/:productId/bulk-pricing-rules", async (req, res) => {
  const productId = req.params.productId;
  const { quantity_min, quantity_max, type, amount } = req.body;

  const response = await axios({
    method: "post",
    url: `${URL}/${productId}/bulk-pricing-rules`,
    headers: POWERFUL_HEADERS,
    data: {
      quantity_min,
      quantity_max,
      type,
      amount,
    },
  });

  res.json(response.data);
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
