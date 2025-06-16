import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../ui/input/IconButton";
import { icons } from "../ui/input/icons";
import { mainHeaderAction } from "../../store/slices/mainHeaderSlice";
import { useNavigate } from "react-router-dom";

export const ContentHeader = () => {
  const headers = useSelector((store) => store.header);
  const navigation = useNavigate();

  const pathname = window.location.pathname;
  const paths = [];
  getPath(pathname, headers, paths);
  paths.reverse();

  const isStar = getPath(pathname, headers, paths, true);

  const headerDispatcher = useDispatch();

  const clickFavoriteHandler = () => {
    headerDispatcher(mainHeaderAction.toggleFavorites([paths[1], paths[2]]));
  };

  return (
    <div
      style={{
        display: "flex",
        position: "sticky",
        paddingTop: "2rem",
        top: 0,
        backgroundColor: "#e9e9e9",
        borderBottom: "2px solid #bbb",
        zIndex: 40,
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            margin: 0,
            padding: 0,
            listStyle: "none",
            color: "#666",
            gap: "8px",
          }}
        >
          <li style={{ display: "inline-flex" }}>
            <Icon
              icon={icons.home}
              iconSize={14}
              iconColor="#999"
              iconStyle={{ cursor: "pointer" }}
              onClick={() => {
                navigation("/");
              }}
            />
          </li>
          <li style={{ display: "inline-flex" }}>
            <Icon icon={icons.arrowRight} iconSize={14} iconColor="#999" />
          </li>
          <li style={{ display: "inline-flex" }}>{paths[0].group}</li>
          <li style={{ display: "inline-flex" }}>
            <Icon icon={icons.arrowRight} iconSize={14} iconColor="#999" />
          </li>
          <li style={{ display: "inline-flex" }}>{paths[1].title}</li>
        </ul>
        <h2
          style={{
            margin: "8px 0",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {paths[2].title}
          <Icon
            icon={isStar ? icons.fullStar : icons.star}
            iconSize={25}
            iconColor="#999"
            onClick={clickFavoriteHandler}
          />
        </h2>
      </div>
    </div>
  );
};

const getPath = (pathname, menu, paths, inFavorite) => {
  for (const item of menu) {
    if (item.groupItem && (inFavorite ? item.exclude : !item.exclude)) {
      if (getPath(pathname, item.groupItem, paths)) {
        paths.push({ ...item });
        return true;
      }
    } else if (item.subItems) {
      if (getPath(pathname, item.subItems, paths)) {
        paths.push({ ...item });
        return true;
      }
    } else if (item.to === pathname) {
      paths.push({ ...item });
      return true;
    }
  }
};
