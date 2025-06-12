import styles from "./MainHeader.module.css";
import { NavList } from "../ui/List.jsx";
import { useSelector } from "react-redux";

const MainHeader = () => {
  const headers = useSelector((store) => store.header);
  return (
    <NavList
      items={headers}
      className={`list horizontal-list ${styles.mainHeader}`}
      itemClassName={styles.mainHeaderItem}
    />
  );
};

export default MainHeader;
