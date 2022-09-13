import React, { memo, useCallback, useEffect, useState } from "react";

import MultiDropdownButton from "@components/MultiDropdown/components/MultiDropdownButton";
import rootStore from "@store/RootStore";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [isVisible, setVisible] = useState(false);

  const handleValueList = useCallback(
    (el: Option) => {
      if (value.indexOf(el) === -1) {
        value = [el];
      } else {
        value = [
          ...value.slice(0, value.indexOf(el)),
          ...value.slice(value.indexOf(el) + 1),
        ];
      }
      onChange(value);
    },
    [value]
  );

  const handleVisible = useCallback(
    () => setVisible((isVisible) => !isVisible),
    []
  );

  return (
    <div key="multiDropdown__block" className={"multiDropdown__block"}>
      <MultiDropdownButton
        value={value}
        isVisible={isVisible}
        onClick={handleVisible}
        pluralizeOptions={pluralizeOptions}
      />
      {isVisible && !disabled && (
        <div
          key="multiDropdown__block__optionsList"
          className={styles["multiDropdown__block__optionsList"]}
        >
          {options.map((el) => (
            <div
              key={el.key}
              className={styles["multiDropdown__block__optionsList__option"]}
              onClick={() => handleValueList(el)}
            >
              <div>{el.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(MultiDropdown);
