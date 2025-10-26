
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
} from "@mui/material"
import {
  Person,
  Email,
  AccountBalanceWallet,
  ArrowBack,
  FilterList,
  Search,
  Refresh,
  MoreVert,
  People,
  Verified,
  HowToVote,
  ViewList,
  GridView,
  TrendingUp,
  Security,
  CheckCircle,
  Error as ErrorIcon,
  Group,
  Star,
} from "@mui/icons-material"
import axios from "axios"
import { useSelector } from "react-redux"

const VoterListPage = () => {
  const [votersData, setVotersData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [viewMode, setViewMode] = useState("table") // 'table' or 'cards'
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    recent: 0,
    active: 0,
  })

  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVotersData = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:5000/api/voter/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setVotersData(response.data.votersData)

        // Calculate statistics
        const statsData = {
          total: response.data.votersData.length,
          verified: response.data.votersData.filter((voter) => voter.email).length,
          recent: response.data.votersData.filter((voter) => {
            const createdAt = new Date(voter.createdAt || Date.now())
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            return createdAt > weekAgo
          }).length,
          active: response.data.votersData.filter((voter) => voter.walletAddress).length,
        }
        setStats(statsData)

        setLoading(false)
      } catch (err) {
        setError("Failed to fetch voter data.")
        console.log(err)
        setLoading(false)
        showSnackbar("Error loading voter data", "error")
      }
    }

    if (token) {
      fetchVotersData()
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
              <Box className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                <People className="text-white text-4xl" />
              </Box>
              <Typography variant="h5" className="text-gray-700 mb-2">
                Loading Registered Voters...
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
                Error Loading Voters
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-4">
                {error}
              </Typography>
              <Box className="flex justify-center space-x-3">
                <IconButton
                  onClick={handleRefresh}
                  sx={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Refresh />
                </IconButton>
                <IconButton
                  onClick={handleBackToDashboard}
                  sx={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg, #059669, #047857)",
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
                      Registered Voters
                    </Typography>
                    <Typography variant="h6" className="text-gray-600">
                      View and manage all registered voters
                    </Typography>
                  </Box>
                </Box>

                {/* Centered Action Buttons */}
                <Box className="flex items-center justify-center space-x-3 mb-8">
                  <Tooltip title="Refresh">
                    <IconButton
                      onClick={handleRefresh}
                      sx={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Refresh className="text-blue-600" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Filter">
                    <IconButton
                      sx={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <FilterList className="text-blue-600" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Search">
                    <IconButton
                      sx={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Search className="text-blue-600" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
                    <IconButton
                      onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")}
                      sx={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {viewMode === "table" ? (
                        <GridView className="text-blue-600" />
                      ) : (
                        <ViewList className="text-blue-600" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

             

              {/* Centered Content Area */}
              <Box className="flex justify-center flex-1">
  <Box sx={{ maxWidth: 1400, width: "100%" }}>
    {votersData.length === 0 ? (
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
              <People className="text-gray-400 text-4xl" />
            </Box>
            <Typography variant="h5" className="text-gray-600 mb-3">
              No Registered Voters
            </Typography>
            <Typography variant="body1" className="text-gray-500">
              No voters have registered yet. Registered voters will appear here.
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
          <Box
            sx={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              p: 4,
              position: "relative",
              textAlign: "center",
            }}
          >
            <Box className="flex items-center justify-center space-x-4">
              <Box className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <People className="text-white" />
              </Box>
              <Box>
                <Typography variant="h5" className="font-bold text-white mb-1">
                  Registered Voters
                </Typography>
                <Typography variant="body2" className="text-blue-100">
                  {votersData.length} voter{votersData.length !== 1 ? "s" : ""} registered
                </Typography>
              </Box>
            </Box>
            <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
            <Box className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></Box>
          </Box>

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
                        <span>Voter Name</span>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="flex items-center justify-center space-x-2">
                        <Email className="text-green-600" />
                        <span>Email Address</span>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="flex items-center justify-center space-x-2">
                        <AccountBalanceWallet className="text-purple-600" />
                        <span>Wallet Address</span>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="flex items-center justify-center space-x-2">
                        <HowToVote className="text-orange-600" />
                        <span>Status</span>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {votersData.map((voter, index) => (
                    <Grow in timeout={600 + index * 200} key={voter._id}>
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
                              {voter.name || "Unknown"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" className="text-gray-700">
                            {voter.email || "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            className="font-mono text-gray-600"
                            sx={{ fontSize: "0.8rem" }}
                          >
                            {voter.walletAddress || "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<Verified />}
                            label="Registered"
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
        <Grid container spacing={4} justifyContent="center">
          {votersData.map((voter, index) => (
            <Grid item xs={12} sm={6} lg={4} key={voter._id}>
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
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
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
                            {voter.name || "Unknown"}
                          </Typography>
                          <Typography variant="body2" className="text-blue-100">
                            Registered Voter
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        icon={<Verified />}
                        label="Active"
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          color: "white",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                    <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
                  </Box>

                  <CardContent sx={{ p: 4 }}>
                    <Box className="space-y-4">
                      <Box className="flex items-center space-x-3">
                        <Box className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Email className="text-green-600" />
                        </Box>
                        <Box>
                          <Typography variant="body2" className="text-gray-500">
                            Email Address
                          </Typography>
                          <Typography variant="body1" className="font-semibold text-gray-800">
                            {voter.email || "Not provided"}
                          </Typography>
                        </Box>
                      </Box>

                      <Box className="flex items-center space-x-3">
                        <Box className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <AccountBalanceWallet className="text-purple-600" />
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
                            {voter.walletAddress || "Not connected"}
                          </Typography>
                        </Box>
                      </Box>
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

export default VoterListPage
