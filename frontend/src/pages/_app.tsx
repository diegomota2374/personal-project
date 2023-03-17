import { AuthProvider } from "../@core/contexts/Auth/AuthProvider";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "../@core/components/dashboard";
import { RequireAuth } from "../@core/contexts/Auth/RequireAuth";

const theme = createTheme();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RequireAuth>
          <Dashboard>
            <Component {...pageProps} />
          </Dashboard>
        </RequireAuth>
      </AuthProvider>
    </ThemeProvider>
  );
}
