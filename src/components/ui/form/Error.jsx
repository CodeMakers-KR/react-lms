import { Icon } from "../input/IconButton";
import { icons } from "../input/icons";

const errorStyle = {
  color: "#f00",
  fontSize: "0.8rem",
  padding: "0.4rem",
  display: "flex",
};
export const Error = ({ children }) => {
  return (
    <div style={errorStyle}>
      <Icon
        icon={icons.error}
        iconSize={13}
        iconColor="#f00"
        iconStyle={{ marginRight: "5px" }}
      />
      {children}
    </div>
  );
};
