import React, { FC, LegacyRef, useCallback, useEffect, useRef } from "react";

import rootStore from "@store/RootStore";
import { observable } from "mobx";

import styles from "./ChooseSortTypeBar.module.scss";

type ChooseSortTypeBarProps = {
  sortType: string;
};

const ChooseSortTypeBar: FC<ChooseSortTypeBarProps> = ({ sortType }) => {
  const handleSortType = useCallback((value: string) => {
    rootStore.currency.selectedSortType = value;
  }, []);

  const sortTypes: { [p: string]: string } = {
    All: "market_cap_desc",
    Gainer: "gecko_desc",
    Looser: "gecko_asc",
  };

  return (
    <ul className={styles["ChooseSortTypeBar__ul"]}>
      {Object.keys(sortTypes).map((key: string) => (
        <li
          key={key}
          className={`${styles["ChooseSortTypeBar__link"]} ${
            sortType === sortTypes[key] ? styles["active"] : null
          }`}
          onClick={() => handleSortType(sortTypes[key])}
        >
          <a>{key}</a>
        </li>
      ))}
      <li key="Favourites" className={styles["ChooseSortTypeBar__link"]}>
        <a>Favourites</a>
      </li>
    </ul>
  );
};

export default ChooseSortTypeBar;
