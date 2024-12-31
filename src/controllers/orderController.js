const { fetchOrder, fetchOrderIdCounter, fetchOrdersOfDate, updateOrder } = require('../firebase/firestore');

const getOrder = async (req, res) => {
  const { collectionKey, date, reservationId } = req.params; // Example: Pass collectionKey, date, and reservationId as URL parameters

  try {
    const order = await fetchOrder(collectionKey, date, parseInt(reservationId));

    if (order) {
      res.status(200).json({ order });
    } else {
      res.status(404).json({ error: `Order not found for reservation ID ${reservationId}.` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the order.', details: error.message });
  }
};

const getOrderIdCounter = async (req, res) => {
    const { collectionKey } = req.params; // Example: Pass collectionKey as a URL parameter
  
    try {
      const orderIdCounter = await fetchOrderIdCounter(collectionKey);
  
      if (orderIdCounter !== null) {
        res.status(200).json({ orderIdCounter });
      } else {
        res.status(404).json({ error: '"info" document not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch order ID counter.', details: error.message });
    }
};

const getOrdersOfDate = async (req, res) => {
    const { collectionKey, date } = req.params; // Example: Pass collectionKey and date as URL parameters
  
    try {
      const orders = await fetchOrdersOfDate(collectionKey, date);
  
      if (orders) {
        res.status(200).json({ orders });
      } else {
        res.status(404).json({ error: `No orders found for date ${date}.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders for the specified date.', details: error.message });
    }
};

const updateOrderHandler = async (req, res) => {
    const { collectionKey, date } = req.params; // Extract collectionKey and date from URL
    const order = req.body; // Order data from the request body
  
    try {
      if (!order || typeof order !== 'object') {
        return res.status(400).json({ error: 'Invalid order data provided.' });
      }
  
      const result = await updateOrder(collectionKey, date, order);
  
      if (result) {
        res.status(200).json({ message: result });
      } else {
        res.status(404).json({ error: `Date document does not exist for date: ${date}.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order.', details: error.message });
    }
  };

module.exports = { 
    getOrder,
    getOrderIdCounter,
    getOrdersOfDate,
    updateOrderHandler
 };
