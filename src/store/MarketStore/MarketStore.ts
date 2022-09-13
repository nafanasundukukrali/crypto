import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed, makeAutoObservable,
  makeObservable,
  observable,
  runInAction
} from "mobx";

type PrivateFields = "_dailyMarketChange" | "_error";

export default class MarketStore implements ILocalStore {
  private _dailyMarketChange: number | null = null;
  private _error: boolean = false;

  constructor() {
    makeAutoObservable<MarketStore, PrivateFields>(this, {
      _dailyMarketChange: observable,
      _error: observable,
      dailyMarketChange: computed,
      error: computed,
      fetchData: action,
    });

    // runInAction(() => this.fetchData());
  }

  async fetchData() {
    const dailyMarketChange = await axios({
      method: "get",
      url: "https://api.coingecko.com/api/v3/global",
    });

    runInAction(() => {
      try {
        const { status, data } = dailyMarketChange;

        if (status === 200 && Object.keys(data).length)
          this._dailyMarketChange =
            dailyMarketChange.data.data.market_cap_change_percentage_24h_usd;
        else this._error = true;
      } catch (e) {
        this._error = true;
      }
    });
  }

  get dailyMarketChange(): number | null {
    return this._dailyMarketChange;
  }

  set dailyMarketChange(value: number | null) {
    this._dailyMarketChange = value;
  }

  get error(): boolean {
    return this._error;
  }

  set error(value: boolean) {
    this._error = value;
  }

  destroy(): void {
    // TODO
  }
}
