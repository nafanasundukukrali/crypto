import React, { useMemo } from "react";

import cn from "classnames";

import Loader from "../Loader";
import styles from "./Button.module.scss";

/** Возможные раскраски кнопки */
enum ButtonColor {
  /** Основная, акцентная кнопка */
  primary = "primary",
  /** Второстепенная кнопка */
  secondary = "secondary",
}

/** Пропсы, который принимает компонент Button */
type ButtonProps = React.PropsWithChildren<{
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

const Button: React.FC<ButtonProps> = ({
  loading,
  color = ButtonColor.primary,
  children,
  ...props
}) => {
  let resultClassNameList = useMemo(
    () =>
      cn(
        styles["button"],
        loading || props["disabled"] ? styles["button_disabled"] : null,
        styles[`button_color-${color}`],
        props["className"]
      ),
    [loading, props, color]
  );

  return (
    <button disabled={loading} className={resultClassNameList} {...props}>
      {children}
      {loading ? <Loader /> : null}
    </button>
  );
};

export default Button;
