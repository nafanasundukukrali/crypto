import React, { useCallback } from "react";
import "./CheckBox.css";

type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...props }) => {
  const [value, setCheckStatus] = React.useState(true);

  const changeCheckStatus = useCallback(() => {
    setCheckStatus(!value);
    onChange(!value);
  }, [value, onChange]);

  return (
    <input
      type="checkbox"
      className="checkBox"
      {...props}
      checked={value}
      onChange={changeCheckStatus}
    />
  );
};
