import "./IconButton.css";
import { useState } from "react";

export const Icon = ({
  iconSize,
  iconColor,
  iconStyle = {},
  icon,
  onClick = () => {},
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={`${iconSize}px`}
      viewBox="0 -960 960 960"
      width={`${iconSize}px`}
      fill={iconColor}
      onClick={onClick}
      style={iconStyle}
    >
      <path d={icon} />
    </svg>
  );
};

export const IconButton = ({
  children,
  color = "#666",
  icon,
  iconSize = 20,
  iconColor = "#666",
  hoverIconRotate = false,
  alwaysIconRotate = false,
  backgroundColor = "buttonface",
  onClick = () => {},
}) => {
  const [hover, setHover] = useState(false);
  const hoverHandler = () => {
    setHover(true);
  };
  const houtHandler = () => {
    setHover(false);
  };

  const iconStyle = { marginRight: "5px" };

  if (hoverIconRotate) {
    iconStyle.transform = `rotate(${hover ? 360 : 0}deg)`;
    iconStyle.transition = "transform 0.4s";
  }
  if (alwaysIconRotate) {
    iconStyle.animation = "rotate 0.5s infinite";
  }

  return (
    <button
      type="button"
      onMouseEnter={hoverHandler}
      onMouseLeave={houtHandler}
      onClick={onClick}
      style={{
        verticalAlign: "middle",
        cursor: "pointer",
        fontWeight: hover ? 800 : 400,
        display: "inline-flex",
        padding: icon ? "5px" : "7px",
        paddingRight: children ? "10px" : "5px",
        alignItems: "center",
        border: "0",
        borderRadius: "5px",
        backgroundColor,
      }}
    >
      {icon && (
        <Icon
          iconSize={iconSize}
          iconColor={iconColor}
          icon={icon}
          iconStyle={iconStyle}
        />
      )}
      <span
        style={{
          display: "inline-block",
          color,
          alignSelf: "center",
        }}
      >
        {children}
      </span>
    </button>
  );
};
