import React, { useCallback, useEffect, useState } from "react";

import Card from "@components/Card";
import ROUTES from "@config/routes";
import CoinsGraph from "@pages/CoinsCard/components/CoinsGraph";
import PeriodBar from "@pages/CoinsCard/components/PeriodBar";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import styles from "./CoinsCard.module.scss";

const CoinsCard = () => {
  const { state } = useLocation();
  // @ts-ignore
  const { location, currency } = state;
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [coinMainData, setCoinMainData] = useState();
  const [actualDatePeriod, setActualDatePeriod] = useState(1);

  const navigate = useNavigate();

  const handleReturnNavigate = () => {
    navigate(ROUTES.MARKET);
  };

  useEffect(() => {
    const getCoinInformation = async () => {
      setLoading(true);
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

    getCoinInformation().then((value) => {
      if (value !== null) {
        setCoinMainData(value);
        // eslint-disable-next-line no-console
        // console.log(value);
      }
    });
    // .then(() => getSparklineData());
  }, []);

  const changeActualDatePeriod = useCallback(
    (newPeriod: number) => {
      setActualDatePeriod(newPeriod);
    },
    [actualDatePeriod]
  );

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
          <CoinsGraph
            id={`${id}`}
            currency={currency[0]["key"]}
            timing={actualDatePeriod}
          />
        </div>
        <div className={styles["CoinsCard__main-block__choose-period"]}>
          <PeriodBar onChange={changeActualDatePeriod} />
        </div>
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
