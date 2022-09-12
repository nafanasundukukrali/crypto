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
import React, { useCallback } from "react";
import "./CheckBox.css";
export var CheckBox = function (_a) {
    var onChange = _a.onChange, props = __rest(_a, ["onChange"]);
    var _b = React.useState(true), value = _b[0], setCheckStatus = _b[1];
    var changeCheckStatus = useCallback(function () {
        setCheckStatus(!value);
        onChange(!value);
    }, [value, onChange]);
    return (React.createElement("input", __assign({ type: "checkbox", className: "checkBox" }, props, { checked: value, onChange: changeCheckStatus })));
};
//# sourceMappingURL=CheckBox.js.map