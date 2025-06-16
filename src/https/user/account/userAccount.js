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
