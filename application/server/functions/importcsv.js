// USE TO UPDATE DATABASE. CURRENTLY NOT USED.

// fs.createReadStream(FILEPATHHERE)
//   .pipe(csv())
//   .on('data', async (row) => {
//     try {
//       if (row.original_price) {
//         row.original_price = row.original_price.replace('$', '').replace(/,/g, '');
//       }

//       if (row.sale_price) {
//         row.sale_price = row.sale_price.replace('$', '').replace(/,/g, '');
//       }
      
//       const product = new Product({
//         title: row.title,
//         original_price: row.original_price,
//         sale_price: row.sale_price,
//         rating: row.rating,
//         review_count: row.review_count,
//         main_category: row.main_category,
//         sub_category_1: row.sub_category_1,
//         sub_category_2: row.sub_category_2,
//         rankings: row.rankings,
//         description: row.description,
//         purchase_cnt_prev_month: parseInt(row.purchase_cnt_prev_month),
//         store_name: row.store_name,
//         is_available: row.is_available !== 'Not Available',
//         predicted_trendiness: parseFloat(row.predicted_trendiness),
//         predicted_uniqueness: parseFloat(row.predicted_uniqueness),
//         ecommerce_text: row.ecommerce_text,
//         product_embedding: JSON.parse(row.product_embedding),
//         deliver_to_singapore: row.deliver_to_singapore === 'yes',
//         deliver_to_malaysia: row.deliver_to_malaysia === 'yes',
//         delivery_time: row.delivery_time,
//       });
//       await product.save();
//     } catch (err) {
//       console.error('Error saving product:', err);
//     }
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });