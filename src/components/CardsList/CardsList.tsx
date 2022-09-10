import { useCallback, useEffect } from "react";

import CardListBody from "@components/CardsList/components/CardListBody";
import ErrorReadDataMessage from "@components/ErrorReadDataMessage";
import Loader from "@components/Loader";
import ROUTES from "@config/routes";
import CoinsListStore from "@store/CoinsListStore";
import rootStore from "@store/RootStore";
import { useCurrencyParamStore } from "@store/RootStore/hooks/useCurrencyParamStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const CardsList = () => {
  const coinsListStore = useLocalStore(() => new CoinsListStore());
  const currencyRootStore = useCurrencyParamStore();

  useEffect(() => {
    const fetchData = async () =>
      await coinsListStore?.initCoins({ initial: true });

    try {
      fetchData();
    } catch (e) {}
  }, [
    currencyRootStore.selectedCurrencyList,
    currencyRootStore.selectedSortType,
    rootStore.query.search,
  ]);

  // Для перехода на страницу с монетой
  const navigate = useNavigate();

  const handleCoinNavigate = useCallback(
    (id: string) => {
      const getNewCardPath = (id: string) => {
        return `/Card/${id}`;
      };

      const comebackPath = () => {
        if (rootStore.query.search) return rootStore.query.search;
        else return ROUTES.MARKET;
      };

      navigate(getNewCardPath(id), {
        state: {
          from: { pathname: comebackPath() },
          currency: currencyRootStore.selectedCurrencyList,
        },
      });
    },
    [navigate, currencyRootStore.selectedCurrencyList]
  );

  const handleCoins = useCallback(
    (something: number) => {
      coinsListStore?.initCoins();
    },
    [currencyRootStore.selectedCurrencyList, currencyRootStore.selectedSortType]
  );

  // TODO: end of list (find API Max Coin's list length)
  // TODO: check which data gets from api
  return (
    <>
      <CardListBody
        isVisible={coinsListStore.meta === Meta.success}
        coinsList={coinsListStore.list}
        handleCoins={handleCoins}
        handleCoinNavigate={handleCoinNavigate}
        symbol={currencyRootStore.selectedCurrencySymbol}
        onePageCountCoins={rootStore.coinsOnePageCoinsCount}
      />
      <Loader loading={coinsListStore?.meta === Meta.loading} />
      <ErrorReadDataMessage isVisible={coinsListStore?.meta === Meta.error} />
    </>
  );
};

export default observer(CardsList);
