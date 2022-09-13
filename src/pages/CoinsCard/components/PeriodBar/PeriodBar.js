import React, { useCallback, useState } from "react";
import cn from "classnames";
import styles from "./PeriodBar.module.scss";
var PeriodTypes = {
    "1 H": 1,
    "24 H": 24,
    "1 W": 7 * 24,
    "1 M": 30 * 24,
    "6 M": 180 * 24,
    "1 Y": 365 * 24,
    All: 365 * 24,
};
var PeriodBar = function (_a) {
    var onChange = _a.onChange;
    var _b = useState("1H"), activePeriod = _b[0], setActivePeriod = _b[1];
    var changeActiveState = useCallback(function (newActive) {
        setActivePeriod(newActive);
        // @ts-ignore
        onChange(PeriodTypes[newActive]);
    }, [activePeriod]);
    return (React.createElement("ul", { className: styles["PeriodBar__main-block"] }, Object.keys(PeriodTypes).map(function (el) { return (React.createElement("li", { className: cn(styles["PeriodBar__choose-variant"], activePeriod === el
            ? styles["PeriodBar__choose-variant_active"]
            : null), onClick: function () { return changeActiveState(el); }, key: el }, 
    // @ts-ignore
    React.createElement("a", { className: styles["PeriodBar__link__value"] }, el))); })));
};
export default PeriodBar;
//# sourceMappingURL=PeriodBar.js.map