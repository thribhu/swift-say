import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./styles/tailwind.css";
import reportWebVitals from "./reportWebVitals";
import { NavigationProvider } from "./store/navigation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <NavigationProvider/>
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
