"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Chip,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Fade,
  Grow,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Snackbar,
} from "@mui/material"
import {
  CheckCircle,
  ArrowBack,
  Person,
  Group,
  Event,
  AccountBalanceWallet,
  Email,
  Verified,
  FilterList,
  Search,
  Refresh,
  MoreVert,
  Assessment,
  Campaign,
  Star,
  TrendingUp,
  Error as ErrorIcon,
  ViewList,
  GridView,
} from "@mui/icons-material"

export default function ApprovedCandidates() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState("table") // 'table' or 'cards'
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")
  const [stats, setStats] = useState({
    total: 0,
    byElection: {},
    byParty: {},
  })

  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    const fetchApprovedCandidates = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get("http://localhost:5000/api/candidate/approved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setCandidates(data.candidates)

        // Calculate statistics
        const statsData = {
          total: data.candidates.length,
          byElection: {},
          byParty: {},
        }

        data.candidates.forEach((candidate) => {
          const election = candidate.electionId?.title || "Unknown"
          const party = candidate.party || "Independent"

          statsData.byElection[election] = (statsData.byElection[election] || 0) + 1
          statsData.byParty[party] = (statsData.byParty[party] || 0) + 1
        })

        setStats(statsData)
      } catch (error) {
        console.error("Error fetching approved candidates:", error)
        setError("Failed to load approved candidates")
        showSnackbar("Error loading candidates", "error")
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchApprovedCandidates()
    }
  }, [token])

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

  const handleRefresh = () => {
    window.location.reload()
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
              <Box className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                <Verified className="text-white text-4xl" />
              </Box>
              <Typography variant="h5" className="text-gray-700 mb-2">
                Loading Approved Candidates...
              </Typography>
              <CircularProgress size={40} sx={{ color: "#10b981" }} />
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
                Error Loading Candidates
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-4">
                {error}
              </Typography>
              <Box className="flex justify-center space-x-3">
                <IconButton
                  onClick={handleRefresh}
                  sx={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg, #059669, #047857)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Refresh />
                </IconButton>
                <IconButton
                  onClick={handleBackToDashboard}
                  sx={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </Box>
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
            className="absolute w-2 h-2 bg-green-400/30 rounded-full animate-ping"
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
                      className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2"
                    >
                      Approved Candidates
                    </Typography>
                    <Typography variant="h6" className="text-gray-600">
                      View and manage all approved candidates
                    </Typography>
                  </Box>
                </Box>

                {/* Centered Action Buttons */}
                <Box className="flex items-center justify-center space-x-3 mb-8">
                  <Tooltip title="Refresh">
                    <IconButton
                      onClick={handleRefresh}
                      sx={{
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(16, 185, 129, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Refresh className="text-green-600" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Filter">
                    <IconButton
                      sx={{
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(16, 185, 129, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <FilterList className="text-green-600" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Search">
                    <IconButton
                      sx={{
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(16, 185, 129, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Search className="text-green-600" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
                    <IconButton
                      onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")}
                      sx={{
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(16, 185, 129, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {viewMode === "table" ? (
                        <GridView className="text-green-600" />
                      ) : (
                        <ViewList className="text-green-600" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Centered Statistics Cards */}
              <Box className="flex justify-center mb-8">
  <Box sx={{ maxWidth: 1200, width: "100%" }}>
    <Grid container spacing={2} justifyContent="center">
      {[
        {
          label: "Total Approved",
          value: stats.total,
          icon: <Verified />,
          gradient: "linear-gradient(135deg, #10b981, #059669)",
          bgIcon: <CheckCircle />,
          subtitle: "Active candidates",
        },
        {
          label: "Elections",
          value: Object.keys(stats.byElection).length,
          icon: <Event />,
          gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          bgIcon: <Campaign />,
          subtitle: "With candidates",
        },
        {
          label: "Parties",
          value: Object.keys(stats.byParty).length,
          icon: <Group />,
          gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
          bgIcon: <Star />,
          subtitle: "Represented",
        },
        {
          label: "Success Rate",
          value: "95%",
          icon: <TrendingUp />,
          gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
          bgIcon: <Assessment />,
          subtitle: "Approval rate",
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
                maxWidth: 280,
                minWidth: 280,
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
                  opacity: 0.1,
                }}
              />

              {/* Background Icon */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  opacity: 0.1,
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
                {/* Icon on Left */}
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

                {/* Content on Right */}
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
                  <Typography variant="caption" className="text-gray-500">
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
                  {candidates.length === 0 ? (
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
                            <Verified className="text-gray-400 text-4xl" />
                          </Box>
                          <Typography variant="h5" className="text-gray-600 mb-3">
                            No Approved Candidates
                          </Typography>
                          <Typography variant="body1" className="text-gray-500">
                            No candidates have been approved yet. Approved candidates will appear here.
                          </Typography>
                        </Paper>
                      </Box>
                    </Fade>
                  ) : viewMode === "table" ? (
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
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            p: 4,
                            position: "relative",
                            textAlign: "center",
                          }}
                        >
                          <Box className="flex items-center justify-center space-x-4">
                            <Box className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                              <Verified className="text-white" />
                            </Box>
                            <Box>
                              <Typography variant="h5" className="font-bold text-white mb-1">
                                Approved Candidates
                              </Typography>
                              <Typography variant="body2" className="text-green-100">
                                {candidates.length} candidate{candidates.length !== 1 ? "s" : ""} approved and ready
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
                                      backgroundColor: "rgba(16, 185, 129, 0.05)",
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
                                      <Person className="text-green-600" />
                                      <span>Candidate Name</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <Email className="text-blue-600" />
                                      <span>Email</span>
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
                                      <Event className="text-orange-600" />
                                      <span>Election</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <AccountBalanceWallet className="text-indigo-600" />
                                      <span>Wallet Address</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <CheckCircle className="text-green-600" />
                                      <span>Status</span>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {candidates.map((candidate, index) => (
                                  <Grow in timeout={600 + index * 200} key={candidate._id}>
                                    <TableRow>
                                      <TableCell>
                                        <Box className="flex items-center justify-center space-x-3">
                                          
                                          <Typography variant="body1" className="font-semibold text-gray-800">
                                            {candidate.userId?.name || "Unknown"}
                                          </Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body2" className="text-gray-600">
                                          {candidate.userId?.email || "N/A"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1" className="font-medium text-gray-700">
                                          {candidate.party || "Independent"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1" className="font-medium text-gray-700">
                                          {candidate.electionId?.title || "N/A"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="body2"
                                          className="font-mono text-gray-600"
                                          sx={{ fontSize: "0.8rem" }}
                                        >
                                          {candidate.walletAddress || "N/A"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Chip
                                          icon={<CheckCircle />}
                                          label="Approved"
                                          color="success"
                                          sx={{
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            background: "linear-gradient(135deg, #10b981, #059669)",
                                            color: "white",
                                          }}
                                        />
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
                  ) : (
                    <Fade in timeout={800}>
                      <Grid container spacing={4}>
                        {candidates.map((candidate, index) => (
                          <Grid item xs={12} sm={6} lg={4} key={candidate._id}>
                            <Grow in timeout={600 + index * 200}>
                              <Card
                                elevation={24}
                                sx={{
                                  borderRadius: 4,
                                  background: "rgba(255,255,255,0.95)",
                                  backdropFilter: "blur(20px)",
                                  border: "1px solid rgba(255,255,255,0.2)",
                                  overflow: "hidden",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    transform: "translateY(-8px) scale(1.02)",
                                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                                  },
                                }}
                              >
                                {/* Card Header */}
                                <Box
                                  sx={{
                                    background: "linear-gradient(135deg, #10b981, #059669)",
                                    p: 3,
                                    position: "relative",
                                  }}
                                >
                                  <Box className="flex items-center justify-between">
                                    <Box className="flex items-center space-x-3">
                                      <Avatar
                                        sx={{
                                          width: 48,
                                          height: 48,
                                          background: "rgba(255,255,255,0.2)",
                                          backdropFilter: "blur(10px)",
                                        }}
                                      >
                                        <Person className="text-white" />
                                      </Avatar>
                                      <Box>
                                        <Typography variant="h6" className="font-bold text-white">
                                          {candidate.userId?.name || "Unknown"}
                                        </Typography>
                                        <Typography variant="body2" className="text-green-100">
                                          Approved Candidate
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Chip
                                      icon={<CheckCircle />}
                                      label="Approved"
                                      sx={{
                                        backgroundColor: "rgba(255,255,255,0.2)",
                                        color: "white",
                                        fontWeight: 600,
                                      }}
                                    />
                                  </Box>

                                  {/* Decorative elements */}
                                  <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
                                </Box>

                                <CardContent sx={{ p: 4 }}>
                                  {/* Candidate Details */}
                                  <Box className="space-y-4">
                                    <Box className="flex items-center space-x-3">
                                      <Box className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Email className="text-blue-600" />
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" className="text-gray-500">
                                          Email Address
                                        </Typography>
                                        <Typography variant="body1" className="font-semibold text-gray-800">
                                          {candidate.userId?.email || "N/A"}
                                        </Typography>
                                      </Box>
                                    </Box>

                                    <Box className="flex items-center space-x-3">
                                      <Box className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Group className="text-purple-600" />
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" className="text-gray-500">
                                          Party/Organization
                                        </Typography>
                                        <Typography variant="body1" className="font-semibold text-gray-800">
                                          {candidate.party || "Independent"}
                                        </Typography>
                                      </Box>
                                    </Box>

                                    <Box className="flex items-center space-x-3">
                                      <Box className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Event className="text-orange-600" />
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" className="text-gray-500">
                                          Election
                                        </Typography>
                                        <Typography variant="body1" className="font-semibold text-gray-800">
                                          {candidate.electionId?.title || "N/A"}
                                        </Typography>
                                      </Box>
                                    </Box>

                                    <Box className="flex items-center space-x-3">
                                      <Box className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <AccountBalanceWallet className="text-indigo-600" />
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" className="text-gray-500">
                                          Wallet Address
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          className="font-mono text-gray-800 break-all"
                                          sx={{ fontSize: "0.875rem" }}
                                        >
                                          {candidate.walletAddress || "N/A"}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>

                                  {/* Action Button */}
                                  <Box className="mt-6 flex justify-center">
                                    <IconButton
                                      sx={{
                                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                                        "&:hover": {
                                          backgroundColor: "rgba(16, 185, 129, 0.2)",
                                          transform: "scale(1.1)",
                                        },
                                      }}
                                    >
                                      <MoreVert className="text-green-600" />
                                    </IconButton>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grow>
                          </Grid>
                        ))}
                      </Grid>
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
