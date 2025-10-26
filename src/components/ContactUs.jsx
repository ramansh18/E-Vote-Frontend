import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Paper,
  TextField,
  Fade,
  Grow,
  Snackbar,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Schedule,
  Send,
  Support,
  Business,
  Help,
  Security,
  Language,
  Groups,
  Chat,
  ContactSupport,
  Public,
  AccessTime,
} from "@mui/icons-material";

const ContactUs = () => {
  const [showContent, setShowContent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const textFieldStyle = {
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
  };

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSnackbar({
        open: true,
        message:
          "Thank you for your message! We'll get back to you within 24 hours.",
        severity: "success",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <Email />,
      title: "Email Support",
      description: "Get help via email",
      contact: "ramansh8055@gmail.com",
      action: "Send Email",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      responseTime: "Within 4 hours",
    },
    {
      icon: <Phone />,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+91 8188875241",
      action: "Call Now",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      responseTime: "Immediate",
    },
    {
      icon: <Chat />,
      title: "Live Chat",
      description: "Chat with support",
      contact: "Available 24/7",
      action: "Start Chat",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      responseTime: "Real-time",
    },
    {
      icon: <Help />,
      title: "Help Center",
      description: "Browse our knowledge base",
      contact: "Self-service portal",
      action: "Visit Center",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      responseTime: "Instant",
    },
  ];

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
        <Fade in={showContent} timeout={1000}>
          <div>
            {/* Hero Section */}
            <Box className="text-center mb-16">
              <Box className="flex justify-center mb-8">
                <Box className="relative">
                  <Box className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <ContactSupport className="text-white text-5xl" />
                  </Box>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                </Box>
              </Box>

              <Typography
                variant="h2"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
                sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
              >
                Get in Touch
              </Typography>

              <Box className="flex justify-center mb-3">
                <Typography
                  variant="h5"
                  className="text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
                  sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
                >
                  Have questions about E-Vote? Need technical support? Want to
                  discuss enterprise solutions? We're here to help you every
                  step of the way.
                </Typography>
              </Box>
            </Box>

            {/* Contact Form and Office Locations */}
            <Grid
              container
              spacing={6}
              justifyContent="center"
              className="mb-16"
            >
              {/* Contact Form */}
              <Grid item xs={12} md={10} lg={10}>
                <Grow in={showContent} timeout={1200}>
                  <Paper
                    elevation={24}
                    sx={{
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      p: 6,
                      mx: "auto",
                      width: "100%",
                      maxWidth: "1000px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      className="font-bold text-gray-800 mb-6"
                    >
                      Send Us a Message
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                      <TextField
                        name="name"
                        label="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        variant="outlined"
                        sx={{
                          mt: 3,
                          mb: 2,
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

                      <TextField
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        variant="outlined"
                        sx={{
                          mb: 2,
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

                      <TextField
                        name="subject"
                        label="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        variant="outlined"
                        sx={{
                          mb: 2,
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

                      <TextField
                        name="message"
                        label="Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                          mb: 2,
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

                      <Box textAlign="center">
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          startIcon={
                            loading ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : (
                              <Send />
                            )
                          }
                          sx={{
                            px: 5,
                            py: 1.5,
                            fontSize: "1rem",
                            fontWeight: 700,
                            borderRadius: 4,
                            textTransform: "none",
                            background:
                              "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              background:
                                "linear-gradient(135deg, #2563eb, #7c3aed)",
                              transform: "translateY(-2px) scale(1.02)",
                              boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4)",
                            },
                            "&:disabled": {
                              background:
                                "linear-gradient(135deg, #9ca3af, #6b7280)",
                              transform: "none",
                            },
                          }}
                        >
                          {loading ? "Sending Message..." : "Send Message"}
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grow>
              </Grid>
            </Grid>

            {/* Contact Methods */}
            <Box className="mb-16">
              <Box className="text-center mb-12">
                <Typography
                  variant="h3"
                  className="font-bold text-gray-800 mb-4"
                >
                  How Can We Help?
                </Typography>
                <Box className="flex justify-center">
                  <Typography
                    variant="h6"
                    className="text-gray-600 max-w-3xl mx-auto"
                  >
                    Choose the best way to reach us based on your needs and
                    urgency
                  </Typography>
                </Box>
              </Box>

              {/* Centered container with fixed card layout */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start", // Change from "center" to "flex-start"
                  mx: "auto",
                  maxWidth: "1200px",
                  paddingLeft: "60px", // Add left padding to shift it right from the left edge
                }}
              >
                <Grid
                  container
                  spacing={3} // Reduced spacing between cards
                  sx={{
                    justifyContent: "center", // Center the grid items
                    maxWidth: "100%",
                  }}
                >
                  {contactMethods.map((method, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Grow in={showContent} timeout={800 + index * 200}>
                        <Card
                          sx={{
                            borderRadius: 4,
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            height: "320x", // Slightly reduced height
                            width: "250px", // Reduced width to fit all cards in one row
                            mx: "auto", // Center each card
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-8px) scale(1.02)",
                              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                            },
                          }}
                        >
                          <CardContent
                            sx={{
                              p: 2.5, // Reduced padding
                              textAlign: "center",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between", // Distribute content evenly
                            }}
                          >
                            <Box>
                              <Box
                                sx={{
                                  width: 56, // Slightly smaller icon
                                  height: 56,
                                  borderRadius: 4,
                                  background: method.gradient,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                  mx: "auto",
                                  mb: 2.5,
                                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                                }}
                              >
                                {method.icon}
                              </Box>

                              <Typography
                                variant="h6"
                                className="font-bold text-gray-800 mb-2"
                                sx={{
                                  minHeight: "32px", // Fixed height for title
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "1rem", // Slightly smaller font
                                }}
                              >
                                {method.title}
                              </Typography>

                              <Typography
                                variant="body2"
                                className="text-gray-600 mb-3"
                                sx={{
                                  minHeight: "60px", // Fixed height for description
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "0.85rem", // Slightly smaller font
                                }}
                              >
                                {method.description}
                              </Typography>

                              <Typography
                                variant="body1"
                                className="font-semibold text-gray-800 mb-2"
                                sx={{
                                  minHeight: "28px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {method.title.includes("Email") ||
                                method.title.includes("Phone") ? (
                                  <a
                                    href={
                                      method.title.includes("Email")
                                        ? `mailto:${method.contact}`
                                        : `tel:${method.contact.replace(
                                            /\s+/g,
                                            ""
                                          )}`
                                    }
                                    style={{
                                      color: "#1d4ed8",
                                      textDecoration: "none",
                                    }}
                                  >
                                    {method.contact}
                                  </a>
                                ) : (
                                  method.contact
                                )}
                              </Typography>

                              <Box sx={{ mb: 2.5 }}>
                                <Chip
                                  label={method.responseTime}
                                  size="small"
                                  sx={{
                                    background:
                                      "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                                    color: "#3b82f6",
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                  }}
                                />
                              </Box>
                            </Box>

                            {method.title.includes("Email") ||
                            method.title.includes("Phone") ? (
                              <a
                                href={
                                  method.title.includes("Email")
                                    ? `mailto:${method.contact}`
                                    : `tel:${method.contact.replace(
                                        /\s+/g,
                                        ""
                                      )}`
                                }
                                style={{ textDecoration: "none" }}
                              >
                                <Button
                                  variant="contained"
                                  fullWidth
                                  sx={{
                                    background: method.gradient,
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    py: 1.25,
                                    fontSize: "0.9rem",
                                    "&:hover": {
                                      transform: "translateY(-2px)",
                                      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                                    },
                                  }}
                                >
                                  {method.action}
                                </Button>
                              </a>
                            ) : (
                              <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                  background: method.gradient,
                                  fontWeight: 600,
                                  borderRadius: 3,
                                  py: 1.25,
                                  fontSize: "0.9rem",
                                  "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                                  },
                                }}
                              >
                                {method.action}
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </Grow>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </div>
        </Fade>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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
  );
};

export default ContactUs;
