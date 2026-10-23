const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true
    },
    stock: { 
      type: Number, 
      required: true, 
      min: 0, 
      default: 0 
    },
    images: [{ 
      type: String 
    }],
    isDeleted: {
      type: Boolean,
      default: false
    }
  }, 
  { 
    timestamps: true // Automatically manages createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Product', productSchema);