const { db } = require('../firebase/firebase');
const { fetchReservationIdCounter, fetchReservationTimes, fetchReservationsOfDate, fetchReservations, updateReservation, addNewReservation, cancelReservationByTableNumber, completeReservationByTableNumber  } = require('../firebase/firestore');

////////////////////

const getReservationIdCounter = async (req, res) => {
    const { collectionKey } = req.params; // Example: pass the collectionKey as a URL parameter
  
    try {
      const counter = await fetchReservationIdCounter(collectionKey);
  
      if (counter !== null) {
        res.status(200).json({ reservationIdCounter: counter });
      } else {
        res.status(404).json({ error: '"info" document not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reservation ID counter.', details: error.message });
    }
  };

const getReservationTimes = async (req, res) => {
    const { collectionKey } = req.params;

    try {
        const reservationTimes = await fetchReservationTimes(collectionKey);

        if (reservationTimes) {
        res.status(200).json({ reservationTimes });
        } else {
        res.status(404).json({ error: '"info" document not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reservation times.', details: error.message });
    }
};

const getReservationsOfDate = async (req, res) => {
    const { collectionKey, date } = req.params; // Example: Pass collectionKey and date as URL parameters
  
    try {
      const reservations = await fetchReservationsOfDate(collectionKey, date);
  
      if (reservations) {
        res.status(200).json({ reservations });
      } else {
        res.status(404).json({ error: `No reservations found for date ${date}.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reservations for the specified date.', details: error.message });
    }
  };

const getReservations = async (req, res) => {
    const { date } = req.params; // Example: Pass the date as a URL parameter
  
    try {
      const reservations = await fetchReservations(date);
  
      if (reservations) {
        res.status(200).json({ reservations });
      } else {
        res.status(404).json({ error: `No reservations found for date ${date}.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reservations for the specified date.', details: error.message });
    }
}; 

const getInfoForTableReservation = async (req, res) => {
    const { collectionKey } = req.params; // Example: Pass collectionKey as a URL parameter
  
    try {
      const reservationInfo = await fetchInfoForTableReservation(collectionKey);
  
      if (reservationInfo) {
        res.status(200).json({ reservationInfo });
      } else {
        res.status(404).json({ error: '"info" document not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reservation information.', details: error.message });
    }
};

const updateReservationHandler = async (req, res) => {
    const { collectionKey, date } = req.params; // Extract collectionKey and date from URL
    const reservation = req.body; // Reservation data from the request body
  
    try {
      if (!reservation || typeof reservation !== 'object') {
        return res.status(400).json({ error: 'Invalid reservation data provided.' });
      }
  
      const result = await updateReservation(collectionKey, date, reservation);
  
      if (result) {
        res.status(200).json({ message: result });
      } else {
        res.status(404).json({ error: `Date document does not exist for date: ${date}.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update reservation.', details: error.message });
    }
};

const addReservationHandler = async (req, res) => {
    const { collectionKey, date } = req.params; // Extract collectionKey and date from URL
    const reservationData = req.body; // Reservation data from the request body
  
    try {
      if (!reservationData || typeof reservationData !== 'object') {
        return res.status(400).json({ error: 'Invalid reservation data provided.' });
      }
  
      const result = await addNewReservation(collectionKey, date, reservationData);
  
      if (result) {
        res.status(201).json({ message: result });
      } else {
        res.status(404).json({ error: `Date or info document does not exist for date: ${date}.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to add new reservation.', details: error.message });
    }
};

const cancelReservationHandler = async (req, res) => {
    const { collectionKey, date } = req.params; // Extract collectionKey and date from URL
    const { reservationId } = req.body; // Extract reservationId from the request body
  
    try {
      if (!reservationId || typeof reservationId !== 'number') {
        return res.status(400).json({ error: 'Invalid reservation ID provided.' });
      }
  
      const result = await cancelReservationByTableNumber(collectionKey, reservationId, date);
  
      if (result) {
        res.status(200).json({ message: result });
      } else {
        res.status(404).json({ error: `Reservation with ID ${reservationId} not found.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to cancel reservation.', details: error.message });
    }
};

const completeReservationHandler = async (req, res) => {
    const { collectionKey, date } = req.params; // Extract collectionKey and date from URL
    const { reservationId } = req.body; // Extract reservationId from the request body
  
    try {
      if (!reservationId || typeof reservationId !== 'number') {
        return res.status(400).json({ error: 'Invalid reservation ID provided.' });
      }
  
      const result = await completeReservationByTableNumber(collectionKey, reservationId, date);
  
      if (result) {
        res.status(200).json({ message: result });
      } else {
        res.status(404).json({ error: `Reservation with ID ${reservationId} not found.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to complete reservation.', details: error.message });
    }
  };
  
module.exports = { 
    getReservations,
    getReservationIdCounter,
    getReservationTimes,
    getReservationsOfDate,
    getReservations,
    getInfoForTableReservation,
    updateReservationHandler,
    addReservationHandler,
    cancelReservationHandler,
    completeReservationHandler
};