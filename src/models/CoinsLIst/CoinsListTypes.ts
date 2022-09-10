import rootStore from "@store/RootStore";
import axios from "axios";

export const normalizeLostData = async (
  data: { [p: string]: any }[]
): Promise<{ [p: string]: any }[]> => {
  const getInformation = async (id: string): Promise<{ [p: string]: any }> => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;
    try {
      const result = await axios.get(url);
      if (result.status === 200) return result.data;
      else return [];
    } catch (e) {
      return [];
    }
  };

  const getLostData = async (id: string) => {
    const result = await getInformation("id");
    if (result)
      return {
        price_change_percentage_24h:
          result["market_data"]["price_change_percentage_24h_in_currency"][
            rootStore.currency.selectedCurrencyList[0]["key"]
          ],
        sparkline_in_7d: result["market_data"]["sparkline_7d"],
        symbol: result["symbol"],
        image: result["image"]["small"],
        current_price:
          result["market_data"]["current_price"][
            rootStore.currency.selectedCurrencyList[0]["key"]
          ],
      };
  };

  if (data)
    for (let i = 0; i < data.length; i++)
      data[i] = Object.assign(data[i], await getLostData(data[i]["id"]));

  return data;
};
