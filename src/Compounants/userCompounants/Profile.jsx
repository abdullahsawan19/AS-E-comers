import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "./Navbar";
import { useCart } from "../../contexts/CartContext";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { useDarkMode } from "../../contexts/DarkModeContext";
import Footer from "./Footer";

const Profile = () => {
  const { darkMode } = useDarkMode();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(storedUser);
  }, []);

  const { cart, getTotalPrice } = useCart();

  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          mt: 4,
          px: { xs: 2, sm: 4 },
          width: "100%",
        }}
      >
        <Card
          sx={{
            p: 3,
            mb: 4,
            boxShadow: 3,
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 1, fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          >
            Personal information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Name:</strong> {user?.userName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user?.email}
          </Typography>
        </Card>

        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Your Cart:
        </Typography>

        <Grid container spacing={2}>
          {cart.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  p: 2,
                  height: "100%",
                  bgcolor: darkMode
                    ? "rgba(36, 48, 72, 0.8)"
                    : "rgba(255, 255, 255, 0.9)",
                  color: darkMode ? "white" : "black",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2">Price: ${item.price}</Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Total Price : ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {cart.length > 0 && (
          <Box
            sx={{
              mt: 4,
              mb: 4,
              p: 3,
              bgcolor: darkMode
                ? "rgba(36, 48, 72, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              borderRadius: 2,
              textAlign: "center",
              fontSize: "1.2rem",
              color: darkMode ? "white" : "black",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Total Cart Price: ${getTotalPrice().toFixed(2)}
            </Typography>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Profile;
