const { fetchInfoForTableReservation, fetchInfoForCustomer, fetchDateInfo, fetchDateInfoForCustomer, fetchInfo, dateExists, fetchUnavailableTimesIndexesOfDate, fetchTimesByIndexes, fetchDateAvailability, fetchDatesAvailability, fetchTimeByIndex, updateRestaurantInfo, updateTablesMap, updateUnavailableDays, updateDateAvailability } = require('../firebase/firestore');

const getInfoForTableReservation = async (req, res) => {
  const { collectionKey } = req.params; // Example: Pass collectionKey as a URL parameter

  try {
    const info = await fetchInfoForTableReservation(collectionKey);

    if (info) {
      res.status(200).json({ info });
    } else {
      res.status(404).json({ error: '"info" document not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch info for table reservation.', details: error.message });
  }
};

const getInfoForCustomer = async (req, res) => {
    const { collectionKey } = req.params; // Example: Pass collectionKey as a URL parameter
  
    try {
      const info = await fetchInfoForCustomer(collectionKey);
  
      if (info) {
        res.status(200).json({ info });
      } else {
        res.status(404).json({ error: '"info" document not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch info for customer.', details: error.message });
    }
};

const getDateInfo = async (req, res) => {
    const { collectionKey, date } = req.params; // Example: Pass collectionKey and date as URL parameters

    try {
        const info = await fetchDateInfo(collectionKey, date);

        if (info) {
        res.status(200).json({ info });
        } else {
        res.status(404).json({ error: `Document for date ${date} not found.` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch date info.', details: error.message });
    }
};  

const getDateInfoForCustomer = async (req, res) => {
    const { collectionKey, date } = req.params; // Example: Pass collectionKey and date as URL parameters
  
    try {
      const info = await fetchDateInfoForCustomer(collectionKey, date);
  
      if (info) {
        res.status(200).json({ info });
      } else {
        res.status(404).json({ error: `Document for date ${date} not found.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch date info for customer.', details: error.message });
    }
};

const getInfo = async (req, res) => {
    const { collectionKey } = req.params; // Example: Pass collectionKey as a URL parameter
  
    try {
      const info = await fetchInfo(collectionKey);
  
      if (info) {
        res.status(200).json({ info });
      } else {
        res.status(404).json({ error: '"info" document not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch info.', details: error.message });
    }
};

const checkDateExists = async (req, res) => {
    const { collectionKey, date } = req.params; // Example: Pass collectionKey and date as URL parameters
  
    try {
      const exists = await dateExists(collectionKey, date);
  
      if (exists) {
        res.status(200).json({ exists: true });
      } else {
        res.status(404).json({ exists: false, error: `Date ${date} does not exist.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to check date existence.', details: error.message });
    }
};

const getUnavailableTimesIndexesOfDate = async (req, res) => {
    const { collectionKey, date } = req.params; // Example: Pass collectionKey and date as URL parameters
  
    try {
      const unavailableTimesIndexes = await fetchUnavailableTimesIndexesOfDate(collectionKey, date);
  
      if (unavailableTimesIndexes) {
        res.status(200).json({ unavailableTimesIndexes });
      } else {
        res.status(404).json({ error: `Document for date ${date} not found.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch unavailable times indexes.', details: error.message });
    }
};

const getTimesByIndexes = async (req, res) => {
    const { collectionKey } = req.params; // Collection key from the route parameter
    const indexesParam = req.query.indexes; // Parse indexes from the query string
  
    try {
      if (!indexesParam) {
        return res.status(400).json({ error: 'Indexes query parameter is required.' });
      }
  
      // Convert indexes to an array of numbers
      const indexes = indexesParam.split(',').map(Number);
  
      const times = await fetchTimesByIndexes(collectionKey, indexes);
  
      if (times) {
        res.status(200).json({ times });
      } else {
        res.status(404).json({ error: '"info" document not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch times by indexes.', details: error.message });
    }
};

const getDateAvailability = async (req, res) => {
    const { collectionKey, date } = req.params; // Example: Pass collectionKey and date as URL parameters
  
    try {
      const isAvailable = await fetchDateAvailability(collectionKey, date);
  
      if (isAvailable !== null) {
        res.status(200).json({ available: isAvailable });
      } else {
        res.status(404).json({ error: '"info" document not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to check date availability.', details: error.message });
    }
};

const getDatesAvailability = async (req, res) => {
    const { collectionKey } = req.params; // Collection key from the route parameter
    const datesParam = req.query.dates; // Dates as a query parameter
  
    try {
      if (!datesParam) {
        return res.status(400).json({ error: 'Dates query parameter is required.' });
      }
  
      // Convert dates from a comma-separated string to an array
      const dates = datesParam.split(',');
  
      const availability = await fetchDatesAvailability(collectionKey, dates);
  
      if (availability !== null) {
        res.status(200).json({ availability });
      } else {
        res.status(404).json({ error: '"info" document not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to check dates availability.', details: error.message });
    }
  };

const getTimeByIndex = async (req, res) => {
    const { collectionKey, index } = req.params; // Example: Pass collectionKey and index as URL parameters

    try {
        const time = await fetchTimeByIndex(collectionKey, parseInt(index, 10)); // Convert index to a number

        if (time) {
        res.status(200).json({ time });
        } else {
        res.status(404).json({ error: `Time not found for index ${index}.` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch time by index.', details: error.message });
    }
};

const updateRestaurantInfoHandler = async (req, res) => {
    const { collectionKey } = req.params; // Extract collectionKey from URL
    const infoData = req.body; // Restaurant information from the request body
  
    try {
      if (!infoData || typeof infoData !== 'object') {
        return res.status(400).json({ error: 'Invalid restaurant information provided.' });
      }
  
      const result = await updateRestaurantInfo(collectionKey, infoData);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update restaurant information.', details: error.message });
    }
};

const updateTablesMapHandler = async (req, res) => {
    const { collectionKey, date } = req.params; // Extract collectionKey and date from URL
    const { tables, unavailableTables } = req.body; // Extract tables and unavailable tables from the request body
  
    try {
      if (!tables || !unavailableTables || typeof tables !== 'object' || !Array.isArray(unavailableTables)) {
        return res.status(400).json({ error: 'Invalid data provided.' });
      }
  
      const result = await updateTablesMap(collectionKey, tables, date, unavailableTables);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update tables map.', details: error.message });
    }
};

const updateUnavailableDaysHandler = async (req, res) => {
    const { collectionKey } = req.params; // Extract collectionKey from URL
    const { unavailableDays } = req.body; // Extract unavailableDays from the request body
  
    try {
      if (!Array.isArray(unavailableDays)) {
        return res.status(400).json({ error: 'Invalid unavailable days provided. Must be an array.' });
      }
  
      const result = await updateUnavailableDays(collectionKey, unavailableDays);
  
      if (result) {
        res.status(200).json({ message: 'Unavailable days updated successfully.', unavailableDays: result });
      } else {
        res.status(404).json({ error: `Info document does not exist for collection: ${collectionKey}.` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update unavailable days.', details: error.message });
    }
};

const updateDateAvailabilityHandler = async (req, res) => {
    const { collectionKey } = req.params; // Extract collectionKey from URL
  
    try {
      const result = await updateDateAvailability(collectionKey);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update date availability.', details: error.message });
    }
  };

module.exports = { 
    getInfoForTableReservation,
    getInfoForCustomer,
    getDateInfo,
    getDateInfoForCustomer,
    getInfo,
    checkDateExists,
    getUnavailableTimesIndexesOfDate,
    getTimesByIndexes,
    getDateAvailability,
    getDatesAvailability,
    getTimeByIndex,
    updateRestaurantInfoHandler,
    updateTablesMapHandler,
    updateUnavailableDaysHandler,
    updateDateAvailabilityHandler 
 };
