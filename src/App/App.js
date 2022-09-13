import React from "react";
import ROUTES from "@config/routes";
import CoinsCard from "@pages/CoinsCard";
import Market from "@pages/CoinsCards";
import Search from "@pages/Search";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import styles from "./App.module.scss";
function App() {
    return (React.createElement("div", { className: styles["App__Main-div"] },
        React.createElement(BrowserRouter, null,
            React.createElement(Routes, null,
                React.createElement(Route, { path: ROUTES.MARKET, element: React.createElement(Market, null) }),
                React.createElement(Route, { path: ROUTES.SEARCH, element: React.createElement(Search, null) }),
                React.createElement(Route, { path: ROUTES.COINS_CARD, element: React.createElement(CoinsCard, null) }),
                React.createElement(Route, { path: "*", element: React.createElement(Navigate, { to: ROUTES.MARKET }) })))));
}
export default App;
//# sourceMappingURL=App.js.map