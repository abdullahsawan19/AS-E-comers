// React imports
import React, { useState, useRef, useContext, useEffect } from "react";
import ResponsiveAppBar from "./userCompounants/Navbar";
import Footer from "./userCompounants/Footer";
import MotionCard from "./userCompounants/MotionCard";
import { useSearch } from "../contexts/SearchContext";

// MUI imports
import {
  Container,
  IconButton,
  Tooltip,
  Box,
  Pagination,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
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

export default function UserDashboard() {
  const { searchTerm } = useSearch();
  const { products, loading, totalPages, fetchProducts } =
    useContext(ProductsContext);
  const { darkMode } = useDarkMode();
  const scrollRef = useRef();

  const [page, setPage] = useState(1);
  const [filteredCategory, setFilteredCategory] = useState("all");

  useEffect(() => {
    fetchProducts(page, filteredCategory, searchTerm);
  }, [page, filteredCategory, searchTerm, fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [filteredCategory, searchTerm]);

  const handleFilter = (category) => setFilteredCategory(category);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      <Container
        maxWidth="lg"
        sx={{ fontFamily: "'Fira Code', monospace", minHeight: "80vh" }}
      >
        {/* Category Buttons Header */}
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
          {isXs && (
            <IconButton
              onClick={scrollLeft}
              sx={{ color: darkMode ? "white" : "black" }}
            >
              <FaArrowLeft />
            </IconButton>
          )}

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
              "&::-webkit-scrollbar": { display: "none" },
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
                    color: darkMode ? "white" : "black",
                    transition: "0.3s",
                    flexShrink: 0,
                  }}
                >
                  {button.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>

          {isXs && (
            <IconButton
              onClick={scrollRight}
              sx={{ color: darkMode ? "white" : "black" }}
            >
              <FaArrowRight />
            </IconButton>
          )}
        </Box>

        {/* ✅ Product Cards Section */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : products.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mt: 4,
              justifyContent: "space-around",
            }}
          >
            {products.map((product, index) => (
              <MotionCard key={product.id} product={product} index={index} />
            ))}
          </Box>
        ) : (
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mt: 10,
              color: darkMode ? "white" : "black",
            }}
          >
            No products found !
          </Typography>
        )}

        {/* ✅ Pagination Section */}
        {!loading && totalPages > 1 && (
          <Stack spacing={2} sx={{ mt: 6, mb: 4, alignItems: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size={isXs ? "medium" : "large"}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: darkMode ? "white" : "black",
                },
              }}
            />
          </Stack>
        )}
      </Container>

      <Footer />
    </>
  );
}
