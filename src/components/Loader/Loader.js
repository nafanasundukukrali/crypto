import React from "react";
import cn from "classnames";
import "./Loader.css";
/** Возможные значения размера лоадера */
var LoaderSize;
(function (LoaderSize) {
    LoaderSize["s"] = "s";
    LoaderSize["m"] = "m";
    LoaderSize["l"] = "l";
})(LoaderSize || (LoaderSize = {}));
var Loader = function (_a) {
    var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.size, size = _c === void 0 ? LoaderSize.m : _c, className = _a.className;
    return loading ? (React.createElement("div", { className: cn("loader_size-".concat(size), className, "loader_position") },
        React.createElement("svg", { className: "loader__svg_animation", version: "1.1", baseProfile: "full", width: "100%", height: "100%", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("g", { fill: "none", strokeWidth: "3" },
                React.createElement("circle", { cx: "50%", cy: "50%", r: "40%", stroke: "#6C757D", strokeDasharray: "360 20", strokeDashoffset: "360" }))))) : null;
};
export default Loader;
//# sourceMappingURL=Loader.js.map