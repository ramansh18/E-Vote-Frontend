
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./redux/authThunk";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { setLogout } from "./redux/authSlice";
import { ProtectedRoute, AdminProtectedRoute } from "./components/ProtectedRoute";
// Import pages & components
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ElectionList from "./pages/admin/ElectionList";
import CreateElection from "./pages/admin/CreateElection";
import RequestCandidate from "./pages/RequestCandidate";
import RequestApproval from "./pages/admin/RequestApproval";
import VoterRegistration from "./pages/VoterRegistration";
import VotePage from "./pages/VotePage";
import ResultPage from "./pages/Result";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ApprovedCandidates from "./pages/admin/ApprovedCandidates";
import VoterListPage from "./pages/admin/VoterListPage";
import Results from "./pages/admin/Results";
import Profile from "./pages/Profile";
import Elections from "./pages/Elections";
import ElectionDetail from "./pages/ElectionDetail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ProfileUpdate from "./components/profileUpdate";
import NotAdmin from "./components/NotAdmin";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import VotingGuide from "./components/VotingGuide";
import Error404 from "./pages/Error404";
import ScrollToTop from "./components/scrollToTop";
import { useNavigate } from "react-router-dom";




function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, loading,token } = useSelector((state) => state.auth);

  // Sync auth state on app load
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

   useEffect(() => {
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (exp < currentTime) {
          dispatch(setLogout());
          navigate("/login");
        }
      } catch (error) {
        console.error("Token decode failed:", error);
        dispatch(setLogout());
        navigate("/login");
      }
    }
  }, [token, dispatch, navigate]);

  // Axios interceptor for catching 401
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      res => res,
      err => {
        if (err.response?.status === 401) {
          dispatch(setLogout());
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading App...</p>
      </div>
    );
  }

  return (
   
    <>
    <ScrollToTop />
    
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/not-admin" element={<NotAdmin />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/guide" element={<VotingGuide />} />
        <Route path="*" element={<Error404 />} />
        {/* User-Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/election/requestCandidate"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <RequestCandidate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/register"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <VoterRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voting/vote/:electionId"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <VotePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result/:electionId"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ResultPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-new"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfileUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/elections"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Elections />
            </ProtectedRoute>
          }
        />
        <Route
          path="/election/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ElectionDetail />
            </ProtectedRoute>
          }
        />

        {/* Admin-Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/election-list"
          element={
            <AdminProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <ElectionList />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/create-election"
          element={
            <AdminProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <CreateElection />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/request-approval"
          element={
            <AdminProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <RequestApproval />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/candidate-requests"
          element={
            <AdminProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <RequestApproval />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/approved-candidates"
          element={
            <AdminProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <ApprovedCandidates />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/voter-list"
          element={
            <AdminProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <VoterListPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/results"
          element={
            <AdminProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <Results />
            </AdminProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
    
  );
}

export default App;
