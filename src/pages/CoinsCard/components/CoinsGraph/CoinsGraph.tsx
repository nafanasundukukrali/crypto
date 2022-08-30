import React, { useCallback, useEffect, useRef, useState } from "react";

import Loader from "@components/Loader";
import axios from "axios";
import { createChart, IChartApi, UTCTimestamp } from "lightweight-charts";

import styles from "./CoinsGraph.module.scss";

type CoinsGraphProps = {
  id: string;
  timing: number;
  currency: string;
};

const CoinsGraph: React.FC<CoinsGraphProps> = ({ id, timing, currency }) => {
  const chartContainerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [graphValue, setGraphValue] = useState<Object>([]);
  const [error, setError] = useState(false);
  const [chart, setChart] = useState<IChartApi | null>();

  const getSparklineData = useCallback(async () => {
    const prepareData = (prices: any[]) => {
      const resultData = [];

      if (timing === 1) {
        let time = new Date();
        time.setTime(Date.now() + 2 * 60 * 60 * 1000);

        for (let i = 0; i <= 12; i++) {
          resultData.push({
            value: prices[i][1],
            time: Math.round(
              (time.getTime() + i * 5 * 60 * 1000) / 1000
            ) as UTCTimestamp,
          });
        }
      } else {
        prices.forEach((el) =>
          resultData.push({
            time: Math.round(el[0] / 1000) as UTCTimestamp,
            value: el[2],
          })
        );
      }
      // eslint-disable-next-line no-console
      // console.log(typeof resultData);
      return resultData;
    };

    let url: string = "";
    if (timing < 24) {
      url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=1`;
    } else if (timing >= 24) {
      url = `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=${currency}&days=${
        timing / 24
      }`;
    } else {
      setError(true);
      return;
    }

    setLoading(true);
    const result = await axios.get(url);

    try {
      const status = result.status;
      const data = result.data;
      if (status !== 200 || Object.keys(data).length === 0) {
        setError(true);
        setLoading(false);
      } else {
        setGraphValue([...prepareData(timing < 24 ? data.prices : data)]);
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  }, [currency, id, timing]);

  useEffect(() => {
    getSparklineData()
      // .then(() => {
      //   // @ts-ignore
      //   setChart(createChart(chartContainerRef.current));
      // })
      .catch(() => {});
  }, [currency, getSparklineData, id, timing]);

  useEffect(() => {
    // @ts-ignore
    if (graphValue.length) {
      // @ts-ignore
      const chart = createChart(chartContainerRef.current, {});

      if (timing <= 24)
        chart.applyOptions({
          timeScale: {
            timeVisible: true,
            secondsVisible: true,
          },
        });
      const lineSerial = chart.addLineSeries({
        lineWidth: 3,
        color: styles["blue"],
      });
      // @ts-ignore
      lineSerial.setData(graphValue);
      chart.timeScale().fitContent();
    }
  }, [graphValue]);

  const LoadingStatement = () => {
    return loading && !error && <Loader />;
  };

  const GraphStatement = () => {
    return (
      !loading &&
      !error && (
        // @ts-ignore
        <div ref={chartContainerRef} className={styles["CoinGraph"]} />
      )
    );
  };
  // @ts-ignore
  return (
    <>
      {LoadingStatement()}
      {GraphStatement()}
    </>
  );
};

export default CoinsGraph;
