"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Container,
  Box,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Paper,
  Fade,
  Grow,
} from "@mui/material"
import { HowToVote, Timer, CheckCircle, Verified, Person, Warning } from "@mui/icons-material"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)

const VotePage = () => {
  const token = useSelector((state) => state.auth.token)
  const [candidates, setCandidates] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState("")
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [electionTime, setElectionTime] = useState(null)
  const [imgError, setImgError] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: false,
  })
  const { electionId } = useParams()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const generatePartySymbol = (partyName) => {
    if (!partyName) return "UN"
    return partyName.substring(0, 2).toUpperCase()
  }

  const getPartyColor = (partyName) => {
    const colors = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    ]
    const hash = partyName?.split("").reduce((a, b) => a + b.charCodeAt(0), 0) || 0
    return colors[hash % colors.length]
  }

  const enhanceCandidateData = (candidate) => {
    const mottos = [
      "Building a better tomorrow together",
      "Progress through unity and innovation",
      "Your voice, our commitment",
      "Leading with integrity and vision",
      "Empowering communities, creating change",
      "Dedicated to service and excellence",
      "Innovation for a sustainable future",
      "Transparency, accountability, progress",
    ]
    const descriptions = [
      "Experienced leader with 15+ years in public service...",
      "Former business executive turned public servant...",
      "Community organizer and environmental advocate...",
      "Legal professional with expertise in constitutional law...",
      "Healthcare professional dedicated to improving public health...",
      "Education specialist working to enhance learning...",
      "Economic policy expert focused on small business support...",
      "Social worker and community leader advocating for affordable housing...",
    ]
    const hash = candidate?.user?.name?.split("").reduce((a, b) => a + b.charCodeAt(0), 0) || 0
    return {
      ...candidate,
      
      description: descriptions[hash % descriptions.length],
    }
  }

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setInitialLoading(true)
        const res = await axios.get(`http://localhost:5000/api/election/${electionId}/candidates/approved`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("candidate ka data",res.data)
        const enhancedCandidates = (res.data.candidates || []).map(enhanceCandidateData)
        setCandidates(enhancedCandidates)
      } catch (err) {
        showSnackbar("Failed to load candidates", "error")
        console.error(err)
      } finally {
        setInitialLoading(false)
      }
    }

    if (token && electionId) {
      fetchCandidates()
    }
  }, [token, electionId])

  useEffect(() => {
  const fetchElectionTime = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/election/${electionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const election = res.data
      setElectionTime(election)
      console.log(election)
      // Check if election has been manually ended or naturally ended
      const now = dayjs()
      const end = dayjs(election.endTime)
      const diff = end.diff(now)

      // Check if election is manually ended (status field) OR time has passed
      if (election.status === 'ended' || election.status === 'completed' || diff <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          ended: true,
        })
      }
    } catch (err) {
      showSnackbar("Failed to fetch election time", "error")
      console.error(err)
    }
  }

  if (token && electionId) {
    fetchElectionTime()
  }
}, [electionId, token])

  useEffect(() => {
  if (!electionTime?.endTime) return

  const interval = setInterval(() => {
    // First check if election is manually ended
    if (electionTime.status === 'ended' || electionTime.status === 'completed') {
      setTimeRemaining({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: true,
      })
      clearInterval(interval)
      return
    }

    // Then check natural time expiration
    const now = dayjs()
    const end = dayjs(electionTime.endTime)
    const diff = end.diff(now)

    if (diff <= 0) {
      setTimeRemaining({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: true,
      })
      clearInterval(interval)
    } else {
      const dur = dayjs.duration(diff)
      setTimeRemaining({
        days: dur.days(),
        hours: dur.hours(),
        minutes: dur.minutes(),
        seconds: dur.seconds(),
        ended: false,
      })
    }
  }, 1000)

  return () => clearInterval(interval)
}, [electionTime])

  const handleCandidateSelect = (candidateAddress) => {
    setSelectedCandidate(candidateAddress)
  }

  const handleVoteClick = () => {
    if (!selectedCandidate) {
      showSnackbar("Please select a candidate", "warning")
      return
    }
    setConfirmDialog(true)
  }

  const castVote = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        "http://localhost:5000/api/voting/vote",
        { candidateAddress: selectedCandidate, electionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      showSnackbar("Vote cast successfully!", "success")
      setConfirmDialog(false)
      setSelectedCandidate("")
    } catch (err) {
      console.log(err)
      const fullMessage = err?.response?.data?.error?.cause?.message || err?.response?.data?.message || ""
      console.log("msg--", fullMessage)
      const userFriendlyMessage = fullMessage.includes("revert")
        ? fullMessage.split("revert")[1].trim()
        : "An unexpected error occurred."
      showSnackbar(userFriendlyMessage, "error")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
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
              <HowToVote className="text-white text-4xl" />
            </Box>
            <Typography variant="h5" className="text-gray-700 mb-2">
              Loading Voting Portal...
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

      <Container maxWidth="lg" className="relative z-10 py-8">
        <Fade in timeout={1000}>
          <div>
            {/* Header Section with Timer */}
            <Box className="text-center mb-8">
              <Box className="flex justify-center mb-6">
                <Box className="relative">
                  <Box className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <HowToVote className="text-white text-4xl" />
                  </Box>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                </Box>
              </Box>
              <Typography
                variant="h3"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
              >
                Cast Your Vote
              </Typography>
              <Box className='flex justify-center'>
                <Typography variant="h6" className="text-gray-600 max-w-xl mx-auto leading-relaxed mb-6">
                Choose your candidate and participate in shaping the future. Your voice matters in this democratic
                process.
              </Typography>
              </Box>

              {/* Election Timer */}
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  p: 4,
                  maxWidth: 600,
                  mx: "auto",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: timeRemaining.ended
                      ? "linear-gradient(90deg, #ef4444, #dc2626)"
                      : "linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e)",
                  }}
                />

                <Box className="flex items-center justify-center gap-2 mb-3">
                  <Timer sx={{ color: timeRemaining.ended ? "#dc2626" : "#ef4444", fontSize: 28 }} />
                  <Typography variant="h5" className="font-bold text-gray-800">
                    {timeRemaining.ended ? "Election Has Ended" : "Election Ends In"}
                  </Typography>
                </Box>

                {!timeRemaining.ended ? (
                  <>
                    <Box className="flex justify-center gap-4">
                      {timeRemaining.days > 0 && (
                        <Box className="text-center">
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 2,
                              background: "linear-gradient(135deg, #ef4444, #dc2626)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mb: 1,
                              boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)",
                            }}
                          >
                            <Typography variant="h5" className="font-bold text-white">
                              {timeRemaining.days}
                            </Typography>
                          </Box>
                          <Typography variant="caption" className="text-gray-600 font-semibold">
                            DAYS
                          </Typography>
                        </Box>
                      )}

                      <Box className="text-center">
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #f97316, #ea580c)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                            boxShadow: "0 4px 16px rgba(249, 115, 22, 0.3)",
                          }}
                        >
                          <Typography variant="h5" className="font-bold text-white">
                            {String(timeRemaining.hours).padStart(2, "0")}
                          </Typography>
                        </Box>
                        <Typography variant="caption" className="text-gray-600 font-semibold">
                          HOURS
                        </Typography>
                      </Box>

                      <Box className="text-center">
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #eab308, #ca8a04)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                            boxShadow: "0 4px 16px rgba(234, 179, 8, 0.3)",
                          }}
                        >
                          <Typography variant="h5" className="font-bold text-white">
                            {String(timeRemaining.minutes).padStart(2, "0")}
                          </Typography>
                        </Box>
                        <Typography variant="caption" className="text-gray-600 font-semibold">
                          MINUTES
                        </Typography>
                      </Box>

                      <Box className="text-center">
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #22c55e, #16a34a)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                            boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
                            animation:
                              timeRemaining.hours === 0 && timeRemaining.minutes < 5 ? "pulse 1s infinite" : "none",
                          }}
                        >
                          <Typography variant="h5" className="font-bold text-white">
                            {String(timeRemaining.seconds).padStart(2, "0")}
                          </Typography>
                        </Box>
                        <Typography variant="caption" className="text-gray-600 font-semibold">
                          SECONDS
                        </Typography>
                      </Box>
                    </Box>

                    {timeRemaining.hours === 0 && timeRemaining.minutes < 10 && (
                      <Box className="mt-3 text-center">
                        <Typography variant="body2" className="text-red-600 font-semibold animate-pulse">
                          ⚠️ Election closing soon! Cast your vote now.
                        </Typography>
                      </Box>
                    )}
                  </>
                ) : (
                  <Box className="text-center">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 4,
                        background: "linear-gradient(135deg, #dc2626, #991b1b)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                        boxShadow: "0 8px 32px rgba(220, 38, 38, 0.3)",
                      }}
                    >
                      <Typography variant="h3" className="font-bold text-white">
                        ⏰
                      </Typography>
                    </Box>
                    <Typography variant="h6" className="text-red-600 font-bold mb-2">
                      Voting Period Has Ended
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 mb-4">
                      This election is now closed. Thank you for your participation in the democratic process.
                    </Typography>

                    {/* View Results Button */}
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => {
                        // Navigate to results page - you can implement this navigation
                        window.location.href = `/result/${electionId}`
                      }}
                      sx={{
                        px: 6,
                        py: 2,
                        fontSize: 16,
                        fontWeight: 700,
                        borderRadius: 4,
                        textTransform: "none",
                        background: "linear-gradient(135deg, #059669, #047857)",
                        boxShadow: "0 8px 32px rgba(5, 150, 105, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "linear-gradient(135deg, #047857, #065f46)",
                          boxShadow: "0 12px 40px rgba(5, 150, 105, 0.4)",
                          transform: "translateY(-2px) scale(1.02)",
                        },
                      }}
                    >
                      🏆 View Election Results
                    </Button>
                  </Box>
                )}
              </Paper>
            </Box>

            {/* Candidates Section - Only show when election is active */}
            {!timeRemaining.ended && (
              <Box className="mb-8">
                <Typography variant="h4" className="font-bold text-gray-800 mb-2 text-center">
                  Choose Your Candidate
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-8 text-center">
                  Select the candidate that best represents your vision for the future
                </Typography>

                {candidates.length > 0 ? (
                  <div className="space-y-6">
                    {candidates.map((candidate, index) => {
                      const isSelected = selectedCandidate === candidate.walletAddress
                      const partyGradient = getPartyColor(candidate.party)

                      return (
                        <Grow in timeout={1000 + index * 200} key={candidate._id}>
                          <Card
                            onClick={() => handleCandidateSelect(candidate.walletAddress)}
                            sx={{
                              borderRadius: 4,
                              background: "rgba(255,255,255,0.95)",
                              backdropFilter: "blur(20px)",
                              border: isSelected ? "2px solid #3b82f6" : "1px solid rgba(255,255,255,0.2)",
                              overflow: "hidden",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              position: "relative",
                              "&:hover": {
                                transform: "translateY(-4px) scale(1.01)",
                                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                              },
                              ...(isSelected && {
                                boxShadow: "0 20px 60px rgba(59, 130, 246, 0.3)",
                                transform: "translateY(-4px) scale(1.01)",
                              }),
                            }}
                          >
                            {/* Top accent bar */}
                            <Box
                              sx={{
                                height: 4,
                                background: isSelected ? "linear-gradient(90deg, #3b82f6, #8b5cf6)" : partyGradient,
                              }}
                            />

                            {/* Selection indicator */}
                            {isSelected && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 16,
                                  right: 16,
                                  zIndex: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #10b981, #059669)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
                                    animation: "pulse 2s infinite",
                                  }}
                                >
                                  <CheckCircle sx={{ color: "white", fontSize: 20 }} />
                                </Box>
                              </Box>
                            )}

                            <CardContent sx={{ p: 3 }}>
                              <Box className="flex items-start gap-6">
                                {/* Party Symbol */}
                                <Box className="flex-shrink-0">
      <Avatar
        sx={{
          width: 80,
          height: 80,
          background : "white",
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          border: "3px solid rgba(255,255,255,0.8)",
          overflow: "hidden",
        }}
      >
        {!imgError && candidate.symbolUrl ? (
          <img
            src={candidate.symbolUrl}
            alt={`${candidate.party} Symbol`}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          generatePartySymbol(candidate.party)
        )}
      </Avatar>
    </Box>

                                {/* Candidate Information */}
                                <Box className="flex-1 min-w-0">
                                  <Box className="flex items-center gap-3 mb-3">
                                    <Typography variant="h5" className="font-bold text-gray-800 capitalize">
                                      {candidate.user?.name || "Unknown Candidate"}
                                    </Typography>
                                    <Chip
                                      icon={<Verified sx={{ color: "white" }} />}
                                      label="Verified"
                                      size="small"
                                      sx={{
                                        background: "linear-gradient(135deg, #10b981, #059669)",
                                        color: "white",
                                        fontWeight: 600,
                                      }}
                                    />
                                  </Box>

                                  <Box className="flex items-center gap-2 mb-4">
                                    <Chip
                                      label={candidate.party || "Independent"}
                                      sx={{
                                        background: partyGradient,
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: "0.875rem",
                                      }}
                                    />
                                  </Box>

                                  <Typography
                                    variant="h6"
                                    className="text-blue-600 font-semibold mb-3 italic"
                                    sx={{ fontSize: "1.1rem" }}
                                  >
                                    "{candidate.motto}"
                                  </Typography>

                                  

                                  {/* Additional candidate info */}
                                  <Box className="flex items-center gap-4 mt-4">
                                    <Box className="flex items-center gap-1">
                                      <Person sx={{ color: "#6b7280", fontSize: 18 }} />
                                      <Typography variant="body2" className="text-gray-500">
                                        Candidate ID: {candidate._id?.slice(-6).toUpperCase() || "N/A"}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grow>
                      )
                    })}
                  </div>
                ) : (
                  <Fade in timeout={800}>
                    <Paper
                      elevation={24}
                      sx={{
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        p: 8,
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 4,
                          background: "linear-gradient(135deg, #f59e0b, #d97706)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 3,
                          boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
                        }}
                      >
                        <Warning sx={{ color: "white", fontSize: 40 }} />
                      </Box>
                      <Typography variant="h5" className="font-bold text-gray-800 mb-2">
                        No Candidates Available
                      </Typography>
                      <Typography variant="body1" className="text-gray-600">
                        There are currently no approved candidates for this election. Please check back later.
                      </Typography>
                    </Paper>
                  </Fade>
                )}
              </Box>
            )}

            {/* Vote Button - Only show when election is active */}
            {!timeRemaining.ended && candidates.length > 0 && (
              <Box className="text-center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleVoteClick}
                  disabled={!selectedCandidate || loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <HowToVote />}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: 18,
                    fontWeight: 700,
                    borderRadius: 4,
                    textTransform: "none",
                    background: selectedCandidate
                      ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                      : "linear-gradient(135deg, #9ca3af, #6b7280)",
                    boxShadow: selectedCandidate
                      ? "0 8px 32px rgba(59, 130, 246, 0.3)"
                      : "0 4px 16px rgba(156, 163, 175, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      ...(selectedCandidate && {
                        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                        boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4)",
                        transform: "translateY(-2px) scale(1.02)",
                      }),
                    },
                    "&:disabled": {
                      background: "linear-gradient(135deg, #9ca3af, #6b7280)",
                    },
                  }}
                >
                  {loading ? "Casting Vote..." : "Cast Your Vote"}
                </Button>

                {!selectedCandidate && (
                  <Typography variant="body2" className="text-gray-500 mt-3">
                    Please select a candidate to proceed
                  </Typography>
                )}
              </Box>
            )}
          </div>
        </Fade>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 2 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 4,
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
              boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
            }}
          >
            <Warning sx={{ color: "white", fontSize: 32 }} />
          </Box>
          <Typography variant="h5" className="font-bold text-gray-800">
            Confirm Your Vote
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="body1" className="text-gray-600 mb-4">
            You are about to cast your vote for:
          </Typography>

          {selectedCandidate && (
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              {candidates
                .filter((c) => c.walletAddress === selectedCandidate)
                .map((candidate) => (
                  <Box key={candidate._id} className="flex items-center gap-4">
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        background: getPartyColor(candidate.party),
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {generatePartySymbol(candidate.party)}
                    </Avatar>
                    <Box className="text-left">
                      <Typography variant="h6" className="font-bold text-gray-800">
                        {candidate.user?.name || "Unknown Candidate"}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {candidate.party || "Independent"}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Paper>
          )}

          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))",
              border: "1px solid rgba(245, 158, 11, 0.2)",
            }}
          >
            <Typography variant="body2" className="text-amber-800 font-semibold">
              ⚠️ This action cannot be undone. Your vote will be permanently recorded.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setConfirmDialog(false)}
            variant="outlined"
            size="large"
            disabled={loading}
            sx={{
              flex: 1,
              borderRadius: 3,
              borderColor: "#d1d5db",
              color: "#6b7280",
              "&:hover": {
                borderColor: "#9ca3af",
                backgroundColor: "rgba(156, 163, 175, 0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={castVote}
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              flex: 1,
              borderRadius: 3,
              background: "linear-gradient(135deg, #10b981, #059669)",
              "&:hover": {
                background: "linear-gradient(135deg, #059669, #047857)",
                transform: "translateY(-1px)",
              },
            }}
          >
            {loading ? (
              <Box className="flex items-center gap-2">
                <CircularProgress size={20} color="inherit" />
                <span>Voting...</span>
              </Box>
            ) : (
              "Confirm Vote"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
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
  )
}

export default VotePage
