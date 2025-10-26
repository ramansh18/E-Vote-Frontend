"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setLoginSuccess, setLogout } from "../redux/authSlice"
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Box,
  Typography,
  Chip,
  Fade,
  useScrollTrigger,
  Slide,
  Paper,
  Badge,
} from "@mui/material"
import {
  Menu as MenuIcon,
  HowToVote,
  Dashboard,
  AdminPanelSettings,
  Home,
  Person,
  Notifications,
  Close,
  Info,
  ContactMail,
} from "@mui/icons-material"
import NotificationDropdown from "./NotificationDropdown.jsx"


const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const token = useSelector((state) => state.auth.token)
  const isAdmin = useSelector((state) => state.auth.isAdmin)

  // Separate state management for menu
  const [anchorEl, setAnchorEl] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Refs for tracking component state
  const hasMounted = useRef(false)
  const isInitialLogin = useRef(false)
  const menuButtonRef = useRef(null)

  // Scroll trigger for header background
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  })

  // Track login state changes
  const prevIsLoggedIn = useRef(isLoggedIn)

  useEffect(() => {
    if (!prevIsLoggedIn.current && isLoggedIn) {
      // User just logged in
      isInitialLogin.current = true
      // Force close any open menus
      setAnchorEl(null)

      // Reset the flag after a short delay
      setTimeout(() => {
        isInitialLogin.current = false
      }, 1000)
    }
    prevIsLoggedIn.current = isLoggedIn
  }, [isLoggedIn])

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken")
      const isAdmin = localStorage.getItem("isAdmin") === "true"

      if (token) {
        dispatch(
          setLoginSuccess({
            isLoggedIn: true,
            token,
            isAdmin,
          }),
        )
      } else {
        dispatch(setLogout())
      }
    }

    // Mark component as mounted
    hasMounted.current = true

    // Ensure menu is closed on mount
    setAnchorEl(null)

    checkLoginStatus()

    window.addEventListener("storage", checkLoginStatus)

    return () => {
      window.removeEventListener("storage", checkLoginStatus)
      hasMounted.current = false
    }
  }, [dispatch])

  // Memoized click handler to prevent unnecessary re-renders
  const handleMenuClick = useCallback((event) => {
    // Comprehensive guards
    if (!event) return
    if (!event.currentTarget) return
    if (!hasMounted.current) return
    if (isInitialLogin.current) return
    if (event.type !== "click") return

    // Ensure this is a real user interaction
    if (event.isTrusted === false) return

    // Prevent if the event target is not the expected button
    if (event.currentTarget !== menuButtonRef.current) return

    

    setAnchorEl(event.currentTarget)
  }, [])

  const closeMenu = useCallback(() => {
    console.log("Closing menu")
    setAnchorEl(null)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  // Close menu when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      setAnchorEl(null)
    }
  }, [isLoggedIn])

  // Updated navigation items - Home only shows when NOT logged in
  const navigationItems = [
    {
      label: "Home",
      path: "/",
      icon: <Home />,
      show: !isLoggedIn, // Only show when user is NOT logged in
    },
    {
      label: "About Us",
      path: "/about",
      icon: <Info />,
      show: true, // Always show
    },
    {
      label: "Contact",
      path: "/contact",
      icon: <ContactMail />,
      show: true, // Always show
    },
    {
      label: "Elections",
      path: "/elections",
      icon: <HowToVote />,
      show: isLoggedIn && !isAdmin, // Only show for logged-in non-admin users
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard />,
      show: isLoggedIn && !isAdmin,
    },
    {
      label: "Admin Dashboard",
      path: "/admin/dashboard",
      icon: <AdminPanelSettings />,
      show: isLoggedIn && isAdmin,
    },
  ]

  

  return (
    <>
      <Slide appear={false} direction="down" in={!mobileMenuOpen}>
        <Box
          component="header"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            transition: "all 0.3s ease",
            background: trigger ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: trigger ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "0 4px 16px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Box className="flex justify-between items-center h-16">
              {/* Logo Section */}
              <Link to="/" className="flex items-center space-x-3 group">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                    "&:hover": {
                      transform: "scale(1.05) rotate(5deg)",
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                    },
                  }}
                >
                  <HowToVote sx={{ color: "white", fontSize: 24 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  E-Vote
                </Typography>
              </Link>

              {/* Desktop Navigation */}
              <Box className="hidden md:flex items-center space-x-1">
                {navigationItems
                  .filter((item) => item.show)
                  .map((item) => (
                    <Button
                      key={item.path}
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#374151",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          transform: "translateY(-2px)",
                          color: "#3b82f6",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
              </Box>
                  
              {/* User Section */}
              <Box className="hidden md:flex items-center space-x-4">
                {isLoggedIn ? (
                  <>
                    
                    {isLoggedIn && !isAdmin &&<NotificationDropdown />}
                    {/* User Menu */}
                    <Box className="relative">
                      <IconButton ref={menuButtonRef} onClick={handleMenuClick} sx={{ p: 0 }} disableRipple>
                        <Avatar
                          alt="User Profile"
                          src={userInfo?.profilePic}
                          sx={{
                            width: 44,
                            height: 44,
                            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            border: "2px solid rgba(255, 255, 255, 0.8)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                            },
                          }}
                        >
                          <Person />
                        </Avatar>
                      </IconButton>

                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                        disableAutoFocus
                        disableEnforceFocus
                        disableRestoreFocus
                        PaperProps={{
                          sx: {
                            borderRadius: 3,
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                            mt: 1,
                            minWidth: 200,
                          },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      >
                        <Box sx={{ p: 2, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                          <Box className="flex items-center space-x-3">
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                              }}
                            >
                              <Person />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" className="font-semibold text-gray-800">
                                Welcome Back!
                              </Typography>
                              <Chip
                                label={isAdmin ? "Admin" : "Voter"}
                                size="small"
                                sx={{
                                  background: isAdmin
                                    ? "linear-gradient(135deg, #f59e0b, #d97706)"
                                    : "linear-gradient(135deg, #10b981, #059669)",
                                  color: "white",
                                  fontWeight: 600,
                                  fontSize: "0.75rem",
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>

                        {/* Updated Menu Item - Profile instead of Settings */}
                        <MenuItem
                          component={Link}
                          to="/profile"
                          onClick={closeMenu}
                          sx={{
                            py: 1.5,
                            px: 2,
                            "&:hover": {
                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                            },
                          }}
                        >
                          <Person sx={{ mr: 2, color: "#6b7280" }} />
                          <Typography variant="body2">Profile</Typography>
                        </MenuItem>

                        <Box sx={{ p: 2, pt: 1 }}>
                          <LogoutButton />
                        </Box>
                      </Menu>
                    </Box>
                  </>
                ) : (
                  <Box className="flex items-center space-x-4" sx={{ gap: 1 }}>
                    <Button
                      component={Link}
                      to="/login"
                      variant="outlined"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "#3b82f6",
                        color: "#3b82f6",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#3b82f6",
                          color: "white",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                        },
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      component={Link}
                      to="/register"
                      variant="contained"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 600,
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                        boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Mobile Menu Button */}
              <Box className="md:hidden">
                <IconButton
                  onClick={toggleMobileMenu}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    color: "#3b82f6",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Slide>

      {/* Mobile Menu Overlay */}
      <Fade in={mobileMenuOpen}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            display: mobileMenuOpen ? "block" : "none",
          }}
          onClick={closeMobileMenu}
        />
      </Fade>

      {/* Mobile Menu */}
      <Slide direction="down" in={mobileMenuOpen} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "none",
            borderRadius: 0,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            maxHeight: "100vh",
            overflow: "auto",
          }}
        >
          {/* Mobile Header */}
          <Box className="flex justify-between items-center p-4 border-b border-gray-200">
            <Box className="flex items-center space-x-3">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                }}
              >
                <HowToVote sx={{ color: "white", fontSize: 24 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                E-Vote
              </Typography>
            </Box>
            <IconButton
              onClick={closeMobileMenu}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                "&:hover": {
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Mobile Navigation */}
          <Box sx={{ p: 4 }}>
            {/* User Info Section */}
            {isLoggedIn && (
              <Box
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                }}
              >
                <Box className="flex items-center space-x-3 mb-3">
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    }}
                  >
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" className="font-semibold text-gray-800">
                      Welcome Back!
                    </Typography>
                    <Chip
                      label={isAdmin ? "Admin User" : "Voter"}
                      size="small"
                      sx={{
                        background: isAdmin
                          ? "linear-gradient(135deg, #f59e0b, #d97706)"
                          : "linear-gradient(135deg, #10b981, #059669)",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Box>
                <Box className="flex items-center space-x-2">
                  <IconButton
                    size="small"
                    sx={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "#3b82f6",
                    }}
                  >
                    <Badge badgeContent={3} color="error">
                      <Notifications fontSize="small" />
                    </Badge>
                  </IconButton>
                  <IconButton
                    component={Link}
                    to="/profile"
                    onClick={closeMobileMenu}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "#3b82f6",
                    }}
                  >
                    <Person fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            )}

            {/* Navigation Items */}
            <Box className="space-y-2 mb-6">
              {navigationItems
                .filter((item) => item.show)
                .map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    onClick={closeMobileMenu}
                    startIcon={item.icon}
                    fullWidth
                    sx={{
                      justifyContent: "flex-start",
                      px: 3,
                      py: 2,
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#374151",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        color: "#3b82f6",
                        transform: "translateX(8px)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
            </Box>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <Box sx={{ mt: 4 }}>
                <LogoutButton />
              </Box>
            ) : (
              <Box className="space-y-3">
                <Button
                  component={Link}
                  to="/login"
                  onClick={closeMobileMenu}
                  fullWidth
                  variant="outlined"
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    borderColor: "#3b82f6",
                    color: "#3b82f6",
                    "&:hover": {
                      backgroundColor: "#3b82f6",
                      color: "white",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  onClick={closeMobileMenu}
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Slide>

      {/* Spacer for fixed header */}
      <Box sx={{ height: 64 }} />
    </>
  )
}

export default Header
