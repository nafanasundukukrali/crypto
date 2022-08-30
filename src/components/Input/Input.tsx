import React, { ChangeEvent, useCallback } from "react";
import "./Input.css";

import cn from "classnames";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({ value, onChange, ...props }) => {
  const classNameList = cn(
    props["className"],
    props["disabled"] ? "input_disabled" : null
  );

  const [text, setValue] = React.useState(value);

  const changeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(text + event.target.value);
      setValue(text);
    },
    [onChange, text]
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
