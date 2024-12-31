/**
 * Converts a menu map object to an array format categorized by menu items.
 * @param {object} menuMap - Map of menu items.
 * @returns {array} - Menu array categorized by item categories.
 */
function convertMenuMapToMenu(menuMap) {
  const menu = [];
  Object.entries(menuMap).forEach(([id, item]) => {
    const categoryIndex = menu.findIndex(cat => cat.category === item.category);
    const newItem = { id: parseInt(id), ...item };
    if (categoryIndex === -1) {
      menu.push({ category: item.category, items: [newItem] });
    } else {
      menu[categoryIndex].items.push(newItem);
    }
  });
  return menu;
}

/**
 * Formats a JavaScript Date object into a string in DD-MM-YYYY format.
 * @param {Date} date - The date object to format.
 * @returns {string} - Formatted date string.
 */
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based
  const day = date.getDate();
  return `${day}-${month}-${year}`;
};

/**
 * Gets the current date formatted as DD-MM-YYYY.
 * @returns {string} - Current date string.
 */
const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based
  const day = currentDate.getDate();
  return `${day}-${month}-${year}`;
};

/**
 * Generates a range of dates starting from today for the specified number of days.
 * @param {number} num - The number of days to include in the range.
 * @returns {array} - Array of date strings in DD-MM-YYYY format.
 */
const getDateRange = (num) => {
  const currentDate = new Date();
  const dates = [];

  for (let i = 0; i <= num; i++) {
    const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based
    const day = date.getDate();
    dates.push(`${day}-${month}-${year}`);
  }

  return dates;
};

module.exports = {
  convertMenuMapToMenu,
  formatDate,
  getCurrentDate,
  getDateRange,
};
