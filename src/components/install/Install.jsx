import { useRef, useState } from "react";
import { Form } from "../ui/form/Form";
import { TextField } from "../ui/input/Input";
import { Icon, IconButton } from "../ui/input/IconButton";
import { icons } from "../ui/input/icons";
import {
  fetchCountAdminAccount,
  fetchCreateAdminAccount,
} from "../../https/admin/account/adminAccount";
import { useNavigate } from "react-router-dom";
import { fetchSettings } from "../../https/settings/settingsHttp";

export const Install = () => {
  const navigation = useNavigate();
  (async () => {
    const installed = await fetchSettings();
    if (installed.data) {
      navigation("/");
    }
  })();

  const idRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [isMatch, setIsMatch] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const saveHandler = async () => {
    const { status, data } = await fetchCreateAdminAccount(
      idRef.current.value,
      passwordRef.current.value
    );
    setErrorMessage(status === 200 ? undefined : data);

    if (status === 200) {
      navigation("/");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFF",
          width: "80%",
          padding: "2rem",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
          Set Admin Account
        </h1>
        <h3 style={{ color: "#666", fontWeight: 400, marginTop: 0 }}>
          관리자가 사용할 계정 정보를 입력하세요.
        </h3>
        <Form>
          <TextField
            ref={idRef}
            id="id"
            labelText="ID"
            placeholder="ID"
            onChange={async () => {
              const { status, data } = await fetchCountAdminAccount(
                idRef.current.value
              );
              setErrorMessage(status === 200 ? undefined : data);
            }}
            style={{ width: "100%", marginBottom: "0.625rem" }}
          />
          {errorMessage && (
            <div
              style={{
                display: "flex",
                margin: "0.425rem 0 1.5rem 0",
                color: "#f00",
                fontSize: "0.85rem",
              }}
            >
              <Icon
                icon={icons.error}
                iconColor="#f00"
                iconSize={20}
                iconStyle={{ marginRight: "0.3rem" }}
              />
              {errorMessage}
            </div>
          )}

          <TextField
            ref={passwordRef}
            matchRef={passwordConfirmRef}
            type="password"
            id="password"
            labelText="Password"
            placeholder="password"
            onMatch={(match) => {
              setIsMatch(match);
            }}
            style={{ width: "100%", marginBottom: "0.625rem" }}
          />
          <TextField
            ref={passwordConfirmRef}
            matchRef={passwordRef}
            type="password"
            id="password-confirm"
            labelText="Password Confirm"
            placeholder="password"
            onMatch={(match) => {
              setIsMatch(match);
            }}
            style={{ width: "100%" }}
          />
          {isMatch === false && (
            <div
              style={{
                display: "flex",
                margin: "0.425rem 0 1.5rem 0",
                color: "#f00",
                fontSize: "0.85rem",
              }}
            >
              <Icon
                icon={icons.error}
                iconColor="#f00"
                iconSize={20}
                iconStyle={{ marginRight: "0.3rem" }}
              />
              비밀번호가 일치하지 않습니다.
            </div>
          )}
          <div
            style={{
              textAlign: "right",
              marginTop: "1rem",
            }}
          >
            <IconButton
              icon={icons.add}
              disabled={!isMatch || errorMessage}
              onClick={saveHandler}
            >
              등록
            </IconButton>
          </div>
        </Form>
      </div>
    </div>
  );
};
