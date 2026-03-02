import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import ProductsProvider from "./contexts/ApiContext";
import { CartProvider } from "./contexts/CartContext";
import { SearchProvider } from "./contexts/SearchContext";
import AppRoute from "./Compounants/App.route.jsx";

const theme = createTheme({
  typography: {
    fontFamily: `'Fira Code', monospace`,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DarkModeProvider>
        <ProductsProvider>
          <CartProvider>
            <SearchProvider>
              <Routes>
                <Route path="/*" element={<AppRoute />} />
              </Routes>
            </SearchProvider>
          </CartProvider>
        </ProductsProvider>
      </DarkModeProvider>
    </ThemeProvider>
  );
}

export default App;
