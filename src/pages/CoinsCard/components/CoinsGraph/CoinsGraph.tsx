import React, { useEffect, useRef } from "react";

import { createChart } from "lightweight-charts";

import styles from "./CoinsGraph.module.scss";

type CoinsGraphProps = {
  priceChangePercentage: number;
  sparklineData: Object[];
};

const CoinsGraph: React.FC<CoinsGraphProps> = ({
  priceChangePercentage,
  sparklineData,
}) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    // @ts-ignore
    const chart = createChart(chartContainerRef.current);
    const lineSerial = chart.addLineSeries({
      lineWidth: 3,
      color: styles["blue"],
    });
    // @ts-ignore
    lineSerial.setData(sparklineData);
    chart
      .timeScale()
      .setVisibleLogicalRange({ from: 0, to: sparklineData.length });
    chart.timeScale().fitContent();
  }, []);

  // @ts-ignore
  return <div ref={chartContainerRef} className={styles["CoinGraph"]} />;
};

export default CoinsGraph;
