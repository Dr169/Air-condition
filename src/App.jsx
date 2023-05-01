import { Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { SignIn } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { theme } from "./Theme";
import { Layout } from "./components/Layout"

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="*" element={<h1 style={{ color: "red" }}>Not Found</h1>} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
