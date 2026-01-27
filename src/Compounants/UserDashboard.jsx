// React important
import React, { useState, useRef, useContext } from "react";
import ResponsiveAppBar from "./userCompounants/Navbar";
import Footer from "./userCompounants/Footer";
import MotionCard from "./userCompounants/MotionCard";
import { useSearch } from "../contexts/SearchContext";

// MUI imports
import { Container, IconButton, Tooltip, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// Darkmode
import { useDarkMode } from "../contexts/DarkModeContext";

// Icons
import {
  FaMobileAlt,
  FaLaptop,
  FaShoppingCart,
  FaHome,
  FaMale,
  FaCouch,
  FaSpa,
  FaArrowLeft,
  FaArrowRight,
  FaShoePrints,
  FaThLarge,
} from "react-icons/fa";
import { MdWatch, MdKitchen } from "react-icons/md";

// Contexts
import { ProductsContext } from "../contexts/ApiContext";

// Array of category buttons with icons
const buttonArray = [
  { name: "all", icon: <FaThLarge /> },
  { name: "mobile-accessories", icon: <FaMobileAlt /> },
  { name: "laptops", icon: <FaLaptop /> },
  { name: "fragrances", icon: <FaSpa /> },
  { name: "beauty", icon: <FaSpa /> },
  { name: "groceries", icon: <FaShoppingCart /> },
  { name: "home-decoration", icon: <FaHome /> },
  { name: "furniture", icon: <FaCouch /> },
  { name: "mens-shirts", icon: <FaMale /> },
  { name: "mens-shoes", icon: <FaShoePrints /> },
  { name: "mens-watches", icon: <MdWatch /> },
  { name: "kitchen-accessories", icon: <MdKitchen /> },
];

// ✅ Main Dashboard Component
export default function UserDashboard() {
  const { searchTerm } = useSearch();
  const { products } = useContext(ProductsContext);
  const { darkMode } = useDarkMode();
  const scrollRef = useRef();

  const [filteredCategory, setFilteredCategory] = useState("all");
  const handleFilter = (category) => setFilteredCategory(category);

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      filteredCategory === "all" || item.category === filteredCategory;

    const searchIn = `${item.title} ${item.description} ${item.brand} ${
      item.category
    } ${item.tags?.join(" ")}`.toLowerCase();

    const matchesSearch = searchIn.includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <ResponsiveAppBar />

      <Container maxWidth="lg" sx={{ fontFamily: "'Fira Code', monospace" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mt: 2,
            px: 1,
          }}
        >
          {/* Scroll Left (Mobile only) */}
          {isXs && (
            <IconButton
              onClick={scrollLeft}
              sx={{
                color: darkMode ? "white" : "black",
                backgroundColor: darkMode ? "#2c3e50" : "#f0f0f0",
                "&:hover": {
                  backgroundColor: darkMode ? "#1c2833" : "#e0e0e0",
                },
              }}
            >
              <FaArrowLeft />
            </IconButton>
          )}

          {/* Category Buttons */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollBehavior: "smooth",
              px: 1,
              py: 1,
              maxWidth: "90vw",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {buttonArray.map((button, index) => (
              <Tooltip key={index} title={button.name.replace("-", " ")} arrow>
                <IconButton
                  onClick={() => handleFilter(button.name)}
                  sx={{
                    minWidth: 60,
                    minHeight: 60,
                    fontSize: "1.5rem",
                    border: "2px solid",
                    borderColor:
                      filteredCategory === button.name
                        ? darkMode
                          ? "rgba(201, 193, 39, 0.5)"
                          : "rgb(0, 85, 255)"
                        : "rgba(36, 48, 72, 0.5)",
                    borderRadius: "50%",
                    backgroundColor: "inherit",
                    color: darkMode ? "white" : "black",
                    transition: "0.3s",
                    flexShrink: 0,
                    "&:hover": {
                      backgroundColor: darkMode
                        ? "rgba(36, 48, 72, 0.5)"
                        : "rgba(255, 255, 255, 0.5)",
                    },
                  }}
                >
                  {button.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>

          {/* Scroll Right (Mobile only) */}
          {isXs && (
            <IconButton
              onClick={scrollRight}
              sx={{
                color: darkMode ? "white" : "black",
                backgroundColor: darkMode ? "#2c3e50" : "#f0f0f0",
                "&:hover": {
                  backgroundColor: darkMode ? "#1c2833" : "#e0e0e0",
                },
              }}
            >
              <FaArrowRight />
            </IconButton>
          )}
        </Box>

        {/* ✅ Product Cards Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 4,
            justifyContent: "space-around",
          }}
        >
          {filteredProducts.map((product, index) => (
            <MotionCard key={product.id} product={product} index={index} />
          ))}
        </Box>
      </Container>

      <Footer />
    </>
  );
}
