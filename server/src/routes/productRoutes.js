const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Import Multer upload middleware

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    softDeleteProduct,
    hardDeleteProduct
} = require('../controllers/productController');

// CREATE product with image uploads (expects 'images' key in Postman form-data, max 5 files)
router.post('/', upload.array('images', 5), createProduct);

// GET all products (supports pagination via ?page=1&limit=10)
router.get('/', getAllProducts);

// GET single product by ID
router.get('/:id', getProductById);

// UPDATE product (supports updating text fields and new image uploads)
router.patch('/:id', upload.array('images', 5), updateProduct);

// SOFT DELETE product (marks isDeleted as true)
router.delete('/soft/:id', softDeleteProduct);

// HARD DELETE product (permanently removes from database)
router.delete('/hard/:id', hardDeleteProduct);

module.exports = router;