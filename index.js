// Import the required modules
const express = require('express');
const path = require('path');
const {faker} = require('@faker-js/faker');
const cors = require('cors');

// Create an Express application
const app = express();

app.use(cors())

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/random_commerce', (req, res) => {
  let size = req.query.size? Number(req.query.size) : 1;
  size = parseInt(size);
  if (size < 0) size = 1;
  if (size > 1000) size = 1000;
  
  // create some fake commerces data
  let commerces = [];
  for (let step = 0; step < size; step++) {
    let _price = faker.commerce.price({ max: 9999 });
    let entry = {
      id: faker.number.int(10000),
      uid: faker.string.uuid(),
      color: faker.color.human(),
      department: faker.commerce.department(),
      material: faker.commerce.productMaterial(),
      product_name: faker.commerce.productName(),
      price: parseFloat(_price),
      price_string: String(_price),
      promo_code: faker.commerce.productAdjective() + faker.number.int(10000)
    }
    commerces.push(entry);
  }
  res.json(commerces);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});