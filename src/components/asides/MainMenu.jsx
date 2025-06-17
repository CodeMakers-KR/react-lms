import styles from "./MainMenu.module.css";
import { userAction, userThunkAction } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FoldableList } from "../ui/List";
import { IconButton } from "../ui/input/IconButton";
import { icons } from "../ui/input/icons";
import { Alert, Confirm } from "../ui/Modal";
import { useRef, useState } from "react";
import { TextField } from "../ui/input/Input";
import { Form } from "../ui/form/Form";
import { Error } from "../ui/form/Error";
import {
  fetchLoginUserAccount,
  fetchLoginUserData,
} from "../../https/user/account/userAccount";
import { BASE_FETCH_URL, BASE_URL } from "../../const/constants";

const GuestProfile = () => {
  const dispatcher = useDispatch();
  const loginIdRef = useRef();
  const loginPasswordRef = useRef();
  const loginRef = useRef();
  const loginClickHandler = () => {
    loginRef.current.open();
  };

  dispatcher(userAction.autoLogin());
  dispatcher(userThunkAction.loadUserInfo());

  const [loginErrorMessage, setLoginErrorMessage] = useState();
  return (
    <div style={{ textAlign: "center" }}>
      <Alert
        ref={loginRef}
        title="수강생 로그인"
        buttonText="취소"
        buttonIcon={icons.close}
        appendButtons={[
          <IconButton
            key="append-button-login"
            icon={icons.login}
            onClick={async () => {
              const token = await fetchLoginUserAccount(
                loginIdRef.current.value,
                loginPasswordRef.current.value
              );
              if (token.status === 200) {
                dispatcher(userAction.login(token.data));

                const userInfo = await fetchLoginUserData();
                console.log(userInfo);
                if (userInfo.status === 200) {
                  dispatcher(userAction.loadUserInfo(userInfo.data));
                }
              } else {
                setLoginErrorMessage(token.data);
              }
            }}
          >
            Login
          </IconButton>,
        ]}
        modalStyle={{ padding: "10px", width: "500px" }}
      >
        <Form>
          <TextField
            ref={loginIdRef}
            id="id"
            labelText="ID"
            placeholder="ID"
            style={{ width: "100%", marginBottom: "0.625rem" }}
          />
          <TextField
            ref={loginPasswordRef}
            type="password"
            id="password"
            labelText="Password"
            placeholder="password"
            style={{ width: "100%" }}
          />
          {loginErrorMessage && <Error>{loginErrorMessage}</Error>}
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

const MainProfile = ({ name, id }) => {
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
          src={`${BASE_URL}/anonymous/user/account/profile/${id}`}
          style={{
            objectFit: "cover",
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
        <div>{name ?? id}</div>
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
  console.log(user);
  return (
    <div className={styles.mainMenu}>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.45rem",
          marginBottom: "1rem",
        }}
      >
        <span style={{ fontWeight: 100 }}>Learning</span> <strong>Works</strong>
      </div>
      {user.login && (
        <MainProfile name={user.userInfo?.name} id={user.userInfo?.id} />
      )}
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
