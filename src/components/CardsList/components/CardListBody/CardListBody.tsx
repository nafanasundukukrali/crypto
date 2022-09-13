import React, { FC, useCallback } from "react";

import Card from "@components/Card";
import CoinSmallGraph from "@components/CardsList/components/CardListBody/components/CoinSmallGraph";
import { Virtuoso } from "react-virtuoso";

type CardListBodyProps = {
  isVisible: boolean;
  coinsList: { [p: string]: any }[];
  handleCoins: (value: number) => void;
  handleCoinNavigate: (value: string) => void;
  symbol: string;
  onePageCountCoins: number;
};
const CardListBody: FC<CardListBodyProps> = ({
  isVisible,
  coinsList,
  handleCoins,
  handleCoinNavigate,
  symbol,
  onePageCountCoins,
}) => {
  const prepareSparklineData = useCallback((data: Object[]) => {
    const result: any[] = [];
    data.forEach((el, index) => result.push({ value: el, time: index }));
    return result;
  }, []);

  return (
    <>
      {isVisible && (
        <Virtuoso
          useWindowScroll
          data={coinsList}
          endReached={handleCoins}
          overscan={onePageCountCoins}
          itemContent={(index: number, coin: { [p: string]: any }) => {
            return (
              <div id={coin["id"]} key={index}>
                <Card
                  image={coin["image"]}
                  title={coin["name"]}
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
                      currencySymbol={symbol}
                      price={coin["current_price"]}
                    />
                  }
                />
              </div>
            );
          }}
        />
      )}
    </>
  );
};

export default CardListBody;
