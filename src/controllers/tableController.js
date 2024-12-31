const { fetchTable, fetchTablesAvailability, fetchTables, fetchUnavailableTablesOfDate, fetchUnavailableTablesTimesIndexesOfDate, addNewTable, updateUnavailableTables, updateTableSchedules  } = require('../firebase/firestore');

const getTableData = async (req, res) => {
  const { tableNumber } = req.params; // Example: Pass tableNumber as a URL parameter

  try {
    const tableData = await fetchTable(tableNumber);

    if (tableData) {
      res.status(200).json({ tableData });
    } else {
      res.status(404).json({ error: `Table ${tableNumber} does not exist.` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch data for table ${tableNumber}.`, details: error.message });
  }
};

const getTablesAvailability = async (req, res) => {
    const { startIndex, endIndex, date } = req.query; // Get parameters from query string
  
    try {
      const unavailableTables = await fetchTablesAvailability(
        parseInt(startIndex),
        parseInt(endIndex),
        date
      );
  
      res.status(200).json({ unavailableTables });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch unavailable tables.',
        details: error.message,
      });
    }
};

const getTables = async (req, res) => {
    const { collectionKey } = req.params; // Example: Pass collectionKey as a URL parameter
  
    try {
      const tables = await fetchTables(collectionKey);
  
      if (tables) {
        res.status(200).json({ tables });
      } else {
        res.status(404).json({ error: '"info" document not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tables.', details: error.message });
    }
}; 

const getUnavailableTablesOfDate = async (req, res) => {
    const { collectionKey, date } = req.params; // Example: Pass collectionKey and date as URL parameters
  
    try {
      const unavailableTables = await fetchUnavailableTablesOfDate(collectionKey, date);
  
      if (unavailableTables) {
        res.status(200).json({ unavailableTables });
      } else {
        res.status(404).json({ error: `No data found for date ${date}.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch unavailable tables.', details: error.message });
    }
};

const getUnavailableTablesTimesIndexesOfDate = async (req, res) => {
    const { collectionKey, date } = req.params; // Example: Pass collectionKey and date as URL parameters
  
    try {
      const unavailableTablesTimesIndexes = await fetchUnavailableTablesTimesIndexesOfDate(collectionKey, date);
  
      if (unavailableTablesTimesIndexes) {
        res.status(200).json({ unavailableTablesTimesIndexes });
      } else {
        res.status(404).json({ error: `No data found for date ${date}.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch unavailable tables times indexes.', details: error.message });
    }
};

const addTableHandler = async (req, res) => {
    const { collectionKey } = req.params; // Extract collectionKey from URL
    const tableData = req.body; // Table data from the request body
  
    try {
      if (!tableData || typeof tableData !== 'object') {
        return res.status(400).json({ error: 'Invalid table data provided.' });
      }
  
      const result = await addNewTable(collectionKey, tableData);
      res.status(201).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add or update table.', details: error.message });
    }
};

const updateUnavailableTablesHandler = async (req, res) => {
    const { collectionKey, date } = req.params; // Extract collectionKey and date from URL
    const { unavailableTableId } = req.body; // Extract unavailableTableId from the request body
  
    try {
      if (typeof unavailableTableId !== 'number') {
        return res.status(400).json({ error: 'Invalid table ID provided.' });
      }
  
      const result = await updateUnavailableTables(collectionKey, date, unavailableTableId);
  
      if (result) {
        res.status(200).json({ message: 'Unavailable tables updated successfully.', unavailableTables: result });
      } else {
        res.status(404).json({ error: `Date document does not exist for date: ${date}.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update unavailable tables.', details: error.message });
    }
};

const updateTableSchedulesHandler = async (req, res) => {
    const { collectionKey, date } = req.params; // Extract collectionKey and date from URL
    const reservationData = req.body; // Reservation data from the request body
  
    try {
      if (!reservationData || typeof reservationData !== 'object') {
        return res.status(400).json({ error: 'Invalid reservation data provided.' });
      }
  
      const result = await updateTableSchedules(collectionKey, date, reservationData);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update table schedules.', details: error.message });
    }
  };

module.exports = { 
    getTableData,
    getTablesAvailability,
    getTables,
    getUnavailableTablesOfDate,
    getUnavailableTablesTimesIndexesOfDate,
    addTableHandler,
    updateUnavailableTablesHandler,
    updateTableSchedulesHandler
 };
