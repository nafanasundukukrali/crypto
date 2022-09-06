import { useCallback, useEffect } from "react";

import Button from "@components/Button";
import CardsList from "@components/CardsList/CardsList";
import ErrorReadDataMessage from "@components/ErrorReadDataMessage";
import Input from "@components/Input/Input";
import ROUTES from "@config/routes";
import rootStore from "@store/RootStore";
import { useCurrencyParamStore } from "@store/RootStore/hooks/useCurrencyParamStore";
import { useQueryParamsInit } from "@store/RootStore/hooks/useQueryParamsInit";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./Search.module.scss";

const Search = () => {
  const currency = useCurrencyParamStore();
  useQueryParamsInit();
  const navigate = useNavigate();

  const handleCancelButton = useCallback(() => {
    rootStore.query.destroy();
    navigate(ROUTES.MARKET);
  }, [navigate]);

  const handleQuery = useCallback(
    (value: string) => {
      rootStore.query.setSearch(value);
      navigate({
        pathname: ROUTES.SEARCH,
        search: rootStore.query.search,
      });
    },
    [rootStore.query]
  );

  useEffect(() => {
    const inputTimeout = setTimeout(handleQuery, 500);
    return () => clearTimeout(inputTimeout);
  }, [rootStore.query.search]);

  return (
    <div className={styles["Search__main-div"]}>
      <div className={styles["Search__search-input"]}>
        <Input onChange={handleQuery} value={rootStore.query.search} />
        <Button onClick={handleCancelButton}>Cancel</Button>
      </div>
      <div className={styles["Search__main-div_CardList-block"]}>
        <CardsList searchRequest={true} />
      </div>
    </div>
  );
};

export default Search;
