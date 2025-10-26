
import { useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  Fade,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import {
  ArrowBack,
  Event,
  Description,
  Schedule,
  Preview,
  Save,
  CheckCircle,
  CalendarToday,
  AccessTime,
  Title,
  Notes,
  ExpandMore,
  Campaign,
  Timeline,
  Assessment,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const CreateElection = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    category: "",
    priority: "medium",
  })

  // Validation errors
  const [errors, setErrors] = useState({})

  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()

  const steps = [
    {
      label: "Basic Details",
      icon: <Event />,
      description: "Election title and description",
    },
    {
      label: "Schedule",
      icon: <Schedule />,
      description: "Start and end times",
    },
    {
      label: "Preview",
      icon: <Preview />,
      description: "Review and submit",
    },
  ]

  const categories = [
    { value: "general", label: "General Election" },
    { value: "local", label: "Local Election" },
    { value: "student", label: "Student Election" },
    { value: "corporate", label: "Corporate Election" },
    { value: "community", label: "Community Election" },
  ]

  const priorities = [
    { value: "low", label: "Low Priority", color: "#10b981" },
    { value: "medium", label: "Medium Priority", color: "#f59e0b" },
    { value: "high", label: "High Priority", color: "#ef4444" },
  ]

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 0) {
      if (!formData.title.trim()) {
        newErrors.title = "Election title is required"
      } else if (formData.title.length < 3) {
        newErrors.title = "Title must be at least 3 characters long"
      } else if (formData.title.length > 100) {
        newErrors.title = "Title must be less than 100 characters"
      }

      if (!formData.description.trim()) {
        newErrors.description = "Description is required"
      } else if (formData.description.length < 10) {
        newErrors.description = "Description must be at least 10 characters long"
      } else if (formData.description.length > 500) {
        newErrors.description = "Description must be less than 500 characters"
      }

      if (!formData.category) {
        newErrors.category = "Please select a category"
      }
    }

    if (step === 1) {
      if (!formData.startTime) {
        newErrors.startTime = "Start time is required"
      } else {
        const startDate = new Date(formData.startTime)
        const now = new Date()
        if (startDate <= now) {
          newErrors.startTime = "Start time must be in the future"
        }
      }

      if (!formData.endTime) {
        newErrors.endTime = "End time is required"
      } else if (formData.startTime) {
        const startDate = new Date(formData.startTime)
        const endDate = new Date(formData.endTime)
        if (endDate <= startDate) {
          newErrors.endTime = "End time must be after start time"
        }

        const timeDiff = endDate - startDate
        const hoursDiff = timeDiff / (1000 * 60 * 60)
        if (hoursDiff < 1) {
          newErrors.endTime = "Election must run for at least 1 hour"
        }
        if (hoursDiff > 8760) {
          // 1 year
          newErrors.endTime = "Election cannot run for more than 1 year"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(0) || !validateStep(1)) {
      showSnackbar("Please fix all validation errors", "error")
      return
    }

    setLoading(true)
    try {
      console.log(formData)
      const response = await axios.post(
        "http://localhost:5000/api/election",
        {
          title: formData.title,
          description: formData.description,
          startTime: formData.startTime,
          endTime: formData.endTime,
          category: formData.category,
          priority: formData.priority,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.status === 201) {
        showSnackbar("Election created successfully!", "success")
        setTimeout(() => {
          navigate("/elections")
        }, 2000)
      }
    } catch (error) {
      console.error("Error creating election:", error)
      showSnackbar(error.response?.data?.message || "Error creating election. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const handleBackToElections = () => {
    navigate("/admin/dashboard")
  }

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Not set"
    return new Date(dateTimeString).toLocaleString()
  }

  const calculateDuration = () => {
    if (!formData.startTime || !formData.endTime) return "Not calculated"
    const start = new Date(formData.startTime)
    const end = new Date(formData.endTime)
    const diff = end - start
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Fade in timeout={600}>
  <Box>
    <Typography variant="h5" className="font-bold text-gray-800 mb-6 text-center">
      Basic Election Details
    </Typography>

    <Grid container direction="column">
      {/* Election Title */}
      <Grid item className="mb-6">
        <TextField
          fullWidth
          label="Election Title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          error={!!errors.title}
          helperText={errors.title || "Enter a clear, descriptive title for your election"}
          InputProps={{
            startAdornment: (
              <Box className="mr-3">
                <Title className="text-purple-600" />
              </Box>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        />
      </Grid>

      {/* Description */}
      <Grid item className="mb-6">
        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          error={!!errors.description}
          helperText={errors.description || "Provide a detailed description of the election"}
          multiline
          rows={6}
          InputProps={{
            startAdornment: (
              <Box className="mr-3 mt-3">
                <Notes className="text-purple-600" />
              </Box>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        />
      </Grid>

      {/* Category */}
      <Grid item className="mb-6">
        <FormControl
          fullWidth
          error={!!errors.category}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            label="Category"
            startAdornment={
              <Box className="mr-3">
                <Campaign className="text-purple-600" />
              </Box>
            }
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.category || "Select the type of election"}</FormHelperText>
        </FormControl>
      </Grid>

      {/* Reserved Field */}
      <Grid item className="mb-6">
        <FormControl
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        >
          {/* Placeholder for future field */}
        </FormControl>
      </Grid>
    </Grid>
  </Box>
</Fade>

        )

      case 1:
        return (
          <Fade in timeout={600}>
            <Box>
              <Typography variant="h5" className="font-bold text-gray-800 mb-6 text-center">
                Election Schedule
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Start Date & Time"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                    error={!!errors.startTime}
                    helperText={errors.startTime || "When should the election begin?"}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <Box className="mr-3">
                          <CalendarToday className="text-green-600" />
                        </Box>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="End Date & Time"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                    error={!!errors.endTime}
                    helperText={errors.endTime || "When should the election end?"}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <Box className="mr-3">
                          <AccessTime className="text-orange-600" />
                        </Box>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                        },
                      },
                    }}
                  />
                </Grid>

                {formData.startTime && formData.endTime && (
                  <Grid item xs={12}>
                    <Paper
                      elevation={8}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                      }}
                    >
                      <Box className="flex items-center space-x-3 mb-3">
                        <Box className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Timeline className="text-blue-600" />
                        </Box>
                        <Typography variant="h6" className="font-semibold text-gray-800">
                          Election Duration
                        </Typography>
                      </Box>
                      <Typography variant="body1" className="text-gray-700">
                        <strong>Duration:</strong> {calculateDuration()}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 mt-1">
                        From {formatDateTime(formData.startTime)} to {formatDateTime(formData.endTime)}
                      </Typography>
                    </Paper>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Alert
                    severity="info"
                    sx={{
                      borderRadius: 3,
                      "& .MuiAlert-icon": {
                        color: "#3b82f6",
                      },
                    }}
                  >
                    <Typography variant="body2">
                      <strong>Important:</strong> Make sure to set appropriate start and end times. Elections must run
                      for at least 1 hour and cannot exceed 1 year in duration.
                    </Typography>
                  </Alert>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        )

      case 2:
        return (
          <Fade in timeout={600}>
            <Box>
              <Typography variant="h5" className="font-bold text-gray-800 mb-6 text-center">
                Review Election Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Paper
                    elevation={16}
                    sx={{
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Header */}
                    <Box
                      sx={{
                        background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                        p: 4,
                        position: "relative",
                      }}
                    >
                      <Box className="flex items-center justify-center space-x-4">
                        <Box className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <Event className="text-white text-2xl" />
                        </Box>
                        <Box className="text-center">
                          <Typography variant="h4" className="font-bold text-white mb-1">
                            {formData.title || "Election Title"}
                          </Typography>
                          <Chip
                            label={categories.find((c) => c.value === formData.category)?.label || "Category"}
                            sx={{
                              backgroundColor: "rgba(255,255,255,0.2)",
                              color: "white",
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Decorative elements */}
                      <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
                      <Box className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></Box>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 4 }}>
                      <Grid container spacing={4}>
                        {/* Description */}
                        <Grid item xs={12}>
                          <Accordion
                            defaultExpanded
                            sx={{
                              borderRadius: 3,
                              "&:before": { display: "none" },
                              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                              sx={{
                                background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                                borderRadius: "12px 12px 0 0",
                              }}
                            >
                              <Box className="flex items-center space-x-3">
                                <Description className="text-purple-600" />
                                <Typography variant="h6" className="font-semibold">
                                  Description
                                </Typography>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 3 }}>
                              <Typography variant="body1" className="text-gray-700 leading-relaxed">
                                {formData.description || "No description provided"}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>

                        {/* Schedule Details */}
                        <Grid item xs={12} md={6}>
                          <Paper
                            elevation={8}
                            sx={{
                              p: 3,
                              borderRadius: 3,
                              background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                              border: "1px solid rgba(59, 130, 246, 0.2)",
                            }}
                          >
                            <Box className="flex items-center space-x-3 mb-3">
                              <Box className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <CalendarToday className="text-blue-600" />
                              </Box>
                              <Typography variant="h6" className="font-semibold text-gray-800">
                                Start Time
                              </Typography>
                            </Box>
                            <Typography variant="body1" className="text-gray-700">
                              {formatDateTime(formData.startTime)}
                            </Typography>
                          </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Paper
                            elevation={8}
                            sx={{
                              p: 3,
                              borderRadius: 3,
                              background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                              border: "1px solid rgba(245, 158, 11, 0.2)",
                            }}
                          >
                            <Box className="flex items-center space-x-3 mb-3">
                              <Box className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <AccessTime className="text-orange-600" />
                              </Box>
                              <Typography variant="h6" className="font-semibold text-gray-800">
                                End Time
                              </Typography>
                            </Box>
                            <Typography variant="body1" className="text-gray-700">
                              {formatDateTime(formData.endTime)}
                            </Typography>
                          </Paper>
                        </Grid>

                        {/* Additional Details */}
                        <Grid item xs={12} md={6}>
                          <Paper
                            elevation={8}
                            sx={{
                              p: 3,
                              borderRadius: 3,
                              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                              border: "1px solid rgba(34, 197, 94, 0.2)",
                            }}
                          >
                            <Box className="flex items-center space-x-3 mb-3">
                              <Box className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Timeline className="text-green-600" />
                              </Box>
                              <Typography variant="h6" className="font-semibold text-gray-800">
                                Duration
                              </Typography>
                            </Box>
                            <Typography variant="body1" className="text-gray-700">
                              {calculateDuration()}
                            </Typography>
                          </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Paper
                            elevation={8}
                            sx={{
                              p: 3,
                              borderRadius: 3,
                              background: "linear-gradient(135deg, #fdf2f8, #fce7f3)",
                              border: "1px solid rgba(236, 72, 153, 0.2)",
                            }}
                          >
                            <Box className="flex items-center space-x-3 mb-3">
                              <Box className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                <Assessment className="text-pink-600" />
                              </Box>
                              <Typography variant="h6" className="font-semibold text-gray-800">
                                Priority
                              </Typography>
                            </Box>
                            <Box className="flex items-center space-x-2">
                              <Box
                                className="w-3 h-3 rounded-full"
                                sx={{
                                  backgroundColor:
                                    priorities.find((p) => p.value === formData.priority)?.color || "#6b7280",
                                }}
                              />
                              <Typography variant="body1" className="text-gray-700">
                                {priorities.find((p) => p.value === formData.priority)?.label || "Medium Priority"}
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      </Grid>

                      {/* Final Confirmation */}
                      <Box className="mt-6">
                        <Alert
                          severity="success"
                          sx={{
                            borderRadius: 3,
                            "& .MuiAlert-icon": {
                              color: "#10b981",
                            },
                          }}
                        >
                          <Typography variant="body2">
                            <strong>Ready to create:</strong> Please review all details above. Once created, you can
                            manage candidates and start the election from the elections list.
                          </Typography>
                        </Alert>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        )

      default:
        return null
    }
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
        {[...Array(15)].map((_, i) => (
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

      {/* Main Content */}
      <Box className="relative z-10 min-h-screen flex flex-col">
        <Container maxWidth="lg" sx={{ flex: 1, display: "flex", flexDirection: "column", py: 4 }}>
          <Fade in timeout={1000}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Header */}
              <Box className="text-center mb-8">
                <Box className="flex items-center justify-center mb-6">
                  <IconButton
                    onClick={handleBackToElections}
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
                      Create New Election
                    </Typography>
                    <Typography variant="h6" className="text-gray-600">
                      Set up a new election with all necessary details
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Stepper */}
              <Box className="flex justify-center mb-8">
                <Paper
                  elevation={16}
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    p: 4,
                    maxWidth: 800,
                    width: "100%",
                  }}
                >
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel
                          StepIconComponent={({ active, completed }) => (
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: completed
                                  ? "linear-gradient(135deg, #10b981, #059669)"
                                  : active
                                    ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
                                    : "linear-gradient(135deg, #e5e7eb, #d1d5db)",
                                color: completed || active ? "white" : "#6b7280",
                                transition: "all 0.3s ease",
                                transform: active ? "scale(1.1)" : "scale(1)",
                              }}
                            >
                              {completed ? <CheckCircle /> : step.icon}
                            </Box>
                          )}
                        >
                          <Typography variant="h6" className="font-semibold mt-2">
                            {step.label}
                          </Typography>
                          <Typography variant="body2" className="text-gray-500">
                            {step.description}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Paper>
              </Box>

              {/* Form Content */}
              <Box className="flex justify-center flex-1">
                <Paper
                  elevation={24}
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    p: 6,
                    maxWidth: 900,
                    width: "100%",
                    minHeight: 500,
                  }}
                >
                  {renderStepContent()}

                 {/* Navigation Buttons */}
<Box className="flex justify-between mt-8">
  {/* Only show Back button if not on step 0 */}
  {activeStep !== 0 ? (
    <Button
      onClick={handleBack}
      startIcon={<ArrowBack />}
      sx={{
        px: 4,
        py: 1.5,
        borderRadius: 3,
        fontWeight: 600,
        textTransform: "none",
        color: "#6b7280",
        "&:hover": {
          backgroundColor: "rgba(107, 114, 128, 0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      Back
    </Button>
  ) : (
    <Box /> // keeps spacing consistent
  )}

  <Box className="flex space-x-3">
    {activeStep < steps.length - 1 ? (
      <Button
        onClick={handleNext}
        endIcon={<ArrowBack sx={{ transform: "rotate(180deg)" }} />}
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
        Next Step
      </Button>
    ) : (
      <Button
        onClick={handleSubmit}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 3,
          background: "linear-gradient(135deg, #10b981, #059669)",
          color: "white",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": {
            background: "linear-gradient(135deg, #059669, #047857)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
          },
          "&:disabled": {
            background: "linear-gradient(135deg, #9ca3af, #6b7280)",
          },
        }}
      >
        {loading ? "Creating..." : "Create Election"}
      </Button>
    )}
  </Box>
</Box>

                </Paper>
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

export default CreateElection
