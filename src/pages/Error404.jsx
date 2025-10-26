"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Button, Container, Paper, Fade, Grow, IconButton } from "@mui/material"
import { Home, ArrowBack, Search, Refresh, ErrorOutline, Dashboard, HowToVote } from "@mui/icons-material"

const Error404 = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [glitchEffect, setGlitchEffect] = useState(false)

  useEffect(() => {
    setVisible(true)

    // Add glitch effect periodically
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  const handleGoHome = () => {
    navigate("/")
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoToDashboard = () => {
    navigate("/dashboard")
  }

  const handleGoToElections = () => {
    navigate("/elections")
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating Error Icons */}
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {[...Array(12)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: { xs: 30, md: 50 },
              height: { xs: 30, md: 50 },
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${
                ["#ef4444", "#8b5cf6", "#3b82f6", "#f59e0b"][i % 4]
              }10, transparent)`,
              filter: "blur(15px)",
              animation: `float ${4 + i * 0.8}s ease-in-out infinite`,
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

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        <Fade in={visible} timeout={1000}>
          <Box sx={{ textAlign: "center" }}>
            {/* Main 404 Display */}
            <Grow in={visible} timeout={1200}>
              <Box sx={{ mb: 4 }}>
                {/* Large 404 Text with Glitch Effect */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "8rem", md: "12rem", lg: "15rem" },
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                    lineHeight: 0.8,
                    position: "relative",
                    filter: glitchEffect ? "hue-rotate(90deg)" : "none",
                    transform: glitchEffect ? "skew(-2deg)" : "none",
                    transition: "all 0.2s ease",
                    "&::before": {
                      content: '"404"',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      opacity: glitchEffect ? 0.7 : 0,
                      transform: glitchEffect ? "translate(2px, -2px)" : "translate(0)",
                      transition: "all 0.2s ease",
                    },
                  }}
                >
                  404
                </Typography>

                {/* Error Icon */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 80, md: 100 },
                      height: { xs: 80, md: 100 },
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 20px 60px rgba(239, 68, 68, 0.3)",
                      animation: "pulse 2s ease-in-out infinite",
                      "@keyframes pulse": {
                        "0%, 100%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.05)" },
                      },
                    }}
                  >
                    <ErrorOutline sx={{ fontSize: { xs: 40, md: 50 }, color: "white" }} />
                  </Box>
                </Box>
              </Box>
            </Grow>

            {/* Content Card */}
            <Grow in={visible} timeout={1500}>
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(40px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  p: { xs: 4, md: 6 },
                  maxWidth: 600,
                  mx: "auto",
                  mb: 4,
                }}
              >
                {/* Main Heading */}
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    fontWeight: 800,
                    color: "white",
                    mb: 2,
                  }}
                >
                  Oops! Page Not Found
                </Typography>

                {/* Description */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "#94a3b8",
                    mb: 4,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.6,
                  }}
                >
                  The page you're looking for seems to have vanished into the digital void. It might have been moved,
                  deleted, or you may have entered the wrong URL.
                </Typography>

                {/* Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    justifyContent: "center",
                    mb: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGoHome}
                    startIcon={<Home />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: "none",
                      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      boxShadow: "0 15px 40px rgba(59, 130, 246, 0.4)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-3px) scale(1.02)",
                        boxShadow: "0 20px 50px rgba(59, 130, 246, 0.5)",
                      },
                    }}
                  >
                    Go Home
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleGoBack}
                    startIcon={<ArrowBack />}
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
                    Go Back
                  </Button>
                </Box>

                
              </Paper>
            </Grow>

       
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default Error404
