import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Container,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Election Commissioner",
    avatar: "/placeholder.svg?height=80&width=80",
    comment:
      "This e-voting platform has revolutionized our election process. The security features and user-friendly interface make it perfect for modern democratic participation.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "IT Security Specialist",
    avatar: "/placeholder.svg?height=80&width=80",
    comment:
      "The blockchain-based verification system gives me complete confidence in the integrity of the voting process. Outstanding security implementation.",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Political Science Professor",
    avatar: "/placeholder.svg?height=80&width=80",
    comment:
      "As someone who studies democratic processes, I'm impressed by how this platform maintains transparency while ensuring voter privacy. Truly innovative.",
    rating: 5,
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Municipal Clerk",
    avatar: "/placeholder.svg?height=80&width=80",
    comment:
      "The ease of setup and administration has saved our office countless hours. Voters love the intuitive interface, and we love the detailed analytics.",
    rating: 4,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Civic Engagement Director",
    avatar: "/placeholder.svg?height=80&width=80",
    comment:
      "This platform has significantly increased voter participation in our community. The accessibility features ensure everyone can participate in democracy.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  const handleSlideChange = (newIndex) => {
    setIsTransitioning(true);
    setCurrentIndex(newIndex);

    if (newIndex >= testimonials.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
    } else if (newIndex < 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonials.length - 1);
      }, 500);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        handleSlideChange(currentIndex + 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, currentIndex]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        sx={{
          fontSize: 24,
          color: index < rating ? "#fbbf24" : "rgba(255,255,255,0.2)",
        }}
      />
    ));
  };

  const extendedTestimonials = [...testimonials, testimonials[0]];

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(to right, #3b82f6, #9333ea, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          What Our Users Say
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
          Trusted by election officials, security experts, and civic leaders worldwide
        </Typography>
      </Box>

      <Box
        ref={carouselRef}
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 6,
          mb: 8, // Added margin bottom for space between cards and navigation
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          sx={{
            display: "flex",
            transition: isTransitioning ? "transform 0.5s ease-out" : "none",
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {extendedTestimonials.map((testimonial, index) => (
            <Box
              key={`${testimonial.id}-${index}`}
              sx={{
                minWidth: "100%",
                px: 3,
                py: 4, // Added vertical padding for space above and below cards
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 6,
                  boxShadow: 10,
                  transition: "0.5s",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                  maxWidth: 800,
                  mx: "auto",
                }}
              >
                <CardContent sx={{ p: 6, position: "relative", textAlign: "center" }}>
                  <FormatQuoteIcon
                    sx={{
                      fontSize: 64,
                      position: "absolute",
                      top: 16,
                      left: 16,
                      opacity: 0.2,
                    }}
                  />
                  <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{
                        width: 96,
                        height: 96,
                        boxShadow: 6,
                        border: "4px solid rgba(255,255,255,0.3)",
                        fontSize: 32,
                        background: "linear-gradient(to right, #3b82f6, #9333ea)",
                      }}
                    >
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    {renderStars(testimonial.rating)}
                  </Box>

                  <Typography variant="body1" sx={{ mb: 3, fontStyle: "italic", color: "text.primary" }}>
                    "{testimonial.comment}"
                  </Typography>

                  <Typography variant="h6" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" mt={1}>
                    {testimonial.role}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" mt={6} gap={2}>
        {testimonials.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleSlideChange(index)}
            sx={{
              width: 64,
              height: 8,
              borderRadius: 10,
              overflow: "hidden",
              backgroundColor: "#e0e0e0",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: index === currentIndex ? "100%" : "0%",
                height: "100%",
                background: "linear-gradient(to right, #3b82f6, #9333ea)",
                transition: "width 0.5s",
              }}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}