const express = require('express');
const { getReservationIdCounter, getReservationTimes, getReservationsOfDate, getReservations, updateReservationHandler, addReservationHandler, cancelReservationHandler, completeReservationHandler } = require('../controllers/reservationController');
const router = express.Router();

// Define routes
router.get('/', getReservations); // GET /api/reservations
// Route: GET /:collectionKey/counter
router.get('/:collectionKey/counter', getReservationIdCounter);
router.get('/:collectionKey/reservation-times', getReservationTimes);
router.get('/:collectionKey/:date/reservations', getReservationsOfDate);
router.get('/:date/reservations', getReservations);

// Route: PUT /:collectionKey/:date/reservation
router.put('/:collectionKey/:date/reservation', updateReservationHandler);
// Route: POST /:collectionKey/:date/reservation
router.post('/:collectionKey/:date/reservation', addReservationHandler);
// Route: PUT /:collectionKey/:date/cancel-reservation
router.put('/:collectionKey/:date/cancel-reservation', cancelReservationHandler);
// Route: PUT /:collectionKey/:date/complete-reservation
router.put('/:collectionKey/:date/complete-reservation', completeReservationHandler);

module.exports = router;
