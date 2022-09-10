import rootStore from "@store/RootStore";
import CurrencyAndSortTypeParamsStore from "@store/RootStore/CurrencyParamsStore/CurrencyAndSortTypeParamsStore";

export const useCurrencyParamStore = (): CurrencyAndSortTypeParamsStore => {
  return rootStore.currency;
};
