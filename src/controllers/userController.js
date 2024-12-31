const { fetchUserInfo } = require('../firebase/firestore');
const { attemptLogin, createAuthUserWithEmailAndPassword, signOutUser } = require('../firebase/auth');

const getUserInfo = async (req, res) => {
  const { collectionKey, uid } = req.params; // Example: Pass collectionKey and UID as URL parameters

  try {
    const userInfo = await fetchUserInfo(collectionKey, uid);

    if (userInfo) {
      res.status(200).json({ user: userInfo });
    } else {
      res.status(404).json({ error: `User with UID ${uid} not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user info.', details: error.message });
  }
};

const createUserHandler = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }
      const userCredential = await createAuthUserWithEmailAndPassword(email, password);
      res.status(201).json({ message: 'User created successfully.', user: userCredential.user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

/**
 * Handles user login.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const loginHandler = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }
      const uid = await attemptLogin(email, password);
      res.status(200).json({ message: 'Logged in successfully.', uid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  /**
   * Handles user logout.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  const logoutHandler = async (req, res) => {
    try {
      await signOutUser();
      res.status(200).json({ message: 'User signed out successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { 
    getUserInfo, 
    createUserHandler,
    loginHandler,
    createUserHandler,
    logoutHandler,
  };
