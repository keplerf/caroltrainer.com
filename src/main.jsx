import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "/src/css/index.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Signal to prerenderer that the page is ready
document.dispatchEvent(new Event("render-complete"));
