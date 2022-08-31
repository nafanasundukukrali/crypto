import React, { useEffect, useRef } from "react";

import { createChart } from "lightweight-charts";

import styles from "./CoinSmallGraph.module.scss";

type CoinSmallGraphProps = {
  priceChangePercentage: number;
  sparklineIn7d: number[];
};

const CoinSmallGraph: React.FC<CoinSmallGraphProps> = ({
  priceChangePercentage,
  sparklineIn7d,
}) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    // @ts-ignore
    const chart = createChart(chartContainerRef.current, {
      rightPriceScale: false,
      timeScale: { visible: false },
      overlayPriceScales: false,
    });
    const lineSerial = chart.addLineSeries({
      lineWidth: 1,
      color: priceChangePercentage <= 0 ? styles["red"] : styles["green"],
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
  }, []);

  // @ts-ignore
  return <div ref={chartContainerRef} className={styles["CoinSmallGraph"]} />;
};

export default CoinSmallGraph;
