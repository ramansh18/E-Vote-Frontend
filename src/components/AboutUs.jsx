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
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material"
import {
  Security,
  Verified,
  Devices,
  AdminPanelSettings,
  TrendingUp,
  Accessibility,
  Lightbulb,
  Groups,
  Shield,
  Visibility,
  Lock,
  CloudDone,
  Timeline,
  HowToVote,
  Public,
  Rocket,
  EmojiEvents,
  Handshake,
  ArrowForward,
  Speed,
  Analytics,
  AutoAwesome,
  Fingerprint,
  Language,
  TrendingDown,
  AccountBalance,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const About = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  const keyFeatures = [
    {
      icon: <Security />,
      title: "Military-Grade Security",
      description: "End-to-end encryption with quantum-resistant algorithms protecting every vote and voter identity.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      stats: "256-bit AES",
      category: "Security",
    },
    {
      icon: <Shield />,
      title: "Blockchain Immutability",
      description: "Distributed ledger technology ensures votes cannot be altered, deleted, or manipulated.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      stats: "100% Tamper-proof",
      category: "Technology",
    },
    {
      icon: <Verified />,
      title: "Smart Authentication",
      description: "Multi-factor authentication with biometric verification and role-based access control.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      stats: "99.9% Accuracy",
      category: "Identity",
    },
    {
      icon: <Timeline />,
      title: "Real-Time Analytics",
      description: "Live voting progress, instant notifications, and comprehensive election monitoring dashboards.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      stats: "Live Updates",
      category: "Analytics",
    },
    {
      icon: <Devices />,
      title: "Universal Access",
      description: "Responsive design optimized for all devices with offline capability and accessibility features.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      stats: "All Platforms",
      category: "Accessibility",
    },
    {
      icon: <AdminPanelSettings />,
      title: "Enterprise Management",
      description: "Comprehensive admin suite for election setup, candidate management, and automated reporting.",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      stats: "Full Control",
      category: "Management",
    },
  ]

  const values = [
    {
      icon: <Accessibility />,
      title: "Universal Access",
      description:
        "Democracy should be accessible to everyone, regardless of location, ability, or technical expertise.",
      color: "#10b981",
      metric: "100%",
      label: "Inclusive",
    },
    {
      icon: <Visibility />,
      title: "Complete Transparency",
      description: "Open, verifiable processes that build trust and confidence in democratic participation.",
      color: "#3b82f6",
      metric: "24/7",
      label: "Transparent",
    },
    {
      icon: <Lightbulb />,
      title: "Continuous Innovation",
      description: "Leveraging cutting-edge technology to modernize and improve democratic processes.",
      color: "#8b5cf6",
      metric: "AI-Powered",
      label: "Innovation",
    },
    {
      icon: <Groups />,
      title: "Community-Driven",
      description: "Built by the community, for the community, with continuous feedback and improvement.",
      color: "#f59e0b",
      metric: "Global",
      label: "Community",
    },
  ]

  const securityFeatures = [
    {
      icon: <Fingerprint />,
      label: "Biometric Verification",
      description: "Advanced fingerprint and facial recognition",
    },
    { icon: <Lock />, label: "Zero-Knowledge Proofs", description: "Vote without revealing voter identity" },
    { icon: <CloudDone />, label: "Distributed Storage", description: "Decentralized data across multiple nodes" },
    { icon: <Verified />, label: "Audit Trails", description: "Complete transparency with verifiable records" },
    { icon: <Speed />, label: "Real-time Monitoring", description: "Instant threat detection and response" },
    { icon: <Public />, label: "Open Source", description: "Transparent code for community verification" },
  ]

  const benefits = [
    { icon: <TrendingUp />, title: "Increase Turnout", value: "40%", description: "Higher voter participation" },
    { icon: <TrendingDown />, title: "Reduce Costs", value: "75%", description: "Lower operational expenses" },
    { icon: <Speed />, title: "Instant Results", value: "<1min", description: "Real-time vote counting" },
    { icon: <Language />, title: "Global Access", value: "24/7", description: "Vote from anywhere" },
    { icon: <Analytics />, title: "Data Insights", value: "100%", description: "Complete analytics" },
  ]

  const stats = [
    { value: "1M+", label: "Votes Cast", icon: <HowToVote /> },
    { value: "500+", label: "Elections", icon: <AccountBalance /> },
    { value: "99.9%", label: "Uptime", icon: <CloudDone /> },
    { value: "50+", label: "Countries", icon: <Public /> },
  ]

  const handleGetStarted = () => {
    navigate("/register")
  }

  const handleLearnMore = () => {
    navigate("/")
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
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: { xs: 60, md: 120 },
              height: { xs: 60, md: 120 },
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${
                ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"][i % 4]
              }20, transparent)`,
              filter: "blur(30px)",
              animation: `float ${8 + i * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                "50%": { transform: "translateY(-15px) rotate(180deg)" },
              },
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: { xs: 3, md: 6 } }}>
        {/* Hero Section */}
        <Fade in={visible} timeout={1000}>
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
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
                <HowToVote sx={{ fontSize: { xs: 30, md: 40 }, color: "white" }} />
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
              The Future of
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
                Democratic Voting
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
              Secure, transparent, and accessible elections powered by blockchain technology
            </Typography>

            {/* CTA Buttons */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                startIcon={<Rocket />}
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
                Start Voting Today
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleLearnMore}
                startIcon={<ArrowForward />}
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
                Explore Platform
              </Button>
            </Box>

            {/* Stats Row */}
            <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 600, mx: "auto" }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Grow in={visible} timeout={1200 + index * 200}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 2,
                        borderRadius: 2,
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          background: "rgba(255, 255, 255, 0.08)",
                        },
                      }}
                    >
                      <Box sx={{ color: "#3b82f6", mb: 1 }}>{stat.icon}</Box>
                      <Typography variant="h5" sx={{ color: "white", fontWeight: 800, mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Mission Statement */}
        <Grow in={visible} timeout={1400}>
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Card
              elevation={0}
              sx={{
                maxWidth: 800,
                mx: "auto",
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(40px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Gradient Border */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981, #f59e0b)",
                }}
              />

              <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 3,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 15px 40px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <EmojiEvents sx={{ fontSize: 30, color: "white" }} />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: "1.75rem", md: "2rem" },
                  }}
                >
                  Our Mission
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#cbd5e1",
                    lineHeight: 1.6,
                    maxWidth: 600,
                    mx: "auto",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  To democratize access to voting by creating a secure, transparent, and user-friendly platform that
                  increases civic participation, reduces electoral fraud, and modernizes democratic processes for the
                  digital age.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grow>

        {/* Security & Technology Section */}
        <Grow in={visible} timeout={2000}>
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
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
                  textAlign: "center",
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
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "white",
                      fontWeight: 800,
                      mb: 1,
                      fontSize: { xs: "1.75rem", md: "2rem" },
                    }}
                  >
                    Enterprise Security
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#94a3b8", fontSize: { xs: "1rem", md: "1.1rem" } }}>
                    Military-grade protection with cutting-edge technology
                  </Typography>
                </Box>
              </Box>

              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={3} justifyContent="center">
                  {securityFeatures.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          transition: "all 0.3s ease",
                          textAlign: "center",
                          "&:hover": {
                            background: "rgba(255, 255, 255, 0.08)",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 1.5,
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" sx={{ color: "white", fontWeight: 600, mb: 1, fontSize: "1rem" }}>
                          {feature.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grow>

        {/* Values Section - Updated for 2 cards per row on large screens */}
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
  <Box sx={{ textAlign: "center", mb: 6 }}>
    <Chip
      label="VALUES"
      sx={{
        mb: 2,
        px: 2,
        py: 0.5,
        background: "linear-gradient(135deg, #10b981, #059669)",
        color: "white",
        fontWeight: 700,
        fontSize: "0.75rem",
        letterSpacing: 1,
      }}
    />
    <Typography
      variant="h3"
      sx={{
        color: "white",
        fontWeight: 800,
        mb: 2,
        fontSize: { xs: "2rem", md: "2.5rem" },
      }}
    >
      Our Core Values
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: "#94a3b8",
        maxWidth: 500,
        mx: "auto",
        fontSize: { xs: "1rem", md: "1.1rem" },
      }}
    >
      The principles that guide everything we do
    </Typography>
  </Box>

  {/* Force 2 cards per row using flexbox */}
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 3,
      maxWidth: "950px", // Increased container width
      mx: "auto",
    }}
  >
    {values.map((value, index) => (
      <Box
        key={index}
        sx={{
          width: { xs: "100%", md: "calc(50% - 12px)" },
          minWidth: { md: "420px" }, // Increased minimum width
        }}
      >
        <Grow in={visible} timeout={2200 + index * 200}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-6px)",
                background: "rgba(255, 255, 255, 0.1)",
                boxShadow: `0 20px 50px ${value.color}40`,
              },
            }}
          >
            <CardContent sx={{ p: 3, textAlign: "center", height: "100%" }}> {/* Increased padding */}
              <Box
                sx={{
                  width: 45, // Increased icon size
                  height: 45,
                  borderRadius: 2,
                  background: value.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2, // Increased margin
                  boxShadow: `0 10px 30px ${value.color}40`,
                }}
              >
                {value.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{ 
                  color: "white", 
                  fontWeight: 700, 
                  mb: 1.5, // Increased margin
                  fontSize: "1.05rem" // Increased font size
                }}
              >
                {value.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{ 
                  color: "#cbd5e1", 
                  lineHeight: 1.4, // Increased line height
                  mb: 2, // Increased margin
                  fontSize: "0.9rem" // Increased font size
                }}
              >
                {value.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5, // Increased gap
                  pt: 1.5, // Increased padding
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: value.color, fontWeight: 700, fontSize: "0.9rem" }} // Increased font size
                >
                  {value.metric}
                </Typography>
                <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.8rem" }}> {/* Increased font size */}
                  {value.label}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grow>
      </Box>
    ))}
  </Box>
</Box>
        {/* Benefits Section */}
        <Grow in={visible} timeout={2400}>
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
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
              <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} lg={6}>
                    <Box sx={{ mb: 3, textAlign: { xs: "center", lg: "left" } }}>
                      <Chip
                        label="BENEFITS"
                        sx={{
                          mb: 2,
                          px: 2,
                          py: 0.5,
                          background: "linear-gradient(135deg, #f59e0b, #d97706)",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          letterSpacing: 1,
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          color: "white",
                          fontWeight: 800,
                          mb: 2,
                          fontSize: { xs: "1.75rem", md: "2rem" },
                        }}
                      >
                        Why Choose E-Vote?
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#cbd5e1",
                          lineHeight: 1.6,
                          mb: 3,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                        }}
                      >
                        Our platform delivers measurable improvements to the democratic process, benefiting voters,
                        candidates, and election administrators alike.
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleGetStarted}
                        startIcon={<Lightbulb />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: "1rem",
                          fontWeight: 700,
                          borderRadius: 3,
                          textTransform: "none",
                          background: "linear-gradient(135deg, #f59e0b, #d97706)",
                          boxShadow: "0 15px 40px rgba(245, 158, 11, 0.4)",
                          "&:hover": {
                            transform: "translateY(-3px) scale(1.02)",
                            boxShadow: "0 20px 50px rgba(245, 158, 11, 0.5)",
                          },
                        }}
                      >
                        Experience the Difference
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Grid container spacing={2}>
                      {benefits.map((benefit, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box
                            sx={{
                              p: 2.5,
                              borderRadius: 2,
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              transition: "all 0.3s ease",
                              textAlign: "center",
                              "&:hover": {
                                background: "rgba(255, 255, 255, 0.08)",
                                transform: "translateY(-3px)",
                              },
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1.5 }}>
                              <Box
                                sx={{
                                  width: 35,
                                  height: 35,
                                  borderRadius: 2,
                                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  mr: 1.5,
                                }}
                              >
                                {benefit.icon}
                              </Box>
                              <Typography variant="h5" sx={{ color: "#3b82f6", fontWeight: 800, fontSize: "1.5rem" }}>
                                {benefit.value}
                              </Typography>
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{ color: "white", fontWeight: 600, mb: 0.5, fontSize: "1rem" }}
                            >
                              {benefit.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                              {benefit.description}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grow>

        {/* Call to Action */}
       <Grow in={visible} timeout={2600}>
  <Card
    elevation={0}
    sx={{
      borderRadius: 4,
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981)",
      position: "relative",
      overflow: "hidden",
      maxWidth: "850px", // Medium-sized width constraint
      mx: "auto", // Center the card
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

    <CardContent sx={{ p: { xs: 3.5, md: 5 }, textAlign: "center", position: "relative", zIndex: 1 }}> {/* Medium padding */}
      <Box
        sx={{
          width: 55, // Medium icon container size
          height: 55,
          mx: "auto",
          mb: 2.5, // Medium margin
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Handshake sx={{ fontSize: 28, color: "white" }} /> {/* Medium icon size */}
      </Box>

      <Typography
        variant="h3"
        sx={{
          color: "white",
          fontWeight: 800,
          mb: 1.8, // Medium margin
          fontSize: { xs: "1.85rem", md: "2.25rem" }, // Medium font size
        }}
      >
        Ready to Transform Democracy?
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "rgba(255, 255, 255, 0.9)",
          mb: 3.5, // Medium margin
          maxWidth: 550, // Medium max width
          mx: "auto",
          fontSize: { xs: "0.975rem", md: "1.05rem" }, // Medium font size
          lineHeight: 1.55, // Medium line height
        }}
      >
        Join thousands of organizations worldwide who trust E-Vote for their democratic processes. Whether
        you're a voter, candidate, or election administrator, we're here to serve you.
      </Typography>

      <Box sx={{ display: "flex", gap: 2.5, justifyContent: "center", flexWrap: "wrap", mb: 3.5 }}> {/* Medium gap and margin */}
        <Button
          variant="contained"
          size="large"
          onClick={handleGetStarted}
          startIcon={<HowToVote />}
          sx={{
            px: 5, // Medium padding
            py: 1.75,
            fontSize: "1.05rem", // Medium font size
            fontWeight: 700,
            borderRadius: 3,
            textTransform: "none",
            background: "white",
            color: "#3b82f6",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              transform: "translateY(-3px) scale(1.02)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Start Your Journey
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/contact")}
          startIcon={<Groups />}
          sx={{
            px: 5, // Medium padding
            py: 1.75,
            fontSize: "1.05rem", // Medium font size
            fontWeight: 700,
            borderRadius: 3,
            textTransform: "none",
            borderWidth: 2,
            borderColor: "rgba(255, 255, 255, 0.8)",
            color: "white",
            "&:hover": {
              borderWidth: 2,
              borderColor: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Contact Our Team
        </Button>
      </Box>

      <Divider sx={{ my: 2.5, borderColor: "rgba(255, 255, 255, 0.2)" }} /> {/* Medium margin */}

      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.875rem" }}> {/* Medium font size */}
        🚀 Ready to modernize your elections? Let's build the future of democracy together.
      </Typography>
    </CardContent>
  </Card>
</Grow>
      </Container>
    </Box>
  )
}

export default About