
import { useState } from "react"
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material"
import {
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  HowToVote,
  Security,
  Speed,
  CheckCircle,
} from "@mui/icons-material"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  })

  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log(formData)
      const response = await axios.post("http://localhost:5000/api/auth/register", formData)
      setSnackbar({ open: true, message: response.data.message, severity: "success" })

      // After successful OTP sent, navigate to OTP verification page
      setTimeout(() => {
        navigate("/verify-otp", {
          state: { email: formData.email, name: formData.name, password: formData.password, phone: formData.phone },
        })
      }, 1500)
    } catch (error) {
      console.error(error)
      setSnackbar({ open: true, message: error.response?.data?.message || "Registration failed", severity: "error" })
    }

    setLoading(false)
  }

  const features = [
    {
      icon: <Security className="text-blue-500" />,
      title: "Secure Registration",
      description: "Your data is protected with end-to-end encryption",
    },
    {
      icon: <HowToVote className="text-green-500" />,
      title: "Easy Voting",
      description: "Simple and intuitive voting process",
    },
    {
      icon: <Speed className="text-purple-500" />,
      title: "Quick Setup",
      description: "Get started in just a few minutes",
    },
  ]

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
        {[...Array(20)].map((_, i) => (
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

      <Box className="relative z-10 flex min-h-screen">
        {/* Left Side - Features */}
        <Box className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-center">
          <Box className="max-w-md">
            {/* Logo and Title */}
            <Box className="mb-12">
              <Box className="flex justify-center mb-6">
                <Box className="relative">
                  <HowToVote className="text-6xl text-blue-600" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                </Box>
              </Box>
              <Typography
                variant="h3"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
              >
                Welcome to E-Vote
              </Typography>
              <Typography variant="h6" className="text-gray-600 leading-relaxed">
                Join thousands of users in secure, transparent, and accessible digital voting. Your voice matters in
                shaping the future.
              </Typography>
            </Box>

            {/* Features */}
            <Box className="space-y-6">
              {features.map((feature, index) => (
                <Box
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 group"
                >
                  <Box className="flex-shrink-0 p-2 rounded-lg bg-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </Box>
                  <Box className="text-left">
                    <Typography variant="subtitle1" className="font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Trust Indicators */}
            <Box className="mt-12 p-6 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
              <Box className="flex items-center justify-center space-x-2 mb-3">
                <CheckCircle className="text-green-500" />
                <Typography variant="subtitle1" className="font-semibold text-gray-800">
                  Trusted Platform
                </Typography>
              </Box>
              <Typography variant="body2" className="text-gray-600">
                Over <span className="font-bold text-green-600">1 million+</span> secure votes cast
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Side - Registration Form */}
        <Box className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <Paper
            elevation={24}
            className="w-full max-w-lg"
            sx={{
              p: 6,
              borderRadius: 4,
              background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {/* Form Header */}
            <Box className="text-center mb-8">
              <Box className="flex justify-center mb-4 lg:hidden">
                <HowToVote className="text-4xl text-blue-600" />
              </Box>
              <Typography
                variant="h4"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
              >
                Create Account
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Join the future of secure digital voting
              </Typography>
            </Box>

            {/* Registration Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person className="text-gray-400" />
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

              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock className="text-gray-400" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
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

              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone className="text-gray-400" />
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
                    boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4)",
                    transform: "translateY(-2px) scale(1.02)",
                  },
                  "&:disabled": {
                    background: "linear-gradient(135deg, #9ca3af, #6b7280)",
                  },
                }}
              >
                {loading ? (
                  <Box className="flex items-center space-x-2">
                    <CircularProgress size={20} color="inherit" />
                    <span>Creating Account...</span>
                  </Box>
                ) : (
                  <span className="group-hover:animate-pulse">Create Account</span>
                )}
              </Button>
            </Box>

            {/* Login Link */}
            <Box className="mt-6 text-center">
              <Typography variant="body2" className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-300 hover:underline"
                >
                  Sign in here
                </Link>
              </Typography>
            </Box>

            {/* Security Note */}
            <Box className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <Box className="flex items-center space-x-2 mb-2">
                <Security className="text-blue-500 text-sm" />
                <Typography variant="caption" className="font-semibold text-blue-800">
                  Your data is secure
                </Typography>
              </Box>
              <Typography variant="caption" className="text-blue-700">
                We use industry-standard encryption to protect your personal information and voting data.
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

export default Register
