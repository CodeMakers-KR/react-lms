import styles from "./MainMenu.module.css";

import { useSelector } from "react-redux";
import { FoldableList } from "../ui/List";
import { IconButton } from "../ui/input/IconButton";
import { icons } from "../ui/input/icons";

export const MainMenuList = () => {
  const headers = useSelector((store) => store.header);

  return (
    <div className={styles.mainMenu}>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.4rem",
          marginBottom: "1rem",
        }}
      >
        Learning Works
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: "0.7rem" }}>
          <div
            style={{
              display: "inline-block",
              width: "100px",
              height: "100px",
              backgroundColor: "#fff",
              borderRadius: "50%",
            }}
          ></div>
        </div>
        <div>
          <div>관리자</div>
          <div>
            <IconButton color="#666" icon={icons.logout}>
              로그아웃
            </IconButton>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {headers?.map((item) => (
          <FoldableList key={item.id} list={item} />
        ))}
      </div>
    </div>
  );
};
