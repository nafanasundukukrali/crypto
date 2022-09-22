import React, { useEffect } from "react";

import { Option } from "@components/MultiDropdown/MultiDropdown";
import styles from "@components/MultiDropdown/MultiDropdown.module.scss";
import cn from "classnames";

type MultiDropdownButtonProps = {
  isVisible: boolean;
  onClick: () => void;
  disabled?: boolean;
  actualValueString: string;
};

const MultiDropdownButton: React.FC<MultiDropdownButtonProps> = ({
  isVisible,
  onClick,
  disabled,
  actualValueString,
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
        {actualValueString}
      </div>
      <div
        className={cn(
          styles["multiDropdown__block__mainClickButton__icon"],
          isVisible && styles["multiDropdown__block__mainClickButton__icon_clicked_1"]
        )}
      ></div>
    </button>
  );
};

export default React.memo(MultiDropdownButton);
