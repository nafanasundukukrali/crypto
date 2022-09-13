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
import "./Input.css";
import cn from "classnames";
export var Input = function (_a) {
    var value = _a.value, onChange = _a.onChange, props = __rest(_a, ["value", "onChange"]);
    var classNameList = cn(props["className"], props["disabled"] ? "input_disabled" : null);
    var _b = React.useState(value), text = _b[0], setValue = _b[1];
    var changeValue = useCallback(function (event) {
        onChange(text + event.target.value);
        setValue(text);
    }, [onChange, text]);
    return (React.createElement("input", __assign({ type: "text", value: value, className: classNameList }, props, { onChange: changeValue })));
};
//# sourceMappingURL=Input.js.map