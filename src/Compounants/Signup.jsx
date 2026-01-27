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
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
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

// Firebase imports
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  // DarkMode
  const { darkMode } = useDarkMode();

  // Navigation
  const navigate = useNavigate();
  // showPassword
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // showConfirmPassword
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // formData State
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "user", //
  });

  // handleChange State
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle Regex
  const nameRegex = /^[a-zA-Z][a-zA-Z '.-]{1,49}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();

    const { name, email, password, gender, confirmpassword, role } = formData;

    if (!nameRegex.test(name)) {
      setError("Invalid name");
      setSuccess("");
      return;
    } else if (gender === "") {
      setError("Please select gender");
      setSuccess("");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Invalid email format");
      setSuccess("");
      return;
    } else if (!passwordRegex.test(password)) {
      setError("Invalid password format");
      setSuccess("");
      return;
    } else if (password !== confirmpassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        email,
        gender,
        role,
      });

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ uid: user.uid, email, role, userName: name }),
      );

      setSuccess("Registration successful");
      setError("");

      setTimeout(() => {
        navigate("/user-dashboard");
      }, 1500);
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed: " + err.message);
    }

    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 4000);
  }

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
          mt: 0,
          p: 3,
          borderRadius: 4,
          boxShadow: 4,
          backgroundColor: "background.paper",
        }}
      >
        {/* Sign up */}
        <h3 style={{ textAlign: "center" }}>Sign up</h3>

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

        {/* Name */}
        <TextField
          name="name"
          autoComplete="off"
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.name}
          onChange={handleChange}
        />

        {/* Gender */}
        <FormControl sx={{ mb: 2, flexDirection: "row", alignItems: "center" }}>
          <FormLabel sx={{ mr: 2 }}>Gender :</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>

        {/* Email */}
        <TextField
          name="email"
          autoComplete="off"
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
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
            label="Password"
            value={formData.password}
            onChange={handleChange}
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

        {/* Confirm Password */}
        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>{" "}
          <OutlinedInput
            id="confirmpassword"
            name="confirmpassword"
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {/* Sign up Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          onClick={handleSubmit}
        >
          Sign up
        </Button>

        {/* Login Link */}
        <Box sx={{ textAlign: "center", fontSize: "15px" }}>
          You already have an account? <Link to="/">Login</Link>
        </Box>
      </Box>
    </Container>
  );
}
