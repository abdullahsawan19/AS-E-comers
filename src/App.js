import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import Collect from "./Compounants/Collect";
import ProductsProvider from "./contexts/ApiContext";
import { CartProvider } from "./contexts/CartContext";
import { SearchProvider } from "./contexts/SearchContext";

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
                <Route path="/*" element={<Collect />} />
              </Routes>
            </SearchProvider>
          </CartProvider>
        </ProductsProvider>
      </DarkModeProvider>
    </ThemeProvider>
  );
}

export default App;
