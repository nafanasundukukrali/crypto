import React from "react";
import Loader from "../Loader";
export var WithLoader = function (_a) {
    var loading = _a.loading, children = _a.children;
    return (React.createElement("div", null,
        React.Children.map(children, function (child, i) {
            return child;
        }),
        loading ? React.createElement(Loader, null) : null));
};
//# sourceMappingURL=WithLoader.js.map