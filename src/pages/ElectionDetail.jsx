/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Divider,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ElectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/election/${id}`);
        setElection(res.data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Failed to load election details",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [id]);

  const handleVote = () => navigate(`/voting/vote/${id}`);
  const handleShowResults = () => navigate(`/results/${id}`);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8", py: 6, px: 2, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 800 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress />
          </Box>
        ) : election ? (
          <Paper elevation={4} sx={{ borderRadius: 3, p: 4, bgcolor: "#fff" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
              {election.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
              {election.description}
            </Typography>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2"><strong>Status:</strong> {election.status === "completed" ? "Completed" : election.status}</Typography>
                <Typography variant="body2"><strong>Start:</strong> {new Date(election.startTime).toLocaleString()}</Typography>
                <Typography variant="body2"><strong>End:</strong> {new Date(election.endTime).toLocaleString()}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Candidates
            </Typography>

            {election.candidates.length > 0 ? (
              <Grid container spacing={2}>
              {election.candidates.map((candidate, idx) => (
                <Grid item xs={12} sm={6} key={idx} sx={{ display: "flex" }}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Avatar sx={{ bgcolor: "#3f51b5" }}>
                          {candidate.name[0].toUpperCase()}
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {candidate.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Party: {candidate.party}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary" noWrap>
                        Wallet: {candidate.walletAddress}
                      </Typography> */}
                      {election.status !== "upcoming" && (
                        <Typography variant="body2" color="text.secondary">
                          Votes: {candidate.votes}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            ) : (
              <Typography color="text.secondary" mt={2}>
                No candidates yet.
              </Typography>
            )}

            <Box mt={5} display="flex" flexDirection="column" gap={2}>
              {election.status === "ongoing" && (
                <Button
                  variant="contained"
                  startIcon={<HowToVoteIcon />}
                  onClick={handleVote}
                  sx={{ borderRadius: 2 }}
                  fullWidth
                >
                  Vote Now
                </Button>
              )}
              {election.status === "completed" && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<BarChartIcon />}
                  onClick={handleShowResults}
                  sx={{ borderRadius: 2 }}
                  fullWidth
                >
                  Show Results
                </Button>
              )}

              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => window.history.back()}
                sx={{ borderRadius: 2 }}
                fullWidth
              >
                Go Back
              </Button>
            </Box>
          </Paper>
        ) : (
          <Typography className="text-center text-gray-600 mt-10">Election not found.</Typography>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ElectionDetail;
