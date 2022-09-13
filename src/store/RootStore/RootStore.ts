import CurrencyAndSortTypeParamsStore from "@store/RootStore/CurrencyParamsStore/CurrencyAndSortTypeParamsStore";
import QueryParamsStore from "@store/RootStore/QueryParamsStore/QuerryParamsStore";
import rootStore from "@store/RootStore/instance";

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly currency = new CurrencyAndSortTypeParamsStore();
  readonly coinsOnePageCoinsCount = 10;
}
