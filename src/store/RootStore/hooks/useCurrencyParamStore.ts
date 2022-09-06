import rootStore from "@store/RootStore";
import CurrencyParamsStore from "@store/RootStore/CurrencyParamsStore/CurrencyParamsStore";

export const useCurrencyParamStore = (): CurrencyParamsStore => {
  return rootStore.currency;
};
