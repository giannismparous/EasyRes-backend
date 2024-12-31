const express = require('express');
const { getTableData, getTablesAvailability, getTables, getUnavailableTablesOfDate, getUnavailableTablesTimesIndexesOfDate, addTableHandler, updateUnavailableTablesHandler, updateTableSchedulesHandler} = require('../controllers/tableController');
const router = express.Router();

// Route: GET /table/:tableNumber
router.get('/table/:tableNumber', getTableData);
router.get('/availability', getTablesAvailability);
router.get('/:collectionKey/tables', getTables);
router.get('/:collectionKey/:date/unavailable-tables', getUnavailableTablesOfDate);
router.get('/:collectionKey/:date/unavailable-tables-times-indexes', getUnavailableTablesTimesIndexesOfDate);
// Route: POST /:collectionKey/table
router.post('/:collectionKey/table', addTableHandler);
// Route: PUT /:collectionKey/:date/unavailable-table
router.put('/:collectionKey/:date/unavailable-table', updateUnavailableTablesHandler);
// Route: POST /:collectionKey/:date/table-schedule
router.post('/:collectionKey/:date/table-schedule', updateTableSchedulesHandler);

module.exports = router;
