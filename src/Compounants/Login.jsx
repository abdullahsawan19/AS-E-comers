// MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";

// Router
import { Link, useNavigate } from "react-router-dom";

// React imports
import { useState } from "react";
import { useDarkMode } from "../contexts/DarkModeContext";
import Title from "./Title";
import DarkModeToggle from "./DarkMode";

//Firebase imports
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Login() {
  // DarkMode
  const { darkMode } = useDarkMode();

  const navigate = useNavigate();
  // showPassword
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // formData state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // handleSubmit
  const handleSubmit = async () => {
    const { email, password } = formData;

    if (!emailRegex.test(email)) {
      setError("Invalid Email format");
      setSuccess("");
      return;
    } else if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      );
      setSuccess("");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No user data found in Firestore");
        return;
      }

      const userData = querySnapshot.docs[0].data();

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          uid: user.uid,
          email,
          role: userData.role,
          userName: userData.name,
        }),
      );

      setSuccess("Login Successful");
      setError("");

      setTimeout(() => {
        if (userData.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed: " + err.message);
    }

    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 4000);
  };

  return (
    <Container maxWidth="lg" sx={{ fontFamily: "'Fira Code', monospace" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div>
          <Title />
        </div>
        <div>
          <DarkModeToggle />
        </div>
      </div>

      <Box
        sx={{
          maxWidth: 360,
          margin: "0 auto",
          mt: 4,
          p: 3,
          borderRadius: 4,
          boxShadow: 4,
          backgroundColor: "background.paper",
        }}
      >
        {/*Login*/}
        <h3 style={{ textAlign: "center" }}>Login</h3>

        {/* Alerts */}
        <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
          {error && (
            <Alert
              variant="filled"
              severity="error"
              style={{
                background: darkMode ? "rgb(133, 27, 27)" : "red",
                color: "white",
              }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              variant="filled"
              severity="success"
              style={{
                background: darkMode ? "blue" : "blue",
                color: "white",
              }}
            >
              {success}
            </Alert>
          )}
        </Stack>

        {/* Email */}
        <TextField
          autoComplete="off"
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Password */}
        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          onClick={handleSubmit}
        >
          Login
        </Button>

        {/* Signup Link */}
        <Box sx={{ textAlign: "center" }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Box>
      </Box>
    </Container>
  );
}
