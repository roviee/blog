import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { AuthListener } from "./components/AuthListener.tsx";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Provider store={store}>
        <AuthListener>
          <App />
        </AuthListener>
      </Provider>
  </StrictMode>
);
