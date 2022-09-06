import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./ChooseSortTypeBar.module.scss";

type ChooseSortTypeBarProps = {
  onClick: (sortType: string) => void;
};

const ChooseSortTypeBar: React.FC<ChooseSortTypeBarProps> = ({ onClick }) => {
  const [activeSortType, setSortType] = useState("market_cap_desc");

  const handleSortType = useCallback(
    (value: string) => {
      setSortType(value);
      onClick(value);
    },
    [onClick]
  );

  return (
    <ul className={styles["ChooseSortTypeBar__ul"]}>
      <li
        className={`${styles["ChooseSortTypeBar__link"]} ${
          activeSortType === "market_cap_desc" ? styles["active"] : null
        }`}
        onClick={() => handleSortType("market_cap_desc")}
      >
        <a>All</a>
      </li>
      <li
        className={`${styles["ChooseSortTypeBar__link"]} ${
          activeSortType === "gecko_desc" ? styles["active"] : null
        }`}
        onClick={() => {
          handleSortType("gecko_desc");
        }}
      >
        <a>Gainer</a>
      </li>
      <li
        className={`${styles["ChooseSortTypeBar__link"]} ${
          activeSortType === "gecko_asc" ? styles["active"] : null
        }`}
        onClick={() => {
          handleSortType("gecko_asc");
        }}
      >
        <a>Looser</a>
      </li>
      <li className={styles["ChooseSortTypeBar__link"]}>
        <a>Favourites</a>
      </li>
    </ul>
  );
};

export default ChooseSortTypeBar;
