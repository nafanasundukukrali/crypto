var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useMemo } from "react";
import cn from "classnames";
import Loader from "../Loader";
import "./Button.css";
/** Возможные раскраски кнопки */
var ButtonColor;
(function (ButtonColor) {
    /** Основная, акцентная кнопка */
    ButtonColor["primary"] = "primary";
    /** Второстепенная кнопка */
    ButtonColor["secondary"] = "secondary";
})(ButtonColor || (ButtonColor = {}));
var Button = function (_a) {
    var loading = _a.loading, _b = _a.color, color = _b === void 0 ? ButtonColor.primary : _b, children = _a.children, props = __rest(_a, ["loading", "color", "children"]);
    var resultClassNameList = useMemo(function () {
        return cn("button", loading || props["disabled"] ? "button_disabled" : null, "button_color-".concat(color), props["className"]);
    }, [loading, props, color]);
    return (React.createElement("button", __assign({ disabled: loading, className: resultClassNameList }, props),
        children,
        loading ? React.createElement(Loader, null) : null));
};
export default Button;
//# sourceMappingURL=Button.js.map