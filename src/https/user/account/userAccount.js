import { BASE_FETCH_URL } from "../../../const/constants";

export const fetchLoginUserAccount = async (id, pwd) => {
  const response = await fetch(
    `${BASE_FETCH_URL}/anonymous/user/account/login`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, pwd }),
    }
  );
  const result = await response.json();
  return result;
};

export const fetchLoginUserData = async () => {
  const response = await fetch(`${BASE_FETCH_URL}/user/account`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("__token__"),
    },
  });
  const result = await response.json();
  return result;
};

export const fetchStudents = async () => {
  const response = await fetch(`${BASE_FETCH_URL}/user/accounts`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("__token__"),
    },
  });
  const result = await response.json();
  return result;
};
