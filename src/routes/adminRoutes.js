const express = require('express');
const { addDocumentsToCollection, addDocument } = require('../controllers/adminController');
const router = express.Router();

// Route: POST /admin/:collectionKey/add-documents
router.post('/:collectionKey/add-documents', addDocumentsToCollection);

// Route: POST /admin/:collectionKey/:documentName
router.post('/:collectionKey/:documentName', addDocument);

module.exports = router;
