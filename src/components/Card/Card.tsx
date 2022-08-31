import React from "react";

import styles from "./Card.module.scss";

/** Пропсы, которые принимает компонент Card */
type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Функция для ref для оследнего элеммента */
  refEndFunction?: (node: any) => void;
};
const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
  refEndFunction,
}) => {
  return (
    <div ref={refEndFunction} onClick={onClick} className={styles["card"]}>
      <img src={image} alt="" className={styles["card__mainImg"]} />
      <title className={styles["card__title"]}>{title}</title>
      <span className={styles["card__subtitle"]}>{subtitle}</span>
      <div className={styles["card__userContent"]}>{content}</div>
    </div>
  );
};

export default Card;
