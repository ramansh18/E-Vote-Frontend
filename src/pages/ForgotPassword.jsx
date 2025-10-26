
import { useState } from "react"
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  Typography,
  Paper,
  InputAdornment,
  Box,
} from "@mui/material"
import { Email, CheckCircle, LockReset, Send } from "@mui/icons-material"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post("http://localhost:5000/api/auth/request-reset", { email })
      setEmailSent(true)
      setSnackbar({ open: true, message: "Password reset link sent to your email!", severity: "success" })
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to send reset link",
        severity: "error",
      })
    }

    setLoading(false)
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
        {[...Array(8)].map((_, i) => (
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

      <Box className="relative z-10 flex min-h-screen items-center justify-center">
        {/* Right Side - Reset Form */}
        <Box className="w-full flex items-center justify-center p-8">
          <Paper
            elevation={24}
            className="w-full max-w-md"
            sx={{
              p: 6,
              borderRadius: 4,
              background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {/* Back Button */}
            <Box className="flex items-center mb-6">
              <IconButton
                onClick={() => navigate("/login")}
                className="mr-3"
                sx={{
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  color: "#3b82f6",
                  "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 12H5M5 12L12 19M5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconButton>
              <Typography variant="h5" className="font-bold text-gray-800" sx={{ fontSize: "1.5rem" }}>
                Back to Login
              </Typography>
            </Box>

            {!emailSent ? (
              <>
                {/* Form Header */}
                <Box className="text-center mb-8">
                  <Box className="flex justify-center mb-4 lg:hidden">
                    <LockReset className="text-4xl text-blue-600" />
                  </Box>
                  <Typography
                    variant="h4"
                    className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
                  >
                    Reset Password
                  </Typography>
                  <Typography variant="body1" className="text-gray-600">
                    Enter your email address and we'll send you a secure reset link
                  </Typography>
                </Box>

                {/* Reset Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
                        },
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={loading}
                    endIcon={loading ? null : <Send />}
                    className="group transition-all duration-300 hover:scale-105"
                    sx={{
                      py: 2.5,
                      fontSize: 16,
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: "none",
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                        boxShadow: "0 4px 16px rgba(59, 130, 246, 0.2)",
                        transform: "translateY(-1px)",
                      },
                      "&:disabled": {
                        background: "linear-gradient(135deg, #9ca3af, #6b7280)",
                      },
                    }}
                  >
                    {loading ? (
                      <Box className="flex items-center space-x-2">
                        <CircularProgress size={20} color="inherit" />
                        <span>Sending Reset Link...</span>
                      </Box>
                    ) : (
                      <span className="group-hover:animate-pulse">Send Reset Link</span>
                    )}
                  </Button>
                </Box>

                {/* Login Link */}
                <Box className="mt-6 text-center">
                  <Typography variant="body2" className="text-gray-600">
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-300 hover:underline"
                    >
                      Sign in here
                    </Link>
                  </Typography>
                </Box>
              </>
            ) : (
              /* Success State */
              <Box className="text-center">
                <Box className="flex justify-center mb-6">
                  <Box className="relative">
                    <CheckCircle className="text-6xl text-green-500" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                  </Box>
                </Box>
                <Typography
                  variant="h4"
                  className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3"
                >
                  Email Sent!
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-6">
                  We've sent a password reset link to <span className="font-semibold text-blue-600">{email}</span>
                </Typography>

                <Button
                  variant="outlined"
                  component={Link}
                  to="/login"
                  fullWidth
                  sx={{
                    py: 2,
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: "none",
                    color: "#3b82f6",
                    borderColor: "#3b82f6",
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      borderColor: "#2563eb",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  Back to Login
                </Button>
              </Box>
            )}

            {/* Security Note */}
          </Paper>
        </Box>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ForgotPassword
