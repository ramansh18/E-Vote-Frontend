"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography, Card, CardContent, Fade, Grow } from "@mui/material"
import {
  AdminPanelSettings as AdminIcon,
  Home as HomeIcon,
  ArrowBack as BackIcon,
  Security as SecurityIcon,
} from "@mui/icons-material"

const UnauthorizedAccess = () => {
  const navigate = useNavigate()
  const [showContent, setShowContent] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setShowContent(true)

    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  const handleGoHome = () => {
    navigate("/")
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-16">
        <Fade in={showContent} timeout={800}>
          <div className="w-full max-w-2xl">
            {/* Main Error Card */}
            <Grow in={showContent} timeout={1000}>
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: 6,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  overflow: "visible",
                  position: "relative",
                }}
              >
                {/* Warning Icon Background */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <AdminIcon sx={{ fontSize: 48, color: "white" }} />
                  </div>
                </div>

                <CardContent sx={{ pt: 8, pb: 6, px: 6 }}>
                  <div className="text-center mb-8">
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        background: "linear-gradient(135deg, #ef4444, #f97316)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 3,
                      }}
                    >
                      Access Denied
                    </Typography>

                    <Typography
                      variant="h5"
                      sx={{
                        color: "#6b7280",
                        fontWeight: 600,
                        mb: 4,
                        lineHeight: 1.6,
                      }}
                    >
                      Administrator Privileges Required
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "#9ca3af",
                        fontSize: "1.1rem",
                        lineHeight: 1.8,
                        maxWidth: "500px",
                        mx: "auto",
                      }}
                    >
                      You don't have the necessary permissions to access this page. This area is restricted to
                      administrators only.
                    </Typography>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<HomeIcon />}
                      onClick={handleGoHome}
                      sx={{
                        px: 4,
                        py: 2,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                        boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 12px 35px rgba(59, 130, 246, 0.4)",
                        },
                      }}
                    >
                      Go to Homepage
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<BackIcon />}
                      onClick={handleGoBack}
                      sx={{
                        px: 4,
                        py: 2,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        borderColor: "#ef4444",
                        color: "#ef4444",
                        borderWidth: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#ef4444",
                          color: "white",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
                          borderWidth: 2,
                        },
                      }}
                    >
                      Go Back
                    </Button>
                  </div>

                  {/* Login Suggestion */}
                  <div className="text-center">
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#9ca3af",
                        mb: 2,
                      }}
                    >
                      Need admin access?
                    </Typography>
                    <Button
                      variant="text"
                      onClick={handleLogin}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#f97316",
                        "&:hover": {
                          backgroundColor: "rgba(249, 115, 22, 0.1)",
                        },
                      }}
                    >
                      Login with Admin Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grow>

           
          </div>
        </Fade>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}

export default UnauthorizedAccess
