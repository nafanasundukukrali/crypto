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

import { normalizeLostData } from "../../models/CoinsLIst";

type GetCoinsListParams = {
  initial?: boolean;
};

type PrivateFields = "_list" | "_meta" | "_page" | "_listEnd";

export default class CoinsListStore implements ILocalStore {
  private _list: { [p: string]: any }[] = [];
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

    if (rootStore.currency.selectedCurrencyList.length !== 0)
      this.initCoins({
        initial: true,
      });
  }

  get listEnd(): boolean {
    return this._listEnd;
  }

  get list(): { [p: string]: any }[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get page(): number {
    return this._page;
  }

  async getCoinsList(): Promise<{ [p: string]: any }[]> {
    let url: string = "";
    if (!rootStore.currency.selectedSortType)
      rootStore.currency.selectedSortType = "market_cap_desc";

    if (rootStore.query.search)
      url = `https://api.coingecko.com/api/v3/search?query=${rootStore.query.search}`;
    else
      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${rootStore.currency.selectedCurrencyList[0]["key"]}&order=${rootStore.currency.selectedSortType}&per_page=${rootStore.coinsOnePageCoinsCount}&page=${this.page}&sparkline=true`;

    const result = await axios.get(url);

    return runInAction(() => {
      if (result.status === 200) {
        if (!rootStore.query.search) {
          if (result.data.length < rootStore.coinsOnePageCoinsCount)
            this._listEnd = true;
          return result.data;
        } else {
          if (
            rootStore.coinsOnePageCoinsCount * this._page >
            result.data["coins"].length
          )
            this._listEnd = true;

          return result.data["coins"].slice(
            rootStore.coinsOnePageCoinsCount * (this._page - 1),
            rootStore.coinsOnePageCoinsCount * this._page
          );
        }
      } else {
        throw new Error();
      }
    });
  }

  async initCoins(params?: GetCoinsListParams) {
    if (params && params.initial) {
      this._list = [];
      this._page = 1;
      this._listEnd = false;
    }

    this._meta = Meta.loading;

    try {
      let data = await this.getCoinsList();

      if (data && rootStore.query.search) data = await normalizeLostData(data);

      if (data.length) {
        data = data.filter((element, index) => {
          return !this._list.includes(element);
        });

        runInAction(() => {
          this._list = [...this._list, ...data];
          this._page++;
          this._meta = Meta.success;
        });
      }
    } catch (e) {
      this._meta = Meta.error;
      this._listEnd = true;
    }
  }

  destroy(): void {
    // TODO
  }
}
