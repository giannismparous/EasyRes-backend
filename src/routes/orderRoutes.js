const express = require('express');
const { getOrder, getOrderIdCounter, getOrdersOfDate, updateOrderHandler } = require('../controllers/orderController');
const router = express.Router();

// Route: GET /:collectionKey/:date/orders/:reservationId
router.get('/:collectionKey/:date/orders/:reservationId', getOrder);

// Route: GET /:collectionKey/order-id-counter
router.get('/:collectionKey/order-id-counter', getOrderIdCounter);

// Route: GET /:collectionKey/:date/orders
router.get('/:collectionKey/:date/orders', getOrdersOfDate);

// Route: PUT /:collectionKey/:date/order
router.put('/:collectionKey/:date/order', updateOrderHandler);

module.exports = router;
