import { setLoginSuccess, setLogout, setLoading } from './authSlice';

// Save token to localStorage and set Redux state
export const loginUser = ({ token, isAdmin }) => (dispatch) => {
  // Persist user login info to localStorage
  localStorage.setItem('authToken', token);
  localStorage.setItem('isAdmin', isAdmin);

  // Update Redux state
  dispatch(setLoginSuccess({ token, isAdmin }));
};

// Logout user: clear both localStorage and Redux
export const logoutUser = () => (dispatch) => {
  // Clear from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('isAdmin');

  // Reset Redux state
  dispatch(setLogout());
};

// Called on app load to check for existing authentication
export const checkAuth = () => (dispatch) => {
  dispatch(setLoading(true));

  // Check for token and admin status in localStorage
  const token = localStorage.getItem('authToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (token) {
    // If token exists, log the user in
    dispatch(setLoginSuccess({ token, isAdmin }));
  } else {
    // If no token exists, clear any previous session
    dispatch(setLogout());
  }

  dispatch(setLoading(false)); // End loading
};
