import React from "react";
import { Box, Container, Typography } from "@mui/material";
import ResponsiveAppBar from "./Navbar";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ApiContext";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useDarkMode } from "../../contexts/DarkModeContext";
import StarIcon from "@mui/icons-material/Star";
import Footer from "./Footer";

const ProductDetails = () => {
  const { darkMode } = useDarkMode();
  const { products } = useContext(ProductsContext);
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <Typography>Product not found</Typography>;

  const slideImages = [...product.images];

  return (
    <>
      <ResponsiveAppBar />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* ✅  Imges Slider */}
        <Box
          sx={{
            mb: 4,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <Slide
            duration={4500}
            transitionDuration={500}
            infinite={slideImages.length > 1}
            indicators={slideImages.length > 1}
            arrows={slideImages.length > 1}
            pauseOnHover
            autoplay={true}
          >
            {slideImages.map((url, index) => (
              <div key={index}>
                <Box
                  sx={{
                    height: { xs: "250px", sm: "350px", md: "450px" },
                    backgroundImage: `url(${url})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    bgcolor: darkMode
                      ? "rgba(36, 48, 72, 0.5)"
                      : "rgba(255, 255, 255, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    maxHeight: "450px",
                  }}
                />
              </div>
            ))}
          </Slide>
        </Box>

        {/*  Proudct Details*/}
        <Box
          sx={{
            bgcolor: darkMode
              ? "rgba(36, 48, 72, 0.5)"
              : "rgba(255, 255, 255, 0.5)",
            color: darkMode ? "#fff" : "#000",
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {/*Product Title*/}
          <Typography
            variant="h4"
            gutterBottom
            fontSize={{ xs: "1.6rem", sm: "2rem", md: "2.4rem" }}
          >
            Title : {product.title}
          </Typography>
          {/* Product Brand */}
          <Typography
            variant="h4"
            color="text.secondary"
            fontSize={{ xs: "1rem", sm: "1.2rem" }}
          >
            Brand : {product.brand ? product.brand : "Not Available"}
          </Typography>
          {/*Product Category*/}
          <Typography
            variant="h4"
            sx={{ mt: 1 }}
            fontSize={{ xs: "1rem", sm: "1.2rem" }}
          >
            Category : {product.category}
          </Typography>
          {/*Product Description*/}
          <Typography
            variant="body1"
            gutterBottom
            sx={{ mt: 1 }}
            fontSize={{ xs: "0.95rem", sm: "1.1rem" }}
          >
            Description : {product.description}
          </Typography>
          {/*Product Price*/}
          <Typography variant="h6" color="primary" fontWeight="bold">
            Price: ${product.price}
          </Typography>
          {/*Product Rating*/}
          <Typography
            variant="h6"
            display="flex"
            alignItems="center"
            gap={0.5}
            color="secondary"
          >
            Rating: {Math.floor(product.rating * 10) / 10}
            <StarIcon sx={{ mt: "2px" }} />
          </Typography>
          {/*Product Reviews*/}
          <Typography
            variant="h4"
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              fontSize: { xs: "1.2rem", sm: "1.6rem" },
            }}
          >
            Reviews {product.reviews.length || 0}
          </Typography>
          {product.reviews?.length > 0 &&
            product.reviews.map((review, index) => (
              <Box
                key={index}
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  display: "flex",
                  justifyContent: "space-between",
                  border: "2px solid ",
                  borderColor: darkMode ? "#0f182b" : "#c4d6fbb8",
                  borderRadius: 2,
                  p: 2,
                  mt: 3,
                  bgcolor: darkMode
                    ? "rgba(36, 48, 72, 0.5)"
                    : "rgba(255, 255, 255, 0.5)",
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h5"
                  fontSize={{ xs: "1rem", sm: "1.2rem" }}
                >
                  Reviewer Name : {review.reviewerName}
                </Typography>
                <Typography
                  variant="h5"
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                  fontSize={{ xs: "1rem", sm: "1.2rem" }}
                >
                  Rating : {review.rating}
                  <StarIcon sx={{ mt: "2px" }} />
                </Typography>
                <Typography
                  variant="h5"
                  fontSize={{ xs: "1rem", sm: "1.2rem" }}
                >
                  Comment : {review.comment}
                </Typography>
              </Box>
            ))}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;
