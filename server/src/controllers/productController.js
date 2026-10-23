
const Product = require('../models/product');

// 1. CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const images = req.files
      ? req.files.map(file => `uploads/${file.filename}`)
      : [];

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 2. GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: { $ne: true } });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 3. GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: { $ne: true }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid product ID'
    });
  }
};

// 4. UPDATE PRODUCT (PUT)
const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.files && req.files.length > 0) {
      updates.images = req.files.map(
        file => `uploads/${file.filename}`
      );
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, isDeleted: { $ne: true } },
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 5. PARTIAL UPDATE (PATCH)
const patchProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.files && req.files.length > 0) {
      updates.images = req.files.map(
        file => `uploads/${file.filename}`
      );
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, isDeleted: { $ne: true } },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product partially updated',
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 6. SOFT DELETE PRODUCT
const softDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, isDeleted: { $ne: true } },
      { isDeleted: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product soft-deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 7. HARD DELETE PRODUCT
const hardDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product permanently deleted'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid product ID'
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  patchProduct,
  softDeleteProduct,
  hardDeleteProduct
};
