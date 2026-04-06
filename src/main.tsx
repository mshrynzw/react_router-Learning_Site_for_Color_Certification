import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

const container = document.getElementById("root")!;
const app = <App />;

if (container.firstChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
