import { BASE_FETCH_URL } from "../../../const/constants";

export const fetchCountAdminAccount = async (id) => {
  const settingsResponse = await fetch(
    `${BASE_FETCH_URL}/anonymous/admin/account/checkid?accountId=${id}`
  );
  const settingsResult = await settingsResponse.json();
  return settingsResult;
};

export const fetchCreateAdminAccount = async (id, pwd) => {
  const settingsResponse = await fetch(
    `${BASE_FETCH_URL}/anonymous/admin/account`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, pwd }),
    }
  );
  const settingsResult = await settingsResponse.json();
  return settingsResult;
};
