import { useCallback } from "react";

import { Option } from "@components/MultiDropdown/MultiDropdown";
import rootStore from "@store/RootStore";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type GetCoinsListParams = {
  sortKind?: string | null;
  currency: Option[];
  initial?: boolean;
};

type PrivateFields = "_list" | "_meta" | "_page" | "_listEnd";

export default class CoinsListStore implements ILocalStore {
  private _list: Object[] = [];
  private _meta: Meta = Meta.initial;
  private _page: number = 1;
  private _listEnd: boolean = false;

  constructor() {
    makeObservable<CoinsListStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _page: observable,
      _listEnd: observable,
      list: computed,
      meta: computed,
      page: computed,
      listEnd: computed,
      initCoins: action,
      getCoinsList: action,
    });
  }

  get listEnd(): boolean {
    return this._listEnd;
  }

  get list(): any[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get page(): number {
    return this._page;
  }

  async getLostData(id: string) {
    const getInformation = async (): Promise<Object | null> => {
      const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;
      try {
        const result = await axios.get(url);
        // eslint-disable-next-line no-console
        // console.log(result.data);
        if (result.status === 200) return result.data;
        else return null;
      } catch (e) {
        return null;
      }
    };

    return getInformation().then((data) => {
      if (data !== null)
        return {
          price_change_percentage_24h:
            // @ts-ignore
            data["market_data"]["price_change_percentage_24h_in_currency"][
              rootStore.currency.selectedCurrencyList[0]["key"]
            ],
          sparkline_in_7d:
            // @ts-ignore
            data["market_data"]["sparkline_7d"],
          // @ts-ignore
          symbol: data["symbol"],
          // @ts-ignore
          image: data["image"]["small"],
          // @ts-ignore
          current_price:
            // @ts-ignore
            data["market_data"]["current_price"][
              rootStore.currency.selectedCurrencyList[0]["key"]
            ],
        };
    });
  }

  async getCoinsList(params: GetCoinsListParams): Promise<Object[] | null> {
    let url: string = "";
    if (!params.sortKind) params.sortKind = "market_cap_desc";

    if (rootStore.query.search)
      url = `https://api.coingecko.com/api/v3/search?query=${rootStore.query.search}`;
    else
      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${rootStore.currency.selectedCurrencyList[0]["key"]}&order=${params.sortKind}&per_page=10&page=${this.page}&sparkline=true`;

    try {
      const result = await axios.get(url);
      return runInAction(() => {
        if (result.status === 200) {
          this._meta = Meta.success;
          if (!rootStore.query.search) {
            if (result.data.length < 10) this._listEnd = true;
            return result.data;
          } else {
            if (10 * this._page > result.data["coins"].length)
              this._listEnd = true;

            return result.data["coins"].slice(
              10 * (this._page - 1),
              10 * this._page
            );
          }
        } else {
          this._listEnd = true;
          this._meta = Meta.error;
          return null;
        }
      });
    } catch (e) {
      this._meta = Meta.error;
      return null;
    }
  }

  async initCoins(params: GetCoinsListParams): Promise<void> {
    if (params.initial) {
      this._list = [];
      this._page = 1;
      this._listEnd = false;
    }

    this._meta = Meta.loading;

    const searchByKey = (element: Object, array: Object[]) => {
      // @ts-ignore
      for (let i: number = 0; i < array.length; i++) {
        // @ts-ignore
        if (array[i].id === element.id) return true;
      }
      return false;
    };

    this.getCoinsList(params)
      .then(async (data) => {
        if (data && rootStore.query.search)
          for (let i = 0; i < data.length; i++)
            data[i] = Object.assign(
              data[i],
              // @ts-ignore
              await this.getLostData(data[i]["id"])
            );

        return data;
      })
      .then((data) => {
        if (data?.length) {
          data = data.filter((element, index) => {
            return !searchByKey(element, this._list);
          });

          runInAction(() => {
            if (data !== null && data.length !== 0) {
              this._list = [...this._list, ...data];
              this._page++;
              this._meta = Meta.success;
            }
          });
        }
      });
  }

  destroy(): void {
    // TODO
  }
}
