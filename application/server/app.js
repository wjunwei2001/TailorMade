// import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const Product = require('./models/Product');
require("dotenv").config();


// app
const app = express();

// db
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Successfully connected to database'))
.catch((err) => console.log('Error connecting to databse', err));

// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true}));

// routes
const testRoutes = require('./routes/test');
app.use("/", testRoutes);

// port
const port = process.env.PORT || 8080;


// listener
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));

fs.createReadStream("/Users/darrentan/Desktop/TailorMade/dataset/product_sample.csv")
  .pipe(csv())
  .on('data', async (row) => {
    try {
      if (row.original_price) {
        row.original_price = row.original_price.replace('$', '').replace(/,/g, '');
      }

      if (row.sale_price) {
        row.sale_price = row.sale_price.replace('$', '').replace(/,/g, '');
      }
      
      const product = new Product({
        title: row.title,
        original_price: row.original_price,
        sale_price: row.sale_price,
        rating: row.rating,
        review_count: row.review_count,
        main_category: row.main_category,
        sub_category_1: row.sub_category_1,
        sub_category_2: row.sub_category_2,
        rankings: row.rankings,
        description: row.description,
        purchase_cnt_prev_month: parseInt(row.purchase_cnt_prev_month),
        store_name: row.store_name,
        is_available: row.is_available !== 'Not Available',
        predicted_trendiness: parseFloat(row.predicted_trendiness),
        predicted_uniqueness: parseFloat(row.predicted_uniqueness),
        ecommerce_text: row.ecommerce_text,
        product_embedding: JSON.parse(row.product_embedding),
        deliver_to_singapore: row.deliver_to_singapore === 'yes',
        deliver_to_malaysia: row.deliver_to_malaysia === 'yes',
        delivery_time: row.delivery_time,
      });
      await product.save();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });