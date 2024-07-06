const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  index: {
    type: Number
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  original_price: {
    type: Number
  },
  sale_price: {
    type: Number
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be between 0 and 5'],
    max: [5, 'Rating must be between 0 and 5'],
    required: [true, 'Rating is required'],
  },
  review_count: {
    type: Number,
    min: [0, 'Review count must be positive'],
    required: [true, 'Review count is required'],
  },
  main_category: {
    type: String,
    required: [true, 'Main category is required'],
  },
  sub_category_1: {
    type: String,
  },
  sub_category_2: {
    type: String,
  },
  rankings: {
    type: Number,
  },
  description: {
    type: String,
  },
  purchase_cnt_prev_month: {
    type: Number,
    min: [0, 'Purchase count must be positive'],
  },
  store_name: {
    type: String,
  },
  is_available: {
    type: Boolean
  },
  predicted_trendiness: {
    type: mongoose.Types.Decimal128,
    min: [0, 'Predicted trendiness must be between 0 and 1'],
    max: [1, 'Predicted trendiness must be between 0 and 1'],
  },
  predicted_uniqueness: {
    type: mongoose.Types.Decimal128,
    min: [0, 'Predicted uniqueness must be between 0 and 1'],
    max: [1, 'Predicted uniqueness must be between 0 and 1'],
  },
  ecommerce_text: {
    type: String,
  },
  product_embedding: {
    type: [mongoose.Types.Decimal128],
  },
  deliver_to_singapore: {
    type: Boolean,
    required: [true, 'Delivery to Singapore is required'],
  },
  deliver_to_malaysia: {
    type: Boolean,
    required: [true, 'Delivery to Malaysia is required'],
  },
  delivery_time: {
    type: Number
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
