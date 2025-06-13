import styles from "./MainMenu.module.css";
import { userAction } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FoldableList } from "../ui/List";
import { IconButton } from "../ui/input/IconButton";
import { icons } from "../ui/input/icons";
import { Alert, Confirm } from "../ui/Modal";
import { useRef } from "react";
import { TextField } from "../ui/input/Input";
import { Form } from "../ui/form/Form";
import { Error } from "../ui/form/Error";

const GuestProfile = () => {
  const dispatcher = useDispatch();
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
        appendButtons={[
          <IconButton
            key="append-button-login"
            icon={icons.login}
            onClick={() => {
              dispatcher(userAction.login());
            }}
          >
            Login
          </IconButton>,
        ]}
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
            style={{ width: "500px" }}
          />
          <Error>아이디 또는 비밀번호가 일치하지 않습니다.</Error>
        </Form>
      </Alert>
      <div>
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
  const dispatcher = useDispatch();

  const confirmRef = useRef();
  return (
    <div style={{ textAlign: "center" }}>
      <Confirm
        ref={confirmRef}
        title="수강생 로그아웃"
        onClickPositive={() => {
          dispatcher(userAction.logout());
        }}
        confirmStyle={{ padding: "2rem", width: "400px" }}
      >
        로그아웃할까요?
      </Confirm>
      <div style={{ marginBottom: "0.7rem" }}>
        <img
          src="https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDhfMTky/MDAxNjE1MTg3MDkzMzQ5.LF_wRgeqp0svkxCRWSCxh0GLmSTPPXoY7Y6CpNzY1icg.mKeYJaQmfYcAFLZL_TBpxZZ2PQkYFfju_7hbj5rHnEYg.PNG.aksen244/30fa75cf-0027-4396-8b32-e1d362bc7c57.png?type=w800"
          style={{
            display: "inline-block",
            width: "100px",
            height: "100px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            border: "7px solid #fff",
          }}
        />
      </div>
      <div>
        <div>관리자</div>
        <div>
          <IconButton
            color="#666"
            icon={icons.logout}
            onClick={() => {
              confirmRef.current.open();
            }}
          >
            로그아웃
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export const MainMenuList = () => {
  const headers = useSelector((store) => store.header);
  const user = useSelector((store) => store.user);
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
      {user.login && <MainProfile />}
      {!user.login && <GuestProfile />}

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
