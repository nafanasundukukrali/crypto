import React, { useEffect } from "react";

import MultiDropdown from "@components/MultiDropdown/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import cn from "classnames";

import style from "./MarketHeader.module.scss";

type MarketHeaderProps = {
  capChangePercentage: number;
  supportedCurrency: Option[];
  actualCurrencyValue: Option[];
  onClick: (value: Option[]) => void;
};

const MarketHeader: React.FC<MarketHeaderProps> = ({
  capChangePercentage,
  supportedCurrency,
  actualCurrencyValue,
  onClick,
}) => {
  // eslint-disable-next-line no-console
  // console.log("Market had been Rendered!");
  return (
    <div className={style["MarketHeader__main-block"]}>
      <div className={style["MarketHeader__market-status"]}>
        <div className={style["MarketHeader__market-status__header"]}>
          Market is {capChangePercentage >= 0 ? " up " : " down "}
          <span
            className={cn(
              capChangePercentage > 0
                ? style["MarketHeader__market-status__header__span_green"]
                : style["MarketHeader__market-status__header__span_red"]
            )}
          >
            {capChangePercentage.toFixed(2)}
          </span>
        </div>
        <span>In the past 24 hours</span>
      </div>
      <div className={style["MarketHeader__search-item"]}></div>
      <div className={style["MarketHeader__coins-item"]}>Coins</div>
      <div className={style["MarketHeader__currency-dropdown"]}>
        <MultiDropdown
          options={supportedCurrency}
          value={actualCurrencyValue}
          onChange={onClick}
          pluralizeOptions={(value) => {
            let resultString = "";
            value.forEach((el) => {
              if (el) resultString += el.value + " ";
            });
            return resultString;
          }}
        />
      </div>
    </div>
  );
};

export default MarketHeader;
