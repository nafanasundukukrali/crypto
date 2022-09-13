import React, { useCallback, useEffect, useState } from "react";

// @ts-ignore
import search_icon from "@components/images/search_icon.svg";
import MultiDropdown from "@components/MultiDropdown/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import ROUTES from "@config/routes";
import { useCurrencyParamStore } from "@store/RootStore/hooks/useCurrencyParamStore";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

import style from "./MarketHeader.module.scss";

type MarketHeaderProps = {
  capChangePercentage: number;
};

const MarketHeader: React.FC<MarketHeaderProps> = ({ capChangePercentage }) => {
  // Для перехода на страницу с монетой
  const navigate = useNavigate();

  const handleCurrency = useCurrencyParamStore();

  const handleSearchNavigate = useCallback(() => {
    navigate(ROUTES.SEARCH, { state: { location: ROUTES.MARKET } });
  }, [navigate]);

  const handleSelectedCurrency = useCallback(
    (value: Option[]) => {
      handleCurrency.selectedCurrencyList = value;
    },
    [handleCurrency.selectedCurrencyList]
    // [onClick]
  );

  const handleValueResult = useCallback(
    (value: Option[]) => {
      let resultString = "";
      return value.reduce(
        (accumulator: string, currentValue) =>
          accumulator + currentValue.value + " ",
        resultString
      );
    },
    [handleCurrency.selectedCurrencyList]
  );

  // eslint-disable-next-line no-console
  // console.log("Market had been Rendered!");
  return (
    <div className={style["MarketHeader__main-block"]}>
      <div className={style["MarketHeader__market-status"]}>
        <div className={style["MarketHeader__market-status__header"]}>
          Market is {capChangePercentage >= 0 ? " up " : " down "}
          <span
            className={
              style[
                `MarketHeader__market-status__header__span_${
                  capChangePercentage > 0 ? "green" : "red"
                }`
              ]
            }
          >
            {capChangePercentage.toFixed(2)}
          </span>
        </div>
        <span>In the past 24 hours</span>
      </div>
      <div className={style["MarketHeader__search-item"]}>
        <img src={search_icon} onClick={handleSearchNavigate} />
      </div>
      <div className={style["MarketHeader__coins-item"]}>Coins</div>
      <div className={style["MarketHeader__currency-dropdown"]}>
        <MultiDropdown
          options={handleCurrency.currencyList}
          value={handleCurrency.selectedCurrencyList}
          onChange={handleSelectedCurrency}
          pluralizeOptions={handleValueResult}
        />
      </div>
    </div>
  );
};

export default MarketHeader;
