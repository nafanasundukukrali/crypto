import React from "react";

import { Loader } from "../Loader/Loader";
import "./Button.css";

/** Возможные раскраски кнопки */
export enum ButtonColor {
  /** Основная, акцентная кнопка */
  primary = "primary",
  /** Второстепенная кнопка */
  secondary = "secondary",
}

/** Пропсы, который принимает компонент Button */
export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   * По умолчанию - false
   */
  loading?: boolean;
  /** Цвет кнопки, по умолчанию -  ButtonColor.primary*/
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  loading,
  color = ButtonColor.primary,
  children,
  ...props
}) => {
  let ClassNames = require("classnames");

  let resultClassNameList = ClassNames(
    "button",
    loading || props["disabled"] ? "button_disabled" : null,
    `button_color-${color}`
  );

  if (props["className"]) {
    resultClassNameList = ClassNames(resultClassNameList, props["className"]);
  }

  if (Object.keys(props).length && props["className"])
    delete props["className"];

  return (
    <button disabled={loading} className={resultClassNameList} {...props}>
      {children}
      {loading ? <Loader /> : null}
    </button>
  );
};
