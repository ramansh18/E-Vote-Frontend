"use client"

import { useState, useEffect } from "react"
import { TextField, Snackbar, Alert, CircularProgress } from "@mui/material"
import { LockReset, Visibility, VisibilityOff, Security, CheckCircle } from "@mui/icons-material"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"

function ResetPassword() {
  const location = useLocation()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [token, setToken] = useState("")

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }}
    />
  ))

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const tokenFromURL = queryParams.get("token")
    if (tokenFromURL) {
      setToken(tokenFromURL)
    } else {
      setSnackbar({ open: true, message: "Invalid or missing token!", severity: "error" })
    }
  }, [location.search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setSnackbar({ open: true, message: "Passwords do not match!", severity: "warning" })
      return
    }

    setLoading(true)

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", { token, newPassword })
      setSnackbar({ open: true, message: "Password reset successful!", severity: "success" })

      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to reset password",
        severity: "error",
      })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-5 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <LockReset className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Reset Password
            </h2>
            <p className="text-gray-600 text-lg">Create a new secure password for your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-1 hover:border-blue-300/50 transition-all duration-300">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Security className="text-blue-500 text-xl" />
                  <TextField
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    fullWidth
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                      ),
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#6b7280",
                        "&.Mui-focused": {
                          color: "#3b82f6",
                        },
                      },
                      "& .MuiInput-root": {
                        fontSize: "1.1rem",
                        color: "#374151",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-1 hover:border-purple-300/50 transition-all duration-300">
                <div className="flex items-center gap-3 px-4 py-3">
                  <CheckCircle className="text-purple-500 text-xl" />
                  <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    fullWidth
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-500 hover:text-purple-500 transition-colors duration-200"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                      ),
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#6b7280",
                        "&.Mui-focused": {
                          color: "#8b5cf6",
                        },
                      },
                      "& .MuiInput-root": {
                        fontSize: "1.1rem",
                        color: "#374151",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} color="inherit" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <LockReset />
                    <span>Reset Password</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-blue-50/50 backdrop-blur-sm border border-blue-200/30 rounded-2xl">
            <div className="flex items-center gap-3">
              <Security className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm font-medium text-blue-800">Security Tip</p>
                <p className="text-xs text-blue-600">
                  Use a strong password with at least 8 characters, including letters, numbers, and symbols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            backgroundColor:
              snackbar.severity === "success"
                ? "rgba(34, 197, 94, 0.9)"
                : snackbar.severity === "error"
                  ? "rgba(239, 68, 68, 0.9)"
                  : "rgba(245, 158, 11, 0.9)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ResetPassword
