import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import VacationTrackerLogo from "../../assets/Vacation Tracker Background Remover.png";
import { Modal } from "@mui/base/Modal";
import { authContext } from "../../authContext/authContext";

const Header: React.FC = () => {
  const { user, logout } = useContext(authContext);
  const [open, setOpen] = React.useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
      }}
      style={{
        backgroundColor: "#daeee7",
      }}
    >
      <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          {localStorage.token != null && (
            <IconButton component={RouterLink} to="/home">
              <img
                src={VacationTrackerLogo}
                alt="Vacation Tracker"
                width="50"
                height="50"
              />
            </IconButton>
          )}
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 500,
              marginLeft: 1,
            }}
          >
            Vacation Tracker
          </Typography>
        </Box>
        <div>
          {user !== null && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#203973",
                ":hover": {
                  bgcolor: "#3355A8",
                },
                mx: 1,
              }}
              onClick={logout}
            >
              logout
            </Button>
          )}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#203973",
              ":hover": {
                bgcolor: "#3355A8",
              },
              mx: 1,
            }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            References
          </Button>
          {open && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 10,
                backgroundColor: "transparent",
              }}
            />
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            disableEnforceFocus
            disableAutoFocus
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                width: 400,
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                zIndex: 20,
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                References:
              </Typography>
              <Link href="https://www.expedia.com">
                Expedia - Comprehensive travel booking
              </Link>
              <br />
              <Link href="https://www.tripadvisor.com">
                TripAdvisor - Travel reviews and bookings
              </Link>
              <br />
              <Link href="https://www.booking.com">
                Booking.com - Hotel and accommodation reservations
              </Link>
              <br />
              <Link href="https://www.kayak.com">
                Kayak - Flight, hotel, and car rental search
              </Link>
              <br />
              <Link href="https://www.skyscanner.net">
                Skyscanner - Global travel search engine
              </Link>
              <br />
              <Link href="https://www.airbnb.com">
                Airbnb - Unique accommodations and experiences
              </Link>
            </Box>
          </Modal>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
