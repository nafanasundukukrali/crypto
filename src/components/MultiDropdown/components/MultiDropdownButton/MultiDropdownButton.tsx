import React from "react";

import { Option } from "@components/MultiDropdown/MultiDropdown";
import styles from "@components/MultiDropdown/MultiDropdown.module.scss";

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
      className={`${styles["multiDropdown__block__mainClickButton"]} ${
        isVisible
          ? styles["multiDropdown__block__mainClickButton__clicked"]
          : null
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={styles["multiDropdown__block__mainClickButton__content"]}
        // @ts-ignore
      >
        {pluralizeOptions(value)}
      </div>
      <div
        className={`${styles["multiDropdown__block__mainClickButton__icon"]} ${
          isVisible
            ? styles["multiDropdown__block__mainClickButton__icon_clicked"]
            : null
        }`}
      ></div>
    </button>
  );
};

export default MultiDropdownButton;
