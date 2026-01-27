//REact Imports
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";
// Context Imports
import { useCart } from "../../contexts/CartContext";
import { useDarkMode } from "../../contexts/DarkModeContext";
//MUI Imports
import { Typography, Box, CardMedia, IconButton, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartPage() {
  const { darkMode } = useDarkMode();
  const {
    cart,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <>
      {/*Navbar*/}
      <ResponsiveAppBar />
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: darkMode ? "#fff" : "#000", mb: 3 }}
        >
          Your Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            {cart.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  bgcolor: darkMode
                    ? "rgba(36, 48, 72, 0.8)"
                    : "rgba(255, 255, 255, 0.9)",
                }}
              >
                {/* Info & Controls */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    color: darkMode ? "#fff" : "#000",
                  }}
                >
                  <Typography variant="h6">Title: {item.title}</Typography>
                  <Typography variant="body1">
                    Brand: {item.brand ?? "Not Available"}
                  </Typography>
                  <Typography variant="body1">
                    Price: ${item.price.toFixed(2)}
                  </Typography>

                  {/* Quantity Controls */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body1">Quantity:</Typography>
                    <IconButton
                      size="small"
                      onClick={() => decreaseQuantity(item.id)}
                      color="primary"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => increaseQuantity(item.id)}
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
                {/* Image */}
                <CardMedia
                  component="img"
                  image={item.thumbnail}
                  alt={item.title}
                  sx={{
                    height: 150,
                    width: 150,
                    objectFit: "contain",
                    borderRadius: 2,
                  }}
                />

                {/* Delete Button */}
                <IconButton
                  onClick={() => removeFromCart(item.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <Divider sx={{ my: 4 }} />

            {/* Total + Checkout */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: darkMode ? "#fff" : "#000" }}
              >
                Total: ${getTotalPrice().toFixed(2)}
              </Typography>
            </Box>
            <Footer />
          </>
        )}
      </Box>
    </>
  );
}
