import React from "react";

import ROUTES from "@config/routes";
import CoinsCard from "@pages/CoinsCard";
import Market from "@pages/CoinsCards";
import Search from "@pages/Search";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles["App__Main-div"]}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.MARKET} element={<Market />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.COINS_CARD} element={<CoinsCard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
