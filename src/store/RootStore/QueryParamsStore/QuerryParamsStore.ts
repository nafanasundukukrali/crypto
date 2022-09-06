import ROUTES from "@config/routes";
import { action, makeObservable, observable } from "mobx";
import * as qs from "qs";
import { useNavigate } from "react-router-dom";

type PrivateFields = "_params" | "_search";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _search: observable,
      setSearch: action,
    });
  }

  get search(): string {
    return this._search;
  }

  destroy(): void {
    this._params = {};
    this._search = "";
  }

  setSearch(search: string) {
    if (search) {
      search = search.startsWith("?") ? search.slice(1) : search;

      if (this._search !== search) {
        this._search = search;
        this._params = qs.parse(search);
      }
    }
  }
}
