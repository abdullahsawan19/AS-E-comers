import React from "react";
import { Box, Container, Typography, Link, Stack } from "@mui/material";
import { useDarkMode } from "../../contexts/DarkModeContext";

const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <Box
      sx={{
        bgcolor: darkMode
          ? "rgba(36, 48, 72, 0.5)"
          : "rgba(255, 255, 255, 0.5)",
        color: darkMode ? "white" : "black",
        py: 4,
        mt: 7,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body1"
          align="center"
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, mb: 1 }}
        >
          © {new Date().getFullYear()} Our Store - All Rights Reserved.
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" }, mb: 3 }}
        >
          This website is built with{" "}
          <Link
            href="https://mui.com/"
            target="_blank"
            underline="hover"
            color="inherit"
          >
            MUI
          </Link>{" "}
          and React.
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          flexWrap="wrap"
        >
          <Link
            href="https://www.facebook.com/abdullah.sawan.72510/"
            target="_blank"
            underline="hover"
            color="primary"
            sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
          >
            Facebook
          </Link>

          <Link
            href="https://www.linkedin.com/in/abdullah-sawan-064ba127a/"
            target="_blank"
            underline="hover"
            color="primary"
            sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
          >
            LinkedIn
          </Link>

          <Link
            href="https://github.com/abdullahsawan19"
            target="_blank"
            underline="hover"
            color="primary"
            sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
          >
            GitHub
          </Link>

          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              color: "inherit",
            }}
          >
            WhatsApp: 01000525917
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
