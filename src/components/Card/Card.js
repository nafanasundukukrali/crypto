import React from "react";
import styles from './Card.module.scss';
var Card = function (_a) {
    var image = _a.image, title = _a.title, subtitle = _a.subtitle, content = _a.content, onClick = _a.onClick, refEndFunction = _a.refEndFunction;
    return (React.createElement("div", { ref: refEndFunction, onClick: onClick, className: styles["card"] },
        React.createElement("img", { src: image, alt: "", className: styles["card__mainImg"] }),
        React.createElement("title", { className: styles["card__title"] }, title),
        React.createElement("span", { className: styles["card__subtitle"] }, subtitle),
        React.createElement("div", { className: styles["card__userContent"] }, content)));
};
export default Card;
//# sourceMappingURL=Card.js.map