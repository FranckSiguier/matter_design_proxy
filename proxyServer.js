const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

const URL = process.env.URL;
const TOKEN = process.env.TOKEN;

const HEADERS = {
  "X-Auth-Token": TOKEN,
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

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
