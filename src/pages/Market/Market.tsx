import { useEffect } from "react";

import CardsList from "@components/CardsList/CardsList";
import ErrorReadDataMessage from "@components/ErrorReadDataMessage";
import ChooseSortTypeBar from "@pages/Market/components/ChooseSortTypeBar";
import MarketHeader from "@pages/Market/components/MarketHeader";
import MarketStore from "@store/MarketStore";
import rootStore from "@store/RootStore";
import { useCurrencyParamStore } from "@store/RootStore/hooks/useCurrencyParamStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./Market.module.scss";

const Market = () => {
  const currencyAndSortStore = useCurrencyParamStore();
  const marketStore = useLocalStore(() => new MarketStore());

  // Статус состояния рынка и получение спсика валют
  useEffect(() => {
    marketStore?.fetchData();
  }, []);

  return (
    <>
      {marketStore?.dailyMarketChange !== null &&
        currencyAndSortStore.currencyList.length !== 0 && (
          <div className={styles["Market__main-div"]}>
            <MarketHeader capChangePercentage={marketStore.dailyMarketChange} />
            <ChooseSortTypeBar sortType={rootStore.currency.selectedSortType} />
            <div className={styles["Market__CardsEvents"]}>
              <CardsList />
            </div>
          </div>
        )}
      <ErrorReadDataMessage isVisible={marketStore?.error} />
    </>
  );
};

export default observer(Market);
