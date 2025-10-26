import React, { useState } from "react";
import axios from "axios";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

const RegisterCandidate = () => {
  const [userId, setUserId] = useState("");
  const [electionId, setElectionId] = useState("");
  const [party, setParty] = useState("");
  const [motto, setMotto] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !electionId || !party ||!motto) {
      setErrorMessage("All fields are required!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      // Send request to the backend for candidate registration
      const response = await axios.post("http://localhost:5000/api/candidate/register", {
        userId,
        electionId,
        motto,
        party,
      });

      // Handle success response
      setSuccessMessage(response.data.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Reset the form fields
      setUserId("");
      setElectionId("");
      setParty("");

    } catch (error) {
      // Handle error response
      setErrorMessage(error.response?.data?.message || "Failed to register candidate");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h2>Register Candidate</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Election ID</label>
          <input
            type="text"
            value={electionId}
            onChange={(e) => setElectionId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Party</label>
          <input
            type="text"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register Candidate</button>
      </form>

      {/* Snackbar for success or error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterCandidate;
