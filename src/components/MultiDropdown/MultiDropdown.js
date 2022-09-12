var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useCallback, useState } from "react";
import styles from "./MultiDropdown.module.scss";
var MultiDropdown = function (_a) {
    var options = _a.options, value = _a.value, onChange = _a.onChange, disabled = _a.disabled, pluralizeOptions = _a.pluralizeOptions;
    var _b = useState(false), isVisible = _b[0], setVisible = _b[1];
    var changeValueList = useCallback(function (el) {
        if (value.indexOf(el) === -1) {
            value = [el];
        }
        else {
            value = __spreadArray(__spreadArray([], value.slice(0, value.indexOf(el)), true), value.slice(value.indexOf(el) + 1), true);
        }
        onChange(value);
    }, [value]);
    var handleVisible = useCallback(function () { return setVisible(function (v) { return !v; }); }, []);
    return (React.createElement("div", { key: "multiDropdown__block", className: "multiDropdown__block" },
        React.createElement("button", { key: "multiDropdown__block__mainClickButton", className: "".concat(styles["multiDropdown__block__mainClickButton"], " ").concat(isVisible
                ? styles["multiDropdown__block__mainClickButton__clicked"]
                : null), onClick: handleVisible, disabled: disabled },
            React.createElement("div", { className: styles["multiDropdown__block__mainClickButton__content"] }, pluralizeOptions(value)),
            React.createElement("div", { className: "".concat(styles["multiDropdown__block__mainClickButton__icon"], " ").concat(isVisible
                    ? styles["multiDropdown__block__mainClickButton__icon_clicked"]
                    : null) })),
        isVisible && !disabled && (React.createElement("div", { key: "multiDropdown__block__optionsList", className: styles["multiDropdown__block__optionsList"] }, options.map(function (el) { return (React.createElement("div", { key: el.key, className: styles["multiDropdown__block__optionsList__option"], onClick: function () { return changeValueList(el); } },
            React.createElement("div", null, el.value))); })))));
};
export default MultiDropdown;
//# sourceMappingURL=MultiDropdown.js.map