import { FC } from "react";

type ErrorReadDataMessageProps = {
  isVisible: boolean;
};

const ErrorReadDataMessage: FC<ErrorReadDataMessageProps> = ({ isVisible }) => {
  return (
    <>
      {isVisible && <p>Ошибка при загрузке данных. Перезагрузите страницу.</p>}
    </>
  );
};

export default ErrorReadDataMessage;
