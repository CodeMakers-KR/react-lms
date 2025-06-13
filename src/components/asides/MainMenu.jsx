import styles from "./MainMenu.module.css";

import { useSelector } from "react-redux";
import { FoldableList } from "../ui/List";
import { Icon, IconButton } from "../ui/input/IconButton";
import { icons } from "../ui/input/icons";
import { Alert } from "../ui/Modal";
import { useRef } from "react";
import { TextField } from "../ui/input/Input";
import { Form } from "../ui/input/Form";

const GuestProfile = () => {
  const loginIdRef = useRef();
  const loginPasswordRef = useRef();
  const loginRef = useRef();
  const loginClickHandler = () => {
    loginRef.current.open();
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Alert
        ref={loginRef}
        title="수강생 로그인"
        buttonText="취소"
        modalStyle={{ padding: "10px" }}
      >
        <Form>
          <TextField
            ref={loginIdRef}
            id="id"
            labelText="ID"
            placeholder="ID"
            style={{ width: "500px", marginBottom: "0.625rem" }}
          />
          <TextField
            ref={loginPasswordRef}
            type="password"
            id="password"
            labelText="Password"
            placeholder="password"
            style={{ width: "500px", marginBottom: "0.625rem" }}
          />
        </Form>
      </Alert>
      <div>
        <div>Guest</div>
        <div>
          <IconButton
            color="#666"
            icon={icons.login}
            onClick={loginClickHandler}
          >
            로그인
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const MainProfile = () => {
  return (
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
  );
};

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
        <span style={{ fontWeight: 100 }}>Learning</span> <strong>Works</strong>
      </div>
      <GuestProfile />
      <MainProfile />
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
