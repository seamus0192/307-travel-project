import React from "react";
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
import VacationTrackerLogo from "../../assets/Vacation Tracker Background Remover.png";

const style = {
  position: "absolute" as const,
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen: () => void = () => {
    setOpen(true);
  };
  const handleClose: () => void = () => {
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7139a8",
              ":hover": {
                bgcolor: "#965ad3",
              },
              mx: 1,
            }}
            onClick={handleOpen}
          >
            Open modal
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                References:
              </Typography>
              <Link href="https://www.expedia.com">Expedia</Link>
            </Box>
          </Modal>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
