import React, { useState, useEffect } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  ListItemIcon,
  Divider,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { io } from "socket.io-client";

const getIconByType = (type) => {
  switch (type) {
    case "ElectionStart":
      return <EventAvailableIcon fontSize="small" color="primary" />;
    case "ElectionResult":
      return <CheckCircleIcon fontSize="small" color="success" />;
    case "VoteConfirmation":
      return <CheckCircleIcon fontSize="small" color="success" />;
    case "SystemAlert":
      return <NotificationsIcon fontSize="small" color="warning" />;
    default:
      return <NotificationsIcon fontSize="small" />;
  }
};


const getCrispNotification = (notification) => {
  const rawMatch = notification.message.match(/"([^"]+)"/);
  const name = rawMatch ? rawMatch[1] : "";

  switch (notification.type) {
    case "ElectionStart":
      return {
        title: "Election Started",
        message: `${name} is now live. Cast your vote.`,
      };
    case "ElectionResult":
      return {
        title: "Election Ended",
        message: `Results for ${name} are out.`,
      };
    case "VoteConfirmation":
      return {
        title: "Vote Confirmed",
        message: `Your vote for the "${name}" election has been recorded.`,
      };
    case "SystemAlert":
      return {
        title: "System Alert",
        message: notification.message,
      };
    default:
      return {
        title: notification.title || "Notification",
        message: notification.message,
      };
  }
};


export default function NotificationDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;

    // Fetch initial notifications from API
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notification", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setNotifications(data.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Setup socket connection with auth token
    const socket = io("http://localhost:5000", {
      auth: { token },
    });

    // Listen for global notifications
    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    // Listen for user-specific notifications
    socket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          color: "#3b82f6",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            transform: "scale(1.05)",
          },
        }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 340,
            maxHeight: 480,
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress size={24} />
          </Box>
        ) : notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="textSecondary">
              No notifications
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((notification, idx) => {
            const { title, message } = getCrispNotification(notification);
            return (
              <Box key={notification._id}>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    alignItems: "flex-start",
                    display: "flex",
                    gap: 2,
                    py: 1.2,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ mt: 0.5 }}>
                    {getIconByType(notification.type)}
                  </ListItemIcon>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.3, whiteSpace: "normal", wordBreak: "break-word" }}
                    >
                      {message}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ mt: 0.3, display: "block" }}
                    >
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </Typography>
                  </Box>
                </MenuItem>
                {idx < notifications.length - 1 && <Divider />}
              </Box>
            );
          })
        )}
      </Menu>
    </>
  );
}
