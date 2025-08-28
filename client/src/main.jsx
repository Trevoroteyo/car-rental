import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import AppProvider from "./context/AppContext";

createRoot(document.getElementById("root")).render(
   <BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <App />
        <Toaster richColors />
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
);
