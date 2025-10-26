"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Container,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Fade,
  Grow,
  Paper,
  LinearProgress,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Badge,
} from "@mui/material"
import {
  Search,
  HowToVote,
  Schedule,
  CheckCircle,
  Timer,
  People,
  Visibility,
  CalendarToday,
  TrendingUp,
  Assessment,
  Warning,
  Info,

} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const Elections = () => {
  const [elections, setElections] = useState([])
  const [filteredElections, setFilteredElections] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState(0)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const navigate = useNavigate()

  // Mock data for demonstration - replace with actual API call
  // const mockElections = [
  //   {
  //     _id: "1",
  //     title: "Student Council Election 2024",
  //     description:
  //       "Annual student council election for academic year 2024-2025. Choose your representatives who will advocate for student interests and organize campus activities.",
  //     startTime: "2024-01-15T09:00:00Z",
  //     endTime: "2024-01-25T17:00:00Z",
  //     status: "active",
  //     totalVotes: 1247,
  //     totalVoters: 2500,
  //     candidates: 8,
  //     category: "Student Government",
  //     priority: "high",
  //   },
  //   {
  //     _id: "2",
  //     title: "Department Head Selection",
  //     description:
  //       "Selection of new Computer Science department head for the next academic term. Faculty and staff voting.",
  //     startTime: "2024-02-01T08:00:00Z",
  //     endTime: "2024-02-10T18:00:00Z",
  //     status: "upcoming",
  //     totalVotes: 0,
  //     totalVoters: 150,
  //     candidates: 3,
  //     category: "Faculty",
  //     priority: "medium",
  //   },
  //   {
  //     _id: "3",
  //     title: "Budget Allocation Referendum",
  //     description:
  //       "Community vote on the proposed budget allocation for infrastructure improvements and public services.",
  //     startTime: "2024-01-20T06:00:00Z",
  //     endTime: "2024-01-30T20:00:00Z",
  //     status: "active",
  //     totalVotes: 3420,
  //     totalVoters: 8500,
  //     candidates: 0,
  //     category: "Community",
  //     priority: "high",
  //   },
  //   {
  //     _id: "4",
  //     title: "Club Leadership Elections",
  //     description:
  //       "Annual elections for various student clubs and organizations. Multiple positions available across different clubs.",
  //     startTime: "2024-02-15T10:00:00Z",
  //     endTime: "2024-02-22T16:00:00Z",
  //     status: "upcoming",
  //     totalVotes: 0,
  //     totalVoters: 1200,
  //     candidates: 24,
  //     category: "Organizations",
  //     priority: "low",
  //   },
  // ]

  useEffect(() => {
    fetchElections()
  }, [])

  useEffect(() => {
    filterElections()
  }, [elections, searchTerm, activeTab])


  const categories = [
  { value: "general", label: "General Election" },
  { value: "local", label: "Local Election" },
  { value: "student", label: "Student Election" },
  { value: "corporate", label: "Corporate Election" },
  { value: "community", label: "Community Election" },
];
  const getCategoryLabel = (value) => {
  const category = categories.find((cat) => cat.value === value);
  return category ? category.label : value;
};

  const fetchElections = async () => {
    try {
    //   setLoading(true)
     // Replace with actual API call
     const TOTAL_VOTERS = 2500;
      const res = await axios.get("http://localhost:5000/api/election/available")
      console.log(res.data)
      
      const transformed = res.data.map((election) => {
          const totalVotes = election.candidates.reduce(
            (sum, candidate) => sum + candidate.votes,
            0
          );
          

          return {
            _id: election._id,
            title: election.title,
            description:
                          election.description.length > 40
                            ? election.description.slice(0, 40) + "..."
                            : election.description,
            startTime: election.startTime,
            endTime: election.endTime,
            status: election.status==="ongoing" ? "active" : election.status,
            totalVotes,
            totalVoters: TOTAL_VOTERS,
            candidates: election.candidates.length,
            category: getCategoryLabel(election.category), // Static or dynamic
            priority:
              totalVotes > 1000
                ? "high"
                : totalVotes > 500
                ? "normal"
                : "low",
          };
        });

        setElections(transformed);

      //Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } catch (err) {
      console.log(err)
      setSnackbar({
        open: true,
        message: "Failed to load elections",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  

  const filterElections = () => {
    let filtered = elections

    // Filter by status based on active tab
    if (activeTab === 1) {
      filtered = filtered.filter((election) => election.status === "active")
    } else if (activeTab === 2) {
      filtered = filtered.filter((election) => election.status === "upcoming")
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (election) =>
          election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          election.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          election.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredElections(filtered)
  }

  const handleJoinElection = (electionId) => {
    navigate(`/voting/vote/${electionId}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success"
      case "upcoming":
        return "primary"
      case "completed":
        return "default"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <HowToVote />
      case "upcoming":
        return <Schedule />
      case "completed":
        return <CheckCircle />
      default:
        return <Schedule />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ef4444"
      case "medium":
        return "#f59e0b"
      case "low":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const getTimeRemaining = (endTime) => {
    const now = new Date()
    const end = new Date(endTime)
    const diff = end - now

    if (diff <= 0) return "Ended"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days}d ${hours}h remaining`
    return `${hours}h remaining`
  }

  const getVotingProgress = (totalVotes, totalVoters) => {
    return totalVoters > 0 ? (totalVotes / totalVoters) * 100 : 0
  }

  const stats = [
    {
      label: "Total Elections",
      value: elections.length,
      icon: <Assessment />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      label: "Active Now",
      value: elections.filter((e) => e.status === "active").length,
      icon: <HowToVote />,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      label: "Upcoming",
      value: elections.filter((e) => e.status === "upcoming").length,
      icon: <Schedule />,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      label: "Total Votes",
      value: elections.reduce((sum, e) => sum + e.totalVotes, 0).toLocaleString(),
      icon: <TrendingUp />,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ]

  if (loading) {
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
              <HowToVote className="text-white text-4xl" />
            </Box>
            <Typography variant="h5" className="text-gray-700 mb-2">
              Loading Elections...
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

      <Container maxWidth="xl" className="relative z-10 py-8">
        <Fade in timeout={1000}>
          <div>
            {/* Header Section */}
            <Box className="text-center mb-8">
              <Box className="flex justify-center mb-6">
                <Box className="relative">
                  <Box className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <HowToVote className="text-white text-4xl" />
                  </Box>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                </Box>
              </Box>
              <Typography
                variant="h3"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
              >
                Elections Dashboard
              </Typography>
              <Box className="flex justify-center">
                <Typography variant="h6" className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
                Participate in democratic processes and make your voice heard. View all available elections and cast
                your vote.
              </Typography>
              </Box>

             
            </Box>

           

            {/* Search and Filter Section */}
            <Grow in timeout={800}>
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  p: 4,
                  mb: 4,
                }}
              >
                <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                  
                  <Grid item xs={12} md={6}>
                    <Tabs
                      value={activeTab}
                      onChange={(e, newValue) => setActiveTab(newValue)}
                      variant="fullWidth"
                      TabIndicatorProps={{
                        style: {
                          height: 3,
                          borderRadius: 2,
                          background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                        },
                      }}
                    >
                      <Tab
                        label={
                          <Badge badgeContent={elections.length} color="primary">
                            All Elections
                          </Badge>
                        }
                        sx={{ fontWeight: 600, textTransform: "none" }}
                      />
                      <Tab
                        label={
                          <Badge badgeContent={elections.filter((e) => e.status === "active").length} color="success">
                            Active
                          </Badge>
                        }
                        sx={{ fontWeight: 600, textTransform: "none" }}
                      />
                      <Tab
                        label={
                          <Badge badgeContent={elections.filter((e) => e.status === "upcoming").length} color="info">
                            Upcoming
                          </Badge>
                        }
                        sx={{ fontWeight: 600, textTransform: "none" }}
                      />
                    </Tabs>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      placeholder="Search elections..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search sx={{ color: "#6b7280" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          background: "rgba(255,255,255,0.8)",
                          "&:hover fieldset": {
                            borderColor: "#3b82f6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3b82f6",
                          },
                        },
                      }}
                    />
                  </Grid>
                  
                </Grid>
              </Paper>
            </Grow>

            {/* Elections Grid */}
            {filteredElections.length === 0 ? (
              <Fade in timeout={1000}>
                <Paper
                  elevation={24}
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    p: 8,
                
                    textAlign: "center",
                    
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 4,
                      background: "linear-gradient(135deg, #f59e0b, #d97706)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
                    }}
                  >
                    <Info sx={{ color: "white", fontSize: 40 }} />
                  </Box>
                  <Typography variant="h5" className="font-bold text-gray-800 mb-2">
                    No Elections Found
                  </Typography>
                  <Typography variant="body1" className="text-gray-600">
                    {searchTerm
                      ? `No elections match your search "${searchTerm}"`
                      : "There are currently no elections available in this category."}
                  </Typography>
                </Paper>
              </Fade>
            ) : (
              <Grid container spacing={4}>
                {filteredElections.map((election, index) => (
                  <Grid item xs={12} md={6} lg={4} key={election._id}>
                    <Grow in timeout={1000 + index * 200}>
                      <Card
                        sx={{
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.95)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          height: "100%",
                          width:370,
                          ml:3,
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
                            background: `linear-gradient(135deg, ${getPriorityColor(election.priority)}20, ${getPriorityColor(election.priority)}10)`,
                            p: 3,
                            borderBottom: "1px solid rgba(255,255,255,0.2)",
                          }}
                        >
                          <Box className="flex items-start justify-between mb-3">
                            <Box className="flex-1">
                              <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                                {election.title}
                              </Typography>
                              <Box className="flex flex-wrap gap-2">
                                <Chip
                                  icon={getStatusIcon(election.status)}
                                  label={election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                                  color={getStatusColor(election.status)}
                                  sx={{ fontWeight: 600 }}
                                />
                                <Chip
                                  label={election.category}
                                  sx={{
                                    background: `${getPriorityColor(election.priority)}20`,
                                    color: getPriorityColor(election.priority),
                                    fontWeight: 600,
                                  }}
                                />
                              </Box>
                            </Box>
                            <Avatar
                              sx={{
                                width: 48,
                                height: 48,
                                background: `linear-gradient(135deg, ${getPriorityColor(election.priority)}, ${getPriorityColor(election.priority)}80)`,
                                ml: 2,
                              }}
                            >
                              <HowToVote />
                            </Avatar>
                          </Box>
                        </Box>

                        <CardContent sx={{ p: 3, height: "100%", }}>
                          <Typography variant="body2" className="text-gray-600 mb-4 leading-relaxed">
                            {election.description}
                          </Typography>

                          {/* Election Details */}
                          <Box className="space-y-3 mb-4">
                            <Box className="flex items-center gap-2">
                              <CalendarToday sx={{ color: "#6b7280", fontSize: 18 }} />
                              <Typography variant="body2" className="text-gray-600">
                                <strong>Start:</strong> {new Date(election.startTime).toLocaleDateString()} at{" "}
                                {new Date(election.startTime).toLocaleTimeString()}
                              </Typography>
                            </Box>
                            <Box className="flex items-center gap-2">
                              <Timer sx={{ color: "#6b7280", fontSize: 18 }} />
                              <Typography variant="body2" className="text-gray-600">
                                <strong>End:</strong> {new Date(election.endTime).toLocaleDateString()} at{" "}
                                {new Date(election.endTime).toLocaleTimeString()}
                              </Typography>
                            </Box>
                            {/* {election.status === "active" && (
                              <Box className="flex items-center gap-2">
                                <Warning sx={{ color: "#f59e0b", fontSize: 18 }} />
                                <Typography variant="body2" className="text-amber-600 font-semibold">
                                  {getTimeRemaining(election.endTime)}
                                </Typography>
                              </Box>
                            )} */}
                          </Box>

                          {/* Statistics */}
                          <Box className="space-y-3 mb-4">
                            <Box className="flex items-center justify-between">
                              <Box className="flex items-center gap-2">
                                <People sx={{ color: "#6b7280", fontSize: 18 }} />
                                <Typography variant="body2" className="text-gray-600">
                                  {election.candidates > 0 ? `${election.candidates} candidates` : "Referendum"}
                                </Typography>
                              </Box>
                              <Typography variant="body2" className="font-semibold text-gray-800">
                                {election.totalVotes.toLocaleString()} votes
                              </Typography>
                            </Box>

                            {/* {election.status === "active" && (
                              <Box>
                                <Box className="flex justify-between items-center mb-2">
                                  <Typography variant="body2" className="text-gray-600">
                                    Participation
                                  </Typography>
                                  <Typography variant="body2" className="font-semibold text-gray-800">
                                    {getVotingProgress(election.totalVotes, election.totalVoters).toFixed(1)}%
                                  </Typography>
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={getVotingProgress(election.totalVotes, election.totalVoters)}
                                  sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                    "& .MuiLinearProgress-bar": {
                                      borderRadius: 4,
                                      background: `linear-gradient(45deg, ${getPriorityColor(election.priority)}, ${getPriorityColor(election.priority)}80)`,
                                    },
                                  }}
                                />
                              </Box>
                            )} */}
                          </Box>

                          {/* Action Button */}
                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={election.status === "active" ? <HowToVote /> : <Visibility />}
                            onClick={() => handleJoinElection(election._id)}
                            sx={{
                              mt: "auto",
                              py: 2,
                              borderRadius: 3,
                              fontWeight: 700,
                              textTransform: "none",
                              background:
                                election.status === "active"
                                  ? "linear-gradient(135deg, #10b981, #059669)"
                                  : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                              boxShadow:
                                election.status === "active"
                                  ? "0 8px 32px rgba(16, 185, 129, 0.3)"
                                  : "0 8px 32px rgba(59, 130, 246, 0.3)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                background:
                                  election.status === "active"
                                    ? "linear-gradient(135deg, #059669, #047857)"
                                    : "linear-gradient(135deg, #2563eb, #7c3aed)",
                                transform: "translateY(-2px) scale(1.02)",
                                boxShadow:
                                  election.status === "active"
                                    ? "0 12px 40px rgba(16, 185, 129, 0.4)"
                                    : "0 12px 40px rgba(59, 130, 246, 0.4)",
                              },
                            }}
                          >
                            {election.status === "active" ? "Vote Now" : "View Details"}
                          </Button>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            )}
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

export default Elections
