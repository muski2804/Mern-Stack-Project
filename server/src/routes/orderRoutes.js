const express = require('express');
const router = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    patchOrder,
    softDeleteOrder,
    hardDeleteOrder
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.patch('/:id', patchOrder);
router.delete('/soft/:id', softDeleteOrder);
router.delete('/hard/:id', hardDeleteOrder);

module.exports = router;