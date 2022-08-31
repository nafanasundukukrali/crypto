import {
  useState,
  useEffect,
  useCallback,
  useRef,
  SetStateAction,
  useMemo,
} from "react";

import Card from "@components/Card";
import ErrorReadDataMessage from "@components/ErrorReadDataMessage";
import Loader from "@components/Loader";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import ROUTES from "@config/routes";
import ChooseSortTypeBar from "@pages/CoinsCards/components/ChooseSortTypeBar";
import CoinSmallGraph from "@pages/CoinsCards/components/CoinSmallGraph";
import MarketHeader from "@pages/CoinsCards/components/MarketHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./Market.module.scss";

const Market = () => {
  // Список монет
  const [coinsList, setCoinsList] = useState([]);
  // Список валют
  const [currencyList, setCurrencyList] = useState<Option[]>([]);
  // Список выбранных валют из выпадающего списка
  const [selectedCurrency, setSelectedCurrency] = useState<Option[]>([]);
  // Текущее состояние рынка (тот самый коэффициент за сутки)
  const [dailyMarketChange, setDailyMarketChange] = useState<number | null>(
    null
  );
  // Состояние загрузки страницы
  const [loading, setLoading] = useState(false);
  // Ошибка прогрузки контента
  const [error, setError] = useState(false);
  // Номер последней прогруженной страницы с монетами
  const [page, setPage] = useState(1);
  // Сеттер страницы
  const setPageValue = async (newPage: SetStateAction<number>) =>
    setPage(newPage);
  // Выбранная сортировка монет
  const [sortCondition, setSortCondition] = useState("market_cap_desc");

  // Для перехода на страницу с монетой
  const navigate = useNavigate();

  const handleCoinNavigate = (id: string) => {
    const getNewCardPath = (id: string) => {
      return `/Card/${id}`;
    };

    navigate(getNewCardPath(id), {
      state: { from: { pathname: ROUTES.MARKET }, currency: selectedCurrency },
    });
  };

  // Получение из простого списка валют того, который будет отображаться
  // в навигации
  const prepareCurrencyDate = (userCurrencyList: string[]) => {
    const result: Option[] = [];

    userCurrencyList.forEach((el) =>
      result.push({ key: el, value: `Market-${el.toUpperCase()}` })
    );

    return result;
  };

  // Статус состояния рынка и получение спсика валют
  useEffect(() => {
    const getDailyMarketChange = async () => {
      const dailyMarketChange = await axios({
        method: "get",
        url: "https://api.coingecko.com/api/v3/global",
      });

      setDailyMarketChange(
        dailyMarketChange.data.data.market_cap_change_percentage_24h_usd
      );
    };

    const getCurrencyList = async () => {
      const newCurrencyList = await axios({
        method: "get",
        url: "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
      });

      let result = newCurrencyList.data;
      setCurrencyList(prepareCurrencyDate(result));
    };

    getDailyMarketChange().then(() => getCurrencyList());
  }, []);

  // Выбор первой валюты в качестве выбранной, если список валют поменялся
  useEffect(() => {
    if (currencyList.length) {
      setSelectedCurrency([currencyList[0]]);
    }
  }, [currencyList]);

  // Инициализация списка монет, страницы, очистка списка в случае перезагрузки
  useEffect(() => {
    if (sortCondition && selectedCurrency.length) {
      setPageValue(1)
        .catch(() => {})
        .then(() => {
          setCoinsList([]);
        })
        .then(() => {
          initCoins(1, []);
        });
    }
  }, [sortCondition, selectedCurrency]);

  // Увеличение страницы после обновления списка монет
  useEffect(() => {
    if (coinsList.length) {
      setPageValue(page + 1).catch();
    }
  }, [coinsList]);

  // Тип возврата при запросе страницы со списком монет
  type firstCoinsGetData = {
    data: Object[];
    status: number;
    error?: Error | unknown;
  };

  // Функция для получения одной страницы с 10 монетами
  const getCoinsList = useCallback(
    async (newPage: number, currency: string, sortKind: string) => {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortKind}&per_page=10&page=${newPage}&sparkline=true`;
      setLoading(true);
      try {
        const result: firstCoinsGetData = await axios.get(url);
        return result;
      } catch (e) {
        const result: firstCoinsGetData = { status: 0, data: [], error: e };
        return result;
      }
    },
    []
  );

  // Функция для проверки, что список с монетами получен вереный и добавление
  // его к остальным монетам
  const initCoins = (newPage: number, newCoinsList: Option[] = coinsList) => {
    const searchByKey = (element: Object, array: Object[]) => {
      // @ts-ignore
      for (let i: number = 0; i < array.length; i++) {
        // @ts-ignore
        if (array[i].id === element.id) return true;
      }
      return false;
    };

    setError(false);
    setLoading(true);
    getCoinsList(newPage, selectedCurrency[0]["key"], sortCondition)
      .then((data) => {
        if (!data.error && data.status === 200 && data.data.length > 0) {
          data.data = data.data.filter((element, index) => {
            return !searchByKey(element, newCoinsList);
          });
          // @ts-ignore
          setCoinsList([...newCoinsList, ...data.data]);
          setError(false);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };

  // "Перетаскиваемый" обзервер для последнего элемента списка
  const observer = useRef<IntersectionObserver | null>();
  // Проверка того, что достигнут последний элемент текущего списка монет
  const lastComponentRendered = useCallback(
    (node: any, userPage: number) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          initCoins(userPage);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  // Заполнение карточки с валютой
  const showCards = () => {
    const prepareSparklineData = (data: Object[]) => {
      const result: any[] = [];
      data.forEach((el, index) => result.push({ value: el, time: index }));
      return result;
    };

    return (
      <>
        {coinsList.map((coin, index) => {
          if (coinsList.length === index + 1) {
            // @ts-ignore
            return (
              <div
                id={coin["id"]}
                key={index}
                ref={(node) => lastComponentRendered(node, page)}
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
                    />
                  }
                />
              </div>
            );
        })}
      </>
    );
  };

  // Значок загрузки при загрузки списка валют
  const showLoading = () => {
    return <>{loading && <Loader />}</>;
  };

  // Непредвиденная пакость
  const showError = () => {
    return (
      <>{error && coinsList.length < 100 && <div>Something went wrong</div>}</>
    );
  };

  // Достигнут конец списка
  const showEndOfList = () => {
    return <>{error && coinsList.length >= 100 && <div>End of list</div>}</>;
  };

  const changeSelectedCurrency = useMemo(
    () => (value: Option[]) => setSelectedCurrency(value),
    []
  );
  if (
    coinsList.length !== 0 &&
    dailyMarketChange !== null &&
    currencyList.length !== 0
  ) {
    return (
      <div className={styles["Market__main-div"]}>
        <MarketHeader
          capChangePercentage={dailyMarketChange}
          supportedCurrency={currencyList}
          actualCurrencyValue={selectedCurrency}
          onClick={changeSelectedCurrency}
        />
        <ChooseSortTypeBar
          onClick={(sortType: SetStateAction<string>) =>
            setSortCondition(sortType)
          }
          actualSortType={sortCondition}
        />
        <div className={styles["Market__CardsEvents"]}>
          {showCards()}
          {showLoading()}
          {showError()}
          {showEndOfList()}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles["CoinsCards__mainDiv"]}>
        <Loader />
      </div>
    );
  }
};

export default Market;
