import "./style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { DarkModeProvider } from "./context/DarkMode.tsx";
import Router from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DarkModeProvider>
          <Router />
        </DarkModeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
