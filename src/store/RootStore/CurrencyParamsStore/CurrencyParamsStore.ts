import { Option } from "@components/MultiDropdown/MultiDropdown";
import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";

type PrivateField = "_currencyList" | "_selectedCurrencyList";

export default class CurrencyParamsStore {
  private _currencyList: Option[] = [];
  private _selectedCurrencyList: Option[] = [];

  constructor() {
    makeObservable<CurrencyParamsStore, PrivateField>(this, {
      _currencyList: observable.ref,
      _selectedCurrencyList: observable.ref,
      prepareCurrencyDate: action,
      getCurrencyList: action,
    });

    runInAction(() => {
      this.getCurrencyList().then(() => {
        const string = localStorage.getItem("selectedCurrency");
        if (string) {
          const value = JSON.parse(string);

          let counter = 0;
          for (let i = 0; i < value.length; i++)
            for (let j = 0; j < this._currencyList.length; j++)
              if (value[i]["key"] === this._currencyList[j]["key"]) {
                counter++;
                break;
              }

          if (value.length && counter === value.length)
            this._selectedCurrencyList = value;
          else this._selectedCurrencyList = [this._currencyList[0]];
        } else {
          this._selectedCurrencyList = [this._currencyList[0]];
        }
      });
    });
  }

  prepareCurrencyDate(userCurrencyList: string[]): Option[] {
    const result: Option[] = [];

    userCurrencyList.forEach((el) =>
      result.push({ key: el, value: `Market-${el.toUpperCase()}` })
    );

    return result;
  }

  async getCurrencyList() {
    const newCurrencyList = await axios({
      method: "get",
      url: "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
    });

    try {
      const { status, data } = newCurrencyList;
      runInAction(() => {
        if (status === 200) this._currencyList = this.prepareCurrencyDate(data);
      });
    } catch (e) {}
  }

  get currencyList(): Option[] {
    return this._currencyList;
  }

  get selectedCurrencyList(): Option[] {
    return this._selectedCurrencyList;
  }

  set selectedCurrencyList(newList: Option[]) {
    runInAction(() => {
      if (newList.length) {
        this._selectedCurrencyList = newList;
        localStorage.setItem(
          "selectedCurrency",
          JSON.stringify(this._selectedCurrencyList)
        );
      }
    });
  }
}
