
import { useState, useEffect } from "react"
import { Button, Snackbar, Alert, Typography, Paper, Box, IconButton } from "@mui/material"
import { LockReset, Verified } from "@mui/icons-material"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import OTPInput from "./OTPInput"

function VerifyOTP() {
  const navigate = useNavigate()
  const location = useLocation()

  // Destructure values from location.state
  const { name, email, password, phone } = location.state || {}

  const [formData, setFormData] = useState({
    name: name || "",
    email: email || "",
    otp: "",
    password: password || "",
    phone: phone || "",
  })

  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })
  const [timer, setTimer] = useState(60)

  // Handle OTP Timer
  useEffect(() => {
    // Always start with 60 seconds when component mounts
    setTimer(60)

    // Set timestamp for this session
    const timestamp = Date.now()
    localStorage.setItem("otpTimestamp", timestamp.toString())

    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.otp.length !== 6) {
      setSnackbar({ open: true, message: "OTP must be 6 digits", severity: "warning" })
      return
    }

    setLoading(true)
    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", formData)
      setSnackbar({ open: true, message: "Registration successful!", severity: "success" })
      setTimeout(() => navigate("/login"), 1500)
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "OTP verification failed",
        severity: "error",
      })
    }
    setLoading(false)
  }

  const handleResendOTP = async () => {
    try {
      setLoading(true)
      await axios.post("http://localhost:5000/api/auth/resend-otp", { email: formData.email })
      setSnackbar({ open: true, message: "OTP resent successfully!", severity: "success" })

      // Update timestamp for the new OTP
      const timestamp = Date.now()
      localStorage.setItem("otpTimestamp", timestamp.toString())
      setTimer(60) // Restart timer for the new OTP
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to resend OTP",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
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
                onClick={() => navigate("/register")}
                sx={{
                  backgroundColor: "rgba(55, 65, 81, 0.1)",
                  color: "#374151",
                  "&:hover": {
                    backgroundColor: "rgba(55, 65, 81, 0.2)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#374151"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconButton>
            </Box>

            {/* Form Header */}
            <Box className="text-center mb-8">
              <Box className="flex justify-center mb-4">
                <Box className="relative">
                  <Verified className="text-5xl text-blue-600" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                </Box>
              </Box>
              <Typography
                variant="h4"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
              >
                Verify Your Email
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-2">
                Enter the 6-digit code we sent to
              </Typography>
              <Typography variant="body1" className="font-semibold text-blue-600">
                {formData.email}
              </Typography>
            </Box>

            {/* OTP Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Box className="flex justify-center">
                <OTPInput value={formData.otp} onChange={(otp) => setFormData({ ...formData, otp })} autoFocus />
              </Box>

              {/* Timer Display */}
              <Box className="text-center">
                <Typography variant="body2" className="text-gray-500">
                  {timer > 0 ? (
                    <>
                      Code expires in{" "}
                      <span className="font-semibold text-blue-600">
                        {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                      </span>
                    </>
                  ) : (
                    <span className="text-red-500 font-semibold">Code expired</span>
                  )}
                </Typography>
              </Box>

              {/* Hidden fields for email and password */}
              <input type="hidden" name="email" value={formData.email} />
              <input type="hidden" name="password" value={formData.password} />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={loading || formData.otp.length !== 6}
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
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </Box>

            {/* Resend Section */}
            <Box className="text-center mt-6">
              <Typography variant="body2" className="text-gray-600 mb-3">
                Didn't receive the code?
              </Typography>
              <Button
                variant="text"
                onClick={handleResendOTP}
                disabled={loading || timer > 0}
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: "none",
                  color: timer === 0 ? "#3b82f6" : "#9ca3af",
                  "&:hover": {
                    backgroundColor: timer === 0 ? "rgba(59, 130, 246, 0.1)" : "transparent",
                    transform: timer === 0 ? "translateY(-1px)" : "none",
                  },
                  "&:disabled": {
                    color: "#9ca3af",
                  },
                }}
              >
                {timer === 0 ? "Resend OTP" : `Resend in ${timer}s`}
              </Button>
            </Box>

            {/* Security Note */}
            <Box className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <Box className="flex items-center space-x-2 mb-2">
                <LockReset className="text-blue-500 text-sm" />
                <Typography variant="caption" className="font-semibold text-blue-800">
                  Security Notice
                </Typography>
              </Box>
              <Typography variant="caption" className="text-blue-700">
                For your security, this code will expire in 1 minute. Don't share this code with anyone.
              </Typography>
            </Box>
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

export default VerifyOTP
