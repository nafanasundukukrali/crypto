import CurrencyAndSortTypeParamsStore from "@store/RootStore/CurrencyParamsStore/CurrencyAndSortTypeParamsStore";
import QueryParamsStore from "@store/RootStore/QueryParamsStore/QuerryParamsStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly currency = new CurrencyAndSortTypeParamsStore();
  readonly coinsOnePageCoinsCount = 10;
}
