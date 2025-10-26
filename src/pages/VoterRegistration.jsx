"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import {
  TextField,
  Button,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  Box,
  InputAdornment,
  Paper,
} from "@mui/material"
import { ArrowBack, Person, Cake, Wc, HowToVote, Security, CheckCircle, Edit, AccountCircle } from "@mui/icons-material"

export default function VoterRegistration() {
  const [userData, setUserData] = useState({ name: "", age: "", gender: "" })
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [showEditButton, setShowEditButton] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUserData(res.data)
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Failed to load user data",
          severity: "error",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [token])

  const hasEmptyFields = () => {
    return !userData.name || !userData.age || !userData.gender
  }

  const handleRegister = async () => {
    if (!isConfirmed) {
      setSnackbar({
        open: true,
        message: "Please confirm that your details are correct",
        severity: "warning",
      })
      return
    }

    if (hasEmptyFields()) {
      setShowEditButton(true)
      setSnackbar({
        open: true,
        message: "Please complete all required fields before registering",
        severity: "warning",
      })
      return
    }

    setRegistering(true)
    try {
      const res = await axios.post(
        "http://localhost:5000/api/voter/register",
        {
          name: userData.name,
          age: userData.age,
          gender: userData.gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      
      if (res.data.message === "Voter is already registered") {
        setSnackbar({
          open: true,
          message: "You are already registered as a voter.",
          severity: "warning",
        })
      } else {
        setSnackbar({
          open: true,
          message: res.data.message,
          severity: "success",
        })
        // Redirect after successful registration
        setTimeout(() => {
          navigate("/elections")
        }, 2000)
      }
    } catch (err) {
      const errorMessage = err.response.data.message || "Error message"
      console.log(err.response.data.message)
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      })
    } finally {
      setRegistering(false)
    }
  }

  const handleGoToProfile = () => {
    navigate("/profile")
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const getGenderDisplayValue = (gender) => {
    const genderMap = {
      male: "Male",
      female: "Female",
      other: "Other",
      "prefer-not-to-say": "Prefer not to say",
    }
    return genderMap[gender] || ""
  }

  if (loading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <Box className="relative z-10 flex justify-center items-center min-h-screen">
          <Box className="flex items-center space-x-3">
            <CircularProgress size={40} sx={{ color: "#3b82f6" }} />
            <Typography variant="h6" className="text-gray-700">
              Loading your profile...
            </Typography>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-bounce"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <Box className="relative z-10 flex justify-center items-center min-h-screen py-8 px-4">
        <Paper
          elevation={24}
          className="w-full max-w-lg"
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            overflow: "hidden",
          }}
        >
          {/* Header with gradient */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              p: 3,
              position: "relative",
            }}
          >
            <Box className="flex items-center space-x-4">
              <IconButton
                onClick={() => navigate("/profile")}
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.3)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ArrowBack />
              </IconButton>
              <Box>
                <Typography variant="h5" className="font-bold text-white mb-1">
                  Voter Registration
                </Typography>
                <Typography variant="body2" className="text-blue-100">
                  Confirm your details and register to vote
                </Typography>
              </Box>
            </Box>

            {/* Decorative elements */}
            <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
            <Box className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></Box>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Box className="space-y-8">
              {/* Profile Section */}
              <Box className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <Box className="flex items-center space-x-2 mb-3">
                  <Person className="text-blue-500" />
                  <Typography variant="subtitle1" className="font-semibold text-blue-800">
                    Personal Information
                  </Typography>
                </Box>
                <Typography variant="body2" className="text-blue-700">
                  Please verify your details below before registering
                </Typography>
              </Box>

              {/* Form Fields - Read Only with proper spacing */}
              <Box className="space-y-3">
                <div >
                  <TextField
                  label="Full Name"
                  fullWidth
                  value={userData.name || ""}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(248, 250, 252, 0.8)",
                      "& fieldset": {
                        borderColor: userData.name ? "#e2e8f0" : "#fbbf24",
                      },
                    },
                  }}
                  error={!userData.name}
                  helperText={!userData.name ? "This field is required" : ""}
                />
                </div>

                <div>
                  <TextField
                  label="Age"
                  fullWidth
                  value={userData.age || ""}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Cake className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(248, 250, 252, 0.8)",
                      "& fieldset": {
                        borderColor: userData.age ? "#e2e8f0" : "#fbbf24",
                      },
                    },
                  }}
                  error={!userData.age}
                  helperText={!userData.age ? "This field is required" : ""}
                />
                </div>

                <div>
                  <TextField
                  label="Gender"
                  fullWidth
                  value={getGenderDisplayValue(userData.gender) || ""}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Wc className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(248, 250, 252, 0.8)",
                      "& fieldset": {
                        borderColor: userData.gender ? "#e2e8f0" : "#fbbf24",
                      },
                    },
                  }}
                  error={!userData.gender}
                  helperText={!userData.gender ? "This field is required" : ""}
                />
                </div>
              </Box>

              {/* Go to Profile Button - Shows when fields are empty */}
              {showEditButton && hasEmptyFields() && (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleGoToProfile}
                  startIcon={<AccountCircle />}
                  className="group transition-all duration-300"
                  sx={{
                    py: 2.5,
                    borderRadius: 3,
                    borderColor: "#f59e0b",
                    color: "#f59e0b",
                    fontWeight: 600,
                    textTransform: "none",
                    backgroundColor: "rgba(245, 158, 11, 0.05)",
                    "&:hover": {
                      borderColor: "#d97706",
                      backgroundColor: "rgba(245, 158, 11, 0.1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(245, 158, 11, 0.15)",
                    },
                  }}
                >
                  Go to Profile to Complete Information
                </Button>
              )}

              {/* Confirmation Checkbox */}
              <Box className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isConfirmed}
                      onChange={(e) => setIsConfirmed(e.target.checked)}
                      sx={{
                        color: "#10b981",
                        "&.Mui-checked": {
                          color: "#059669",
                        },
                      }}
                    />
                  }
                  label={
                    <Box className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500 text-sm" />
                      <Typography variant="body2" className="text-green-800 font-medium">
                        I confirm that the above details are correct
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              {/* Register Button */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleRegister}
                disabled={!isConfirmed || registering}
                startIcon={registering ? <CircularProgress size={16} /> : <HowToVote />}
                className="group transition-all duration-300"
                sx={{
                  py: 3,
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 3,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #059669, #047857)",
                    boxShadow: "0 12px 40px rgba(16, 185, 129, 0.4)",
                    transform: "translateY(-2px) scale(1.02)",
                  },
                  "&:disabled": {
                    background: "linear-gradient(135deg, #9ca3af, #6b7280)",
                  },
                }}
              >
                {registering ? "Registering..." : "Register as Voter"}
              </Button>

              {/* Warning Message for Empty Fields */}
              {hasEmptyFields() && (
                <Box className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                  <Box className="flex items-center space-x-2">
                    <Edit className="text-amber-500 text-sm" />
                    <Typography variant="body2" className="text-amber-800 font-medium">
                      Some required fields are missing. Please complete your profile first.
                    </Typography>
                  </Box>
                </Box>
              )}

              
            </Box>
          </CardContent>
        </Paper>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
