import React, { useState } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";

function CreateHomePage() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");

  const handleSearchButtonClick = () => {
    console.log("Search Title:", searchTitle, "Search Author:", searchAuthor);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Makes sure the container takes at least the full height of the viewport
    >
      <Paper
        elevation={3} // Adjusts the level of the shadow effect
        sx={{
          width: "100%",
          maxWidth: "500px", // Maximum width of the Paper
          p: 4, // Padding inside the Paper
          m: 2, // Margin around the Paper
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          label="Enter Title"
          variant="outlined"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Enter Author"
          variant="outlined"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button
          onClick={handleSearchButtonClick}
          variant="contained"
          color="primary"
          sx={{
            mt: 2, // Margin top for the button
            backgroundColor: "#7139a8",
            ":hover": {
              bgcolor: "#965ad3",
            },
          }}
        >
          Search
        </Button>
      </Paper>
    </Box>
  );
}

export default CreateHomePage;

/*import styles from './HomePage.module.css'
import React, { useState } from 'react'

function CreateHomePage() {
    const [searchTitle, setSearchTitle] = useState(' ');
    const [searchAuthor, setSearchAuthor] = useState(' ');

    const handleSearchButtonClick = () => {
        console.log('')
    };
    return (
        <div>
            <input
                type="text"
                value={searchTitle}
                placeholder="Enter Title"
                onChange={(e) => setSearchTitle(e.target.value)}
            />
            <input
                type="text"
                value={searchAuthor}
                placeholder="Enter Author"
                onChange={(e) => setSearchAuthor(e.target.value)}
            />
            <button
                onClick={handleSearchButtonClick}
                className={styles['create-button']}
            >
            Search
            </button>
        </div>
        );
}

export default CreateHomePage;

*/
