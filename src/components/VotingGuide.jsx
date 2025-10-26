"use client"

import { useState, useEffect } from "react"
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Fade,
  Grow,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from "@mui/material"
import {
  Login,
  HowToReg,
  Dashboard,
  HowToVote,
  Person,
  CheckCircle,
  Verified,
  Security,
  Schedule,
  PlayArrow,
  Lightbulb,
  Support,
  NavigateNext,
  NavigateBefore,
  MenuBook,
  Assignment,
  Ballot,
  ThumbUp,
  Timeline,
  AccountCircle,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const VotingGuide = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setVisible(true)
  }, [])

  const steps = [
    {
      label: "Log in to Your Account",
      icon: <Login />,
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      description: "Access your E-Vote account to begin the voting process",
      details: [
        "Visit the E-Vote website or open the mobile app",
        "Enter your registered email/username and password",
        "If you don't have an account, click 'Sign Up' to create one",
        "Use secure credentials and enable two-factor authentication if available",
      ],
      tips: "Keep your login credentials secure and never share them with anyone.",
      action: "Go to Login",
      actionIcon: <AccountCircle />,
    },
    {
      label: "Register Yourself as a Voter",
      icon: <HowToReg />,
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b981, #047857)",
      description: "Complete voter registration to become eligible for elections",
      details: [
        "Navigate to the 'Voter Registration' page from your dashboard",
        "Fill in all required personal details for voter verification",
        "Upload necessary documents if requested (ID, proof of address)",
        "Submit your registration request and wait for approval",
        "Check your email or notifications for confirmation updates",
      ],
      tips: "Ensure all information is accurate to avoid delays in approval.",
      action: "Register as Voter",
      actionIcon: <Assignment />,
    },
    {
      label: "Go to the Election Dashboard",
      icon: <Dashboard />,
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
      description: "Access your personalized election dashboard",
      details: [
        "Once approved as a voter, navigate to the Election Dashboard",
        "View all ongoing elections that are open for voting",
        "Check election deadlines and important announcements",
        "Review your voting eligibility status for each election",
      ],
      tips: "Bookmark the dashboard for quick access during election periods.",
      action: "View Dashboard",
      actionIcon: <Timeline />,
    },
    {
      label: "Select the Election You Want to Vote In",
      icon: <Ballot />,
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
      description: "Choose from available elections and proceed to voting",
      details: [
        "Browse through the list of active elections",
        "Click on the election title or 'Vote Now' button",
        "Read the election description and voting instructions",
        "Verify that you're eligible to vote in the selected election",
      ],
      tips: "Make sure you understand the election rules before proceeding.",
      action: "Select Election",
      actionIcon: <Ballot />,
    },
    {
      label: "Review Candidates and Their Details",
      icon: <Person />,
      color: "#ef4444",
      gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
      description: "Study candidate profiles to make an informed decision",
      details: [
        "Browse through all candidate profiles carefully",
        "Review their election symbols, party affiliations, and manifestos",
        "Check candidate backgrounds and qualifications",
        "Take your time to make an informed decision",
        "Compare candidates based on their policies and experience",
      ],
      tips: "Research candidates thoroughly to make the best choice for your community.",
      action: "View Candidates",
      actionIcon: <Person />,
    },
    {
      label: "Cast Your Vote",
      icon: <HowToVote />,
      color: "#06b6d4",
      gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
      description: "Submit your vote securely and confirm your choice",
      details: [
        "Select your preferred candidate by clicking their photo or name",
        "Review your selection carefully before confirming",
        "Click the 'Submit Vote' button to cast your ballot",
        "Remember: You can only vote once per election",
        "Your vote is final and cannot be changed after submission",
      ],
      tips: "Double-check your selection before submitting - votes cannot be changed!",
      action: "Cast Vote",
      actionIcon: <HowToVote />,
    },
    {
      label: "Confirmation",
      icon: <CheckCircle />,
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b981, #047857)",
      description: "Receive confirmation and verify your vote was recorded",
      details: [
        "View the confirmation message after successful vote submission",
        "Save or screenshot your voting receipt for records",
        "Check your voting history to verify your vote was recorded",
        "Receive email confirmation if notifications are enabled",
      ],
      tips: "Keep your voting confirmation for your records and peace of mind.",
      action: "View Confirmation",
      actionIcon: <ThumbUp />,
    },
  ]

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleGetStarted = () => {
    navigate("/login")
  }

  const handleGoToDashboard = () => {
    navigate("/dashboard")
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating Orbs */}
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: { xs: 40, md: 80 },
              height: { xs: 40, md: 80 },
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${
                ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"][i % 4]
              }15, transparent)`,
              filter: "blur(20px)",
              animation: `float ${6 + i * 1.5}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                "50%": { transform: "translateY(-10px) rotate(180deg)" },
              },
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: { xs: 3, md: 6 } }}>
        {/* Hero Section */}
        <Fade in={visible} timeout={1000}>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            {/* Logo/Icon */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  mx: "auto",
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 20px 60px rgba(59, 130, 246, 0.3)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: -2,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981)",
                    zIndex: -1,
                    filter: "blur(8px)",
                    opacity: 0.7,
                  },
                }}
              >
                <MenuBook sx={{ fontSize: { xs: 30, md: 40 }, color: "white" }} />
              </Box>
            </Box>

            {/* Main Heading */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
                fontWeight: 900,
                background: "linear-gradient(135deg, #ffffff, #e2e8f0)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                lineHeight: 1.1,
              }}
            >
              How to Vote in
              <br />
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                E-Voting System
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h6"
              sx={{
                color: "#94a3b8",
                fontWeight: 400,
                mb: 4,
                maxWidth: 600,
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.25rem" },
                lineHeight: 1.4,
              }}
            >
              Complete step-by-step guide to register and cast your vote securely and easily
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                startIcon={<PlayArrow />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 700,
                  borderRadius: 3,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  boxShadow: "0 15px 40px rgba(59, 130, 246, 0.4)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.02)",
                    boxShadow: "0 20px 50px rgba(59, 130, 246, 0.5)",
                  },
                }}
              >
                Start Voting Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleGoToDashboard}
                startIcon={<Dashboard />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 700,
                  borderRadius: 3,
                  textTransform: "none",
                  borderWidth: 2,
                  borderColor: "#475569",
                  color: "#e2e8f0",
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Go to Dashboard
              </Button>
            </Box>
          </Box>
        </Fade>

        {/* Main Content - Full Width */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "900px" }}>
            <Grow in={visible} timeout={1200}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(40px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  overflow: "hidden",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #1e293b, #334155)",
                    p: { xs: 3, md: 4 },
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: `
                        radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)
                      `,
                    }}
                  />
                  <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "white",
                        fontWeight: 800,
                        mb: 1,
                        fontSize: { xs: "1.75rem", md: "2rem" },
                      }}
                    >
                      Step-by-Step Voting Guide
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#94a3b8", fontSize: { xs: "1rem", md: "1.1rem" } }}>
                      Follow these {steps.length} simple steps to cast your vote
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  {/* Current Step Display */}
                  <Box sx={{ mb: 4 }}>
                    <Fade in timeout={800} key={activeStep}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: 3,
                          background: steps[activeStep].gradient,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {/* Background Pattern */}
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            background: `
                              radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
                            `,
                          }}
                        />

                        <CardContent sx={{ p: { xs: 3, md: 4 }, position: "relative", zIndex: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                            <Box
                              sx={{
                                width: 50,
                                height: 50,
                                borderRadius: 2,
                                background: "rgba(255, 255, 255, 0.2)",
                                backdropFilter: "blur(20px)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mr: 3,
                              }}
                            >
                              {steps[activeStep].icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="h5"
                                sx={{
                                  color: "white",
                                  fontWeight: 700,
                                  mb: 1,
                                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                                }}
                              >
                                Step {activeStep + 1}: {steps[activeStep].label}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "rgba(255, 255, 255, 0.9)",
                                  fontSize: { xs: "0.9rem", md: "1rem" },
                                }}
                              >
                                {steps[activeStep].description}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Step Details */}
                          <Box sx={{ mb: 3 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "white",
                                fontWeight: 600,
                                mb: 2,
                                fontSize: { xs: "1rem", md: "1.1rem" },
                              }}
                            >
                              What to do:
                            </Typography>
                            <List sx={{ py: 0 }}>
                              {steps[activeStep].details.map((detail, index) => (
                                <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                                  <ListItemIcon sx={{ minWidth: 32 }}>
                                    <Box
                                      sx={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: "50%",
                                        background: "rgba(255, 255, 255, 0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <Typography
                                        variant="caption"
                                        sx={{ color: "white", fontWeight: 700, fontSize: "0.7rem" }}
                                      >
                                        {index + 1}
                                      </Typography>
                                    </Box>
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={detail}
                                    primaryTypographyProps={{
                                      sx: {
                                        color: "rgba(255, 255, 255, 0.9)",
                                        fontSize: { xs: "0.875rem", md: "0.95rem" },
                                        lineHeight: 1.5,
                                      },
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>

                          {/* Tips */}
                          <Alert
                            icon={<Lightbulb />}
                            severity="info"
                            sx={{
                              background: "rgba(255, 255, 255, 0.15)",
                              backdropFilter: "blur(20px)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              borderRadius: 2,
                              color: "white",
                              mb: 3,
                              "& .MuiAlert-icon": {
                                color: "white",
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500, fontSize: { xs: "0.875rem", md: "0.9rem" } }}
                            >
                              💡 <strong>Pro Tip:</strong> {steps[activeStep].tips}
                            </Typography>
                          </Alert>

                          {/* Action Button */}
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              variant="contained"
                              startIcon={steps[activeStep].actionIcon}
                              sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: 700,
                                borderRadius: 3,
                                textTransform: "none",
                                background: "white",
                                color: steps[activeStep].color,
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                                "&:hover": {
                                  transform: "translateY(-2px) scale(1.02)",
                                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
                                },
                              }}
                            >
                              {steps[activeStep].action}
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Box>

                  {/* Navigation */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      startIcon={<NavigateBefore />}
                      sx={{
                        color: "#94a3b8",
                        fontWeight: 600,
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        "&:disabled": {
                          color: "#475569",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(148, 163, 184, 0.1)",
                        },
                      }}
                    >
                      Previous
                    </Button>

                    <Typography variant="body1" sx={{ color: "#94a3b8", fontWeight: 600, fontSize: "1.1rem" }}>
                      {activeStep + 1} of {steps.length}
                    </Typography>

                    <Button
                      onClick={handleNext}
                      disabled={activeStep === steps.length - 1}
                      endIcon={<NavigateNext />}
                      sx={{
                        color: "#94a3b8",
                        fontWeight: 600,
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        "&:disabled": {
                          color: "#475569",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(148, 163, 184, 0.1)",
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        </Box>

        {/* Security Notice */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Box sx={{ maxWidth: "600px", width: "100%" }}>
            <Grow in={visible} timeout={2000}>
              <Alert
                icon={<Security />}
                severity="info"
                sx={{
                  borderRadius: 3,
                  background: "rgba(59, 130, 246, 0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  color: "#e2e8f0",
                  "& .MuiAlert-icon": {
                    color: "#3b82f6",
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.875rem", md: "0.9rem" } }}>
                  🔒 <strong>Secure Voting:</strong> Your vote is encrypted and protected by blockchain technology.
                  All data is kept confidential and secure.
                </Typography>
              </Alert>
            </Grow>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default VotingGuide