import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import SeasonProvider from "./context/SeasonProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SeasonProvider>
      <App />
    </SeasonProvider>
  </BrowserRouter>
);