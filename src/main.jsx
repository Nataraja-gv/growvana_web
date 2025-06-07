import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./utils/store/reduxStrore.js";

createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    maxSnack={2}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    autoHideDuration={1000}
  >
    {" "}
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>
);
