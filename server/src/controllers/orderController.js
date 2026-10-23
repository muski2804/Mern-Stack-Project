const Order = require('../models/order');

// 1. CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount, status, shippingAddress, paymentType } = req.body;

    if (!user || !products || !products.length || totalAmount === undefined || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'User, products, totalAmount and shippingAddress are required'
      });
    }

    const order = await Order.create({
      user,
      products,
      totalAmount,
      status,
      shippingAddress,
      paymentType
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 2. GET ALL ORDERS (With Server-Side Pagination)
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = { isDeleted: { $ne: true } };
    const orders = await Order.find(query)
      .populate('user')
      .populate('products.product')
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalOrders: total,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 3. GET ORDER BY ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      isDeleted: { $ne: true }
    }).populate('user').populate('products.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid order ID'
    });
  }
};

// 4. UPDATE ORDER (PUT)
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, isDeleted: { $ne: true } },
      req.body,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order updated successfully', order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. PARTIAL UPDATE (PATCH)
const patchOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, isDeleted: { $ne: true } },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order partially updated', order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 6. SOFT DELETE ORDER
const softDeleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, isDeleted: { $ne: true } },
      { isDeleted: true },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order soft-deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid order ID' });
  }
};

// 7. HARD DELETE ORDER
const hardDeleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order permanently deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid order ID' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  patchOrder,
  softDeleteOrder,
  hardDeleteOrder
};