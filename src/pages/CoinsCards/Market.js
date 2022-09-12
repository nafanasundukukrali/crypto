var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useEffect, useCallback, useRef, useMemo, } from "react";
import Card from "@components/Card";
import Loader from "@components/Loader";
import ROUTES from "@config/routes";
import ChooseSortTypeBar from "@pages/CoinsCards/components/ChooseSortTypeBar";
import CoinSmallGraph from "@pages/CoinsCards/components/CoinSmallGraph";
import MarketHeader from "@pages/CoinsCards/components/MarketHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Market.module.scss";
var Market = function () {
    // Список монет
    var _a = useState([]), coinsList = _a[0], setCoinsList = _a[1];
    // Список валют
    var _b = useState([]), currencyList = _b[0], setCurrencyList = _b[1];
    // Список выбранных валют из выпадающего списка
    var _c = useState([]), selectedCurrency = _c[0], setSelectedCurrency = _c[1];
    // Текущее состояние рынка (тот самый коэффициент за сутки)
    var _d = useState(null), dailyMarketChange = _d[0], setDailyMarketChange = _d[1];
    // Состояние загрузки страницы
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    // Ошибка прогрузки контента
    var _f = useState(false), error = _f[0], setError = _f[1];
    // Номер последней прогруженной страницы с монетами
    var _g = useState(1), page = _g[0], setPage = _g[1];
    // Сеттер страницы
    var setPageValue = function (newPage) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, setPage(newPage)];
    }); }); };
    // Выбранная сортировка монет
    var _h = useState("market_cap_desc"), sortCondition = _h[0], setSortCondition = _h[1];
    // Для перехода на страницу с монетой
    var navigate = useNavigate();
    var handleCoinNavigate = function (id) {
        var getNewCardPath = function (id) {
            return "/Card/".concat(id);
        };
        navigate(getNewCardPath(id), {
            state: { from: { pathname: ROUTES.MARKET }, currency: selectedCurrency },
        });
    };
    // Получение из простого списка валют того, который будет отображаться
    // в навигации
    var prepareCurrencyDate = function (userCurrencyList) {
        var result = [];
        userCurrencyList.forEach(function (el) {
            return result.push({ key: el, value: "Market-".concat(el.toUpperCase()) });
        });
        return result;
    };
    // Статус состояния рынка и получение спсика валют
    useEffect(function () {
        var getDailyMarketChange = function () { return __awaiter(void 0, void 0, void 0, function () {
            var dailyMarketChange;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios({
                            method: "get",
                            url: "https://api.coingecko.com/api/v3/global",
                        })];
                    case 1:
                        dailyMarketChange = _a.sent();
                        setDailyMarketChange(dailyMarketChange.data.data.market_cap_change_percentage_24h_usd);
                        return [2 /*return*/];
                }
            });
        }); };
        var getCurrencyList = function () { return __awaiter(void 0, void 0, void 0, function () {
            var newCurrencyList, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios({
                            method: "get",
                            url: "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
                        })];
                    case 1:
                        newCurrencyList = _a.sent();
                        result = newCurrencyList.data;
                        setCurrencyList(prepareCurrencyDate(result));
                        return [2 /*return*/];
                }
            });
        }); };
        getDailyMarketChange().then(function () { return getCurrencyList(); });
    }, []);
    // Выбор первой валюты в качестве выбранной, если список валют поменялся
    useEffect(function () {
        if (currencyList.length) {
            setSelectedCurrency([currencyList[0]]);
        }
    }, [currencyList]);
    // Инициализация списка монет, страницы, очистка списка в случае перезагрузки
    useEffect(function () {
        if (sortCondition && selectedCurrency.length) {
            setPageValue(1)
                .catch(function () { })
                .then(function () {
                setCoinsList([]);
            })
                .then(function () {
                initCoins(1, []);
            });
        }
    }, [sortCondition, selectedCurrency]);
    // Увеличение страницы после обновления списка монет
    useEffect(function () {
        if (coinsList.length) {
            setPageValue(page + 1).catch();
        }
    }, [coinsList]);
    // Функция для получения одной страницы с 10 монетами
    var getCoinsList = useCallback(function (newPage, currency, sortKind) { return __awaiter(void 0, void 0, void 0, function () {
        var url, result, e_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=".concat(currency, "&order=").concat(sortKind, "&per_page=10&page=").concat(newPage, "&sparkline=true");
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get(url)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    e_1 = _a.sent();
                    result = { status: 0, data: [], error: e_1 };
                    return [2 /*return*/, result];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    // Функция для проверки, что список с монетами получен вереный и добавление
    // его к остальным монетам
    var initCoins = function (newPage, newCoinsList) {
        if (newCoinsList === void 0) { newCoinsList = coinsList; }
        var searchByKey = function (element, array) {
            // @ts-ignore
            for (var i = 0; i < array.length; i++) {
                // @ts-ignore
                if (array[i].id === element.id)
                    return true;
            }
            return false;
        };
        setError(false);
        setLoading(true);
        getCoinsList(newPage, selectedCurrency[0]["key"], sortCondition)
            .then(function (data) {
            if (!data.error && data.status === 200 && data.data.length > 0) {
                data.data = data.data.filter(function (element, index) {
                    return !searchByKey(element, newCoinsList);
                });
                // @ts-ignore
                setCoinsList(__spreadArray(__spreadArray([], newCoinsList, true), data.data, true));
                setError(false);
                setLoading(false);
            }
            else {
                setError(true);
                setLoading(false);
            }
        })
            .catch(function (error) {
            setError(true);
            setLoading(false);
        });
    };
    // "Перетаскиваемый" обзервер для последнего элемента списка
    var observer = useRef();
    // Проверка того, что достигнут последний элемент текущего списка монет
    var lastComponentRendered = useCallback(function (node, userPage) {
        if (loading)
            return;
        if (observer.current)
            observer.current.disconnect();
        observer.current = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                initCoins(userPage);
            }
        });
        if (node)
            observer.current.observe(node);
    }, [loading]);
    // Заполнение карточки с валютой
    var showCards = function () {
        var prepareSparklineData = function (data) {
            var result = [];
            data.forEach(function (el, index) { return result.push({ value: el, time: index }); });
            return result;
        };
        return (React.createElement(React.Fragment, null, coinsList.map(function (coin, index) {
            if (coinsList.length === index + 1) {
                // @ts-ignore
                return (React.createElement("div", { id: coin["id"], key: index, ref: function (node) { return lastComponentRendered(node, page); } },
                    React.createElement(Card, { image: coin["image"], title: coin["name"], 
                        // @ts-ignore
                        subtitle: coin["symbol"].toUpperCase(), onClick: function () {
                            handleCoinNavigate(coin["id"]);
                        }, content: React.createElement(CoinSmallGraph, { priceChangePercentage: coin["price_change_percentage_24h"], 
                            // @ts-ignore
                            sparklineIn7d: prepareSparklineData(coin["sparkline_in_7d"]["price"]) }) })));
            }
            else
                return (React.createElement("div", { id: coin["id"], key: index },
                    React.createElement(Card, { image: coin["image"], title: coin["name"], 
                        // @ts-ignore
                        subtitle: coin["symbol"].toUpperCase(), onClick: function () { return handleCoinNavigate(coin["id"]); }, content: React.createElement(CoinSmallGraph, { priceChangePercentage: coin["price_change_percentage_24h"], sparklineIn7d: prepareSparklineData(coin["sparkline_in_7d"]["price"]) }) })));
        })));
    };
    // Значок загрузки при загрузки списка валют
    var showLoading = function () {
        return React.createElement(React.Fragment, null, loading && React.createElement(Loader, null));
    };
    // Непредвиденная пакость
    var showError = function () {
        return (React.createElement(React.Fragment, null, error && coinsList.length < 100 && React.createElement("div", null, "Something went wrong")));
    };
    // Достигнут конец списка
    var showEndOfList = function () {
        return React.createElement(React.Fragment, null, error && coinsList.length >= 100 && React.createElement("div", null, "End of list"));
    };
    var changeSelectedCurrency = useMemo(function () { return function (value) { return setSelectedCurrency(value); }; }, []);
    if (coinsList.length !== 0 &&
        dailyMarketChange !== null &&
        currencyList.length !== 0) {
        return (React.createElement("div", { className: styles["Market__main-div"] },
            React.createElement(MarketHeader, { capChangePercentage: dailyMarketChange, supportedCurrency: currencyList, actualCurrencyValue: selectedCurrency, onClick: changeSelectedCurrency }),
            React.createElement(ChooseSortTypeBar, { onClick: function (sortType) {
                    return setSortCondition(sortType);
                }, actualSortType: sortCondition }),
            React.createElement("div", { className: styles["Market__CardsEvents"] },
                showCards(),
                showLoading(),
                showError(),
                showEndOfList())));
    }
    else {
        return (React.createElement("div", { className: styles["CoinsCards__mainDiv"] },
            React.createElement(Loader, null)));
    }
};
export default Market;
//# sourceMappingURL=Market.js.map