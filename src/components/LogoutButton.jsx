import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../redux/authSlice';
import { Snackbar, Alert } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;

    setOpen(false);

    // Perform logout and redirect after Snackbar closes
    dispatch(setLogout());
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-200 shadow-md"
      >
        <LogoutIcon fontSize="small" />
        Logout
      </button>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}

      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Logged out successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LogoutButton;
