const express = require('express');
const { getInfoForTableReservation, getInfoForCustomer, getDateInfo, getDateInfoForCustomer, getInfo, checkDateExists, getUnavailableTimesIndexesOfDate, getTimesByIndexes, getDateAvailability, getDatesAvailability, getTimeByIndex, updateRestaurantInfoHandler, updateTablesMapHandler, updateUnavailableDaysHandler, updateDateAvailabilityHandler } = require('../controllers/generalController');
const router = express.Router();

router.get('/:collectionKey/info-for-table-reservation', getInfoForTableReservation);

// Route: GET /:collectionKey/info-for-customer
router.get('/:collectionKey/info-for-customer', getInfoForCustomer);

// Route: GET /:collectionKey/:date/info
router.get('/:collectionKey/:date/info', getDateInfo);

// Route: GET /:collectionKey/:date/customer-info
router.get('/:collectionKey/:date/customer-info', getDateInfoForCustomer);

// Route: GET /:collectionKey/info
router.get('/:collectionKey/info', getInfo);

// Route: GET /:collectionKey/:date/exists
router.get('/:collectionKey/:date/exists', checkDateExists);

// Route: GET /:collectionKey/:date/unavailable-times-indexes
router.get('/:collectionKey/:date/unavailable-times-indexes', getUnavailableTimesIndexesOfDate);

// Route: GET /:collectionKey/times-by-indexes
router.get('/:collectionKey/times-by-indexes', getTimesByIndexes);

// Route: GET /:collectionKey/:date/availability
router.get('/:collectionKey/:date/availability', getDateAvailability);

// Route: GET /:collectionKey/dates-availability
router.get('/:collectionKey/dates-availability', getDatesAvailability);

// Route: GET /:collectionKey/time/:index
router.get('/:collectionKey/time/:index', getTimeByIndex);

// Route: PUT /:collectionKey/restaurant-info
router.put('/:collectionKey/restaurant-info', updateRestaurantInfoHandler);

// Route: PUT /:collectionKey/:date/tables-map
router.put('/:collectionKey/:date/tables-map', updateTablesMapHandler);

// Route: PUT /:collectionKey/unavailable-days
router.put('/:collectionKey/unavailable-days', updateUnavailableDaysHandler);

// Route: POST /:collectionKey/date-availability
router.post('/:collectionKey/date-availability', updateDateAvailabilityHandler);

module.exports = router;
