const express = require('express');
const { getMenu, addMenuItemHandler, updateMenuHandler} = require('../controllers/menuController');
const router = express.Router();

// Route: GET /:collectionKey/menu
router.get('/:collectionKey/menu', getMenu);
// Route: POST /:collectionKey/menu/item
router.post('/:collectionKey/menu/item', addMenuItemHandler);
// Route: PUT /:collectionKey/menu
router.put('/:collectionKey/menu', updateMenuHandler);

module.exports = router;
