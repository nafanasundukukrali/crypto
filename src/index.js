import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@styles/global.scss";
import "regenerator-runtime";
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement(App, null)), document.getElementById('root'));
if (module.hot) {
    module.hot.accept();
}
//# sourceMappingURL=index.js.map