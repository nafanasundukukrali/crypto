import React from "react";
import styles from "./ChooseSortTypeBar.module.scss";
var ChooseSortTypeBar = function (_a) {
    var onClick = _a.onClick, actualSortType = _a.actualSortType;
    return (React.createElement("ul", { className: styles["ChooseSortTypeBar__ul"] },
        React.createElement("li", { className: "".concat(styles["ChooseSortTypeBar__link"], " ").concat(actualSortType === "market_cap_desc" ? styles["active"] : null), onClick: function () {
                onClick("market_cap_desc");
            } },
            React.createElement("a", null, "All")),
        React.createElement("li", { className: "".concat(styles["ChooseSortTypeBar__link"], " ").concat(actualSortType === "gecko_desc" ? styles["active"] : null), onClick: function () {
                onClick("gecko_desc");
            } },
            React.createElement("a", null, "Gainer")),
        React.createElement("li", { className: "".concat(styles["ChooseSortTypeBar__link"], " ").concat(actualSortType === "gecko_asc" ? styles["active"] : null), onClick: function () {
                onClick("gecko_asc");
            } },
            React.createElement("a", null, "Looser")),
        React.createElement("li", { className: styles["ChooseSortTypeBar__link"], onClick: function () { } },
            React.createElement("a", null, "Favourites"))));
};
export default React.memo(ChooseSortTypeBar, function (prevProps, nextProps) {
    return prevProps.onClick === nextProps.onClick;
});
//# sourceMappingURL=ChooseSortTypeBar.js.map