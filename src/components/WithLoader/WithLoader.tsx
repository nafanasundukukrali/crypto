import React from "react";

import { Loader } from "../Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
}) => {
  return (
    <div>
      {React.Children.map(children, (child, i) => {
        return child;
      })}
      {loading ? <Loader /> : null}
    </div>
  );
};
