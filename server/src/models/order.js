const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  shippingAddress: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    enum: ['Card payment', 'Cash on delivery', 'Already paid'],
    default: 'Cash on delivery'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true // Correctly placed inside schema options object 
});

module.exports = mongoose.model('Order', orderSchema);