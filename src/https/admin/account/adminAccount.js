import { BASE_FETCH_URL } from "../../../const/constants";

export const fetchCountAdminAccount = async (id) => {
  const settingsResponse = await fetch(
    `${BASE_FETCH_URL}/anonymous/admin/account/checkid?accountId=${id}`
  );
  const settingsResult = await settingsResponse.json();
  return settingsResult;
};

export const fetchCreateAdminAccount = async (id, pwd, profile) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("pwd", pwd);
  formData.append("profileImage", profile[0]);

  const settingsResponse = await fetch(
    `${BASE_FETCH_URL}/anonymous/admin/account`,
    {
      method: "post",
      body: formData,
    }
  );
  const settingsResult = await settingsResponse.json();
  return settingsResult;
};
