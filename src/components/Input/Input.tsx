import React from "react";
import "./Input.css";

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
  const classNameList = require("classnames")(
    props["className"],
    props["disabled"] ? "input_disabled" : null
  );

  const [text, setValue] = React.useState(value);

  if (Object.keys(props).length && props["className"])
    delete props["className"];

  return (
    <input
      type="text"
      value={value}
      className={classNameList}
      {...props}
      onChange={(event) => {
        onChange(text + event.target.value);
        setValue(text);
      }}
    />
  );
};
