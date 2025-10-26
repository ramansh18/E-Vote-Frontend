import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Fade,
  Slide,
  Zoom,
} from "@mui/material";
import {
  HowToVote,
  Security,
  Speed,
  Verified,
  TrendingUp,
  People,
  Public,
  Star,
  ArrowForward,
  PlayArrow,
  Shield,
  Timeline,
  Groups,
  AccountBalance,
  Smartphone,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import TestimonialsCarousel from "../components/TestimonialCaraousel";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setStatsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <HowToVote sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Easy Voting",
      description:
        "Vote easily from anywhere, anytime with our secure digital platform. Simple, intuitive interface designed for everyone.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Security sx={{ fontSize: 40, color: "#10b981" }} />,
      title: "Blockchain Security",
      description:
        "Every vote is secured with advanced blockchain technology, ensuring complete transparency and tamper-proof results.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: "#8b5cf6" }} />,
      title: "Instant Results",
      description:
        "Get election results as votes are cast. No more waiting days for outcomes with our instant counting system.",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: <Verified sx={{ fontSize: 40, color: "#f59e0b" }} />,
      title: "Verified Identity",
      description:
        "Advanced identity verification ensures only eligible voters can participate, maintaining election integrity.",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const stats = [
    { number: "1M+", label: "Votes Cast", icon: <HowToVote /> },
    { number: "50K+", label: "Active Users", icon: <People /> },
    { number: "200+", label: "Elections Held", icon: <Public /> },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp /> },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Election Commissioner",
      avatar: "SJ",
      rating: 5,
      comment:
        "E-Vote has revolutionized how we conduct elections. The transparency and security are unmatched.",
    },
    {
      name: "Michael Chen",
      role: "University Student",
      avatar: "MC",
      rating: 5,
      comment:
        "Finally, a voting system that's accessible and easy to use. Voted from my dorm room!",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Political Scientist",
      avatar: "ER",
      rating: 5,
      comment:
        "The blockchain technology ensures complete transparency. This is the future of democratic participation.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Register",
      description: "Create your secure account with identity verification",
      icon: <Groups />,
    },
    {
      step: "02",
      title: "Verify",
      description:
        "Complete the verification process to ensure election integrity",
      icon: <Shield />,
    },
    {
      step: "03",
      title: "Vote",
      description: "Cast your vote securely from anywhere, anytime",
      icon: <HowToVote />,
    },
    {
      step: "04",
      title: "Track",
      description: "Monitor results with complete transparency",
      icon: <Timeline />,
    },
  ];

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "85vh",
          background:
            "linear-gradient(135deg, #1a202c 0%, #1e3a8a 50%, #312e81 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          pt: { xs: 12, md: 16 }, // Add this line for top padding
        }}
      >
        {/* Animated Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)
            `,
            animation: "pulse 4s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 0.5 },
              "50%": { opacity: 0.8 },
            },
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: { xs: 3, md: 4 },
              height: { xs: 3, md: 4 },
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: "50%",
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-15px)" },
              },
            }}
          />
        ))}

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={visible} timeout={1000}>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      mb: 2,
                      color: "white",
                      textShadow: "2px 2px 20px rgba(0,0,0,0.3)",
                      lineHeight: 1.1,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    The Future of
                    <Box
                      component="span"
                      sx={{
                        background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "block",
                      }}
                    >
                      Democratic Voting
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: "rgba(255,255,255,0.9)",
                      fontWeight: 400,
                      lineHeight: 1.6,
                      fontSize: "1.1rem",
                    }}
                  >
                    Experience secure, transparent, and accessible digital
                    voting powered by blockchain technology. Your voice matters,
                    and we ensure it's heard.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Button
                      component={Link}
                      to="/register"
                      variant="contained"
                      size="medium"
                      endIcon={<ArrowForward />}
                      sx={{
                        px: 3,
                        py: 1.5,
                        fontSize: 16,
                        fontWeight: 700,
                        borderRadius: 3,
                        background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                        boxShadow: "0 6px 24px rgba(255, 107, 107, 0.4)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px) scale(1.03)",
                          boxShadow: "0 8px 32px rgba(255, 107, 107, 0.6)",
                        },
                      }}
                    >
                      Start Voting Now
                    </Button>
                    {/* <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<PlayArrow />}
                      sx={{
                        px: 3,
                        py: 1.5,
                        fontSize: 14,
                        fontWeight: 600,
                        borderRadius: 3,
                        color: "white",
                        borderColor: "rgba(255,255,255,0.5)",
                        backdropFilter: "blur(10px)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderColor: "white",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      Watch Demo
                    </Button> */}
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={visible} timeout={1200}>
                <Box
                  sx={{
                    position: "relative",
                    textAlign: "center",
                  }}
                >
                  {/* Hero Illustration using Icons */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      maxWidth: 350,
                      height: 280,
                      mx: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Central Voting Box */}
                    <Paper
                      elevation={20}
                      sx={{
                        width: 140,
                        height: 140,
                        borderRadius: 3,
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        animation: "glow 2s ease-in-out infinite alternate",
                        "@keyframes glow": {
                          from: {
                            boxShadow: "0 0 15px rgba(102, 126, 234, 0.5)",
                          },
                          to: {
                            boxShadow: "0 0 30px rgba(102, 126, 234, 0.8)",
                          },
                        },
                      }}
                    >
                      <AccountBalance sx={{ fontSize: 60, color: "white" }} />
                    </Paper>

                    {/* Floating Security Icons */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "10%",
                        right: "10%",
                        animation: "bounce 2s infinite",
                        "@keyframes bounce": {
                          "0%, 20%, 50%, 80%, 100%": {
                            transform: "translateY(0)",
                          },
                          "40%": { transform: "translateY(-8px)" },
                          "60%": { transform: "translateY(-4px)" },
                        },
                      }}
                    >
                      <Paper
                        elevation={6}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          backgroundColor: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Security sx={{ color: "#10b981", fontSize: 24 }} />
                      </Paper>
                    </Box>

                    {/* Floating Speed Icon */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "15%",
                        left: "5%",
                        animation: "float 3s ease-in-out infinite",
                      }}
                    >
                      <Paper
                        elevation={6}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          backgroundColor: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Speed sx={{ color: "#8b5cf6", fontSize: 24 }} />
                      </Paper>
                    </Box>
                  </Box>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section - Centered */}
      <Box sx={{ py: 6, backgroundColor: "#f8fafc" }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
              Trusted Worldwide
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join millions who trust E-Vote for secure democratic participation
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Zoom in={statsVisible} timeout={500 + index * 200}>
                  <Paper
                    elevation={6}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px) scale(1.03)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 1.5, color: "rgba(255,255,255,0.8)" }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {stat.label}
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Back to 2x2 Grid */}
      <Box sx={{ py: 8, backgroundColor: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mb: 2,
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Why Choose E-Vote?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Experience the next generation of democratic participation with
              our cutting-edge features
            </Typography>
          </Box>

          <Box
  sx={{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  }}
>
  <Grid
    container
    spacing={3}
    sx={{
      width: 770,
      maxWidth: 900, 
      // max width for all cards combined
      margin: '0 auto', // center horizontally
    }}
  >
    {features.map((feature, index) => (
      <Grid item xs={12} md={6} key={index}>
        <Fade in={visible} timeout={1000 + index * 200}>
          <Card
            elevation={8}
            sx={{
              height: 200,
              borderRadius: 3,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box
              sx={{
                height: 4,
                background: `linear-gradient(90deg, ${feature.color})`,
              }}
            />
            <CardContent
              sx={{
                p: 3,
                flex: 1,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2.5,
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${feature.color})`,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 60,
                  height: 60,
                }}
              >
                {feature.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Grid>
    ))}
  </Grid>
</Box>

        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8, backgroundColor: "#f8fafc" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
              How It Works
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Get started with secure voting in just four simple steps
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {steps.map((step, index) => (
              <Grid item xs={12}md={6} key={index}>
                <Fade in={visible} timeout={1200 + index * 200}>
                  <Box sx={{ textAlign: "center", position: "relative" }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                        color: "white",
                        fontSize: 24,
                        position: "relative",
                        "&::before": {
                          content: `"${step.step}"`,
                          position: "absolute",
                          top: -8,
                          right: -8,
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          backgroundColor: "#ff6b6b",
                          color: "white",
                          fontSize: 12,
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Fade in={visible} timeout={1600}>
            <Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                Ready to Make Your Voice Heard?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                Join millions of users who trust E-Vote for secure, transparent
                democratic participation
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="medium"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 3,
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: 700,
                    borderRadius: 3,
                    backgroundColor: "white",
                    color: "#667eea",
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="medium"
                  sx={{
                    px: 3,
                    py: 1.5,
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 3,
                    color: "white",
                    borderColor: "rgba(255,255,255,0.5)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "white",
                    },
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
