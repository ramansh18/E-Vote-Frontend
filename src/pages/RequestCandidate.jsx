"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Typography,
  CardContent,
  Chip,
  IconButton,
  Fade,
  Grow,
  CircularProgress,
  Box,
  InputAdornment,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Avatar
} from "@mui/material";
import {
  Campaign as CampaignIcon,
  Delete as DeleteIcon,
  HowToVote as VoteIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Pending as PendingIcon,
  Groups as GroupsIcon,
  CalendarToday as CalendarIcon,
  Security as SecurityIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const RequestCandidate = () => {
  const [party, setParty] = useState("");
  const [electionId, setElectionId] = useState("");
  const [electionSymbol, setElectionSymbol] = useState(null);
  const [symbolPreview, setSymbolPreview] = useState(null);
  const [symbolUrl, setSymbolUrl] = useState("");
  const [motto, setMotto] = useState("");
  const [elections, setElections] = useState([]);
  const [candidateRequests, setCandidateRequests] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    requestId: null,
  });
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchElections(), fetchCandidateRequests()]);
    } catch (error) {
      console.error("Error fetching data:", error);
      showSnackbar("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchElections = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/election/upcoming-election",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setElections(response.data);
      console.log(elections)
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

  const fetchCandidateRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/candidate/my-request",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCandidateRequests(response.data.formattedRequests);
    } catch (error) {
      console.error("Error fetching candidate requests:", error);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Upload to your backend API
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // or whatever field name your backend expects

    try {
      setUploadingImage(true);
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming your backend returns { url: "cloudinary_url" } or similar
      const cloudinaryUrl =
        response.data.url || response.data.secure_url || response.data.imageUrl;

      if (cloudinaryUrl) {
        setSymbolUrl(cloudinaryUrl);
        showSnackbar("Image uploaded successfully!", "success");
        return cloudinaryUrl;
      } else {
        throw new Error("No URL returned from upload");
      }
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Failed to upload image",
        "error"
      );
      console.error("Upload error:", error);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        showSnackbar("Please select an image file", "error");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar("File size must be less than 5MB", "error");
        return;
      }

      setElectionSymbol(file);

      // Create local preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        setSymbolPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Upload to backend/Cloudinary
      await uploadToCloudinary(file);
    }
  };

  const handleRemoveSymbol = () => {
    setElectionSymbol(null);
    setSymbolPreview(null);
    setSymbolUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!party.trim() || !electionId || !symbolUrl || !motto) {
      showSnackbar(
        "Please fill in all required fields and upload an election symbol",
        "error"
      );
      return;
    }

    // Check if image is still uploading
    if (uploadingImage) {
      showSnackbar("Please wait for image upload to complete", "warning");
      return;
    }

    try {
      setSubmitting(true);

      // Send JSON data with Cloudinary URL
      const requestData = {
        party: party.trim(),
        electionId: electionId,
        motto : motto,
        symbolUrl: symbolUrl, // Cloudinary URL from your backend
      };

      const response = await axios.post(
        "http://localhost:5000/api/candidate/submit-request",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSnackbar(
        response.data.message || "Candidate request submitted successfully!"
      );

      // Reset form
      setParty("");
      setElectionId("");
      setMotto("");
      setElectionSymbol(null);
      setSymbolPreview(null);
      setSymbolUrl("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await fetchCandidateRequests();
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Failed to submit candidate request",
        "error"
      );
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      setDeleting(true);
      const response = await axios.delete(
        `http://localhost:5000/api/candidate/delete-request/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackbar(response.data.message || "Request deleted successfully!");
      await fetchCandidateRequests();
      setDeleteDialog({ open: false, requestId: null });
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Failed to delete request",
        "error"
      );
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteDialog = (requestId) => {
    setDeleteDialog({ open: true, requestId });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, requestId: null });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon />;
      case "rejected":
        return <ErrorIcon />;
      case "pending":
        return <PendingIcon />;
      default:
        return <PendingIcon />;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
              <CampaignIcon className="text-white text-4xl" />
            </Box>
            <Typography variant="h5" className="text-gray-700 mb-2">
              Loading Candidate Portal...
            </Typography>
            <CircularProgress size={40} sx={{ color: "#3b82f6" }} />
          </Box>
        </Box>
      </Box>
    );
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

      <Box className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Fade in timeout={1000}>
            <div>
              {/* Hero Section */}
              <Box className="text-center mb-12">
                <Box className="flex justify-center mb-6">
                  <Box className="relative">
                    <Box className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                      <CampaignIcon className="text-white text-4xl" />
                    </Box>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                  </Box>
                </Box>
                <Typography
                  variant="h2"
                  className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
                >
                  Candidate Portal
                </Typography>
              </Box>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Registration Form */}
                <Grow in timeout={800}>
                  <Paper
                    elevation={24}
                    sx={{
                      borderRadius: 4,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Form Header */}
                    <Box
                      sx={{
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                        p: 4,
                        position: "relative",
                      }}
                    >
                      <Box className="flex items-center space-x-4">
                        <Box className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <PersonIcon className="text-white" />
                        </Box>
                        <Box>
                          <Typography
                            variant="h5"
                            className="font-bold text-white mb-1"
                          >
                            Submit Candidacy Request
                          </Typography>
                          <Typography variant="body2" className="text-blue-100">
                            Fill in your details to join the election
                          </Typography>
                        </Box>
                      </Box>

                      {/* Decorative elements */}
                      <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
                      <Box className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></Box>
                    </Box>

                    <CardContent sx={{ p: 4 }}>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Select Election */}
                        <Box className="mb-4">
                          <FormControl fullWidth required>
                            <InputLabel className="text-gray-600 font-medium">
                              Select Election
                            </InputLabel>
                            <Select
                              value={electionId}
                              onChange={(e) => setElectionId(e.target.value)}
                              label="Select Election"
                              startAdornment={
                                <InputAdornment position="start">
                                  <CalendarIcon className="text-gray-400 ml-2" />
                                </InputAdornment>
                              }
                              sx={{
                                borderRadius: 3,
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                                },
                                "&.Mui-focused": {
                                  backgroundColor: "rgba(255, 255, 255, 1)",
                                  transform: "translateY(-2px)",
                                  boxShadow:
                                    "0 8px 25px rgba(59, 130, 246, 0.15)",
                                },
                              }}
                            >
                              {elections.map((election) => (
                                <MenuItem
                                  key={election._id}
                                  value={election._id}
                                >
                                  <Box>
                                    <Typography
                                      variant="body1"
                                      className="font-semibold"
                                    >
                                      {election.title}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      className="text-gray-500"
                                    >
                                      {election.description}
                                    </Typography>
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>

                        {/* Party/Organization Name */}
                        <Box className="mb-4">
                          <TextField
                            label="Party/Organization Name"
                            value={party}
                            onChange={(e) => setParty(e.target.value)}
                            required
                            fullWidth
                            placeholder="Enter your party or organization name"
                            variant="outlined"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <GroupsIcon className="text-gray-400" />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                                },
                                "&.Mui-focused": {
                                  backgroundColor: "rgba(255, 255, 255, 1)",
                                  transform: "translateY(-2px)",
                                  boxShadow:
                                    "0 8px 25px rgba(59, 130, 246, 0.15)",
                                },
                              },
                            }}
                          />
                        </Box>

                        {/* motto */}
                          <Box className="mb-4">
                          <TextField
                            label="Motto"
                            value={motto}
                            onChange={(e) => setMotto(e.target.value)}
                            required
                            fullWidth
                            placeholder="Enter your motto"
                            variant="outlined"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <GroupsIcon className="text-gray-400" />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                                },
                                "&.Mui-focused": {
                                  backgroundColor: "rgba(255, 255, 255, 1)",
                                  transform: "translateY(-2px)",
                                  boxShadow:
                                    "0 8px 25px rgba(59, 130, 246, 0.15)",
                                },
                              },
                            }}
                          />
                        </Box>   
                        {/* Election Symbol Upload */}
                        <Box className="mb-4">
                          <Typography
                            variant="subtitle1"
                            className="font-semibold text-gray-700 mb-3"
                          >
                            Election Symbol *
                          </Typography>

                          {!symbolPreview ? (
                            <Box
                              onClick={() =>
                                !uploadingImage && fileInputRef.current?.click()
                              }
                              sx={{
                                border: "2px dashed #d1d5db",
                                borderRadius: 3,
                                p: 4,
                                textAlign: "center",
                                cursor: uploadingImage
                                  ? "not-allowed"
                                  : "pointer",
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                opacity: uploadingImage ? 0.6 : 1,
                                transition: "all 0.3s ease",
                                "&:hover": !uploadingImage && {
                                  borderColor: "#3b82f6",
                                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                                  transform: "translateY(-2px)",
                                },
                              }}
                            >
                              {uploadingImage ? (
                                <>
                                  <CircularProgress
                                    sx={{
                                      fontSize: 48,
                                      color: "#3b82f6",
                                      mb: 2,
                                    }}
                                  />
                                  <Typography
                                    variant="h6"
                                    className="text-blue-600 mb-2"
                                  >
                                    Uploading to Cloud...
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    className="text-blue-500"
                                  >
                                    Please wait while we process your image
                                  </Typography>
                                </>
                              ) : (
                                <>
                                  <CloudUploadIcon
                                    sx={{
                                      fontSize: 48,
                                      color: "#9ca3af",
                                      mb: 2,
                                    }}
                                  />
                                  <Typography
                                    variant="h6"
                                    className="text-gray-600 mb-2"
                                  >
                                    Upload Election Symbol
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    className="text-gray-500 mb-2"
                                  >
                                    Click to browse or drag and drop your symbol
                                    image
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    className="text-gray-400"
                                  >
                                    Supported formats: JPG, PNG, GIF (Max 5MB)
                                  </Typography>
                                </>
                              )}
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                border: symbolUrl
                                  ? "2px solid #10b981"
                                  : uploadingImage
                                  ? "2px solid #f59e0b"
                                  : "2px solid #ef4444",
                                borderRadius: 3,
                                p: 3,
                                backgroundColor: symbolUrl
                                  ? "rgba(16, 185, 129, 0.05)"
                                  : uploadingImage
                                  ? "rgba(245, 158, 11, 0.05)"
                                  : "rgba(239, 68, 68, 0.05)",
                              }}
                            >
                              <Box className="flex items-center justify-between mb-3">
                                <Box className="flex items-center gap-2">
                                  {uploadingImage && (
                                    <CircularProgress size={16} />
                                  )}
                                  <Typography
                                    variant="subtitle2"
                                    className={`font-semibold ${
                                      symbolUrl
                                        ? "text-green-700"
                                        : uploadingImage
                                        ? "text-yellow-700"
                                        : "text-red-700"
                                    }`}
                                  >
                                    {symbolUrl
                                      ? "✅ Uploaded Successfully"
                                      : uploadingImage
                                      ? "⏳ Uploading to Cloud..."
                                      : "❌ Upload Failed"}
                                  </Typography>
                                </Box>
                                <IconButton
                                  onClick={handleRemoveSymbol}
                                  disabled={uploadingImage}
                                  size="small"
                                  sx={{
                                    color: "#ef4444",
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    "&:hover": {
                                      backgroundColor: "rgba(239, 68, 68, 0.2)",
                                    },
                                    "&:disabled": {
                                      opacity: 0.5,
                                    },
                                  }}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </Box>

                              <Box className="flex items-center space-x-4">
                                <img
                                  src={symbolPreview || "/placeholder.svg"}
                                  alt="Election Symbol Preview"
                                  className="w-20 h-20 object-cover rounded-2xl border-2 border-white shadow-lg"
                                />
                                <Box className="flex-1">
                                  <Typography
                                    variant="body2"
                                    className="text-gray-700 font-medium"
                                  >
                                    {electionSymbol?.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    className="text-gray-500 block"
                                  >
                                    {(
                                      electionSymbol?.size /
                                      1024 /
                                      1024
                                    ).toFixed(2)}{" "}
                                    MB
                                  </Typography>
                                  {symbolUrl && (
                                    <Typography
                                      variant="caption"
                                      className="text-green-600 block mt-1"
                                    >
                                      ✅ Stored in Cloud
                                    </Typography>
                                  )}
                                  {uploadingImage && (
                                    <Typography
                                      variant="caption"
                                      className="text-yellow-600 block mt-1"
                                    >
                                      ⏳ Processing...
                                    </Typography>
                                  )}
                                </Box>
                              </Box>

                              {/* Retry button if upload failed */}
                              {!symbolUrl &&
                                !uploadingImage &&
                                symbolPreview && (
                                  <Box className="mt-3">
                                    <Button
                                      onClick={() =>
                                        uploadToCloudinary(electionSymbol)
                                      }
                                      variant="outlined"
                                      size="small"
                                      startIcon={<CloudUploadIcon />}
                                      sx={{
                                        borderColor: "#ef4444",
                                        color: "#ef4444",
                                        "&:hover": {
                                          borderColor: "#dc2626",
                                          backgroundColor:
                                            "rgba(239, 68, 68, 0.05)",
                                        },
                                      }}
                                    >
                                      Retry Upload
                                    </Button>
                                  </Box>
                                )}
                            </Box>
                          )}

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={uploadingImage}
                            style={{ display: "none" }}
                          />
                        </Box>

                        {/* Submit Button */}
                        <Box className="mt-6">
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={
                              submitting || uploadingImage || !symbolUrl
                            }
                            startIcon={
                              submitting ? (
                                <CircularProgress size={20} color="inherit" />
                              ) : uploadingImage ? (
                                <CloudUploadIcon />
                              ) : (
                                <CampaignIcon />
                              )
                            }
                            className="group transition-all duration-300"
                            sx={{
                              py: 3,
                              fontSize: 16,
                              fontWeight: 700,
                              borderRadius: 3,
                              textTransform: "none",
                              background:
                                submitting || uploadingImage || !symbolUrl
                                  ? "linear-gradient(135deg, #9ca3af, #6b7280)"
                                  : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                              boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                              "&:hover": !submitting &&
                                !uploadingImage &&
                                symbolUrl && {
                                  background:
                                    "linear-gradient(135deg, #2563eb, #7c3aed)",
                                  boxShadow:
                                    "0 12px 40px rgba(59, 130, 246, 0.4)",
                                  transform: "translateY(-2px) scale(1.02)",
                                },
                            }}
                          >
                            {submitting
                              ? "Submitting Request..."
                              : uploadingImage
                              ? "Uploading Image..."
                              : !symbolUrl
                              ? "Upload Symbol First"
                              : "Submit Candidacy Request"}
                          </Button>
                        </Box>
                      </form>

                      {/* Security Note */}
                      <Box className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                        <Box className="flex items-center space-x-2 mb-2">
                          <SecurityIcon className="text-blue-500 text-sm" />
                          <Typography
                            variant="caption"
                            className="font-semibold text-blue-800"
                          >
                            Secure Submission
                          </Typography>
                        </Box>
                        <Typography variant="caption" className="text-blue-700">
                          Your candidacy request is encrypted and securely
                          processed by our election committee.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Paper>
                </Grow>

                {/* My Requests */}
                <Grow in timeout={1200}>
                  <Paper
                    elevation={24}
                    sx={{
                      borderRadius: 4,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Requests Header */}
                    <Box
                      sx={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        p: 4,
                        position: "relative",
                      }}
                    >
                      <Box className="flex items-center space-x-4">
                        <Box className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <VoteIcon className="text-white" />
                        </Box>
                        <Box>
                          <Typography
                            variant="h5"
                            className="font-bold text-white mb-1"
                          >
                            My Candidacy Requests
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-green-100"
                          >
                            Track and manage your submitted requests
                          </Typography>
                        </Box>
                      </Box>

                      {/* Decorative elements */}
                      <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
                      <Box className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></Box>
                    </Box>

                    <CardContent
                      sx={{ p: 4, maxHeight: 600, overflowY: "auto" }}
                    >
                      {candidateRequests.length === 0 ? (
                        <Box className="text-center py-12">
                          <Box className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                            <CampaignIcon className="text-gray-400 text-3xl" />
                          </Box>
                          <Typography
                            variant="h6"
                            className="text-gray-500 mb-3"
                          >
                            No candidacy requests yet
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-gray-400 max-w-sm mx-auto"
                          >
                            Submit your first candidacy request to get started
                            on your political journey
                          </Typography>
                        </Box>
                      ) : (
                        <Box className="space-y-4">
                          {candidateRequests.map((request, index) => (
                            <Grow
                              in
                              timeout={600 + index * 200}
                              key={request._id}
                            >
                              <Paper
                                elevation={8}
                                sx={{
                                  borderRadius: 3,
                                  background: "rgba(255, 255, 255, 0.8)",
                                  backdropFilter: "blur(10px)",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
                                  },
                                }}
                              >
                                <CardContent sx={{ p: 3 }}>
                                  <Box className="flex items-start justify-between mb-4">
                                    <Box className="flex items-start space-x-4 flex-1">
                                      {/* Symbol Preview */}
                                      <Box className="relative inline-block">
                                        {request.symbolUrl ? (
                                          <Avatar
                                            src={request.symbolUrl}
                                            alt="Election Symbol"
                                            sx={{
                                              width: 64,
                                              height: 64,
                                              background:
                                                "rgba(255,255,255,0.2)",
                                              backdropFilter: "blur(10px)",
                                              border:
                                                "3px solid rgba(255,255,255,0.3)",
                                              fontSize: "1.5rem",
                                              fontWeight: "bold",
                                            }}
                                          />
                                        ) : (
                                          <Avatar
                                            sx={{
                                              width: 64,
                                              height: 64,
                                              backgroundColor: "#e2e8f0",
                                              color: "#1e3a8a",
                                              fontSize: "1.25rem",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {request.party
                                              ? request.party
                                                  .slice(0, 2)
                                                  .toUpperCase()
                                              : "NA"}
                                          </Avatar>
                                        )}
                                      </Box>

                                      <Box className="flex-1">
                                        <Box className="flex items-center gap-3 mb-3">
                                          <Typography
                                            variant="h6"
                                            className="font-bold text-gray-800"
                                          >
                                            {request.party}
                                          </Typography>
                                          <Chip
                                            icon={getStatusIcon(request.status)}
                                            label={
                                              request.status
                                                .charAt(0)
                                                .toUpperCase() +
                                              request.status.slice(1)
                                            }
                                            color={getStatusColor(
                                              request.status
                                            )}
                                            size="small"
                                            sx={{
                                              fontWeight: 600,
                                              borderRadius: 2,
                                            }}
                                          />
                                        </Box>
                                        <Typography
                                          variant="body2"
                                          className="text-gray-600 mb-2 flex items-center"
                                        >
                                          <CalendarIcon className="text-gray-400 mr-2 text-sm" />
                                          Election: {request.electionTitle}
                                        </Typography>
                                        <Typography
                                          variant="caption"
                                          className="text-gray-500"
                                        >
                                          Submitted:{" "}
                                          {new Date(
                                            request.submittedAt
                                          ).toLocaleDateString()}
                                        </Typography>
                                      </Box>
                                    </Box>

                                    {request.status === "pending" && (
                                      <IconButton
                                        onClick={() =>
                                          openDeleteDialog(request._id)
                                        }
                                        sx={{
                                          color: "#ef4444",
                                          backgroundColor:
                                            "rgba(239, 68, 68, 0.1)",
                                          "&:hover": {
                                            backgroundColor:
                                              "rgba(239, 68, 68, 0.2)",
                                            transform: "scale(1.1)",
                                          },
                                          transition: "all 0.3s ease",
                                        }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    )}
                                  </Box>

                                  {request.status === "rejected" && (
                                    <Alert
                                      severity="error"
                                      sx={{
                                        borderRadius: 2,
                                        backgroundColor:
                                          "rgba(239, 68, 68, 0.1)",
                                        border:
                                          "1px solid rgba(239, 68, 68, 0.2)",
                                      }}
                                    >
                                      <Typography variant="body2">
                                        Your request was rejected. You can
                                        submit a new request with updated
                                        information.
                                      </Typography>
                                    </Alert>
                                  )}

                                  {request.status === "approved" && (
                                    <Alert
                                      severity="success"
                                      sx={{
                                        borderRadius: 2,
                                        backgroundColor:
                                          "rgba(16, 185, 129, 0.1)",
                                        border:
                                          "1px solid rgba(16, 185, 129, 0.2)",
                                      }}
                                    >
                                      <Typography variant="body2">
                                        🎉 Congratulations! Your candidacy has
                                        been approved. You can now participate
                                        in the election.
                                      </Typography>
                                    </Alert>
                                  )}

                                  {request.status === "pending" && (
                                    <Alert
                                      severity="info"
                                      sx={{
                                        borderRadius: 2,
                                        backgroundColor:
                                          "rgba(59, 130, 246, 0.1)",
                                        border:
                                          "1px solid rgba(59, 130, 246, 0.2)",
                                      }}
                                    >
                                      <Typography variant="body2">
                                        Your request is under review. You'll be
                                        notified once a decision is made.
                                      </Typography>
                                    </Alert>
                                  )}
                                </CardContent>
                              </Paper>
                            </Grow>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Paper>
                </Grow>
              </div>
            </div>
          </Fade>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={closeDeleteDialog}
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" className="font-bold text-gray-800">
              Delete Candidacy Request
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#6b7280" }}>
              Are you sure you want to delete this candidacy request? This
              action cannot be undone. You can only delete requests that are in
              pending status.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={closeDeleteDialog}
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteRequest(deleteDialog.requestId)}
              variant="contained"
              disabled={deleting}
              startIcon={
                deleting ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <DeleteIcon />
                )
              }
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: "#ef4444",
                "&:hover": {
                  backgroundColor: "#dc2626",
                },
              }}
            >
              {deleting ? "Deleting..." : "Delete Request"}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
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
    </Box>
  );
};

export default RequestCandidate;
