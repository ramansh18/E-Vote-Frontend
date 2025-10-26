"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import {
  Button,
  CircularProgress,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Fade,
  Grow,
  Grid,
  CardContent,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from "@mui/material"
import {
  CheckCircle,
  Cancel,
  Person,
  Group,
  Event,
  AccountBalanceWallet,
  ArrowBack,
  Pending,
  FilterList,
  Search,
  Refresh,
  Assignment,
  Schedule,
  Verified,
  Error as ErrorIcon,
  Dashboard,
  Assessment,
} from "@mui/icons-material"

const RequestApproval = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")
  const [processingId, setProcessingId] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  })

  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()

  // Fetch requests function
  const fetchRequests = async () => {
    if (!token) return

    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5000/api/candidate/all-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      // Filter out approved requests for display, but keep all for stats
      const allRequests = response.data.requests
      const filteredRequests = allRequests.filter((request) => request.status === "pending")

      setRequests(filteredRequests)

      // Calculate stats
      const statsData = {
        total: allRequests.length,
        pending: allRequests.filter((r) => r.status === "pending").length,
        approved: allRequests.filter((r) => r.status === "approved").length,
        rejected: allRequests.filter((r) => r.status === "rejected").length,
      }
      setStats(statsData)

      setLoading(false)
    } catch (err) {
      console.error("Error fetching candidate requests:", err)
      setError("Failed to load requests")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchRequests()
    }
  }, [token])

  const handleApprove = async (id) => {
    try {
      setProcessingId(id)
      await axios.put(
        `http://localhost:5000/api/candidate/approve-candidate/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      fetchRequests()
      showSnackbar("Candidate approved successfully!", "success")
    } catch (err) {
      console.error("Approval failed:", err)
      showSnackbar("Error approving candidate.", "error")
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (id) => {
    try {
      setProcessingId(id)
      await axios.put(
        `http://localhost:5000/api/candidate/reject-candidate/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      fetchRequests()
      showSnackbar("Candidate rejected successfully!", "success")
    } catch (err) {
      console.error("Rejection failed:", err)
      showSnackbar("Error rejecting candidate.", "error")
    } finally {
      setProcessingId(null)
    }
  }

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const handleBackToDashboard = () => {
    navigate("/admin/dashboard")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success"
      case "rejected":
        return "error"
      case "pending":
        return "warning"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <Verified />
      case "rejected":
        return <ErrorIcon />
      case "pending":
        return <Schedule />
      default:
        return <Pending />
    }
  }

  if (loading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Centered Loading Content */}
        <Box className="relative z-10 min-h-screen flex items-center justify-center">
          <Container maxWidth="sm">
            <Box className="text-center">
              <Box className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                <Assignment className="text-white text-4xl" />
              </Box>
              <Typography variant="h5" className="text-gray-700 mb-2">
                Loading Candidate Requests...
              </Typography>
              <CircularProgress size={40} sx={{ color: "#3b82f6" }} />
            </Box>
          </Container>
        </Box>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Centered Error Content */}
        <Box className="relative z-10 min-h-screen flex items-center justify-center">
          <Container maxWidth="sm">
            <Paper
              elevation={24}
              sx={{
                p: 6,
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                textAlign: "center",
              }}
            >
              <ErrorIcon sx={{ fontSize: 64, color: "#ef4444", mb: 3 }} />
              <Typography variant="h5" className="text-gray-800 mb-3">
                Error Loading Requests
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-4">
                {error}
              </Typography>
              <Button
                variant="contained"
                onClick={fetchRequests}
                startIcon={<Refresh />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                  },
                }}
              >
                Try Again
              </Button>
            </Paper>
          </Container>
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

      {/* Centered Main Content */}
      <Box className="relative z-10 min-h-screen flex flex-col">
        <Container maxWidth="xl" sx={{ flex: 1, display: "flex", flexDirection: "column", py: 4 }}>
          <Fade in timeout={1000}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Centered Header Section */}
              <Box className="text-center mb-8">
                <Box className="flex items-center justify-center mb-6">
                  <IconButton
                    onClick={handleBackToDashboard}
                    sx={{
                      mr: 3,
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ArrowBack />
                  </IconButton>
                  <Box>
                    <Typography
                      variant="h3"
                      className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                    >
                      Candidate Requests
                    </Typography>
                    <Typography variant="h6" className="text-gray-600">
                      Review and manage candidate applications
                    </Typography>
                  </Box>
                </Box>

               
              </Box>

              {/* Centered Statistics Cards */}
        <Box className="flex mb-8 ml-10">
  <Box sx={{ maxWidth: 1200, width: "100%" }}>
    <Grid container spacing={2} justifyContent="center">
      {[
        {
          label: "Total Requests",
          value: stats.total,
          icon: <Assignment fontSize="medium" />,
          gradient: "linear-gradient(135deg, #6366f1, #4338ca)", // Bolder indigo
          bgIcon: <Assignment />,
          subtitle: "All submissions",
        },
        {
          label: "Pending Review",
          value: stats.pending,
          icon: <Schedule fontSize="medium" />,
          gradient: "linear-gradient(135deg, #f43f5e, #be123c)", // Strong rose/red
          bgIcon: <Schedule />,
          subtitle: "Awaiting decision",
        },
        {
          label: "Approved",
          value: stats.approved,
          icon: <CheckCircle fontSize="medium" />,
          gradient: "linear-gradient(135deg, #14b8a6, #0f766e)", // Bold teal
          bgIcon: <CheckCircle />,
          subtitle: "Marked valid",
        },
        {
          label: "Rejected",
          value: stats.rejected,
          icon: <Cancel fontSize="medium" />,
          gradient: "linear-gradient(135deg, #f97316, #c2410c)", // Strong orange
          bgIcon: <Cancel />,
          subtitle: "Declined",
        },
      ].map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Grow in timeout={400 + index * 200}>
         <Paper
  elevation={3}
  sx={{
    borderRadius: 4,
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.2)",
    overflow: "hidden",
    position: "relative",
    width: 278,
    height: 132, // Ensures uniform height
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    },
  }}
>


              {/* Background Pattern */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100px",
                  background: stat.gradient,
                  borderRadius: "0 0 0 100px",
                  opacity: 0.15,
                }}
              />

              {/* Background Icon */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  opacity: 0.12,
                  fontSize: "4rem",
                  background: stat.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.bgIcon}
              </Box>

              {/* Horizontal Layout */}
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 3,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: stat.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </Box>

                {/* Content */}
                <Box>
                  <Typography
                    variant="h5"
                    className="font-bold text-gray-800 leading-snug"
                  >
                    {typeof stat.value === "number"
                      ? stat.value.toLocaleString()
                      : stat.value}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className="font-medium text-gray-700"
                  >
                    {stat.label}
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    {stat.subtitle}
                  </Typography>
                </Box>
              </CardContent>
            </Paper>
          </Grow>
        </Grid>
      ))}
    </Grid>
  </Box>
</Box>





              {/* Centered Content Area */}
              <Box className="flex justify-center flex-1">
                <Box sx={{ maxWidth: 1400, width: "100%" }}>
                  {requests.length === 0 ? (
                    <Fade in timeout={800}>
                      <Box className="flex justify-center">
                        <Paper
                          elevation={24}
                          sx={{
                            borderRadius: 4,
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            p: 8,
                            textAlign: "center",
                            maxWidth: 600,
                            width: "100%",
                          }}
                        >
                          <Box className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                            <Assignment className="text-gray-400 text-4xl" />
                          </Box>
                          <Typography variant="h5" className="text-gray-600 mb-3">
                            No Pending Requests
                          </Typography>
                          <Typography variant="body1" className="text-gray-500">
                            All candidate requests have been processed. New requests will appear here for your review.
                          </Typography>
                        </Paper>
                      </Box>
                    </Fade>
                  ) : (
                    <Fade in timeout={800}>
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
                        {/* Table Header */}
                        <Box
                          sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            p: 4,
                            position: "relative",
                            textAlign: "center",
                          }}
                        >
                          <Box className="flex items-center justify-center space-x-4">
                            <Box className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                              <Assignment className="text-white" />
                            </Box>
                            <Box>
                              <Typography variant="h5" className="font-bold text-white mb-1">
                                Pending Candidate Requests
                              </Typography>
                              <Typography variant="body2" className="text-blue-100">
                                {requests.length} request{requests.length !== 1 ? "s" : ""} awaiting review
                              </Typography>
                            </Box>
                          </Box>

                          {/* Decorative elements */}
                          <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
                          <Box className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></Box>
                        </Box>

                        {/* Centered Table */}
                        <Box sx={{ p: 4 }}>
                          <TableContainer>
                            <Table
                              sx={{
                                "& .MuiTableHead-root": {
                                  "& .MuiTableCell-root": {
                                    background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    color: "#374151",
                                    borderBottom: "2px solid #e5e7eb",
                                    textAlign: "center",
                                  },
                                },
                                "& .MuiTableBody-root": {
                                  "& .MuiTableRow-root": {
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                      backgroundColor: "rgba(59, 130, 246, 0.05)",
                                      transform: "scale(1.01)",
                                    },
                                  },
                                  "& .MuiTableCell-root": {
                                    borderBottom: "1px solid #f3f4f6",
                                    py: 3,
                                    textAlign: "center",
                                    fontSize: "0.95rem",
                                  },
                                },
                              }}
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <Person className="text-blue-600" />
                                      <span>Candidate Name</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <Group className="text-purple-600" />
                                      <span>Party</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <Event className="text-green-600" />
                                      <span>Election</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <AccountBalanceWallet className="text-orange-600" />
                                      <span>Wallet Address</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <Assessment className="text-indigo-600" />
                                      <span>Status</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {requests.map((request, index) => (
                                  <Grow in timeout={600 + index * 200} key={request._id}>
                                    <TableRow>
                                      <TableCell>
                                        <Box className="flex items-center justify-center space-x-3">
                                          <Avatar
                                            sx={{
                                              width: 40,
                                              height: 40,
                                              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                            }}
                                          >
                                            <Person />
                                          </Avatar>
                                          <Typography variant="body1" className="font-semibold text-gray-800">
                                            {request.userId?.name || "Unknown"}
                                          </Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1" className="font-medium text-gray-700">
                                          {request.party || "N/A"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1" className="font-medium text-gray-700">
                                          {request.electionId?.title || "N/A"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="body2"
                                          className="font-mono text-gray-600"
                                          sx={{ fontSize: "0.8rem" }}
                                        >
                                          {request.walletAddress || request.userId?.walletAddress || "N/A"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Chip
                                          icon={getStatusIcon(request.status)}
                                          label={request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                          color={getStatusColor(request.status)}
                                          sx={{
                                            fontWeight: 600,
                                            borderRadius: 2,
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Box className="flex items-center justify-center space-x-2">
                                          <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={
                                              processingId === request._id ? (
                                                <CircularProgress size={16} color="inherit" />
                                              ) : (
                                                <CheckCircle />
                                              )
                                            }
                                            onClick={() => handleApprove(request._id)}
                                            disabled={request.status !== "pending" || processingId === request._id}
                                            sx={{
                                              px: 2,
                                              py: 1,
                                              borderRadius: 2,
                                              mr:1,
                                              background: "linear-gradient(135deg, #10b981, #059669)",
                                              fontWeight: 600,
                                              textTransform: "none",
                                              fontSize: "0.875rem",
                                              "&:hover": {
                                                background: "linear-gradient(135deg, #059669, #047857)",
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                                              },
                                              "&:disabled": {
                                                background: "linear-gradient(135deg, #9ca3af, #6b7280)",
                                              },
                                            }}
                                          >
                                            Approve
                                          </Button>

                                          <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={
                                              processingId === request._id ? (
                                                <CircularProgress size={16} color="inherit" />
                                              ) : (
                                                <Cancel />
                                              )
                                            }
                                            onClick={() => handleReject(request._id)}
                                            disabled={request.status !== "pending" || processingId === request._id}
                                            sx={{
                                              px: 2,
                                              py: 1,
                                              borderRadius: 2,
                                              background: "linear-gradient(135deg, #ef4444, #dc2626)",
                                              fontWeight: 600,
                                              textTransform: "none",
                                              fontSize: "0.875rem",
                                              "&:hover": {
                                                background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                                              },
                                              "&:disabled": {
                                                background: "linear-gradient(135deg, #9ca3af, #6b7280)",
                                              },
                                            }}
                                          >
                                            Reject
                                          </Button>
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  </Grow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Paper>
                    </Fade>
                  )}
                </Box>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            borderRadius: 3,
            fontWeight: 500,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default RequestApproval
