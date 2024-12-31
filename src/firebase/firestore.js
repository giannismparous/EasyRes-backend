const { db } = require('./firebase');
const { convertMenuMapToMenu } = require('../services/utilities');

// Fetch document data
const getDocument = async (collectionKey, documentId) => {
  const docRef = db.collection(collectionKey).doc(documentId);
  const docSnapshot = await docRef.get();
  if (!docSnapshot.exists) throw new Error('Document not found');
  return docSnapshot.data();
};

/////////////////////////////////////////////////


// RESERVATIONS


const fetchReservationIdCounter = async (collectionKey) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey);
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const reservationIdCounter = infoDoc.data().reservation_id_counter; // Extract the counter
      console.log('Reservation ID counter:', reservationIdCounter);
      return reservationIdCounter;
    } else {
      console.log('Error: "info" document does not exist.');
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching reservation ID counter:', error);
    throw new Error('Failed to fetch reservation ID counter.');
  }
};

const fetchReservationTimes = async (collectionKey) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey);
    const infoRef = sampleRestaurantRef.doc('info');
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const reservationTimes = infoDoc.data().reservation_times;
      console.log('Reservation times:', reservationTimes);
      return reservationTimes;
    } else {
      console.log('Error: "info" document does not exist.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching reservation times:', error);
    throw new Error('Failed to fetch reservation times.');
  }
};


const fetchReservationsOfDate = async (collectionKey, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey);
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const reservations = dateDoc.data().reservations; // Extract reservations
      console.log(`Reservations for date ${date}:`, reservations);
      return reservations;
    } else {
      console.log(`Error: Document for date ${date} does not exist.`);
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching reservations of date:', error);
    throw new Error('Failed to fetch reservations for the specified date.');
  }
};

const fetchReservations = async (date) => {
  try {
    const sampleRestaurantRef = db.collection('sample-restaurant'); // Reference the collection
    const currentDateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const currentDateDoc = await currentDateRef.get();

    if (currentDateDoc.exists) {
      const reservations = currentDateDoc.data().reservations; // Extract reservations
      console.log('Reservations for date:', date, reservations);
      return reservations;
    } else {
      console.log(`Error: Document for date ${date} does not exist.`);
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw new Error('Failed to fetch reservations for the specified date.');
  }
};

//TABLES

const fetchTable = async (tableNumber) => {
  try {
    const sampleRestaurantRef = db.collection('sample-restaurant'); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const tables = infoDoc.data().tables; // Extract the tables array

      if (Array.isArray(tables) && tableNumber > 0 && tableNumber <= tables.length) {
        const tableData = tables[tableNumber - 1]; // Get the table info (adjusting for 1-based indexing)
        console.log(`Data for table ${tableNumber}:`, tableData);
        return tableData;
      } else {
        console.log(`Table ${tableNumber} does not exist in the "tables" array.`);
        return null; // Return null if the table does not exist
      }
    } else {
      console.log(`Error: "info" document does not exist.`);
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching table data:', error);
    throw new Error(`Failed to fetch data for table ${tableNumber}.`);
  }
};

const fetchTablesAvailability = async (startIndex, endIndex, date) => {
  try {
    const sampleRestaurantRef = db.collection('sample-restaurant'); // Reference the collection
    const currentDateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const currentDateDoc = await currentDateRef.get();

    const unavailableTables = [];

    if (currentDateDoc.exists) {
      const reservations = currentDateDoc.data().reservations; // Extract reservations array

      reservations.forEach((reservation) => {
        if (
          !unavailableTables.includes(reservation.table_id) && // Check if table is already marked as unavailable
          reservation.state !== 7 && // Skip canceled reservations
          !(
            (reservation.startIndex < startIndex && reservation.endIndex < startIndex) ||
            (reservation.startIndex > endIndex && reservation.endIndex > endIndex)
          ) // Check for time conflicts
        ) {
          unavailableTables.push(reservation.table_id); // Mark table as unavailable
        }
      });

      console.log(`Unavailable tables for date ${date}:`, unavailableTables);
    } else {
      console.log(`Error: Document for date ${date} does not exist.`);
    }

    return unavailableTables; // Return the list of unavailable tables
  } catch (error) {
    console.error('Error fetching tables availability:', error);
    throw new Error('Failed to fetch tables availability.');
  }
};

const fetchTables = async (collectionKey) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const tables = infoDoc.data().tables; // Extract tables array
      console.log('Tables:', tables);
      return tables;
    } else {
      console.log('Error: "info" document does not exist.');
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching tables:', error);
    throw new Error('Failed to fetch tables.');
  }
};

const fetchUnavailableTablesOfDate = async (collectionKey, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const unavailableTables = dateDoc.data().unavailable_tables; // Extract unavailable tables
      console.log(`Unavailable tables for date ${date}:`, unavailableTables);
      return unavailableTables;
    } else {
      console.log(`Error: Document for date ${date} does not exist.`);
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching unavailable tables of date:', error);
    throw new Error('Failed to fetch unavailable tables for the specified date.');
  }
};

const fetchUnavailableTablesTimesIndexesOfDate = async (collectionKey, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const unavailableTablesTimesIndexes = dateDoc.data().unavailable_tables_times_indexes; // Extract data
      console.log(`Unavailable tables times indexes for date ${date}:`, unavailableTablesTimesIndexes);
      return unavailableTablesTimesIndexes;
    } else {
      console.log(`Error: Document for date ${date} does not exist.`);
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching unavailable tables times indexes of date:', error);
    throw new Error('Failed to fetch unavailable tables times indexes for the specified date.');
  }
};

const fetchOrder = async (collectionKey, date, reservationId) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const orders = dateDoc.data().orders; // Extract orders array
      const order = orders.find(order => order.reservation_id === reservationId);

      if (order === undefined) {
        return { reservation_id: reservationId, order_items: [] }; // Default empty order
      }

      console.log(`Order for reservation ID ${reservationId}:`, order);
      return order; // Return the found order
    } else {
      console.log(`Error: Document for date ${date} does not exist.`);
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Failed to fetch the order.');
  }
};

const fetchMenu = async (collectionKey) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const menu = infoDoc.data().menu; // Extract the menu
      console.log('Menu:', menu);
      return menu;
    } else {
      console.log('Error: "info" document does not exist.');
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw new Error('Failed to fetch the menu.');
  }
};

const fetchOrderIdCounter = async (collectionKey) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const orderIdCounter = infoDoc.data().order_id_counter; // Extract the counter
      console.log('Order ID counter:', orderIdCounter);
      return orderIdCounter;
    } else {
      console.log('Error: "info" document does not exist.');
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching order ID counter:', error);
    throw new Error('Failed to fetch order ID counter.');
  }
};

const fetchOrdersOfDate = async (collectionKey, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const orders = dateDoc.data().orders; // Extract orders
      console.log(`Orders for date ${date}:`, orders);
      return orders;
    } else {
      console.log(`Error: Document for date ${date} does not exist.`);
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching orders of date:', error);
    throw new Error('Failed to fetch orders for the specified date.');
  }
};

const fetchInfoForTableReservation = async (collectionKey) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      console.log(`TimesMap returned to client:`);

      const infoToReturn = [];

      // Create a map of reservation times
      const timesMap = {};
      for (const time of infoDoc.data().reservation_times) {
        timesMap[time.id] = time.time;
      }

      infoToReturn[0] = timesMap; // Add times map
      infoToReturn[1] = infoDoc.data().name; // Add restaurant name

      return infoToReturn;
    } else {
      console.log('Info doc does not exist.');
      return false; // Return false if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching info for table reservation:', error);
    throw new Error('Failed to fetch reservation information.');
  }
};

const fetchInfoForCustomer = async (collectionKey) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      console.log('Info returned to client:');
      const infoReturned = [];
      const tablesCapacityMap = {};
      const tablesSmokeFriendlyMap = {};

      // Extract and map data
      infoReturned[0] = infoDoc.data().reservation_times; // Reservation times
      infoReturned[1] = infoDoc.data().unavailable_days; // Unavailable days

      for (const table of infoDoc.data().tables) {
        tablesCapacityMap[table.id] = table.capacity; // Map table capacities
        tablesSmokeFriendlyMap[table.id] = table.smokeFriendly; // Map smoke-friendly status
      }

      infoReturned[2] = tablesCapacityMap; // Add table capacities map
      infoReturned[3] = infoDoc.data().numberOfDaysToShowToCustomers; // Days to show
      infoReturned[4] = infoDoc.data().maxCapacity; // Max capacity
      infoReturned[5] = infoDoc.data().maxReservationDurationIndexNumber; // Max reservation duration index
      infoReturned[6] = tablesSmokeFriendlyMap; // Add smoke-friendly map

      console.log('Info fetched:', infoReturned);
      return infoReturned;
    } else {
      console.log('Info doc does not exist.');
      return false; // Return false if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching info for customer:', error);
    throw new Error('Failed to fetch info for customer.');
  }
};

const fetchDateInfo = async (collectionKey, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc(date); // Reference the date document
    const infoDoc = await infoRef.get();
    const dateInfoToReturn = [];

    if (infoDoc.exists) {
      console.log('Date doc received and being adjusted:');
      const data = infoDoc.data();

      dateInfoToReturn[0] = data.unavailable_times_indexes;
      dateInfoToReturn[1] = data.unavailable_tables;
      dateInfoToReturn[2] = data.unavailable_tables_times_indexes;

      const reservations = data.reservations;
      dateInfoToReturn[3] = [...reservations];

      // Sort reservations by start time index
      reservations.sort((a, b) => a.start_time_index - b.start_time_index);

      const reservationsByStartTimeIndex = {};
      reservations.forEach(({ start_time_index, ...rest }) => {
        if (!reservationsByStartTimeIndex[start_time_index]) {
          reservationsByStartTimeIndex[start_time_index] = {
            start_time_index,
            reservations: [],
          };
        }
        reservationsByStartTimeIndex[start_time_index].reservations.push({ ...rest });
      });

      dateInfoToReturn[4] = Object.values(reservationsByStartTimeIndex);

      // Sort reservations alphabetically by name
      reservations.sort((a, b) => a.name.localeCompare(b.name));
      dateInfoToReturn[5] = [...reservations];

      const reservationsByTableId = {};
      reservations.forEach(({ table_id, ...rest }) => {
        if (!reservationsByTableId[table_id]) {
          reservationsByTableId[table_id] = { id: table_id, reservations: [] };
        }
        reservationsByTableId[table_id].reservations.push({ ...rest });
      });

      const reservationsGroupedByTableId = Object.values(reservationsByTableId);
      reservationsGroupedByTableId.forEach(table =>
        table.reservations.sort((a, b) => a.state - b.state)
      );

      dateInfoToReturn[6] = reservationsGroupedByTableId;

      const orders = data.orders;
      dateInfoToReturn[7] = [...orders];

      // Sort orders by reservation ID
      orders.sort((a, b) => a.reservation_id - b.reservation_id);
      dateInfoToReturn[8] = [...orders];

      dateInfoToReturn[9] = data.maxReservationDurationIndexNumber;

      console.log(dateInfoToReturn);
      return dateInfoToReturn;
    } else {
      console.log('Info doc does not exist.');
      return false;
    }
  } catch (error) {
    console.error('Error fetching date info:', error);
    throw new Error('Failed to fetch date info.');
  }
};

const fetchDateInfoForCustomer = async (collectionKey, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc(date); // Reference the date document
    const infoDoc = await infoRef.get();
    const dateInfoToReturn = [];

    if (infoDoc.exists) {
      console.log('Date doc received for customer and being adjusted:');
      const data = infoDoc.data();

      dateInfoToReturn[0] = data.unavailable_times_indexes; // Unavailable time indexes
      dateInfoToReturn[1] = data.unavailable_tables; // Unavailable tables
      dateInfoToReturn[2] = data.unavailable_tables_times_indexes; // Unavailable table time indexes
      dateInfoToReturn[3] = data.reservations; // Reservations

      console.log('Date info for customer:', dateInfoToReturn);
      return dateInfoToReturn;
    } else {
      console.log('Date doc does not exist.');
      return false; // Return false if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching date info for customer:', error);
    throw new Error('Failed to fetch date info for customer.');
  }
};

const fetchInfo = async (collectionKey) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      console.log('Info doc returned:');
      console.log(infoDoc.data());
      return infoDoc.data(); // Return the document data
    } else {
      console.log('Info doc does not exist.');
      return false; // Return false if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching info:', error);
    throw new Error('Failed to fetch info.');
  }
};

const fetchUserInfo = async (collectionKey, uid) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('users'); // Reference the "users" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const users = infoDoc.data().users; // Extract the users array
      const user = users.find(user => user.uid === uid); // Find the user by UID

      if (user) {
        console.log(`User with UID ${uid} found:`, user);
        return user; // Return the user information
      } else {
        console.log(`User with UID ${uid} not found.`);
        return null; // Return null if the user is not found
      }
    } else {
      console.log('Users document does not exist.');
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Failed to fetch user info.');
  }
};

const dateExists = async (collectionKey, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      console.log(`${date} exists.`);
      return true; // Document exists
    } else {
      console.log(`${date} does not exist.`);
      return false; // Document does not exist
    }
  } catch (error) {
    console.error('Error checking date existence:', error);
    throw new Error('Failed to check if date exists.');
  }
};

const fetchUnavailableTimesIndexesOfDate = async (collectionKey, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const unavailableTimesIndexes = dateDoc.data().unavailable_times_indexes; // Extract unavailable times
      console.log(`Unavailable times indexes for date ${date}:`, unavailableTimesIndexes);
      return unavailableTimesIndexes;
    } else {
      console.log(`Date document for ${date} does not exist.`);
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching unavailable time indexes:', error);
    throw new Error('Failed to fetch unavailable times indexes.');
  }
};

const fetchTimesByIndexes = async (collectionKey, indexes) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const reservationTimes = infoDoc.data().reservation_times; // Extract reservation times
      const timesOfIndexes = [];

      for (const index of indexes) {
        let found = false;

        for (const time of reservationTimes) {
          if (index === time.id) {
            timesOfIndexes.push(time.time);
            found = true;
            break; // Stop looping once a match is found
          }
        }

        if (!found) {
          timesOfIndexes.push(undefined); // Push undefined if the index is not found
          console.log(`Time not found for index ${index}`);
        }
      }

      console.log('Indexes:', indexes);
      console.log('Times found:', timesOfIndexes);
      return timesOfIndexes;
    } else {
      console.log('Error while fetching info document.');
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching times by indexes:', error);
    throw new Error('Failed to fetch times by indexes.');
  }
};

const fetchDateAvailability = async (collectionKey, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const unavailableDays = infoDoc.data().unavailable_days; // Extract unavailable days
      console.log('Unavailable days:', unavailableDays);
      const isAvailable = !unavailableDays.includes(date); // Check if the date is available
      console.log(`Fetched date ${date} availability: ${isAvailable}`);
      return isAvailable;
    }

    console.log('Error while fetching info document.');
    return null; // Return null if the document does not exist
  } catch (error) {
    console.error('Error fetching date availability:', error);
    throw new Error('Failed to fetch date availability.');
  }
};

const fetchDatesAvailability = async (collectionKey, dates) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const unavailableDays = infoDoc.data().unavailable_days; // Extract unavailable days
      const availability = dates.map(date => !unavailableDays.includes(date)); // Check availability for each date
      console.log('Unavailable days:', unavailableDays);
      console.log('Fetched dates availability:', availability);
      return availability;
    }

    console.log('Error while fetching info document.');
    return null; // Return null if the document does not exist
  } catch (error) {
    console.error('Error fetching dates availability:', error);
    throw new Error('Failed to fetch dates availability.');
  }
};

const fetchTimeByIndex = async (collectionKey, index) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const reservationTimes = infoDoc.data().reservation_times; // Extract reservation times

      for (const reservationTime of reservationTimes) {
        if (index === reservationTime.id) {
          console.log(`Index: ${index}, Time: ${reservationTime.time}`);
          return reservationTime.time; // Return the matching time
        }
      }

      console.log(`Time not found for index ${index}`);
      return null; // Return null if the index is not found
    } else {
      console.log('Error while fetching info document.');
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching time by index:', error);
    throw new Error('Failed to fetch time by index.');
  }
};

const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  try {
    const batch = db.batch(); // Initialize batch
    const collectionRef = db.collection(collectionKey); // Reference the collection

    console.log('Objects to add length:', objectsToAdd.length);

    objectsToAdd.forEach((object, index) => {
      let docRef;

      if (index === 0) {
        docRef = collectionRef.doc('data');
      } else if (index === objectsToAdd.length - 1) {
        docRef = collectionRef.doc(getCurrentDate());
      } else {
        docRef = collectionRef.doc(`table${object.id}`);
      }

      batch.set(docRef, object);
    });

    await batch.commit(); // Commit the batch
    console.log('Documents added to Firestore.');
  } catch (error) {
    console.error('Error adding documents to Firestore:', error);
    throw new Error('Failed to add documents to Firestore.');
  }
};

const addDocumentToDatabase = async (collectionKey, documentName, documentToAdd) => {
  try {
    const batch = db.batch(); // Initialize Firestore batch
    const collectionRef = db.collection(collectionKey); // Reference the collection
    const docRef = collectionRef.doc(documentName); // Reference the specific document

    batch.set(docRef, documentToAdd); // Add document to batch
    await batch.commit(); // Commit the batch

    console.log(`Added ${documentName} to Firestore collection ${collectionKey}.`);
    return docRef; // Return a reference to the added document
  } catch (error) {
    console.error('Error adding document to Firestore:', error);
    throw new Error('Failed to add document to Firestore.');
  }
};

const updateReservation = async (collectionKey, date, reservation) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const reservations = dateDoc.data().reservations || [];

      // Check if a reservation with the same ID already exists
      const existingReservationIndex = reservations.findIndex(
        res => res.reservation_id === reservation.reservation_id
      );

      if (existingReservationIndex !== -1) {
        // Update the existing reservation
        reservations[existingReservationIndex] = reservation;
      } else {
        // Add a new reservation with a generated ID
        const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
        const infoDoc = await infoRef.get();

        if (infoDoc.exists) {
          let reservation_id_counter = infoDoc.data().reservation_id_counter + 1;
          reservation.reservation_id = reservation_id_counter;
          reservation.state = 3; // Default state

          reservations.push(reservation);

          // Update the reservation ID counter
          await infoRef.update({ reservation_id_counter });
        } else {
          console.log("Info document doesn't exist (updating reservation).");
          return 'Error updating reservation.';
        }
      }

      // Update the reservations array in Firestore
      await dateRef.update({ reservations });

      console.log('Reservation updated successfully.');
      return 'Reservation updated successfully.';
    } else {
      console.log(`Date document does not exist for date: ${date}`);
      return null; // Handle the case where the date document does not exist
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw new Error('Failed to update reservation.');
  }
};

const updateOrder = async (collectionKey, date, order) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const orders = dateDoc.data().orders || [];

      // Check if an order with the same reservation_id already exists
      const existingOrderIndex = orders.findIndex(
        ord => ord.reservation_id === order.reservation_id
      );

      if (existingOrderIndex !== -1) {
        // Update the existing order
        orders[existingOrderIndex] = order;
      } else {
        // Add a new order
        const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
        const infoDoc = await infoRef.get();

        if (infoDoc.exists) {
          let order_id_counter = infoDoc.data().order_id_counter + 1;
          order.order_id = order_id_counter;
          orders.push(order);

          const reservations = dateDoc.data().reservations || [];
          const existingReservationIndex = reservations.findIndex(
            res => res.reservation_id === order.reservation_id
          );

          if (existingReservationIndex !== -1) {
            reservations[existingReservationIndex].state = 5; // Update reservation state
          }

          // Update the order ID counter
          await infoRef.update({ order_id_counter });
        } else {
          console.log("Info document doesn't exist (updating order).");
          return 'Error updating order.';
        }
      }

      // Update the orders array in Firestore
      await dateRef.update({ orders });
      return 'Order updated successfully.';
    } else {
      console.log(`Date document does not exist for date: ${date}`);
      return null; // Handle the case where the date document does not exist
    }
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Failed to update order.');
  }
};

const addNewReservation = async (collectionKey, date, reservationData) => {
  try {
    const { startIndex, endIndex, tableNumber, fullName, phone, email, notes, people, smokes, state = 3 } = reservationData;

    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document

    const dateDoc = await dateRef.get();
    const infoDoc = await infoRef.get();

    if (dateDoc.exists && infoDoc.exists) {
      const reservations = dateDoc.data().reservations || [];
      const currentId = (infoDoc.data().reservation_id_counter || 0) + 1;

      const newReservation = {
        name: fullName,
        phone,
        email,
        notes,
        start_time_index: startIndex,
        end_time_index: endIndex,
        table_id: tableNumber,
        reservation_id: currentId,
        people,
        smokes,
        state,
      };

      reservations.push(newReservation);

      // Update the reservation ID counter
      await infoRef.update({
        reservation_id_counter: currentId,
      });

      // Update the reservations array in Firestore
      await dateRef.update({
        reservations,
      });

      console.log(`Added new reservation:`, newReservation);
      return `New reservation added successfully for table ${tableNumber} on ${date}.`;
    } else {
      console.log(`Date or info document does not exist.`);
      return null; // Return null if documents do not exist
    }
  } catch (error) {
    console.error('Error adding new reservation:', error);
    throw new Error('Failed to add new reservation.');
  }
};

const addNewTable = async (collectionKey, tableData) => {
  try {
    const { id, capacity, smokeFriendly } = tableData;
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document

    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const tables = infoDoc.data().tables || []; // Fetch existing tables or initialize an empty array

      const existingTableIndex = tables.findIndex(table => table.id === id);

      if (existingTableIndex !== -1) {
        // If the table exists, update its details
        tables[existingTableIndex] = { id, capacity, smokeFriendly };
      } else {
        // If the table doesn't exist, add a new one
        tables.push({ id, capacity, smokeFriendly });
      }

      // Update tables array in Firestore
      await infoRef.update({ tables });

      console.log(`Added/updated table with ID: ${id}, Capacity: ${capacity}, Smoke-Friendly: ${smokeFriendly}`);
      return `Table with ID ${id} added/updated successfully.`;
    } else {
      throw new Error('Info document does not exist.');
    }
  } catch (error) {
    console.error('Error adding/updating table:', error);
    throw new Error('Failed to add or update table.');
  }
};

const addNewMenuItem = async (collectionKey, menuItem) => {
  try {
    const { menuItemCategory, menuItemId, menuItemName, menuItemPrice } = menuItem;
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document

    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      const menu = infoDoc.data().menu || []; // Fetch existing menu or initialize an empty array

      // Find the category in the menu
      const categoryIndex = menu.findIndex(cat => cat.category === menuItemCategory);

      if (categoryIndex !== -1) {
        // Category exists, add the new item
        menu[categoryIndex].items.push({
          id: menuItemId,
          name: menuItemName,
          price: menuItemPrice,
        });
      } else {
        // Category doesn't exist, create a new category
        menu.push({
          category: menuItemCategory,
          items: [
            {
              id: menuItemId,
              name: menuItemName,
              price: menuItemPrice,
            },
          ],
        });
      }

      // Update the document with the modified menu
      await infoRef.set({ menu }, { merge: true });

      console.log(`Added new menu item with ID: ${menuItemId}, Name: ${menuItemName}, Price: ${menuItemPrice}, Category: ${menuItemCategory}`);
      return `Menu item ${menuItemName} added successfully to category ${menuItemCategory}.`;
    } else {
      throw new Error('Info document does not exist.');
    }
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw new Error('Failed to add menu item.');
  }
};

const updateRestaurantInfo = async (collectionKey, infoData) => {
  try {
    const { restaurantName, maxReservationDurationIndexNumber, numberOfDaysToShowToCustomers } = infoData;

    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document

    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      // Update the restaurant information
      await infoRef.update({
        name: restaurantName,
        maxReservationDurationIndexNumber,
        numberOfDaysToShowToCustomers,
      });

      console.log(`Updated restaurant info: Name: ${restaurantName}, Max Duration Index: ${maxReservationDurationIndexNumber}, Days to Show: ${numberOfDaysToShowToCustomers}`);
      return 'Restaurant information updated successfully.';
    } else {
      throw new Error('Info document does not exist.');
    }
  } catch (error) {
    console.error('Error updating restaurant info:', error);
    throw new Error('Failed to update restaurant information.');
  }
};

const updateTablesMap = async (collectionKey, tables, date, unavailableTables) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document

    const infoDoc = await infoRef.get();
    const dateDoc = await dateRef.get();

    if (infoDoc.exists && dateDoc.exists) {
      // Update tables array in Firestore
      await infoRef.update({ tables });
      await dateRef.update({ unavailable_tables: unavailableTables });

      console.log('Updated tables:', tables);
      console.log(`Updated unavailable tables for date ${date}:`, unavailableTables);
      return 'Tables and unavailable tables updated successfully.';
    } else {
      throw new Error('Info or date document does not exist.');
    }
  } catch (error) {
    console.error('Error updating tables map:', error);
    throw new Error('Failed to update tables map.');
  }
};

const updateUnavailableTables = async (collectionKey, date, unavailableTableId) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document

    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const unavailableTables = dateDoc.data().unavailable_tables || [];

      const updatedUnavailableTables = unavailableTables.includes(unavailableTableId)
        ? unavailableTables.filter(id => id !== unavailableTableId)
        : [...unavailableTables, unavailableTableId];

      // Update the unavailable tables array in Firestore
      await dateRef.update({ unavailable_tables: updatedUnavailableTables });

      console.log('Updated unavailable tables:', updatedUnavailableTables);
      return updatedUnavailableTables;
    } else {
      console.log('Date document does not exist.');
      return false;
    }
  } catch (error) {
    console.error('Error updating unavailable tables:', error);
    throw new Error('Failed to update unavailable tables.');
  }
};  

const updateTableSchedules = async (collectionKey, date, reservationData) => {
  try {
    const { startIndex, endIndex, name, phone, tableNumber } = reservationData;

    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const currentDateRef = sampleRestaurantRef.doc(date); // Reference the date document
    const dataRef = sampleRestaurantRef.doc('data'); // Reference the "data" document

    const currentDateDoc = await currentDateRef.get();
    const dataDoc = await dataRef.get();

    if (currentDateDoc.exists && dataDoc.exists) {
      const reservations = currentDateDoc.data().reservations || [];
      const currentId = dataDoc.data().id_counter || 0;

      // Add the new reservation
      reservations.push({
        name,
        phone,
        startIndex,
        endIndex,
        table_id: tableNumber,
        reservation_id: currentId,
      });

      // Increment the ID counter
      await dataRef.update({ id_counter: currentId + 1 });

      // Update the reservations array in Firestore
      await currentDateRef.update({ reservations });

      console.log(`Updated table schedules with reservation ID: ${currentId}`);
      return `Reservation added successfully for table ${tableNumber} on ${date}.`;
    } else {
      throw new Error('Current date or data document does not exist.');
    }
  } catch (error) {
    console.error('Error updating table schedules:', error);
    throw new Error('Failed to update table schedules.');
  }
};

const updateUnavailableDays = async (collectionKey, unavailableDays) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document

    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      // Update unavailable days in Firestore
      await infoRef.update({ unavailable_days: unavailableDays });

      console.log('Updated unavailable days:', unavailableDays);
      return unavailableDays;
    } else {
      console.log('Info document does not exist.');
      return false;
    }
  } catch (error) {
    console.error('Error updating unavailable days:', error);
    throw new Error('Failed to update unavailable days.');
  }
};

const cancelReservationByTableNumber = async (collectionKey, reservationId, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document

    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const reservations = dateDoc.data().reservations || [];

      const reservationIndex = reservations.findIndex(res => res.reservation_id === reservationId);

      if (reservationIndex !== -1) {
        // Update the reservation state to 7 (canceled)
        reservations[reservationIndex].state = 7;
        await dateRef.update({ reservations });

        console.log(`Reservation with ID ${reservationId} was canceled.`);
        return `Reservation with ID ${reservationId} was successfully canceled.`;
      } else {
        console.log(`Reservation with ID ${reservationId} wasn't found.`);
        return `Reservation with ID ${reservationId} wasn't found.`;
      }
    } else {
      throw new Error(`Date document does not exist for date: ${date}.`);
    }
  } catch (error) {
    console.error('Error canceling reservation:', error);
    throw new Error('Failed to cancel the reservation.');
  }
};

const completeReservationByTableNumber = async (collectionKey, reservationId, date) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const dateRef = sampleRestaurantRef.doc(date); // Reference the date document

    const dateDoc = await dateRef.get();

    if (dateDoc.exists) {
      const reservations = dateDoc.data().reservations || [];

      const reservationIndex = reservations.findIndex(res => res.reservation_id === reservationId);

      if (reservationIndex !== -1) {
        // Update the reservation state to 6 (completed)
        reservations[reservationIndex].state = 6;
        await dateRef.update({ reservations });

        console.log(`Reservation with ID ${reservationId} was completed.`);
        return `Reservation with ID ${reservationId} was successfully completed.`;
      } else {
        console.log(`Reservation with ID ${reservationId} wasn't found.`);
        return `Reservation with ID ${reservationId} wasn't found.`;
      }
    } else {
      throw new Error(`Date document does not exist for date: ${date}.`);
    }
  } catch (error) {
    console.error('Error completing reservation:', error);
    throw new Error('Failed to complete the reservation.');
  }
};

const updateDateAvailability = async (collectionKey) => {
  try {
    const batch = db.batch(); // Initialize Firestore batch
    const collectionRef = db.collection(collectionKey); // Reference the collection

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Function to get all dates of the year
    const getAllDatesOfYear = (year) => {
      const dates = [];
      for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
          dates.push(`${day}-${month + 1}-${year}`);
        }
      }
      return dates;
    };

    const allDatesOfYear = getAllDatesOfYear(currentYear);

    const docRef = collectionRef.doc('data');

    // Fetch the current "data" document to maintain "id_counter"
    const docSnapshot = await docRef.get();
    let idCounter = 0;
    if (docSnapshot.exists) {
      idCounter = docSnapshot.data().id_counter || 0;
    }

    const tempDates = allDatesOfYear.map((date, index) => {
      const unavailable = Math.random() < 0.5 ? true : undefined; // Randomly set unavailable to true or undefined
      return unavailable
        ? {
            id: index + 1, // Increment id_counter for each date
            date: date,
            unavailable: unavailable,
          }
        : {
            id: index + 1, // Increment id_counter for each date
            date: date,
          };
    });

    // Update "data" document with new "dates" array and updated "id_counter"
    batch.set(docRef, {
      dates: tempDates,
      id_counter: idCounter + allDatesOfYear.length, // Increment id_counter
    });

    await batch.commit();
    console.log('Added dates availability to the database');
    return 'Dates availability updated successfully.';
  } catch (error) {
    console.error('Error updating date availability:', error);
    throw new Error('Failed to update date availability.');
  }
};

const updateMenu = async (collectionKey, menuMap) => {
  try {
    const sampleRestaurantRef = db.collection(collectionKey); // Reference the collection
    const infoRef = sampleRestaurantRef.doc('info'); // Reference the "info" document

    const infoDoc = await infoRef.get();

    if (infoDoc.exists) {
      // Convert the menu map to the desired format
      const tempNewMenu = convertMenuMapToMenu(menuMap);

      // Update the menu in Firestore
      await infoRef.update({ menu: tempNewMenu });

      console.log('Updated menu:', tempNewMenu);
      return 'Menu updated successfully.';
    } else {
      throw new Error(`Info document does not exist for collection: ${collectionKey}.`);
    }
  } catch (error) {
    console.error('Error updating menu:', error);
    throw new Error('Failed to update menu.');
  }
};

module.exports = {
  addDocumentToDatabase,
  getDocument,
  fetchReservationsOfDate,
  fetchReservationIdCounter,
  fetchReservationTimes,
  fetchReservationsOfDate,
  fetchReservations,
  fetchTable,
  fetchTablesAvailability,
  fetchTables,
  fetchUnavailableTablesOfDate,
  fetchUnavailableTablesTimesIndexesOfDate,
  fetchOrder,
  fetchMenu,
  fetchOrderIdCounter,
  fetchOrdersOfDate,
  fetchInfoForTableReservation,
  fetchInfoForCustomer,
  fetchDateInfo,
  fetchDateInfoForCustomer,
  fetchInfo,
  fetchUserInfo,
  dateExists,
  fetchUnavailableTimesIndexesOfDate,
  fetchTimesByIndexes,
  fetchDateAvailability,
  fetchDatesAvailability,
  fetchTimeByIndex,
  addCollectionAndDocuments,
  addDocumentToDatabase,
  updateReservation,
  updateOrder,
  addNewReservation,
  addNewTable,
  addNewMenuItem,
  updateRestaurantInfo,
  updateTablesMap,
  updateUnavailableTables,
  updateTableSchedules,
  updateUnavailableDays,
  cancelReservationByTableNumber,
  completeReservationByTableNumber,
  updateDateAvailability,
  updateMenu 
};
