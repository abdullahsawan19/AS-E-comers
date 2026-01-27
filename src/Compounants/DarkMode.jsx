import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function DarkModeToggleButton() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div style={{ paddingLeft: 0 }}>
      <IconButton
        onClick={() => setDarkMode((prev) => !prev)}
        color="inherit"
        sx={{
          backgroundColor: darkMode ? "#424242" : "#f0f0f0",
          color: darkMode ? "white" : "black",
          transition: "all 0.3s ease",
          margin: "20px",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: darkMode ? "#2e7d32" : "#d0f0c0",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            transform: "scale(1.05)",
          },
        }}
      >
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </div>
  );
}
