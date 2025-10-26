"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Fade,
  Grow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Button,
} from "@mui/material"
import {
  ArrowBack,
  Refresh,
  Search,
  FilterList,
  ViewList,
  GridView,
  EmojiEvents as TrophyIcon,
  CalendarToday,
  AccessTime,
  HowToVote,
  Visibility,
  Error as ErrorIcon,
  CheckCircle,
  BarChart,
  Assessment,
  Timeline,
  Event,
  PersonOutline,
  Poll,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const AdminElectionResults = () => {
  const [completedElections, setCompletedElections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [viewMode, setViewMode] = useState("table") // 'table' or 'cards'
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")
  const [stats, setStats] = useState({
    totalCompleted: 0,
    totalVotes: 0,
    averageParticipation: 0,
    thisMonth: 0,
  })

  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()

  const fetchCompletedElections = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5000/api/election/completed", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = response.data?.completedElections || []
      console.log(data)
      // If no data from API, use mock data
      const elections =
        data.length > 0
          ? data
          : [
              {
                _id: "1",
                title: "University Senate Election 2023",
                description: "Annual university senate member selection",
                endTime: "2023-12-15T18:00:00Z",
                totalVotes: 2847,
                totalEligibleVoters: 3200,
                winner: {
                  name: "Dr. Sarah Johnson",
                  votes: 1205,
                  percentage: 42.3,
                },
                candidates: [
                  { name: "Dr. Sarah Johnson", votes: 1205, percentage: 42.3 },
                  { name: "Prof. Michael Chen", votes: 892, percentage: 31.3 },
                  { name: "Dr. Emily Rodriguez", votes: 750, percentage: 26.4 },
                ],
                category: "University Governance",
                participationRate: 89.0,
              },
              {
                _id: "2",
                title: "Student Union President 2023",
                description: "Election for student union president position",
                endTime: "2023-11-25T20:00:00Z",
                totalVotes: 1956,
                totalEligibleVoters: 2500,
                winner: {
                  name: "Alex Thompson",
                  votes: 892,
                  percentage: 45.6,
                },
                candidates: [
                  { name: "Alex Thompson", votes: 892, percentage: 45.6 },
                  { name: "Maria Garcia", votes: 654, percentage: 33.4 },
                  { name: "James Wilson", votes: 410, percentage: 21.0 },
                ],
                category: "Student Union",
                participationRate: 78.2,
              },
              {
                _id: "3",
                title: "Faculty Representative Election",
                description: "Selection of faculty representatives for academic board",
                endTime: "2023-10-10T17:00:00Z",
                totalVotes: 456,
                totalEligibleVoters: 520,
                winner: {
                  name: "Prof. Michael Chen",
                  votes: 178,
                  percentage: 39.0,
                },
                candidates: [
                  { name: "Prof. Michael Chen", votes: 178, percentage: 39.0 },
                  { name: "Dr. Lisa Park", votes: 156, percentage: 34.2 },
                  { name: "Prof. David Brown", votes: 122, percentage: 26.8 },
                ],
                category: "Faculty",
                participationRate: 87.7,
              },
              {
                _id: "4",
                title: "Department Head Selection - CS",
                description: "Computer Science department head selection",
                endTime: "2023-09-20T16:00:00Z",
                totalVotes: 234,
                totalEligibleVoters: 280,
                winner: {
                  name: "Dr. Jennifer Lee",
                  votes: 98,
                  percentage: 41.9,
                },
                candidates: [
                  { name: "Dr. Jennifer Lee", votes: 98, percentage: 41.9 },
                  { name: "Prof. Robert Kim", votes: 87, percentage: 37.2 },
                  { name: "Dr. Amanda White", votes: 49, percentage: 20.9 },
                ],
                category: "Department",
                participationRate: 83.6,
              },
            ]

      setCompletedElections(elections)

      // Calculate statistics
      const totalVotes = elections.reduce((sum, election) => sum + election.totalVotes, 0)
      const avgParticipation =
        elections.reduce((sum, election) => sum + election.participationRate, 0) / elections.length
      const thisMonth = elections.filter((election) => {
        const endDate = new Date(election.endTime)
        const now = new Date()
        return endDate.getMonth() === now.getMonth() && endDate.getFullYear() === now.getFullYear()
      }).length

      setStats({
        totalCompleted: elections.length,
        totalVotes: totalVotes,
        averageParticipation: avgParticipation.toFixed(1),
        thisMonth: thisMonth,
      })

      setLoading(false)
    } catch (err) {
      setError("Failed to fetch completed elections.")
      console.error(err)
      setLoading(false)
      showSnackbar("Error loading election results", "error")
    }
  }

  useEffect(() => {
    fetchCompletedElections()
  }, [])

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
    fetchCompletedElections()
  }

  const handleViewDetails = (electionId) => {
    navigate(`/result/${electionId}`)
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
              <Box className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                <TrophyIcon className="text-white text-4xl" />
              </Box>
              <Typography variant="h5" className="text-gray-700 mb-2">
                Loading Election Results...
              </Typography>
              <CircularProgress size={40} sx={{ color: "#8b5cf6" }} />
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
                Error Loading Results
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-4">
                {error}
              </Typography>
              <Box className="flex justify-center space-x-3">
                <IconButton
                  onClick={handleRefresh}
                  sx={{
                    background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
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
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <Box className="relative z-10 min-h-screen flex flex-col">
        <Container maxWidth="xl" sx={{ flex: 1, display: "flex", flexDirection: "column", py: 4 }}>
          <Fade in timeout={1000}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Header Section */}
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
                      className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2"
                    >
                      Election Results
                    </Typography>
                    <Typography variant="h6" className="text-gray-600">
                      View completed election results and analytics
                    </Typography>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box className="flex items-center justify-center space-x-3 mb-8">
                  <Tooltip title="Refresh">
                    <IconButton
                      onClick={handleRefresh}
                      sx={{
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(139, 92, 246, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Refresh className="text-purple-600" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Filter">
                    <IconButton
                      sx={{
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(139, 92, 246, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <FilterList className="text-purple-600" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Search">
                    <IconButton
                      sx={{
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(139, 92, 246, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Search className="text-purple-600" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
                    <IconButton
                      onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")}
                      sx={{
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(139, 92, 246, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {viewMode === "table" ? (
                        <GridView className="text-purple-600" />
                      ) : (
                        <ViewList className="text-purple-600" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Statistics Cards */}
              <Box className="flex justify-center mb-8">
                <Box sx={{ maxWidth: 1200, width: "100%" }}>
                  <Grid container spacing={3} justifyContent="center">
                    {[
                      {
                        label: "Completed Elections",
                        value: stats.totalCompleted,
                        icon: <CheckCircle />,
                        gradient: "linear-gradient(135deg, #10b981, #059669)",
                        bgIcon: <TrophyIcon />,
                        subtitle: "Successfully concluded",
                      },
                      {
                        label: "Total Votes Cast",
                        value: stats.totalVotes.toLocaleString(),
                        icon: <HowToVote />,
                        gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
                        bgIcon: <Poll />,
                        subtitle: "Across all elections",
                      },
                      {
                        label: "Avg Participation",
                        value: `${stats.averageParticipation}%`,
                        icon: <BarChart />,
                        gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                        bgIcon: <Assessment />,
                        subtitle: "Voter turnout rate",
                      },
                      {
                        label: "This Month",
                        value: stats.thisMonth,
                        icon: <CalendarToday />,
                        gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
                        bgIcon: <Timeline />,
                        subtitle: "Recent completions",
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

                            {/* Content */}
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

                              <Box>
                                <Typography variant="h5" className="font-bold text-gray-800 leading-snug">
                                  {stat.value}
                                </Typography>
                                <Typography variant="subtitle1" className="font-medium text-gray-700">
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

              {/* Content Area */}
              <Box className="flex justify-center flex-1">
                <Box sx={{ maxWidth: 1400, width: "100%" }}>
                  {completedElections.length === 0 ? (
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
                            <TrophyIcon className="text-gray-400 text-4xl" />
                          </Box>
                          <Typography variant="h5" className="text-gray-600 mb-3">
                            No Completed Elections
                          </Typography>
                          <Typography variant="body1" className="text-gray-500">
                            No elections have been completed yet. Results will appear here once elections are finished.
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
                              <TrophyIcon className="text-white" />
                            </Box>
                            <Box>
                              <Typography variant="h5" className="font-bold text-white mb-1">
                                Election Results
                              </Typography>
                              <Typography variant="body2" className="text-green-100">
                                {completedElections.length} completed election
                                {completedElections.length !== 1 ? "s" : ""}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Decorative elements */}
                          <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
                          <Box className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></Box>
                        </Box>

                        {/* Table */}
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
                                      <Event className="text-purple-600" />
                                      <span>Election Name</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <AccessTime className="text-orange-600" />
                                      <span>End Time</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <TrophyIcon className="text-yellow-600" />
                                      <span>Winner</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <HowToVote className="text-blue-600" />
                                      <span>Total Votes</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <BarChart className="text-green-600" />
                                      <span>Participation</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {completedElections.map((election, index) => (
                                  <Grow in timeout={600 + index * 200} key={election._id}>
                                    <TableRow>
                                      <TableCell>
                                        <Box className="flex items-center justify-center space-x-3">
                                          <Avatar
                                            sx={{
                                              width: 40,
                                              height: 40,
                                              background: "linear-gradient(135deg, #10b981, #059669)",
                                            }}
                                          >
                                            <TrophyIcon />
                                          </Avatar>
                                          <Box className="text-left">
                                            <Typography variant="body1" className="font-semibold text-gray-800">
                                              {election.title}
                                            </Typography>
                                            <Typography variant="caption" className="text-gray-500">
                                              {election.category}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body2" className="text-gray-700">
                                          {new Date(election.endTime).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="caption" className="text-gray-500">
                                          {new Date(election.endTime).toLocaleTimeString()}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Box className="flex items-center justify-center space-x-2">
                                          <Avatar
                                            sx={{
                                              width: 32,
                                              height: 32,
                                              background: "linear-gradient(135deg, #f59e0b, #d97706)",
                                              fontSize: "0.8rem",
                                            }}
                                          >
                                            <PersonOutline />
                                          </Avatar>
                                          <Box className="text-left">
                                            <Typography variant="body2" className="font-semibold text-gray-800">
                                              {election.winner.name}
                                            </Typography>
                                            <Typography variant="caption" className="text-gray-500">
                                              {election.winner.percentage}% ({election.winner.votes} votes)
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1" className="font-semibold text-gray-800">
                                          {election.totalVotes.toLocaleString()}
                                        </Typography>
                                        <Typography variant="caption" className="text-gray-500">
                                          of {election.totalEligibleVoters?.toLocaleString() || "N/A"} eligible
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Chip
                                          label={`${election.participationRate}%`}
                                          color={
                                            election.participationRate > 80
                                              ? "success"
                                              : election.participationRate > 60
                                                ? "warning"
                                                : "error"
                                          }
                                          sx={{ fontWeight: 600 }}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Tooltip title="View Details">
                                          <IconButton
                                            onClick={() => handleViewDetails(election.id)}
                                            sx={{
                                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                                              "&:hover": {
                                                backgroundColor: "rgba(59, 130, 246, 0.2)",
                                                transform: "scale(1.1)",
                                              },
                                            }}
                                          >
                                            <Visibility className="text-blue-600" />
                                          </IconButton>
                                        </Tooltip>
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
                        {completedElections.map((election, index) => (
                          <Grid item xs={12} sm={6} lg={4} key={election._id}>
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
                                        <TrophyIcon className="text-white" />
                                      </Avatar>
                                      <Box>
                                        <Typography variant="h6" className="font-bold text-white">
                                          {election.title}
                                        </Typography>
                                        <Typography variant="body2" className="text-green-100">
                                          {election.category}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Chip
                                      icon={<CheckCircle />}
                                      label="Completed"
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
                                  {/* Election Details */}
                                  <Box className="space-y-4">
                                    <Box className="flex items-center space-x-3">
                                      <Box className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <AccessTime className="text-orange-600" />
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" className="text-gray-500">
                                          Ended
                                        </Typography>
                                        <Typography variant="body1" className="font-semibold text-gray-800">
                                          {new Date(election.endTime).toLocaleDateString()}
                                        </Typography>
                                      </Box>
                                    </Box>

                                    <Box className="flex items-center space-x-3">
                                      <Box className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <TrophyIcon className="text-yellow-600" />
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" className="text-gray-500">
                                          Winner
                                        </Typography>
                                        <Typography variant="body1" className="font-semibold text-gray-800">
                                          {election.winner.name}
                                        </Typography>
                                        <Typography variant="caption" className="text-gray-500">
                                          {election.winner.percentage}% ({election.winner.votes} votes)
                                        </Typography>
                                      </Box>
                                    </Box>

                                    <Box className="flex items-center space-x-3">
                                      <Box className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <HowToVote className="text-blue-600" />
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" className="text-gray-500">
                                          Total Votes
                                        </Typography>
                                        <Typography variant="body1" className="font-semibold text-gray-800">
                                          {election.totalVotes.toLocaleString()}
                                        </Typography>
                                        <Typography variant="caption" className="text-gray-500">
                                          {election.participationRate}% participation
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>

                                  {/* Action Button */}
                                  <Box className="mt-6 text-center">
                                    <Button
                                      onClick={() => handleViewDetails(election._id)}
                                      variant="contained"
                                      startIcon={<Visibility />}
                                      sx={{
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 3,
                                        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": {
                                          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                                          transform: "translateY(-2px)",
                                          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                                        },
                                      }}
                                    >
                                      View Details
                                    </Button>
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

export default AdminElectionResults
