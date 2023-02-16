import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider authType={"cookie"} authName={"_auth"} cookieDomain={window.location.hostname} cookieSecure={false}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
