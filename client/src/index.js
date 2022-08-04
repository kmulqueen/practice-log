import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import { Grommet } from "grommet";
import { theme } from "./styles/theme";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Grommet theme={theme}>
      <App />
    </Grommet>
  </Provider>
);
