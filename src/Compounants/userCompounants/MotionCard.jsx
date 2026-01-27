//React imports
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

// MUI imports
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

// MUI Icons
import StarIcon from "@mui/icons-material/Star";

// Farmer Motion
import { motion, useInView } from "framer-motion";

export default function MotionCard({ product, index }) {
  const { addToCart } = useCart();

  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, {
    triggerOnce: true,
    margin: "-0px 0px",
  });

  // Handel cardVariants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 10,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        delay: index * 0.06,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ scale: 1.05 }}
    >
      <Card
        sx={{
          fontFamily: "'Fira Code', monospace",
          maxWidth: {
            xs: "100%",
            sm: 260,
            md: 265,
            lg: 270,
          },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: {
            xs: 1,
            sm: 2,
            md: 2,
          },
          marginX: "auto",
          boxShadow: 3,
        }}
      >
        <CardMedia
          sx={{ height: 180, objectFit: "contain" }}
          image={product.thumbnail}
          component="img"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Tooltip title={product.title.length > 20 ? product.title : ""}>
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ cursor: "default" }}
            >
              {product.title.length > 20
                ? product.title.substring(0, 20) + "..."
                : product.title}
            </Typography>
          </Tooltip>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="h6" color="primary">
              ${product.price}
            </Typography>
            <Typography
              variant="h6"
              color="secondary"
              display="flex"
              alignItems="center"
              gap={0.5}
            >
              {Math.floor(product.rating * 10) / 10}
              <StarIcon />
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions sx={{}}>
          <Button
            variant="contained"
            size="small"
            component={Link}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
          <Button
            size="small"
            component={Link}
            to={`/product-details/${product.id}`}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
