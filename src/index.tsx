import React from "react";

import ReactDOM from "react-dom";

import App from "./App";

import "@styles/global.scss";

import "regenerator-runtime";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
