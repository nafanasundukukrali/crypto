import React, { useCallback, useEffect, useState } from "react";

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
  useQueryParamsInit();
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState<string>("");

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
    [rootStore.query.search]
  );

  useEffect(() => {
    const inputTimeout = setTimeout(() => handleQuery(localQuery), 500);
    return () => clearTimeout(inputTimeout);
  }, [localQuery]);

  return (
    <div className={styles["Search__main-div"]}>
      <div className={styles["Search__search-input"]}>
        <Input value={localQuery} onChange={event => setLocalQuery(event)} />
        <Button onClick={handleCancelButton}>Cancel</Button>
      </div>
      <div className={styles["Search__main-div_CardList-block"]}>
        <CardsList />
      </div>
    </div>
  );
};

export default Search;
