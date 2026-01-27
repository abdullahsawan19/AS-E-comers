import { Box, Typography } from "@mui/material";

export default function Title() {
  return (
    <Box sx={{ textAlign: "center", py: 2 }}>
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: "0.8rem",
            sm: "1.8rem",
            md: "2.3rem",
          },
          fontWeight: "bold",
          fontFamily: "'Fira Code', monospace",
        }}
      >
        Welcome to AS e-comers
      </Typography>
    </Box>
  );
}
