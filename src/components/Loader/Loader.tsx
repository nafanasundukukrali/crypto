import React from "react";

import cn from "classnames";

import "./Loader.css";

/** Возможные значения размера лоадера */
enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

/** Пропсы, которые принимает компонент Loader */
type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}) => {
  return loading ? (
    <div className={cn(`loader_size-${size}`, className, "loader_position")}>
      <svg
        className="loader__svg_animation"
        version="1.1"
        baseProfile="full"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" strokeWidth="3">
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            stroke="#6C757D"
            strokeDasharray="360 20"
            strokeDashoffset="360"
          />
        </g>
      </svg>
    </div>
  ) : null;
};

export default Loader;
