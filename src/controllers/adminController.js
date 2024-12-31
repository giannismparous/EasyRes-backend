const { addCollectionAndDocuments, addDocumentToDatabase  } = require('../firebase/firestore');

const addDocumentsToCollection = async (req, res) => {
  const { collectionKey } = req.params; // Collection key from URL
  const { objectsToAdd } = req.body; // Documents to add from the request body

  try {
    if (!Array.isArray(objectsToAdd)) {
      return res.status(400).json({ error: 'Objects to add must be an array.' });
    }

    await addCollectionAndDocuments(collectionKey, objectsToAdd);
    res.status(201).json({ message: 'Documents added successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add documents to Firestore.', details: error.message });
  }
};

const addDocument = async (req, res) => {
    const { collectionKey, documentName } = req.params; // Extract collectionKey and documentName from URL
    const documentToAdd = req.body; // Document data from request body
  
    try {
      if (!documentToAdd || typeof documentToAdd !== 'object') {
        return res.status(400).json({ error: 'Invalid document data provided.' });
      }
  
      const docRef = await addDocumentToDatabase(collectionKey, documentName, documentToAdd);
      res.status(201).json({
        message: `Document ${documentName} added successfully to collection ${collectionKey}.`,
        documentReference: docRef.id,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add document to Firestore.', details: error.message });
    }
  };

module.exports = { addDocumentsToCollection, addDocument };
