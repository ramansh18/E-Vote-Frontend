import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
} from "@mui/material";
import {
  Event,
  ArrowBack,
  FilterList,
  Search,
  Refresh,
  Add,
  PlayArrow,
  Stop,
  Delete,
  Visibility,
  Schedule,
  CheckCircle,
  Error as ErrorIcon,
  ViewList,
  GridView,
  AccessTime,
  CalendarToday,
  HowToVote,
  Timeline,
  HourglassTop,
  HowToReg,
  TaskAlt,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ElectionListPage = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    ongoing: 0,
    completed: 0,
  });

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const fetchElections = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/election");
      setElections(response.data);
      console.log("election",response.data)
      // Calculate statistics
      const statsData = {
        total: response.data.length,
        upcoming: response.data.filter((e) => e.status === "upcoming").length,
        ongoing: response.data.filter((e) => e.status === "active").length,
        completed: response.data.filter((e) => e.status === "completed").length,
      };
      setStats(statsData);

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch elections.");
      console.error(err);
      setLoading(false);
      showSnackbar("Error loading elections", "error");
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  const handleRefresh = () => {
    fetchElections();
  };

  const handleCreateElection = () => {
    navigate("/admin/create-election");
  };

  const handleViewElection = (id) => {
    navigate(`/election/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/election/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchElections();
      showSnackbar("Election deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting election:", error);
      showSnackbar("Failed to delete the election!", "error");
    }
  };

  const handleStart = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/election/${id}/start`,
        {}, // Empty body since no duration needed
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchElections();
      showSnackbar("Election started successfully!", "success");
    } catch (error) {
      console.error("Error starting election:", error);
      showSnackbar("Failed to start the election!", "error");
    }
  };

  const handleEnd = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/election/${id}/end`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchElections();
      showSnackbar("Election ended successfully!", "success");
    } catch (error) {
      console.error("Error ending election:", error);
      showSnackbar("Failed to end the election!", "error");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "warning";
      case "ongoing":
        return "success";
      case "completed":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <Schedule />;
      case "ongoing":
        return <PlayArrow />;
      case "completed":
        return <CheckCircle />;
      default:
        return <Event />;
    }
  };

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
                <Event className="text-white text-4xl" />
              </Box>
              <Typography variant="h5" className="text-gray-700 mb-2">
                Loading Elections...
              </Typography>
              <CircularProgress size={40} sx={{ color: "#8b5cf6" }} />
            </Box>
          </Container>
        </Box>
      </Box>
    );
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
                Error Loading Elections
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
    );
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

      {/* Centered Main Content */}
      <Box className="relative z-10 min-h-screen flex flex-col">
        <Container
          maxWidth="xl"
          sx={{ flex: 1, display: "flex", flexDirection: "column", py: 4 }}
        >
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
                      className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2"
                    >
                      Election Management
                    </Typography>
                    <Typography variant="h6" className="text-gray-600">
                      View and manage all elections
                    </Typography>
                  </Box>
                </Box>

                {/* Centered Action Buttons */}
                <Box className="flex items-center justify-center space-x-3 mb-8">
                  <Button
                    onClick={handleCreateElection}
                    startIcon={<Add />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                      color: "white",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(139, 92, 246, 0.3)",
                      },
                    }}
                  >
                    Create New Election
                  </Button>
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
                  <Tooltip
                    title={viewMode === "table" ? "Card View" : "Table View"}
                  >
                    <IconButton
                      onClick={() =>
                        setViewMode(viewMode === "table" ? "cards" : "table")
                      }
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

              {/* Centered Statistics Cards */}
              <Box className="flex justify-center mb-8">
                <Box sx={{ maxWidth: 1200, width: "100%" }}>
                  <Grid container spacing={2} justifyContent="center">
                    {[
                      {
                        label: "Total Elections",
                        value: stats.total,
                        icon: <Event />,
                        gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                        bgIcon: <HowToVote />,
                        subtitle: "All created elections",
                      },
                      {
                        label: "Upcoming",
                        value: stats.upcoming,
                        icon: <Schedule />,
                        gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
                        bgIcon: <HourglassTop />,
                        subtitle: "Yet to start",
                      },
                      {
                        label: "Ongoing",
                        value: stats.ongoing,
                        icon: <PlayArrow />,
                        gradient: "linear-gradient(135deg, #10b981, #059669)",
                        bgIcon: <HowToReg />,
                        subtitle: "In progress",
                      },
                      {
                        label: "Completed",
                        value: stats.completed,
                        icon: <CheckCircle />,
                        gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
                        bgIcon: <TaskAlt />,
                        subtitle: "Successfully ended",
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
                                <Typography
                                  variant="caption"
                                  className="text-gray-500"
                                >
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
                  {elections.length === 0 ? (
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
                            <Event className="text-gray-400 text-4xl" />
                          </Box>
                          <Typography
                            variant="h5"
                            className="text-gray-600 mb-3"
                          >
                            No Elections Found
                          </Typography>
                          <Typography
                            variant="body1"
                            className="text-gray-500 mb-6"
                          >
                            No elections have been created yet. Create your
                            first election to get started.
                          </Typography>
                          <Button
                            onClick={handleCreateElection}
                            startIcon={<Add />}
                            sx={{
                              px: 4,
                              py: 1.5,
                              borderRadius: 3,
                              background:
                                "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                              color: "white",
                              fontWeight: 600,
                              textTransform: "none",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #7c3aed, #6d28d9)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 25px rgba(139, 92, 246, 0.3)",
                              },
                            }}
                          >
                            Create First Election
                          </Button>
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
                            background:
                              "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                            p: 4,
                            position: "relative",
                            textAlign: "center",
                          }}
                        >
                          <Box className="flex items-center justify-center space-x-4">
                            <Box className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                              <Event className="text-white" />
                            </Box>
                            <Box>
                              <Typography
                                variant="h5"
                                className="font-bold text-white mb-1"
                              >
                                All Elections
                              </Typography>
                              <Typography
                                variant="body2"
                                className="text-purple-100"
                              >
                                {elections.length} election
                                {elections.length !== 1 ? "s" : ""} in the
                                system
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
                                    background:
                                      "linear-gradient(135deg, #f8fafc, #e2e8f0)",
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
                                      backgroundColor:
                                        "rgba(139, 92, 246, 0.05)",
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
                                      <span>Election Title</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <Timeline className="text-blue-600" />
                                      <span>Status</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <CalendarToday className="text-green-600" />
                                      <span>Start Time</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box className="flex items-center justify-center space-x-2">
                                      <AccessTime className="text-orange-600" />
                                      <span>End Time</span>
                                    </Box>
                                  </TableCell>
                                  <TableCell>Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {elections.map((election, index) => (
                                  <Grow
                                    in
                                    timeout={600 + index * 200}
                                    key={election.id}
                                  >
                                    <TableRow>
                                      <TableCell>
                                        <Box className="flex items-center justify-center space-x-3">
                                          <Avatar
                                            sx={{
                                              width: 40,
                                              height: 40,
                                              background:
                                                "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                                            }}
                                          >
                                            <Event />
                                          </Avatar>
                                          <Typography
                                            variant="body1"
                                            className="font-semibold text-gray-800"
                                          >
                                            {election.title}
                                          </Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <Chip
                                          icon={getStatusIcon(election.status)}
                                          label={
                                            election.status
                                              .charAt(0)
                                              .toUpperCase() +
                                            election.status.slice(1)
                                          }
                                          color={getStatusColor(
                                            election.status
                                          )}
                                          sx={{
                                            fontWeight: 600,
                                            borderRadius: 2,
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="body2"
                                          className="text-gray-700"
                                        >
                                          {new Date(
                                            election.startDate
                                          ).toLocaleString()}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="body2"
                                          className="text-gray-700"
                                        >
                                          {new Date(
                                            election.endDate
                                          ).toLocaleString()}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Box className="flex items-center justify-center space-x-2">
                                          <Tooltip title="View Election">
                                            <IconButton
                                              onClick={() =>
                                                handleViewElection(election.id)
                                              }
                                              sx={{
                                                backgroundColor:
                                                  "rgba(59, 130, 246, 0.1)",
                                                "&:hover": {
                                                  backgroundColor:
                                                    "rgba(59, 130, 246, 0.2)",
                                                  transform: "scale(1.1)",
                                                },
                                              }}
                                            >
                                              <Visibility className="text-blue-600" />
                                            </IconButton>
                                          </Tooltip>

                                          {election.status === "upcoming" && (
                                            <Tooltip title="Start Election">
                                              <IconButton
                                                onClick={() =>
                                                  handleStart(election.id)
                                                }
                                                sx={{
                                                  backgroundColor:
                                                    "rgba(16, 185, 129, 0.1)",
                                                  "&:hover": {
                                                    backgroundColor:
                                                      "rgba(16, 185, 129, 0.2)",
                                                    transform: "scale(1.1)",
                                                  },
                                                }}
                                              >
                                                <PlayArrow className="text-green-600" />
                                              </IconButton>
                                            </Tooltip>
                                          )}

                                          {election.status === "active" && (
                                            <Tooltip title="End Election">
                                              <IconButton
                                                onClick={() =>
                                                  handleEnd(election.id)
                                                }
                                                sx={{
                                                  backgroundColor:
                                                    "rgba(245, 158, 11, 0.1)",
                                                  "&:hover": {
                                                    backgroundColor:
                                                      "rgba(245, 158, 11, 0.2)",
                                                    transform: "scale(1.1)",
                                                  },
                                                }}
                                              >
                                                <Stop className="text-orange-600" />
                                              </IconButton>
                                            </Tooltip>
                                          )}

                                          <Tooltip title="Delete Election">
                                            <IconButton
                                              onClick={() =>
                                                handleDelete(election.id)
                                              }
                                              sx={{
                                                backgroundColor:
                                                  "rgba(239, 68, 68, 0.1)",
                                                "&:hover": {
                                                  backgroundColor:
                                                    "rgba(239, 68, 68, 0.2)",
                                                  transform: "scale(1.1)",
                                                },
                                              }}
                                            >
                                              <Delete className="text-red-600" />
                                            </IconButton>
                                          </Tooltip>
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
                  ) : (
                    <Fade in timeout={800}>
                      <Grid container spacing={4}>
                        {elections.map((election, index) => (
                          <Grid item xs={12} sm={6} lg={4} key={election.id}>
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
                                    boxShadow:
                                      "0 20px 60px rgba(0, 0, 0, 0.15)",
                                  },
                                }}
                              >
                                {/* Card Header */}
                                <Box
                                  sx={{
                                    background:
                                      "linear-gradient(135deg, #8b5cf6, #7c3aed)",
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
                                        <Event className="text-white" />
                                      </Avatar>
                                      <Box>
                                        <Typography
                                          variant="h6"
                                          className="font-bold text-white"
                                        >
                                          {election.title}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          className="text-purple-100"
                                        >
                                          Election
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Chip
                                      icon={getStatusIcon(election.status)}
                                      label={
                                        election.status
                                          .charAt(0)
                                          .toUpperCase() +
                                        election.status.slice(1)
                                      }
                                      sx={{
                                        backgroundColor:
                                          "rgba(255,255,255,0.2)",
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
                                      <Box className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CalendarToday className="text-green-600" />
                                      </Box>
                                      <Box>
                                        <Typography
                                          variant="body2"
                                          className="text-gray-500"
                                        >
                                          Start Time
                                        </Typography>
                                        <Typography
                                          variant="body1"
                                          className="font-semibold text-gray-800"
                                        >
                                          {new Date(
                                            election.startTime
                                          ).toLocaleString()}
                                        </Typography>
                                      </Box>
                                    </Box>

                                    <Box className="flex items-center space-x-3">
                                      <Box className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <AccessTime className="text-orange-600" />
                                      </Box>
                                      <Box>
                                        <Typography
                                          variant="body2"
                                          className="text-gray-500"
                                        >
                                          End Time
                                        </Typography>
                                        <Typography
                                          variant="body1"
                                          className="font-semibold text-gray-800"
                                        >
                                          {new Date(
                                            election.endTime
                                          ).toLocaleString()}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>

                                  {/* Action Buttons */}
                                  <Box className="mt-6 flex justify-center space-x-2">
                                    <Tooltip title="View Election">
                                      <IconButton
                                        onClick={() =>
                                          handleViewElection(election.id)
                                        }
                                        sx={{
                                          backgroundColor:
                                            "rgba(59, 130, 246, 0.1)",
                                          "&:hover": {
                                            backgroundColor:
                                              "rgba(59, 130, 246, 0.2)",
                                            transform: "scale(1.1)",
                                          },
                                        }}
                                      >
                                        <Visibility className="text-blue-600" />
                                      </IconButton>
                                    </Tooltip>

                                    {election.status === "upcoming" && (
                                      <Tooltip title="Start Election">
                                        <IconButton
                                          onClick={() =>
                                            handleStart(election.id)
                                          }
                                          sx={{
                                            backgroundColor:
                                              "rgba(16, 185, 129, 0.1)",
                                            "&:hover": {
                                              backgroundColor:
                                                "rgba(16, 185, 129, 0.2)",
                                              transform: "scale(1.1)",
                                            },
                                          }}
                                        >
                                          <PlayArrow className="text-green-600" />
                                        </IconButton>
                                      </Tooltip>
                                    )}

                                    {election.status === "active" && (
                                      <Tooltip title="End Election">
                                        <IconButton
                                          onClick={() =>
                                            handleEnd(election.id)
                                          }
                                          sx={{
                                            backgroundColor:
                                              "rgba(245, 158, 11, 0.1)",
                                            "&:hover": {
                                              backgroundColor:
                                                "rgba(245, 158, 11, 0.2)",
                                              transform: "scale(1.1)",
                                            },
                                          }}
                                        >
                                          <Stop className="text-orange-600" />
                                        </IconButton>
                                      </Tooltip>
                                    )}

                                    <Tooltip title="Delete Election">
                                      <IconButton
                                        onClick={() =>
                                          handleDelete(election.id)
                                        }
                                        sx={{
                                          backgroundColor:
                                            "rgba(239, 68, 68, 0.1)",
                                          "&:hover": {
                                            backgroundColor:
                                              "rgba(239, 68, 68, 0.2)",
                                            transform: "scale(1.1)",
                                          },
                                        }}
                                      >
                                        <Delete className="text-red-600" />
                                      </IconButton>
                                    </Tooltip>
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
  );
};

export default ElectionListPage;