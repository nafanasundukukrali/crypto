import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields =
  | "_loading"
  | "_error"
  | "_coinMainData"
  | "_actualDatePeriod";

export default class CoinsCardStore implements ILocalStore {
  private _loading: boolean = false;
  private _error: boolean = false;
  private _coinMainData: { [p: string]: any } = {};
  private _actualDatePeriod: number = 1;

  constructor() {
    makeObservable<CoinsCardStore, PrivateFields>(this, {
      _loading: observable,
      _error: observable,
      _coinMainData: observable.ref,
      _actualDatePeriod: observable,
      loading: computed,
      error: computed,
      coinMainData: computed,
      actualDatePeriod: computed,
      fetchData: action.bound,
    });
  }

  async fetchData(id?: string) {
    const getCoinInformation = async () => {
      this._loading = true;

      try {
        const result = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true`
        );
        const status = result.status;
        const data = result.data;
        if (status !== 200 || Object.keys(data).length === 0) {
          this._error = true;
        } else {
          return data;
        }
      } catch (err) {
        this._error = true;
      }
      return null;
    };

    await runInAction(async () => {
      try {
        this._coinMainData = await getCoinInformation();
        // if (Object.keys(data).length) this._coinMainData = data;
        // else this._error = true;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        this._error = true;
      }
      this.loading = false;
    });
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  get error(): boolean {
    return this._error;
  }

  set error(value: boolean) {
    this._error = value;
  }

  get coinMainData(): { [p: string]: any } {
    return this._coinMainData;
  }

  set coinMainData(value: { [p: string]: any }) {
    this._coinMainData = value;
  }

  get actualDatePeriod(): number {
    return this._actualDatePeriod;
  }

  set actualDatePeriod(value: number) {
    this._actualDatePeriod = value;
  }

  destroy(): void {
    // TODO
  }
}
