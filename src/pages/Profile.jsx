
import { useState, useEffect } from "react"
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
  Box,
  Avatar,
  Paper,
  IconButton,
  CircularProgress,
  Container,
  Fade,
  Grow,
  MenuItem,
  Grid,
} from "@mui/material"
import {
  Person,
  Email,
  Phone,
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  AccountCircle,
  Wallet,
  Cake,
  Wc,
  Lock,
} from "@mui/icons-material"
import axios from "axios"
import { useSelector } from "react-redux"

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    walletAddress: "",
    gender: "",
    age: "",
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        setInitialLoading(true)
        if (token) {
          const response = await axios.get("http://localhost:5000/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setUserData({
            ...response.data,
            // Mock additional fields if not present
            walletAddress: response.data.walletAddress || "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
            gender: response.data.gender || "",
            age: response.data.age || "",
          })
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to load profile data",
          severity: "error",
        })
      } finally {
        setInitialLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("authToken")
      const response = await axios.put("http://localhost:5000/api/user/update-profile", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSnackbar({ open: true, message: response.data.message, severity: "success" })
      setEditMode(false)
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Profile update failed",
        severity: "error",
      })
    }

    setLoading(false)
  }

  const handleEditToggle = () => {
    setEditMode(!editMode)
  }

  const handleCancel = () => {
    setEditMode(false)
    // Reset form data if needed
  }

  // Generate user initials for avatar
  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Truncate wallet address for display
  const truncateWallet = (address) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (initialLoading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <Box className="relative z-10 flex justify-center items-center min-h-screen">
          <Box className="text-center">
            <Box className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
              <AccountCircle className="text-white text-4xl" />
            </Box>
            <Typography variant="h5" className="text-gray-700 mb-2">
              Loading Profile...
            </Typography>
            <CircularProgress size={40} sx={{ color: "#3b82f6" }} />
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
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <Container maxWidth="lg" className="relative z-10 py-8">
        <Fade in timeout={1000}>
          <div>
            {/* Header Section */}
            <Box className="text-center mb-8">
              <Box className="flex justify-center mb-6">
                <Box className="relative">
                  <Box className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <AccountCircle className="text-white text-4xl" />
                  </Box>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                </Box>
              </Box>

              <Typography
                variant="h3"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
              >
                My Profile
              </Typography>

              {/* Centered and adjusted description */}
              <Box className="flex justify-center">
                <Typography variant="h6" className="text-gray-600 max-w-xl text-center leading-relaxed">
                  Manage your personal information, account settings, and voting preferences
                </Typography>
              </Box>
            </Box>

            {/* Main Profile Card */}
            <Grow in timeout={800}>
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  overflow: "hidden",
                }}
              >
                {/* Profile Header */}
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    p: 4,
                    position: "relative",
                    color: "white",
                  }}
                >
                  {/* Decorative elements */}
                  <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
                  <Box className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></Box>
                  <Box className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full"></Box>

                  <Box className="relative z-10">
                    <Grid container spacing={4} alignItems="center">
                      <Grid item xs={12} md={4} className="text-center md:text-left">
                        {/* Profile Avatar */}
                        <Box className="relative inline-block mb-4 md:mb-0">
                          <Avatar
                            sx={{
                              width: 120,
                              height: 120,
                              background: "rgba(255,255,255,0.2)",
                              backdropFilter: "blur(10px)",
                              border: "4px solid rgba(255,255,255,0.3)",
                              fontSize: "2.5rem",
                              fontWeight: "bold",
                              mx: { xs: "auto", md: 0 },
                            }}
                          >
                            {userData.name ? getUserInitials(userData.name) : <Person sx={{ fontSize: 50 }} />}
                          </Avatar>
                          <IconButton
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                              width: 40,
                              height: 40,
                              backgroundColor: "rgba(255,255,255,0.9)",
                              color: "#3b82f6",
                              "&:hover": {
                                backgroundColor: "white",
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <PhotoCamera sx={{ fontSize: 20 }} />
                          </IconButton>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={8}>
                        <Box className="text-center md:text-left">
                          <Typography variant="h4" className="font-bold mb-2">
                            {userData.name || "User Name"}
                          </Typography>
                          <Typography variant="h6" className="opacity-90 mb-4">
                            {userData.email || "user@example.com"}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                {/* Profile Form */}
                <Box sx={{ p: 4 }}>
                  {/* Edit Mode Toggle */}
                  <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <Box>
                      <Typography variant="h5" className="font-bold text-gray-800 mb-1">
                        Personal Information
                      </Typography>
                      <Typography variant="body2" className="text-gray-500">
                        {editMode ? "Make changes to your profile information" : "View and manage your account details"}
                      </Typography>
                    </Box>

                    <Box className="flex items-center gap-3">
                      {editMode && (
                        <Button
                          onClick={handleCancel}
                          variant="text"
                          startIcon={<Cancel />}
                          sx={{
                            px: 4,
                            py: 2,
                            borderRadius: 4,
                            textTransform: "none",
                            fontWeight: 600,
                            color: "#6b7280",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(239, 68, 68, 0.1)",
                              color: "#ef4444",
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                      )}

                      <Button
                        onClick={handleEditToggle}
                        startIcon={editMode ? <Save /> : <Edit />}
                        sx={{
                          px: 6,
                          py: 2,
                          borderRadius: 4,
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "1rem",
                          background: editMode
                            ? "linear-gradient(135deg, #10b981, #059669)"
                            : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                          color: "white",
                          boxShadow: editMode
                            ? "0 8px 32px rgba(16, 185, 129, 0.3)"
                            : "0 8px 32px rgba(59, 130, 246, 0.3)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: editMode
                              ? "linear-gradient(135deg, #059669, #047857)"
                              : "linear-gradient(135deg, #2563eb, #7c3aed)",
                            transform: "translateY(-3px) scale(1.02)",
                            boxShadow: editMode
                              ? "0 12px 40px rgba(16, 185, 129, 0.4)"
                              : "0 12px 40px rgba(59, 130, 246, 0.4)",
                          },
                        }}
                      >
                        {editMode ? "Save Changes" : "Edit Profile"}
                      </Button>
                    </Box>
                  </Box>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                      backdropFilter: "blur(10px)",
                      borderRadius: 4,
                      border: "1px solid rgba(255,255,255,0.1)",
                      p: 4,
                    }}
                  >
                    {/* Form Fields Grid - Consistent sizing */}
                    <Grid container spacing={4}>
                      {/* Full Name */}
                      <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ height: "140px",width:300 ,display: "flex", flexDirection: "column" }}>
                          <Typography
                            variant="subtitle2"
                            className="font-semibold text-gray-700 mb-3"
                            sx={{ minHeight: "20px" }}
                          >
                            Full Name
                          </Typography>
                          <Box
                            sx={{
                              position: "relative",
                              background: editMode
                                ? "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))"
                                : "linear-gradient(135deg, rgba(249,250,251,0.9), rgba(249,250,251,0.7))",
                              borderRadius: 3,
                              border: editMode
                                ? "2px solid rgba(59, 130, 246, 0.2)"
                                : "2px solid rgba(229, 231, 235, 0.5)",
                              transition: "all 0.3s ease",
                              height: "80px",
                              "&:hover": {
                                ...(editMode && {
                                  border: "2px solid rgba(59, 130, 246, 0.4)",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
                                }),
                              },
                              "&:focus-within": {
                                border: "2px solid #3b82f6",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)",
                              },
                            }}
                          >
                            <Box className="flex items-center p-4 h-full">
                              <Person sx={{ color: editMode ? "#3b82f6" : "#9ca3af", mr: 3, fontSize: 24 }} />
                              <TextField
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                disabled={!editMode}
                                fullWidth
                                variant="standard"
                                placeholder="Enter your full name"
                                InputProps={{
                                  disableUnderline: true,
                                  sx: {
                                    fontSize: "1.1rem",
                                    fontWeight: 500,
                                    color: "#374151",
                                    "& input": { padding: 0 },
                                    "& input::placeholder": { color: "#9ca3af", opacity: 1 },
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Email Address */}
                      <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ height: "140px",width:300, display: "flex", flexDirection: "column" }}>
                          <Typography
                            variant="subtitle2"
                            className="font-semibold text-gray-700 mb-3"
                            sx={{ minHeight: "20px" }}
                          >
                            Email Address
                          </Typography>
                          <Box
                            sx={{
                              position: "relative",
                              background: "linear-gradient(135deg, rgba(249,250,251,0.9), rgba(249,250,251,0.7))",
                              borderRadius: 3,
                              border: "2px solid rgba(229, 231, 235, 0.5)",
                              opacity: 0.8,
                              height: "80px",
                            }}
                          >
                            <Box className="flex items-center p-4 h-full">
                              <Email sx={{ color: "#9ca3af", mr: 3, fontSize: 24 }} />
                              <TextField
                                name="email"
                                type="email"
                                value={userData.email}
                                disabled={true}
                                fullWidth
                                variant="standard"
                                InputProps={{
                                  disableUnderline: true,
                                  sx: {
                                    fontSize: "1.1rem",
                                    fontWeight: 500,
                                    color: "#6b7280",
                                    "& input": { padding: 0 },
                                  },
                                }}
                              />
                              <Lock sx={{ color: "#9ca3af", ml: 2, fontSize: 20 }} />
                            </Box>
                          </Box>
                          <Typography variant="caption" className="text-gray-500 mt-1 block" sx={{ minHeight: "16px" }}>
                            Email cannot be changed for security reasons
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Phone Number */}
                      <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ height: "140px", width:300,display: "flex", flexDirection: "column" }}>
                          <Typography
                            variant="subtitle2"
                            className="font-semibold text-gray-700 mb-3"
                            sx={{ minHeight: "20px" }}
                          >
                            Phone Number
                          </Typography>
                          <Box
                            sx={{
                              position: "relative",
                              background: editMode
                                ? "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))"
                                : "linear-gradient(135deg, rgba(249,250,251,0.9), rgba(249,250,251,0.7))",
                              borderRadius: 3,
                              border: editMode
                                ? "2px solid rgba(59, 130, 246, 0.2)"
                                : "2px solid rgba(229, 231, 235, 0.5)",
                              transition: "all 0.3s ease",
                              height: "80px",
                              "&:hover": {
                                ...(editMode && {
                                  border: "2px solid rgba(59, 130, 246, 0.4)",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
                                }),
                              },
                              "&:focus-within": {
                                border: "2px solid #3b82f6",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)",
                              },
                            }}
                          >
                            <Box className="flex items-center p-4 h-full">
                              <Phone sx={{ color: editMode ? "#3b82f6" : "#9ca3af", mr: 3, fontSize: 24 }} />
                              <TextField
                                name="phone"
                                type="tel"
                                value={userData.phone}
                                onChange={handleChange}
                                disabled={!editMode}
                                fullWidth
                                variant="standard"
                                placeholder="Enter your phone number"
                                InputProps={{
                                  disableUnderline: true,
                                  sx: {
                                    fontSize: "1.1rem",
                                    fontWeight: 500,
                                    color: "#374151",
                                    "& input": { padding: 0 },
                                    "& input::placeholder": { color: "#9ca3af", opacity: 1 },
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Wallet Address */}
                      <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ height: "140px",width:300, display: "flex", flexDirection: "column" }}>
                          <Typography
                            variant="subtitle2"
                            className="font-semibold text-gray-700 mb-3"
                            sx={{ minHeight: "20px" }}
                          >
                            Wallet Address
                          </Typography>
                          <Box
                            sx={{
                              position: "relative",
                              background: "linear-gradient(135deg, rgba(249,250,251,0.9), rgba(249,250,251,0.7))",
                              borderRadius: 3,
                              border: "2px solid rgba(229, 231, 235, 0.5)",
                              opacity: 0.8,
                              height: "80px",
                            }}
                          >
                            <Box className="flex items-center p-4 h-full">
                              <Wallet sx={{ color: "#9ca3af", mr: 3, fontSize: 24 }} />
                              <TextField
                                name="walletAddress"
                                value={truncateWallet(userData.walletAddress)}
                                disabled={true}
                                fullWidth
                                variant="standard"
                                InputProps={{
                                  disableUnderline: true,
                                  sx: {
                                    fontSize: "1.1rem",
                                    fontWeight: 500,
                                    color: "#6b7280",
                                    fontFamily: "monospace",
                                    "& input": { padding: 0 },
                                  },
                                }}
                              />
                              <Lock sx={{ color: "#9ca3af", ml: 2, fontSize: 20 }} />
                            </Box>
                          </Box>
                          <Typography variant="caption" className="text-gray-500 mt-1 block" sx={{ minHeight: "16px" }}>
                            Wallet address is linked to your account
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Gender */}
                      <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ height: "140px",width:300, display: "flex", flexDirection: "column" }}>
                          <Typography
                            variant="subtitle2"
                            className="font-semibold text-gray-700 mb-3"
                            sx={{ minHeight: "20px" }}
                          >
                            Gender
                          </Typography>
                          
                          <Box
                            sx={{
                              position: "relative",
                              background: editMode
                                ? "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))"
                                : "linear-gradient(135deg, rgba(249,250,251,0.9), rgba(249,250,251,0.7))",
                              borderRadius: 3,
                              border: editMode
                                ? "2px solid rgba(59, 130, 246, 0.2)"
                                : "2px solid rgba(229, 231, 235, 0.5)",
                              transition: "all 0.3s ease",
                              height: "80px",
                              "&:hover": {
                                ...(editMode && {
                                  border: "2px solid rgba(59, 130, 246, 0.4)",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
                                }),
                              },
                              "&:focus-within": {
                                border: "2px solid #3b82f6",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)",
                              },
                            }}
                          >
                            <Box className="flex items-center p-4 h-full">
                              <Wc sx={{ color: editMode ? "#3b82f6" : "#9ca3af", mr: 3, fontSize: 24 }} />
                              <TextField
                                name="gender"
                                value={userData.gender}
                                onChange={handleChange}
                                disabled={!editMode}
                                fullWidth
                                variant="standard"
                                select={editMode}
                                placeholder={editMode ? "Select Gender" : "Not specified"}
                                InputProps={{
                                  disableUnderline: true,
                                  sx: {
                                    fontSize: "1.1rem",
                                    fontWeight: 500,
                                    color: "#374151",
                                    "& input": { padding: 0 },
                                    "& input::placeholder": { color: "#9ca3af", opacity: 1 },
                                  },
                                }}
                                SelectProps={{
                                  displayEmpty: true,
                                  sx: {
                                    "& .MuiSelect-select": {
                                      padding: 0,
                                      textTransform: "capitalize",
                                    },
                                  },
                                }}
                              >
                                {editMode && [
                                  <MenuItem key="" value="">
                                    <em>Select Gender</em>
                                  </MenuItem>,
                                  <MenuItem key="male" value="male">
                                    Male
                                  </MenuItem>,
                                  <MenuItem key="female" value="female">
                                    Female
                                  </MenuItem>,
                                  <MenuItem key="other" value="other">
                                    Other
                                  </MenuItem>,
                                  <MenuItem key="prefer-not-to-say" value="prefer-not-to-say">
                                    Prefer not to say
                                  </MenuItem>,
                                ]}
                              </TextField>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Age */}
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ height: "140px", width: 300, display: "flex", flexDirection: "column" }}>
                          <Typography
                            variant="subtitle2"
                            className="font-semibold text-gray-700 mb-3"
                            sx={{ minHeight: "20px" }}
                          >
                            Age
                          </Typography>
                          
                          <Box
                            sx={{
                              position: "relative",
                              background: editMode
                                ? "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))"
                                : "linear-gradient(135deg, rgba(249,250,251,0.9), rgba(249,250,251,0.7))",
                              borderRadius: 3,
                              border: editMode
                                ? "2px solid rgba(59, 130, 246, 0.2)"
                                : "2px solid rgba(229, 231, 235, 0.5)",
                              transition: "all 0.3s ease",
                              height: "80px",
                              "&:hover": {
                                ...(editMode && {
                                  border: "2px solid rgba(59, 130, 246, 0.4)",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
                                }),
                              },
                              "&:focus-within": {
                                border: "2px solid #3b82f6",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)",
                              },
                            }}
                          >
                            <Box className="flex items-center p-4 h-full">
                              <Cake sx={{ color: editMode ? "#3b82f6" : "#9ca3af", mr: 3, fontSize: 24 }} />
                              <TextField
                                name="age"
                                type="number"
                                value={userData.age}
                                onChange={handleChange}
                                disabled={!editMode}
                                fullWidth
                                variant="standard"
                                placeholder="Enter your age"
                                inputProps={{ min: 18, max: 120 }}
                                InputProps={{
                                  disableUnderline: true,
                                  sx: {
                                    fontSize: "1.1rem",
                                    fontWeight: 500,
                                    color: "#374151",
                                    "& input": { padding: 0 },
                                    "& input::placeholder": { color: "#9ca3af", opacity: 1 },
                                  },
                                }}
                              />
                            </Box>
                          </Box>
               
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Save Button - Only show in edit mode */}
                    {editMode && (
                      <Box className="flex justify-center mt-8">
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={loading}
                          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                          sx={{
                            px: 10,
                            py: 3,
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            borderRadius: 4,
                            textTransform: "none",
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            boxShadow: "0 12px 40px rgba(16, 185, 129, 0.3)",
                            transition: "all 0.3s ease",
                            minWidth: 250,
                            "&:hover": {
                              background: "linear-gradient(135deg, #059669, #047857)",
                              boxShadow: "0 16px 50px rgba(16, 185, 129, 0.4)",
                              transform: "translateY(-3px) scale(1.02)",
                            },
                            "&:disabled": {
                              background: "linear-gradient(135deg, #9ca3af, #6b7280)",
                              transform: "none",
                              boxShadow: "0 4px 16px rgba(156, 163, 175, 0.3)",
                            },
                          }}
                        >
                          {loading ? "Updating Profile..." : "Save Changes"}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grow>
          </div>
        </Fade>
      </Container>

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
            borderRadius: 3,
            backdropFilter: "blur(20px)",
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Profile
