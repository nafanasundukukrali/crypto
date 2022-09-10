import React, { useCallback, useEffect } from "react";

import Card from "@components/Card";
import Loader from "@components/Loader";
import CoinsGraph from "@pages/CoinsCard/components/CoinsGraph";
import PeriodBar from "@pages/CoinsCard/components/PeriodBar";
import CoinsCardStore from "@store/CoinsCardStore";
import { useCurrencyParamStore } from "@store/RootStore/hooks/useCurrencyParamStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./CoinsCard.module.scss";

const CoinsCard = () => {
  const handleCurrency = useCurrencyParamStore();
  const coinsCardStore = useLocalStore(() => new CoinsCardStore());
  const { id } = useParams();

  const navigate = useNavigate();

  const handleReturnNavigate = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const fetch = async () => {
      if (id) await coinsCardStore.fetchData(id);
    };

    fetch();
  }, []);

  const changeActualDatePeriod = useCallback(
    (newPeriod: number) => {
      coinsCardStore.actualDatePeriod = newPeriod;
    },
    [coinsCardStore?.actualDatePeriod]
  );

  return (
    <>
      {!coinsCardStore?.error &&
        coinsCardStore?.coinMainData.hasOwnProperty("image") && (
          <div className={styles["CoinsCard__main-block"]}>
            <div className={styles["CoinsCard__main-block__header"]}>
              <button
                className={
                  styles["CoinsCard__main-block__header__return-button"]
                }
                onClick={() => handleReturnNavigate()}
              />
              <div
                className={
                  styles["CoinsCard__main-block__header__coin-attributes"]
                }
              >
                <img
                  src={coinsCardStore?.coinMainData["image"]["small"]}
                  alt=""
                  className={
                    styles[
                      "CoinsCard__main-block__header__coin-attributes__img"
                    ]
                  }
                />
                <span className={styles["card__title"]}>
                  {coinsCardStore?.coinMainData["name"]}
                </span>
                <span className={styles["card__subtitle"]}>
                  ({coinsCardStore?.coinMainData["symbol"].toUpperCase()})
                </span>
              </div>
            </div>
            <div className={styles["CoinsCard__main-block__graph-header"]}>
              <span>
                {coinsCardStore?.coinMainData["market_data"]["current_price"][
                  handleCurrency.selectedCurrencyList[0]["key"]
                ].toFixed(2)}
              </span>
              <span>
                {
                  coinsCardStore?.coinMainData["market_data"][
                    "price_change_24h"
                  ]
                }
              </span>
              <span>
                {coinsCardStore?.coinMainData["market_data"][
                  "price_change_percentage_24h"
                ].toFixed(2)}
              </span>
            </div>
            <div className={styles["CoinsCard__main-block__graph"]}>
              <CoinsGraph
                id={`${id}`}
                currency={handleCurrency.selectedCurrencyList[0]["key"]}
                timing={coinsCardStore?.actualDatePeriod}
              />
            </div>
            <div className={styles["CoinsCard__main-block__choose-period"]}>
              <PeriodBar onChange={changeActualDatePeriod} />
            </div>
            <div className={styles["CoinsCard__main-block__card"]}>
              <Card
                image={coinsCardStore?.coinMainData["image"]["small"]}
                title={coinsCardStore?.coinMainData["name"]}
                subtitle={coinsCardStore?.coinMainData["sumbol"]}
              />
            </div>
            <div
              className={styles["CoinsCard__main-block__transactions"]}
            ></div>
          </div>
        )}
      <Loader loading={coinsCardStore?.loading} />
    </>
  );
};

export default observer(CoinsCard);
