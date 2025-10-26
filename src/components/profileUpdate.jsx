/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Avatar,
  Divider,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Person,
  Email,
  Phone,
  Wc,
  CalendarToday,
  AccountBalanceWallet,
} from "@mui/icons-material";

const ProfileUpdate = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    walletAddress: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user.name || !user.email || !user.age || user.age <= 0) {
      setError("Name, Email, and a valid Age are required.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/update-profile",
        user,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Profile updated successfully!",
          severity: "success",
        });
        setEditMode(false);
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to update profile",
        severity: "error",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  const renderField = (
    Icon,
    label,
    name,
    type = "text",
    isSelect = false,
    alwaysReadOnly = false
  ) => {
    const isReadOnly = !editMode || alwaysReadOnly;

    return (
      <Box className="flex flex-col mb-4">
        <Box className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl border">
          <Icon className="text-gray-500 mt-1" />
          <Box flex={1}>
            <Typography variant="caption" color="textSecondary">
              {label}
            </Typography>

            {isSelect ? (
              isReadOnly ? (
                <Typography variant="body1" fontWeight={500}>
                  {user[name] || "—"}
                </Typography>
              ) : (
                <FormControl fullWidth>
                  <Select
                    name={name}
                    value={user[name]}
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Gender
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              )
            ) : isReadOnly ? (
              <Typography variant="body1" fontWeight={500}>
                {user[name] || "—"}
              </Typography>
            ) : (
              <TextField
                fullWidth
                variant="standard"
                name={name}
                type={type}
                value={user[name]}
                onChange={(e) => {
                  const val = e.target.value;
                  if (name === "phone") {
                    if (/^\d{0,10}$/.test(val)) {
                      handleChange(e);
                    }
                  } else {
                    handleChange(e);
                  }
                }}
                inputProps={name === "phone" ? { maxLength: 10 } : {}}
                InputProps={{ disableUnderline: false }}
              />
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box className="max-w-2xl mx-auto p-4 flex flex-col h-screen">
      <Card elevation={3} className="rounded-2xl flex-grow overflow-hidden">
        <CardContent className="flex flex-col h-full">
          <Box className="flex items-center mb-6">
            <Avatar sx={{ width: 56, height: 56 }} className="mr-4">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              Your Profile
            </Typography>
          </Box>

          {error && (
            <Typography color="error" className="mb-4 text-center">
              {error}
            </Typography>
          )}

          <Divider className="mb-4" />

          {/* Form Fields */}
          <Box
            className="flex flex-col overflow-y-auto flex-grow"
            style={{
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            {renderField(Person, "Full Name", "name")}
            {renderField(Email, "Email", "email", "email", false, true)}
            {renderField(Phone, "Phone", "phone")}
            {renderField(Wc, "Gender", "gender", "text", true)}
            {renderField(CalendarToday, "Age", "age", "number")}
            {renderField(
              AccountBalanceWallet,
              "Wallet Address",
              "walletAddress",
              "text",
              false,
              true
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Button Section */}
      <Box className="flex justify-end mt-4 space-x-4">
        {!editMode ? (
          <Button variant="outlined" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={handleUpdate}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileUpdate;
