import React, { ChangeEvent, useCallback } from "react";
import "./Input.module.scss";

import cn from "classnames";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ value, onChange, ...props }) => {
  const classNameList = cn(
    props["className"],
    props["disabled"] ? "input_disabled" : null
  );

  const changeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <input
      type="text"
      value={value}
      className={classNameList}
      {...props}
      onChange={changeValue}
    />
  );
};

export default Input;
