const { fetchMenu, addNewMenuItem, updateMenu } = require('../firebase/firestore');

/**
 * API endpoint to fetch the menu.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const getMenu = async (req, res) => {
  const { collectionKey } = req.params; // Example: Pass collectionKey as a URL parameter

  try {
    const menu = await fetchMenu(collectionKey);

    if (menu) {
      res.status(200).json({ menu });
    } else {
      res.status(404).json({ error: '"info" document not found or menu does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the menu.', details: error.message });
  }
};

const addMenuItemHandler = async (req, res) => {
    const { collectionKey } = req.params; // Extract collectionKey from URL
    const menuItem = req.body; // Menu item data from the request body
  
    try {
      if (!menuItem || typeof menuItem !== 'object') {
        return res.status(400).json({ error: 'Invalid menu item data provided.' });
      }
  
      const result = await addNewMenuItem(collectionKey, menuItem);
      res.status(201).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add menu item.', details: error.message });
    }
};

const updateMenuHandler = async (req, res) => {
    const { collectionKey } = req.params; // Extract collectionKey from URL
    const { menuMap } = req.body; // Extract menuMap from the request body
  
    try {
      if (!menuMap || typeof menuMap !== 'object') {
        return res.status(400).json({ error: 'Invalid menu map provided. Must be an object.' });
      }
  
      const result = await updateMenu(collectionKey, menuMap);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update menu.', details: error.message });
    }
  };

module.exports = { getMenu, addMenuItemHandler, updateMenuHandler};
