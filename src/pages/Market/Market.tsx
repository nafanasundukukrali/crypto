import { useState, useEffect, useCallback, useMemo } from "react";

import CardsList from "@components/CardsList/CardsList";
import ChooseSortTypeBar from "@pages/Market/components/ChooseSortTypeBar";
import MarketHeader from "@pages/Market/components/MarketHeader";
import { useCurrencyParamStore } from "@store/RootStore/hooks/useCurrencyParamStore";
import axios from "axios";

import styles from "./Market.module.scss";

const Market = () => {
  // eslint-disable-next-line no-console
  console.log("Market rendered!");

  // Текущее состояние рынка (тот самый коэффициент за сутки)
  const handleCurrencyStore = useCurrencyParamStore();
  const [dailyMarketChange, setDailyMarketChange] = useState<number | null>(
    null
  );
  // Ошибка прогрузки контента
  const [error, setError] = useState(false);
  // Выбранная сортировка монет
  const [sortCondition, setSortCondition] = useState("market_cap_desc");

  const getDailyMarketChange = useCallback(async () => {
    const dailyMarketChange = await axios({
      method: "get",
      url: "https://api.coingecko.com/api/v3/global",
    });

    try {
      const { status, data } = dailyMarketChange;

      if (status === 200 && Object.keys(data).length)
        setDailyMarketChange(
          dailyMarketChange.data.data.market_cap_change_percentage_24h_usd
        );
      else setError(true);
    } catch (e) {
      setError(true);
    }
  }, []);

  // Статус состояния рынка и получение спсика валют
  useEffect(() => {
    getDailyMarketChange();
  }, [getDailyMarketChange]);

  // Непредвиденная пакость
  const showError = () => {
    return <>{error && <div>Something went wrong</div>}</>;
  };

  const handleSortType = useMemo(
    // @ts-ignore
    () => (sortType: string) => setSortCondition(sortType),
    []
  );

  if (
    dailyMarketChange !== null &&
    handleCurrencyStore.currencyList.length !== 0
  ) {
    return (
      <div className={styles["Market__main-div"]}>
        <MarketHeader capChangePercentage={dailyMarketChange} />
        <ChooseSortTypeBar onClick={handleSortType} />
        <div className={styles["Market__CardsEvents"]}>
          <CardsList sortCondition={sortCondition} />
        </div>
      </div>
    );
  } else {
    return <>{showError()}</>;
  }
};

export default Market;
