import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Application from "./App";
import ThemeProvider from "./components/ThemeProvider";
import store from "./state";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <Application/>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
