import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Box, Typography, Divider, Container } from "@mui/material";
import { useDarkMode } from "../contexts/DarkModeContext";
export default function AdminDashboard() {
  const { darkMode } = useDarkMode();
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);

      const cartsSnapshot = await getDocs(collection(db, "carts"));
      const cartsData = cartsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarts(cartsData);
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Divider sx={{ my: 3 }} />

      {users.map((user) => {
        const userCart = carts.find((cart) => cart.id === user.uid);

        return (
          <Box
            key={user.id}
            sx={{
              mb: 4,
              p: 2,
              border: "1px solid ",
              borderColor: darkMode ? "#0f182b" : "#c4d6fbb8",
              borderRadius: 3,
              bgcolor: darkMode
                ? "rgba(36, 48, 72, 0.5)"
                : "rgba(255, 255, 255, 0.5)",
              flexDirection: "column",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <Typography variant="h6" gutterBottom>
              User Name: {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              User Mail: {user.email}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle1">Orders:</Typography>
            {userCart && userCart.items?.length > 0 ? (
              <ul style={{ paddingLeft: "1rem" }}>
                {userCart.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title} × {item.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No orders found.
              </Typography>
            )}
          </Box>
        );
      })}
    </Container>
  );
}
