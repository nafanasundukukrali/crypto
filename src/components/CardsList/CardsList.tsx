import { FC, useCallback, useEffect, useRef, useState } from "react";

import Card from "@components/Card";
import Loader from "@components/Loader";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import ROUTES from "@config/routes";
import CoinsListStore from "@store/CoinsListStore";
import rootStore from "@store/RootStore";
import { useCurrencyParamStore } from "@store/RootStore/hooks/useCurrencyParamStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import getSymbolFromCurrency from "currency-symbol-map";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import CoinSmallGraph from "./components/CoinSmallGraph/CoinSmallGraph";

type CardsListProps = {
  sortCondition?: string;
  searchRequest?: boolean;
};

const CardsList: FC<CardsListProps> = ({ sortCondition, searchRequest }) => {
  const coinsListStore = useLocalStore(() => new CoinsListStore());
  const handleCurrency = useCurrencyParamStore();
  const [currencySymbol, setCurrencySymbol] = useState<string>();

  useEffect(() => {
    const fetchData = async () =>
      coinsListStore?.initCoins({
        sortKind: sortCondition,
        currency: handleCurrency.selectedCurrencyList,
        initial: true,
      });

    if (handleCurrency.selectedCurrencyList.length !== 0) {
      fetchData().then(() =>
        setCurrencySymbol(
          getSymbolFromCurrency(handleCurrency.selectedCurrencyList[0]["key"])
        )
      );
    }
  }, [
    coinsListStore,
    handleCurrency.selectedCurrencyList,
    sortCondition,
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
          currency: handleCurrency.selectedCurrencyList,
        },
      });
    },
    [navigate, handleCurrency.selectedCurrencyList]
  );

  // "Перетаскиваемый" обзервер для последнего элемента списка
  const observer = useRef<IntersectionObserver | null>();
  // // Проверка того, что достигнут последний элемент текущего списка монет
  const lastComponentRendered = useCallback(
    (node: any, userPage: number) => {
      if (coinsListStore?.meta === Meta.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          coinsListStore.initCoins({
            currency: handleCurrency.selectedCurrencyList,
            sortKind: sortCondition,
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [coinsListStore?.meta]
  );
  //
  const prepareSparklineData = useCallback((data: Object[]) => {
    const result: any[] = [];
    data.forEach((el, index) => result.push({ value: el, time: index }));
    return result;
  }, []);

  const showCardsList = () => {
    return (
      coinsListStore?.meta !== Meta.error && (
        <>
          {coinsListStore.list.map((coin, index) => {
            if (
              coinsListStore?.list.length === index + 1 &&
              !coinsListStore.listEnd
            ) {
              // @ts-ignore
              return (
                <div
                  id={coin["id"]}
                  key={index}
                  ref={(node) =>
                    lastComponentRendered(node, coinsListStore?.page)
                  }
                >
                  <Card
                    image={coin["image"]}
                    title={coin["name"]}
                    // @ts-ignore
                    subtitle={coin["symbol"].toUpperCase()}
                    onClick={() => {
                      handleCoinNavigate(coin["id"]);
                    }}
                    content={
                      <CoinSmallGraph
                        priceChangePercentage={
                          coin["price_change_percentage_24h"]
                        }
                        // @ts-ignore
                        sparklineIn7d={prepareSparklineData(
                          coin["sparkline_in_7d"]["price"]
                        )}
                        currencySymbol={currencySymbol}
                        price={coin["current_price"]}
                      />
                    }
                  />
                </div>
              );
            } else
              return (
                <div id={coin["id"]} key={index}>
                  <Card
                    image={coin["image"]}
                    title={coin["name"]}
                    // @ts-ignore
                    subtitle={coin["symbol"].toUpperCase()}
                    onClick={() => handleCoinNavigate(coin["id"])}
                    content={
                      <CoinSmallGraph
                        priceChangePercentage={
                          coin["price_change_percentage_24h"]
                        }
                        sparklineIn7d={prepareSparklineData(
                          coin["sparkline_in_7d"]["price"]
                        )}
                        currencySymbol={currencySymbol}
                        price={coin["current_price"]}
                      />
                    }
                  />
                </div>
              );
          })}
        </>
      )
    );
  };

  // Значок загрузки при загрузки списка валют
  const showLoading = () => {
    return <>{coinsListStore?.meta === Meta.loading && <Loader />}</>;
  };

  // Непредвиденная пакость
  const showError = () => {
    return (
      <>
        {coinsListStore?.meta === Meta.error && <div>Something went wrong</div>}
      </>
    );
  };

  // TODO: end of list (find API Max Coin's list length)
  // TODO: check which data gets from api
  return (
    <>
      {showCardsList()}
      {showLoading()}
      {showError()}
    </>
  );
};

export default observer(CardsList);
