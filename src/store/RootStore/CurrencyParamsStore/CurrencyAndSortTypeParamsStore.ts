import { Option } from "@components/MultiDropdown/MultiDropdown";
import axios from "axios";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateField =
  | "_currencyList"
  | "_selectedCurrencyList"
  | "_selectedCurrencySymbol"
  | "_selectedSortType";

export default class CurrencyAndSortTypeParamsStore {
  private _currencyList: Option[] = [];
  private _selectedCurrencyList: Option[] = [];
  private _selectedCurrencySymbol: string | undefined = "";
  private _selectedSortType: string = "market_cap_desc";

  constructor() {
    makeObservable<CurrencyAndSortTypeParamsStore, PrivateField>(this, {
      _currencyList: observable.ref,
      _selectedCurrencyList: observable.ref,
      _selectedCurrencySymbol: observable,
      _selectedSortType: observable,
      prepareCurrencyDate: action,
      getCurrencyList: action,
      selectedSortType: computed,
      selectedCurrencyList: computed,
    });

    runInAction(() => {
      this.getCurrencyList().then(() => {
        let string = localStorage.getItem("selectedCurrency");

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

        this._selectedCurrencySymbol = getSymbolFromCurrency(
          this._selectedCurrencyList[0]["key"]
        );
      });
    });
  }

  get selectedCurrencySymbol(): string {
    return this._selectedCurrencySymbol ? this._selectedCurrencySymbol : "";
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

  get selectedSortType(): string {
    return this._selectedSortType;
  }

  set selectedSortType(newSortType: string) {
    this._selectedSortType = newSortType;
  }

  get selectedCurrencyList(): Option[] {
    return this._selectedCurrencyList;
  }

  set selectedCurrencyList(newList: Option[]) {
    if (newList.length) {
      this._selectedCurrencyList = newList;
      this._selectedCurrencySymbol = getSymbolFromCurrency(
        this._selectedCurrencyList[0]["key"]
      );
      localStorage.setItem(
        "selectedCurrency",
        JSON.stringify(this._selectedCurrencyList)
      );
    }
  }
}
