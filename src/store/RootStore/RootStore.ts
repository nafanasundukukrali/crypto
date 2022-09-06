import CurrencyParamsStore from "@store/RootStore/CurrencyParamsStore/CurrencyParamsStore";
import QueryParamsStore from "@store/RootStore/QueryParamsStore/QuerryParamsStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly currency = new CurrencyParamsStore();
}
