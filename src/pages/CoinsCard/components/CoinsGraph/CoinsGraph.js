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
import React, { useCallback, useEffect, useRef, useState } from "react";
import Loader from "@components/Loader";
import axios from "axios";
import { createChart } from "lightweight-charts";
import styles from "./CoinsGraph.module.scss";
var CoinsGraph = function (_a) {
    var id = _a.id, timing = _a.timing, currency = _a.currency;
    var chartContainerRef = useRef();
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState([]), graphValue = _c[0], setGraphValue = _c[1];
    var _d = useState(false), error = _d[0], setError = _d[1];
    var _e = useState(), chart = _e[0], setChart = _e[1];
    var getSparklineData = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var prepareData, url, result, status_1, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prepareData = function (prices) {
                        var resultData = [];
                        if (timing === 1) {
                            var time = new Date();
                            time.setTime(Date.now() + 2 * 60 * 60 * 1000);
                            for (var i = 0; i <= 12; i++) {
                                resultData.push({
                                    value: prices[i][1],
                                    time: Math.round((time.getTime() + i * 5 * 60 * 1000) / 1000),
                                });
                            }
                        }
                        else {
                            prices.forEach(function (el) {
                                return resultData.push({
                                    time: Math.round(el[0] / 1000),
                                    value: el[2],
                                });
                            });
                        }
                        // eslint-disable-next-line no-console
                        // console.log(typeof resultData);
                        return resultData;
                    };
                    url = "";
                    if (timing < 24) {
                        url = "https://api.coingecko.com/api/v3/coins/".concat(id, "/market_chart?vs_currency=").concat(currency, "&days=1");
                    }
                    else if (timing >= 24) {
                        url = "https://api.coingecko.com/api/v3/coins/".concat(id, "/ohlc?vs_currency=").concat(currency, "&days=").concat(timing / 24);
                    }
                    else {
                        setError(true);
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    return [4 /*yield*/, axios.get(url)];
                case 1:
                    result = _a.sent();
                    try {
                        status_1 = result.status;
                        data = result.data;
                        if (status_1 !== 200 || Object.keys(data).length === 0) {
                            setError(true);
                            setLoading(false);
                        }
                        else {
                            setGraphValue(__spreadArray([], prepareData(timing < 24 ? data.prices : data), true));
                        }
                    }
                    catch (err) {
                        setError(true);
                    }
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); }, [currency, id, timing]);
    useEffect(function () {
        getSparklineData()
            // .then(() => {
            //   // @ts-ignore
            //   setChart(createChart(chartContainerRef.current));
            // })
            .catch(function () { });
    }, [currency, getSparklineData, id, timing]);
    useEffect(function () {
        // @ts-ignore
        if (graphValue.length) {
            // @ts-ignore
            var chart_1 = createChart(chartContainerRef.current, {});
            if (timing <= 24)
                chart_1.applyOptions({
                    timeScale: {
                        timeVisible: true,
                        secondsVisible: true,
                    },
                });
            var lineSerial = chart_1.addLineSeries({
                lineWidth: 3,
                color: styles["blue"],
            });
            // @ts-ignore
            lineSerial.setData(graphValue);
            chart_1.timeScale().fitContent();
        }
    }, [graphValue]);
    var LoadingStatement = function () {
        return loading && !error && React.createElement(Loader, null);
    };
    var GraphStatement = function () {
        return (!loading &&
            !error && (
        // @ts-ignore
        React.createElement("div", { ref: chartContainerRef, className: styles["CoinGraph"] })));
    };
    // @ts-ignore
    return (React.createElement(React.Fragment, null,
        LoadingStatement(),
        GraphStatement()));
};
export default CoinsGraph;
//# sourceMappingURL=CoinsGraph.js.map