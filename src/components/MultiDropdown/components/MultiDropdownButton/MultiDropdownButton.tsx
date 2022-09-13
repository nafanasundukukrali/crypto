import React from "react";

import { Option } from "@components/MultiDropdown/MultiDropdown";
import styles from "@components/MultiDropdown/MultiDropdown.module.scss";
import cn from "classnames";

type MultiDropdownButtonProps = {
  value: Option[];
  isVisible: boolean;
  onClick: () => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
};

const MultiDropdownButton: React.FC<MultiDropdownButtonProps> = ({
  value,
  isVisible,
  onClick,
  disabled,
  pluralizeOptions,
}) => {
  return (
    <button
      key="multiDropdown__block__mainClickButton"
      className={cn(
        styles["multiDropdown__block__mainClickButton"],
        isVisible && styles["multiDropdown__block__mainClickButton__clicked"]
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles["multiDropdown__block__mainClickButton__content"]}>
        {pluralizeOptions(value)}
      </div>
      <div
        className={cn(
          styles["multiDropdown__block__mainClickButton__icon"],
          isVisible && styles["multiDropdown__block__mainClickButton__clicked"]
        )}
      ></div>
    </button>
  );
};

export default MultiDropdownButton;
