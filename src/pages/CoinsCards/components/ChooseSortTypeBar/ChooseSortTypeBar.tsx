import React, { SetStateAction, useEffect, useRef, useState } from "react";

import styles from "./ChooseSortTypeBar.module.scss";

type ChooseSortTypeBarProps = {
  onClick: (sortType: SetStateAction<string>) => void;
  actualSortType: string;
};

const ChooseSortTypeBar: React.FC<ChooseSortTypeBarProps> = ({
  onClick,
  actualSortType,
}) => {
  return (
    <ul className={styles["ChooseSortTypeBar__ul"]}>
      <li
        className={`${styles["ChooseSortTypeBar__link"]} ${
          actualSortType === "market_cap_desc" ? styles["active"] : null
        }`}
        onClick={() => {
          onClick("market_cap_desc");
        }}
      >
        <a>All</a>
      </li>
      <li
        className={`${styles["ChooseSortTypeBar__link"]} ${
          actualSortType === "gecko_desc" ? styles["active"] : null
        }`}
        onClick={() => {
          onClick("gecko_desc");
        }}
      >
        <a>Gainer</a>
      </li>
      <li
        className={`${styles["ChooseSortTypeBar__link"]} ${
          actualSortType === "gecko_asc" ? styles["active"] : null
        }`}
        onClick={() => {
          onClick("gecko_asc");
        }}
      >
        <a>Looser</a>
      </li>
      <li className={styles["ChooseSortTypeBar__link"]} onClick={() => {}}>
        <a>Favourites</a>
      </li>
    </ul>
  );
};

export default ChooseSortTypeBar;
