import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
  Container,
  Avatar,
  Chip,
  Fade,
  Grow,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import {
  EmojiEvents,
  TrendingUp,
  People,
  HowToVote,
  Verified,
  Star,
  Assessment,
  Timeline,
  CheckCircle,
} from "@mui/icons-material";

const COLORS = [
  "#667eea",
  "#f093fb",
  "#4facfe",
  "#43e97b",
  "#fa709a",
  "#a8edea",
  "#ff9a9e",
  "#ffecd2",
  "#667eea",
  "#f093fb",
];

const ResultPage = () => {
  const { electionId } = useParams();
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [tiedCandidates,setTiedCandidates] = useState([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const { width, height } = useWindowSize();

  // Generate party symbol from party name
  const generatePartySymbol = (partyName) => {
    if (!partyName) return "UN";
    return partyName.substring(0, 2).toUpperCase();
  };

  // Get party color based on index
  const getPartyColor = (index) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    ];
    return gradients[index % gradients.length];
  };

  useEffect(() => {
    const fetchResults = async () => {
  try {
    console.log(electionId);
    const res = await axios.get(
      `http://localhost:5000/api/election/${electionId}/results`
    );

    setElection(res.data.election);
    console.log("ye raha data", res.data);
    setCandidates(res.data.candidates);

    const sorted = [...res.data.candidates].sort((a, b) => b.votes - a.votes);
    const highestVotes = sorted[0]?.votes || 0;

    // Get all candidates with the highest vote count
    const topCandidates = sorted.filter(candidate => candidate.votes === highestVotes);

    if (res.data.election.status === "completed" && highestVotes > 0) {
      setShowConfetti(true);
      setShowWinnerPopup(true);

      if (topCandidates.length === 1) {
        setWinner(topCandidates[0]); // Single winner
        setTiedCandidates([]); // Clear tie state if previously set
      } else {
        setWinner(null); // Mark as tie
        setTiedCandidates(topCandidates); // Store tied candidates
      }

      // Hide confetti and popup after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
        setShowWinnerPopup(false);
        console.log("jeey gata")
      }, 5000);
    }

    console.log("election kya hai", res.data.election);
  } catch (error) {
    console.error(error);
    setSnackbar({
      open: true,
      message: "Failed to fetch election results",
      severity: "error",
    });
  } finally {
    setLoading(false);
  }
};


    fetchResults();
  }, [electionId]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const pieData = candidates.map((c, i) => ({
    name: c.name,
    value: c.votes,
    color: COLORS[i % COLORS.length],
  }));

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

  const stats = [
    {
      label: "Total Votes",
      value: totalVotes.toLocaleString(),
      icon: <HowToVote />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      label: "Candidates",
      value: candidates.length,
      icon: <People />,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      label: "Election Status",
      value: election?.status === "completed" ? "Completed" : "Ongoing",
      icon: <Assessment />,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];

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
              <Assessment className="text-white text-4xl" />
            </Box>
            <Typography variant="h5" className="text-gray-700 mb-2">
              Loading Election Results...
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

      {/* Main Content with conditional blur */}
      <motion.div
        animate={{
          filter: showWinnerPopup ? "blur(8px)" : "blur(0px)",
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0.0, 0.2, 1], // Custom easing for smooth transition
        }}
        className="relative z-10"
      >
        <Container maxWidth="lg" className="py-8">
          <Fade in timeout={1000}>
            <div>
              {/* Header Section */}
              <Box className="text-center mb-8">
                <Box className="flex justify-center mb-6">
                  <Box className="relative">
                    <Box className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                      <Assessment className="text-white text-4xl" />
                    </Box>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                  </Box>
                </Box>
                <Typography
                  variant="h3"
                  className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
                >
                  Election Results
                </Typography>
                <Typography
                  variant="h5"
                  className="text-gray-800 font-semibold mb-2"
                >
                  National Leadership Election 2025
                </Typography>
                <Box className="flex justify-center">
                  <Typography
                    variant="h6"
                    className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
                  >
                    {election?.status === "completed"
                      ? "Final results are now available. Thank you for participating in this democratic process."
                      : "Live results are being updated as votes are counted."}
                  </Typography>
                </Box>
              </Box>

              {/* Stats Section */}
              <Box className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <Grow in timeout={600 + index * 200} key={index}>
                      <Paper
                        elevation={24}
                        sx={{
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.95)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px) scale(1.02)",
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3, textAlign: "center" }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 3,
                              background: stat.gradient,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              mx: "auto",
                              mb: 2,
                              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            }}
                          >
                            {stat.icon}
                          </Box>
                          <Typography
                            variant="h4"
                            className="font-bold text-gray-800 mb-1"
                          >
                            {stat.value}
                          </Typography>
                          <Typography variant="body1" className="text-gray-600">
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </Paper>
                    </Grow>
                  ))}
                </div>
              </Box>

              {/* Election Status Card */}
              <Box className="mb-8">
                <Fade in timeout={800}>
                  <Paper
                    elevation={24}
                    sx={{
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: 4,
                        background:
                          election?.status === "completed"
                            ? "linear-gradient(90deg, #10b981, #059669)"
                            : "linear-gradient(90deg, #f59e0b, #d97706)",
                      }}
                    />
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <Box className="flex items-center justify-center gap-3 mb-3">
                        {election?.status === "completed" ? (
                          <CheckCircle
                            sx={{ color: "#10b981", fontSize: 32 }}
                          />
                        ) : (
                          <Timeline sx={{ color: "#f59e0b", fontSize: 32 }} />
                        )}
                        <Typography
                          variant="h5"
                          className="font-bold text-gray-800"
                        >
                          {election?.status === "completed"
                            ? "Election Completed"
                            : "Election Ongoing"}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        className={`font-semibold ${
                          election?.status === "completed"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {election?.status === "completed"
                          ? "🎉 Final Results Available"
                          : "📊 Live Results - Updates in Real Time"}
                      </Typography>
                    </CardContent>
                  </Paper>
                </Fade>
              </Box>

              {/* Chart Section */}
              <Box className="mb-8">
                <Typography
                  variant="h4"
                  className="font-bold text-gray-800 mb-6 text-center"
                >
                  Vote Distribution
                </Typography>
                <Fade in timeout={1000}>
                  <Paper
                    elevation={24}
                    sx={{
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      p: 4,
                    }}
                  >
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={140}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(1)}%`
                          }
                          labelLine={false}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [
                            `${value} votes (${(
                              (value / totalVotes) *
                              100
                            ).toFixed(1)}%)`,
                            name,
                          ]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Paper>
                </Fade>
              </Box>

              {/* Detailed Results Section */}
              <Box className="mb-8">
                <Typography
                  variant="h4"
                  className="font-bold text-gray-800 mb-2 text-center"
                >
                  Detailed Results
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-600 mb-8 text-center"
                >
                  Complete breakdown of votes received by each candidate
                </Typography>

                <div className="space-y-6">
                  {sortedCandidates.map((candidate, index) => {
                    const percentage =
                      totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
                    const isWinner =
                      index === 0 &&
                      election?.status === "completed" &&
                      candidate.votes > 0;
                    const partyGradient = getPartyColor(index);

                    return (
                      <Grow
                        in
                        timeout={1200 + index * 200}
                        key={candidate._id || index}
                      >
                        <Card
                          sx={{
                            borderRadius: 4,
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(20px)",
                            border: isWinner
                              ? "2px solid #10b981"
                              : "1px solid rgba(255,255,255,0.2)",
                            overflow: "hidden",
                            position: "relative",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-4px) scale(1.01)",
                              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                            },
                            ...(isWinner && {
                              boxShadow: "0 20px 60px rgba(16, 185, 129, 0.3)",
                            }),
                          }}
                        >
                          {/* Top accent bar */}
                          <Box
                            sx={{
                              height: 4,
                              background: isWinner
                                ? "linear-gradient(90deg, #10b981, #059669)"
                                : partyGradient,
                            }}
                          />

                          {/* Winner crown */}
                          {isWinner && (
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
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  background:
                                    "linear-gradient(135deg, #ffd700, #ffed4e)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow:
                                    "0 4px 12px rgba(255, 215, 0, 0.4)",
                                  animation: "pulse 2s infinite",
                                }}
                              >
                                <EmojiEvents
                                  sx={{ color: "#b45309", fontSize: 24 }}
                                />
                              </Box>
                            </Box>
                          )}

                          {/* Position badge */}
                          {/* Position badge */}
<Box
  sx={{
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 2,
  }}
>
  <Chip
    label={`#${
      // Find the position based on votes, not array index
      sortedCandidates.findIndex(
        (c) => c.votes === sortedCandidates[0].votes
      ) === index
        ? 1 // First place (including ties)
        : sortedCandidates.findIndex(
            (c) => c.votes === candidate.votes
          ) + 1 // Actual position based on votes
    }`}
    sx={{
      background: partyGradient,
      color: "white",
      fontWeight: "bold",
      fontSize: "0.75rem", // Smaller font size
    }}
  />
</Box>

                        <CardContent sx={{ p: 2, pt: 4 }}> {/* Reduced padding from p: 4, pt: 6 */}
  <Box className="flex items-start gap-3"> {/* Reduced gap from gap-6 */}
    {/* Party Symbol - Smaller */}
    <Box className="flex-shrink-0">
      <Avatar
        sx={{
          width: 60, /* Reduced from 80 */
          height: 60, /* Reduced from 80 */
          background: partyGradient,
          fontSize: 20, /* Reduced from 24 */
          fontWeight: "bold",
          color: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          border: "3px solid rgba(255,255,255,0.8)",
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        }}
        src={candidate.symbolUrl}
        alt={`${candidate.name} symbol`}
      >
        {!candidate.symbolUrl && generatePartySymbol(candidate.party)}
      </Avatar>
    </Box>

    {/* Candidate Information - More compact */}
    <Box className="flex-1 min-w-0">
      <Box className="flex items-center gap-2 mb-2"> {/* Reduced gap and margin */}
        <Typography
          variant="h6" /* Changed from h5 */
          className="font-bold text-gray-800 capitalize"
        >
          {candidate.name}
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
        {isWinner && (
          <Chip
            icon={<Star sx={{ color: "white" }} />}
            label="Winner"
            size="small"
            sx={{
              background: "linear-gradient(135deg, #ffd700, #ffed4e)",
              color: "#b45309",
              fontWeight: "bold",
            }}
          />
        )}
      </Box>

      <Box className="flex items-center gap-2 mb-2"> {/* Reduced margin from mb-4 */}
        <Chip
          label={candidate.party || "Independent"}
          size="small" /* Added size small */
          sx={{
            background: partyGradient,
            color: "white",
            fontWeight: 600,
            fontSize: "0.75rem", /* Reduced from 0.875rem */
          }}
        />
      </Box>

      {/* Vote Statistics - More compact */}
      <Box className="mb-2"> {/* Reduced from mb-4 */}
        <Box className="flex items-center justify-between mb-1"> {/* Reduced from mb-2 */}
          <Typography
            variant="body1" /* Changed from h6 */
            className="font-semibold text-gray-800"
          >
            Votes Received
          </Typography>
          <Typography
            variant="body1" /* Changed from h6 */
            className="font-bold text-blue-600"
          >
            {candidate.votes.toLocaleString()} ({percentage.toFixed(1)}%)
          </Typography>
        </Box>

        {/* Progress Bar - Smaller height */}
        <Box sx={{ position: "relative" }}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 8, /* Reduced from 12 */
              borderRadius: 4,
              backgroundColor: "rgba(0,0,0,0.1)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                background: partyGradient,
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              className="font-bold text-white"
              sx={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                fontSize: "0.65rem", /* Added smaller font size */
              }}
            >
              {percentage.toFixed(1)}%
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Additional Stats - More compact */}
      <Box className="flex items-center gap-3"> {/* Reduced from gap-4 */}
        <Box className="flex items-center gap-1">
          <TrendingUp sx={{ color: "#6b7280", fontSize: 16 }} /> {/* Reduced from 18 */}
          <Typography variant="caption" className="text-gray-500"> {/* Changed from body2 */}
            Rank: #{index + 1}
          </Typography>
        </Box>
        <Box className="flex items-center gap-1">
          <People sx={{ color: "#6b7280", fontSize: 16 }} /> {/* Reduced from 18 */}
          <Typography variant="caption" className="text-gray-500"> {/* Changed from body2 */}
            {((candidate.votes / totalVotes) * 100).toFixed(2)}% of total votes
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
</CardContent>
                        </Card>
                      </Grow>
                    );
                  })}
                </div>
              </Box>

              {/* Summary Card */}
              <Box className="text-center">
                <Paper
                  elevation={24}
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    p: 6,
                    maxWidth: 600,
                    mx: "auto",
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 4,
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    <CheckCircle sx={{ color: "white", fontSize: 32 }} />
                  </Box>
                  <Typography
                    variant="h5"
                    className="font-bold text-gray-800 mb-2"
                  >
                    Election Summary
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 mb-4">
                    {election?.status === "completed"
                      ? "This election has been completed successfully. All votes have been counted and verified."
                      : "This election is currently ongoing. Results will be updated in real-time as votes are cast."}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    Total Participation:{" "}
                    <span className="font-bold text-blue-600">
                      {totalVotes.toLocaleString()}
                    </span>{" "}
                    votes cast across{" "}
                    <span className="font-bold text-purple-600">
                      {candidates.length}
                    </span>{" "}
                    candidates
                  </Typography>
                </Paper>
              </Box>
            </div>
          </Fade>
        </Container>
      </motion.div>

      {/* Confetti and Winner Popup - Outside the blurred content */}
      <AnimatePresence>
        {showWinnerPopup && (
          <>
            {/* Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                zIndex: 9998,
              }}
            />

            {/* Winner Popup */}
            {winner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 50 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
                style={{
                  position: "fixed",
                  top: "20%",
                  left: "27%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10000,
                  background: "rgba(255,255,255,0.98)",
                  backdropFilter: "blur(20px)",
                  padding: "50px 60px",
                  borderRadius: "24px",
                  textAlign: "center",
                  boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 4,
                      boxShadow: "0 12px 40px rgba(255, 215, 0, 0.5)",
                      animation: "pulse 2s infinite",
                    }}
                  >
                    <EmojiEvents sx={{ color: "#b45309", fontSize: 50 }} />
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Typography
                    variant="h3"
                    className="font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3"
                  >
                    🎉 Congratulations!
                  </Typography>
                  <Typography
                    variant="h4"
                    className="font-bold text-gray-800 mb-3"
                  >
                    {winner.name}
                  </Typography>
                  <Typography variant="h5" className="text-gray-600 mb-4">
                    Winner of the National Leadership Election 2025
                  </Typography>
                  {/* <Typography variant="h6" className="text-gray-500 mb-2">
                    With {winner.votes.toLocaleString()} votes
                  </Typography> */}
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Confetti - Separate layer to avoid blur */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            <Confetti
              width={width}
              height={height}
              numberOfPieces={300}
              recycle={false}
              gravity={0.3}
              colors={[
                "#ffd700",
                "#ff6b6b",
                "#4ecdc4",
                "#45b7d1",
                "#96ceb4",
                "#ffeaa7",
                "#dda0dd",
                "#98d8c8",
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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
  );
};

export default ResultPage;
