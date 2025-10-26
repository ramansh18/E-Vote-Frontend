/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const ChangePassword = ({ onPasswordChange }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // API call to change the password
      const response = await axios.put("http:localhost:50000/api/user/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        setError("");
        alert("Password updated successfully!");
        onPasswordChange(); // Trigger any parent state update or action
      }
    } catch (err) {
      setError("Failed to update password");
    }
  };

  return (
    <Box className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <Typography variant="h5" className="mb-4 text-center font-semibold">
        Change Your Password
      </Typography>

      {error && <Typography color="error" className="mb-4 text-center">{error}</Typography>}

      <TextField
        label="Current Password"
        variant="outlined"
        fullWidth
        className="mb-4"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <TextField
        label="New Password"
        variant="outlined"
        fullWidth
        className="mb-4"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <TextField
        label="Confirm New Password"
        variant="outlined"
        fullWidth
        className="mb-4"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        className="w-full"
        onClick={handlePasswordChange}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePassword;
