import React, { useEffect, useState } from "react";

import Card from "@components/Card";
import CoinsGraph from "@pages/CoinsCard/components/CoinsGraph";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./CoinsCard.module.scss";

const CoinsCard = () => {
  const { state } = useLocation();
  // @ts-ignore
  const { location, currency } = state;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [coinMainData, setCoinMainData] = useState();
  const [timing, setTiming] = useState(7);
  const [graphValue, setGraphValue] = useState<Object[]>([]);

  const navigate = useNavigate();

  const handleReturnNavigate = () => {
    navigate("/");
  };

  // const getSparklineData = async () => {
  //   const prepareData = (data: any[]) => {
  //     if (timing === 7) {
  //       const date = new Date(Date.prototype.getDate() - 7);
  //
  //       const resulData: Object[] = [];
  //
  //       data.forEach((el) => {
  //         resulData.push({ value: el[0], time: date.toString() });
  //         date.setTime(date.getTime() + 4 * 60 * 60 * 1000);
  //       });
  //
  //       return resulData;
  //     }
  //     return [];
  //   };
  //
  //   setLoading(true);
  //   const path = window.location.pathname.split("/");
  //
  //   const result = await axios.get(
  //     `https://api.coingecko.com/api/v3/coins/${
  //       path[path.length - 1]
  //     }?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true`
  //   );
  //
  //   try {
  //     const status = result.status;
  //     const data = result.data;
  //     if (status !== 200 || Object.keys(data).length === 0) {
  //       setError(true);
  //     } else {
  //       setGraphValue(prepareData(data));
  //     }
  //   } catch (err) {
  //     setError(true);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    const getCoinInformation = async (id: string) => {
      const result = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true`
      );
      try {
        const status = result.status;
        const data = result.data;
        if (status !== 200 || Object.keys(data).length === 0) {
          setError(true);
        } else {
          return data;
        }
      } catch (err) {
        setError(true);
      }
      setLoading(false);
      return null;
    };

    const path = window.location.pathname.split("/");
    getCoinInformation(path[path.length - 1]).then((value) => {
      if (value !== null) {
        setCoinMainData(value);
        // eslint-disable-next-line no-console
        console.log(value);
      }
    });
    // .then(() => getSparklineData());
  }, []);

  if (!error && coinMainData)
    return (
      <div className={styles["CoinsCard__main-block"]}>
        <div className={styles["CoinsCard__main-block__header"]}>
          <button
            className={styles["CoinsCard__main-block__header__return-button"]}
            onClick={() => handleReturnNavigate()}
          />
          <div
            className={styles["CoinsCard__main-block__header__coin-attributes"]}
          >
            <img
              // @ts-ignore
              src={coinMainData["image"]["small"]}
              alt=""
              className={
                styles["CoinsCard__main-block__header__coin-attributes__img"]
              }
            />
            <span className={styles["card__title"]}>
              {coinMainData["name"]}
            </span>
            <span className={styles["card__subtitle"]}>
              (
              {
                // @ts-ignore
                coinMainData["symbol"].toUpperCase()
              }
              )
            </span>
          </div>
        </div>
        <div className={styles["CoinsCard__main-block__graph-header"]}>
          <span>
            {coinMainData["market_data"]["current_price"][
              currency[0]["key"]
              // @ts-ignore
            ].toFixed(2)}
          </span>
          <span>
            {
              // @ts-ignore
              coinMainData["market_data"]["price_change_24h"].toFixed(2)
            }
          </span>
          <span>
            {coinMainData["market_data"][
              "price_change_percentage_24h"
              // @ts-ignore
            ].toFixed(2)}
          </span>
        </div>
        <div className={styles["CoinsCard__main-block__graph"]}>
          {/*<CoinsGraph*/}
          {/*  priceChangePercentage={*/}
          {/*    coinMainData["market_data"]["price_change_percentage_24h"]*/}
          {/*  }*/}
          {/*  sparklineData={graphValue}*/}
          {/*/>*/}
        </div>
        <div className={styles["CoinsCard__main-block__choose-period"]}></div>
        <div className={styles["CoinsCard__main-block__card"]}>
          <Card
            image={coinMainData["image"]["small"]}
            title={coinMainData["name"]}
            subtitle={coinMainData["sumbol"]}
          />
        </div>
        <div className={styles["CoinsCard__main-block__transactions"]}></div>
      </div>
    );
};

export default CoinsCard;
