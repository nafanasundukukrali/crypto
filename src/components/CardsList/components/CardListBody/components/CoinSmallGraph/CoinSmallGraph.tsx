import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { createChart } from "lightweight-charts";

import styles from "./CoinSmallGraph.module.scss";
import cn from "classnames";

type CoinSmallGraphProps = {
  priceChangePercentage: number;
  sparklineIn7d: number[];
  currencySymbol: string | undefined;
  price: number;
};

const CoinSmallGraph: React.FC<CoinSmallGraphProps> = ({
  priceChangePercentage,
  sparklineIn7d,
  currencySymbol,
  price,
}) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    // @ts-ignore
    const chart = createChart(chartContainerRef.current, {
      rightPriceScale: false,
      timeScale: { visible: false },
      overlayPriceScales: false,
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        }
      }
    });
    const lineSerial = chart.addLineSeries({
      lineWidth: 1,
      color: priceChangePercentage < 0 ? styles["red"] : styles["green"],
      crosshairMarkerVisible: false,
    });
    lineSerial.applyOptions({
      baseLineVisible: false,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    // @ts-ignore
    lineSerial.setData(sparklineIn7d);
    chart.applyOptions({
      crosshair: {
        vertLine: {
          visible: false,
          labelVisible: false,
        },
        horzLine: {
          visible: false,
          labelVisible: false,
        },
      },
      handleScale: false,
      handleScroll: false,
    });
    chart
      .timeScale()
      .setVisibleLogicalRange({ from: 0, to: sparklineIn7d.length });
    chart.timeScale().fitContent();

    return () => chart.remove();
  }, []);

  return (
    <div className={styles['CoinSmallGraph_block']}>
      {
        // @ts-ignore
        <div ref={chartContainerRef} className={styles["CoinSmallGraph_graph"]} />
      }
      <div className={styles["CoinSmallGraph_price"]}>
        {
        (currencySymbol ? currencySymbol : "").concat(price !== null ? price.toFixed(2).toString() : "0.00")
        }
      </div>
      <div
        className={cn(styles["CoinSmallGraph_pricePercentage"],
          priceChangePercentage >= 0 ?
          styles["colorGreen"] :
          styles["colorRed"])}
      >
        {
          (priceChangePercentage > 0 ?
            "+" :
            "").concat((priceChangePercentage / 100).toFixed(2))
        }
      </div>
    </div>
  );
};

export default CoinSmallGraph;
