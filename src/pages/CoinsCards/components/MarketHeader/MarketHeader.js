import React from "react";
import MultiDropdown from "@components/MultiDropdown/MultiDropdown";
import cn from "classnames";
import style from "./MarketHeader.module.scss";
var MarketHeader = function (_a) {
    var capChangePercentage = _a.capChangePercentage, supportedCurrency = _a.supportedCurrency, actualCurrencyValue = _a.actualCurrencyValue, onClick = _a.onClick;
    // eslint-disable-next-line no-console
    // console.log("Market had been Rendered!");
    return (React.createElement("div", { className: style["MarketHeader__main-block"] },
        React.createElement("div", { className: style["MarketHeader__market-status"] },
            React.createElement("div", { className: style["MarketHeader__market-status__header"] },
                "Market is ",
                capChangePercentage >= 0 ? " up " : " down ",
                React.createElement("span", { className: cn(capChangePercentage > 0
                        ? style["MarketHeader__market-status__header__span_green"]
                        : style["MarketHeader__market-status__header__span_red"]) }, capChangePercentage.toFixed(2))),
            React.createElement("span", null, "In the past 24 hours")),
        React.createElement("div", { className: style["MarketHeader__search-item"] }),
        React.createElement("div", { className: style["MarketHeader__coins-item"] }, "Coins"),
        React.createElement("div", { className: style["MarketHeader__currency-dropdown"] },
            React.createElement(MultiDropdown, { options: supportedCurrency, value: actualCurrencyValue, onChange: onClick, pluralizeOptions: function (value) {
                    var resultString = "";
                    value.forEach(function (el) {
                        if (el)
                            resultString += el.value + " ";
                    });
                    return resultString;
                } }))));
};
export default MarketHeader;
//# sourceMappingURL=MarketHeader.js.map