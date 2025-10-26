
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import {
  Typography,
  CardContent,
  Paper,
  Tab,
  Tabs,
  List,
  ListItem,
  Box,
  Avatar,
  Chip,
  Fade,
  Grow,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material"
import {
  People,
  Event,
  Poll,
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  Security,
  Speed,
  CheckCircle,
  Notifications,
  Analytics,
  PersonAdd,
  HowToVote,
  VerifiedUser,
  AdminPanelSettings,
  Assignment,
  Create,
  List as ListIcon,
  Group,
  Verified,
  ArrowForward,
  TrendingUp,
  TrendingDown,
  MoreVert,
  Assessment,
  BarChartRounded
} from "@mui/icons-material"
import { formatDistanceToNow } from "date-fns"
import { io } from "socket.io-client"
import { useSelector } from "react-redux";
const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
const [activitiesPerPage] = useState(8)
  const token = useSelector((state) => state.auth.token);
  const [stats, setStats] = useState([
    {
      label: "Total Candidates",
      value: 0,
      icon: <People fontSize="large" />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      change: "+12%",
      trend: "up",
      subtitle: "Active applications",
      bgIcon: <PersonAdd />,
    },
    {
      label: "Total Voters",
      value: 0,
      icon: <VerifiedUser fontSize="large" />,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      change: "+8%",
      trend: "up",
      subtitle: "Registered users",
      bgIcon: <Group />,
    },
    {
      label: "Ongoing Elections",
      value: 0,
      icon: <Event fontSize="large" />,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      change: "+3%",
      trend: "up",
      subtitle: "Currently active",
      bgIcon: <HowToVote />,
    },
    {
      label: "Upcoming Elections",
      value: 0,
      icon: <Poll fontSize="large" />,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      change: "+5%",
      trend: "up",
      subtitle: "Scheduled events",
      bgIcon: <Assessment />,
    },
  ])

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      action: "New candidate request received",
      user: "Sarah Johnson",
      time: "2 minutes ago",
      type: "candidate",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(),
    },
    {
      id: 2,
      action: 'Election "Presidential Election" started',
      user: "System",
      time: "1 hour ago",
      type: "election",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 3,
      action: 'Voter "John Doe" registered',
      user: "John Doe",
      time: "3 hours ago",
      type: "voter",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(Date.now() - 10800000),
    },
    {
      id: 4,
      action: 'Candidate "Mike Wilson" approved',
      user: "Admin",
      time: "5 hours ago",
      type: "approval",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(Date.now() - 18000000),
    },
  ])

  const features = [
    {
      icon: <Security className="text-blue-500" />,
      title: "Secure Management",
      description: "Advanced security protocols protect all election data",
    },
    {
      icon: <Analytics className="text-green-500" />,
      title: "Real-time Analytics",
      description: "Monitor election progress with live data insights",
    },
    {
      icon: <Speed className="text-purple-500" />,
      title: "Fast Processing",
      description: "Lightning-fast vote counting and result generation",
    },
  ]

  const quickActions = [
    {
      id: "candidate-requests",
      title: "Candidate Requests",
      description: "Review and approve candidate applications",
      icon: <Assignment />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      route: "/admin/candidate-requests",
      count: "12 pending",
    },
    {
      id: "create-election",
      title: "Create Election",
      description: "Set up new elections and configure settings",
      icon: <Create />,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      route: "/admin/create-election",
      count: "Quick setup",
    },
    {
      id: "election-list",
      title: "Election Management",
      description: "View and manage all elections",
      icon: <ListIcon />,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      route: "/admin/election-list",
      count: "5 active",
    },
    {
      id: "voter-list",
      title: "Voter Management",
      description: "Manage registered voters and their details",
      icon: <Group />,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      route: "/admin/voter-list",
      count: "500+ voters",
    },
    {
      id: "approved-candidates",
      title: "Approved Candidates",
      description: "View all approved candidates",
      icon: <Verified />,
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      route: "/admin/approved-candidates",
      count: "25 approved",
    },
    {
    id: "results",
    title: "View Results",
    description: "Check results of completed elections",
    icon: <BarChartRounded />, 
    gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    route: "/admin/results",
    count: "View all",
  },
    
  ]

  useEffect(() => {
    // Simulate loading and animate stats
    const timer = setTimeout(() => {
      setLoading(false)
      // Animate stats counting up
      setStats((prev) =>
        prev.map((stat, index) => ({
          ...stat,
          value: [10, 500, 2, 1][index],
        })),
      )
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const handleActionClick = (route) => {
  navigate(route);
};


  const getActivityIcon = (type) => {
    switch (type) {
      case "candidate":
        return <PersonAdd className="text-blue-500" />
      case "election":
        return <HowToVote className="text-purple-500" />
      case "voter":
        return <People className="text-green-500" />
      case "approval":
        return <CheckCircle className="text-emerald-500" />
      default:
        return <Notifications className="text-gray-500" />
    }
  }

  const socket = io("http://localhost:5000",{
      auth: { token },
    })
  useEffect(() => {
    // 1. Fetch past activities on page load
    fetch("http://localhost:5000/api/activity",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then((res) => res.json())
      .then((data) => setRecentActivities(data)) // Reverse to show newest first

    // 2. Listen for new real-time activity
    socket.on("newActivity", (newActivity) => {
      setRecentActivities((prev) => [newActivity, ...prev]) // Add to top
    })

    return () => {
      socket.disconnect()
    }
  }, [])

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
              <AdminPanelSettings className="text-white text-4xl" />
            </Box>
            <Typography variant="h5" className="text-gray-700 mb-2">
              Loading Admin Dashboard...
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
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <Box className="relative z-10 p-6 max-w-7xl mx-auto">
        <Fade in timeout={1000}>
          <div>
            {/* Header Section */}
            <Box className="text-center mb-8">
              <Box className="flex justify-center mb-6">
                <Box className="relative">
                  <Box className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <AdminPanelSettings className="text-white text-4xl" />
                  </Box>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                </Box>
              </Box>
              <Typography
                variant="h2"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
              >
                Admin Dashboard
              </Typography>
              <Box className="flex justify-center">
                <Typography variant="h6" className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Manage elections, candidates, and voters with our comprehensive administrative platform
              </Typography>
              </Box>
            </Box>

            {/* Features Section */}
            {/* <Box className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Grow in timeout={600 + index * 200} key={index}>
                    <Box className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 group">
                      <Box className="flex items-start space-x-4">
                        <Box className="flex-shrink-0 p-3 rounded-lg bg-white shadow-md group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grow>
                ))}
              </div>
            </Box> */}

            {/* Navigation Tabs */}
            <Paper
  elevation={24}
  sx={{
    borderRadius: 20,
    background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.2)",
    mb: 4,
    overflow: "hidden",
    position: "relative", // Added for absolute positioning of elements
  }}
>
  <Tabs
    value={selectedTab}
    onChange={handleTabChange}
    variant="fullWidth"
    centered
    sx={{
      position: "relative", // For positioning the animated background
      "& .MuiTab-root": {
        fontWeight: 600,
        fontSize: "1rem",
        textTransform: "none",
        py: 2.5,
        zIndex: 1, // Ensure tab content is above animations
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", // Smoother easing
        color: "rgba(0, 0, 0, 0.7)",
        "&:hover": {
          backgroundColor: "rgba(59, 130, 246, 0.08)",
          color: "#3b82f6",
        },
        "&.Mui-selected": {
          color: "white",
          fontWeight: 700,
        },
      },
      "& .MuiTabs-indicator": {
        height: 0, // Hide default indicator
      },
      // Add a pseudo-element for the sliding background
      "&::before": {
        content: '""',
        position: "absolute",
        height: "calc(100% - 16px)",
        top: 8,
        borderRadius: 16,
        width: "calc(50% - 16px)", // Adjust based on number of tabs
        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: selectedTab === 0 ? "translateX(8px)" : "translateX(calc(100% + 8px))",
        boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
        zIndex: 0,
      },
    }}
  >
    <Tab 
      icon={
        <Box sx={{ 
          display: "flex", 
          alignItems: "center",
          "& svg": {
            mr: 1,
            transition: "transform 0.3s ease",
            transform: selectedTab === 0 ? "scale(1.2)" : "scale(1)",
          }
        }}>
          <DashboardIcon />
        </Box>
      } 
      label="Overview" 
      disableRipple // Remove ripple for cleaner effect
    />
    <Tab 
      icon={
        <Box sx={{ 
          display: "flex", 
          alignItems: "center",
          "& svg": {
            mr: 1,
            transition: "transform 0.3s ease",
            transform: selectedTab === 1 ? "scale(1.2)" : "scale(1)",
          }
        }}>
          <TimelineIcon />
        </Box>
      } 
      label="Recent Activities" 
      disableRipple // Remove ripple for cleaner effect
    />
  </Tabs>
</Paper>

            {/* Overview Tab */}
            {selectedTab === 0 && (
              <Fade in timeout={800}>
                <div>
                  {/* Enhanced Statistics Cards */}
                  <Box className="mb-8">
                    <Box className="mb-2">
                      <Typography variant="h4" className="font-bold text-gray-800 mb-8 text-center">
                      Key Metrics
                    </Typography>
                    </Box>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {stats.map((stat, index) => (
                        <Grow in timeout={400 + index * 200} key={index}>
                          <Paper
                            elevation={24}
                            sx={{
                              width:300,
                              height:240,
                              borderRadius: 4,
                              background: "rgba(255,255,255,0.95)",
                              backdropFilter: "blur(20px)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              overflow: "hidden",
                              position: "relative",
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

                            <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                              {/* Header with icon and menu */}
                              <Box className="flex items-start justify-between mb-4">
                                <Box
                                  sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 3,
                                    background: stat.gradient,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                                  }}
                                >
                                  {stat.icon}
                                </Box>
                                <IconButton size="small" sx={{ color: "gray" }}>
                                  <MoreVert />
                                </IconButton>
                              </Box>

                              {/* Main Value */}
                              <Typography variant="h3" className="font-bold text-gray-800 mb-1">
                                {stat.value.toLocaleString()}
                              </Typography>

                              {/* Label and Subtitle */}
                              <Typography variant="h6" className="font-semibold text-gray-700 mb-1">
                                {stat.label}
                              </Typography>
                              <Typography variant="body2" className="text-gray-500 mb-3">
                                {stat.subtitle}
                              </Typography>

                              {/* Trend Indicator */}
                              <Box className="flex items-center justify-between">
                                <Box className="flex items-center space-x-1">
                                  {stat.trend === "up" ? (
                                    <TrendingUp className="text-green-500 text-sm" />
                                  ) : (
                                    <TrendingDown className="text-red-500 text-sm" />
                                  )}
                                  <Typography
                                    variant="body2"
                                    className={`font-semibold ${
                                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                                    }`}
                                  >
                                    {stat.change}
                                  </Typography>
                                </Box>
                                <Typography variant="caption" className="text-gray-400">
                                  vs last month
                                </Typography>
                              </Box>
                            </CardContent>
                          </Paper>
                        </Grow>
                      ))}
                    </div>
                  </Box>

                  {/* Quick Actions Section */}
                  <Box className="mb-8">
  <Typography variant="h4" className="font-bold text-gray-800 mb-2 text-center">
    Quick Actions
  </Typography>
  <Typography variant="body1" className="text-gray-600 mb-8 text-center">
    Navigate to key administrative functions
  </Typography>

  {/* Center the entire grid */}
  <Box display="flex" justifyContent="center">
    <Grid container spacing={4} justifyContent="center" maxWidth="1000px">
      {quickActions.map((action, index) => (
        <Grid item key={action.id}>
          <Grow in timeout={600 + index * 200}>
            <Paper
              elevation={24}
              sx={{
                width: 300,
                height: 260,
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                },
              }}
              onClick={() => handleActionClick(action.route)}
            >
              {/* Gradient Background */}
              <Box
                sx={{
                  height: "120px",
                  background: action.gradient,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "80px",
                    height: "80px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "0 0 0 80px",
                  }}
                />
                <Box sx={{ fontSize: "3rem", color: "white", zIndex: 1 }}>
                  {action.icon}
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <ArrowForward />
                </Box>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                  {action.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-3">
                  {action.description}
                </Typography>
                <Box className="flex items-center justify-between">
                  <Chip
                    label={action.count}
                    size="small"
                    sx={{
                      background: action.gradient,
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                  <Typography variant="caption" className="text-gray-400">
                    Click to navigate
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


                  {/* Trust Indicators */}
                  <Box className="text-center">
                    <Box className="p-6 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 max-w-2xl mx-auto">
                      <Box className="flex items-center justify-center space-x-2 mb-3">
                        <CheckCircle className="text-green-500" />
                        <Typography variant="h6" className="font-semibold text-gray-800">
                          System Status: All Systems Operational
                        </Typography>
                      </Box>
                      <Typography variant="body2" className="text-gray-600">
                        Platform uptime: <span className="font-bold text-green-600">99.9%</span> | Last backup:{" "}
                        <span className="font-bold text-blue-600">2 hours ago</span>
                      </Typography>
                    </Box>
                  </Box>
                </div>
              </Fade>
            )}

            {/* Recent Activities Tab */}
            {/* Recent Activities Tab */}
{selectedTab === 1 && (
  <Fade in timeout={800}>
    <Paper
      elevation={24}
      sx={{
        borderRadius: 4,
        background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          p: 4,
          position: "relative",
        }}
      >
        <Box className="flex items-center justify-between">
          <Box className="flex items-center space-x-4">
            <Box className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <TimelineIcon className="text-white" />
            </Box>
            <Box>
              <Typography variant="h5" className="font-bold text-white mb-1">
                Recent Activities
              </Typography>
              <Typography variant="body2" className="text-green-100">
                Latest system activities and user actions
              </Typography>
            </Box>
          </Box>
          <Box className="text-white">
            <Typography variant="body2" className="text-green-100">
              Total: {recentActivities.length} activities
            </Typography>
          </Box>
        </Box>

        {/* Decorative elements */}
        <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
        <Box className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></Box>
      </Box>

      <CardContent sx={{ p: 4 }}>
        <List sx={{ p: 0 }}>
          {recentActivities
            .slice((currentPage - 1) * activitiesPerPage, currentPage * activitiesPerPage)
            .map((activity, index) => (
            <Grow in timeout={400 + index * 200} key={activity.id}>
              <ListItem
                sx={{
                  borderRadius: 3,
                  mb: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    transform: "translateX(8px)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Box className="flex items-center space-x-4 w-full">
                  <Avatar
                    src={activity.avatar}
                    sx={{
                      width: 48,
                      height: 48,
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    }}
                  >
                    {activity.user.charAt(0)}
                  </Avatar>

                  <Box className="flex-1">
                    <Box className="flex items-center space-x-2 mb-1">
                      {getActivityIcon(activity.type)}
                      <Typography variant="body1" className="font-semibold text-gray-800">
                        {activity.action}
                      </Typography>
                    </Box>
                    <Typography variant="body2" className="text-gray-600">
                      by {activity.user}
                    </Typography>
                  </Box>

                  <Typography variant="caption" className="text-gray-500">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </Typography>
                </Box>
              </ListItem>
            </Grow>
          ))}
        </List>

        {/* Pagination Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 2 }}>
          <IconButton
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            sx={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              },
              "&:disabled": {
                background: "#e5e7eb",
                color: "#9ca3af",
              },
            }}
          >
            <ArrowForward sx={{ transform: 'rotate(180deg)' }} />
          </IconButton>
          
          <Typography variant="body1" sx={{ mx: 2, fontWeight: 600, color: "#374151" }}>
            Page {currentPage} of {Math.ceil(recentActivities.length / activitiesPerPage)}
          </Typography>
          
          <IconButton
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(recentActivities.length / activitiesPerPage)))}
            disabled={currentPage === Math.ceil(recentActivities.length / activitiesPerPage)}
            sx={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              },
              "&:disabled": {
                background: "#e5e7eb",
                color: "#9ca3af",
              },
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        {/* Page Info */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            Showing {Math.min((currentPage - 1) * activitiesPerPage + 1, recentActivities.length)} - {Math.min(currentPage * activitiesPerPage, recentActivities.length)} of {recentActivities.length} activities
          </Typography>
        </Box>
      </CardContent>
    </Paper>
  </Fade>
)}
          </div>
        </Fade>
      </Box>
    </Box>
  )
}

export default AdminDashboard
