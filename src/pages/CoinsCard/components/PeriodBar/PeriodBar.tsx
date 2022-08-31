import React, { useCallback, useState } from "react";

import cn from "classnames";

import styles from "./PeriodBar.module.scss";

type PeriodBarProps = {
  onChange: (period: number) => void;
};

const PeriodTypes = {
  "1 H": 1,
  "24 H": 24,
  "1 W": 7 * 24,
  "1 M": 30 * 24,
  "6 M": 180 * 24,
  "1 Y": 365 * 24,
  All: 365 * 24,
};

const PeriodBar: React.FC<PeriodBarProps> = ({ onChange }) => {
  const [activePeriod, setActivePeriod] = useState("1H");

  const changeActiveState = useCallback(
    (newActive: string) => {
      setActivePeriod(newActive);
      // @ts-ignore
      onChange(PeriodTypes[newActive]);
    },
    [activePeriod]
  );

  return (
    <ul className={styles["PeriodBar__main-block"]}>
      {Object.keys(PeriodTypes).map((el) => (
        <li
          className={cn(
            styles["PeriodBar__choose-variant"],
            activePeriod === el
              ? styles["PeriodBar__choose-variant_active"]
              : null
          )}
          onClick={() => changeActiveState(el)}
          key={el}
        >
          {
            // @ts-ignore
            <a className={styles["PeriodBar__link__value"]}>{el}</a>
          }
        </li>
      ))}
    </ul>
  );
};

export default PeriodBar;
