import { BASE_FETCH_URL } from "../../const/constants";

export const fetchSettings = async () => {
  const settingsResponse = await fetch(
    `${BASE_FETCH_URL}/anonymous/settings/installed`
  );
  const settingsResult = await settingsResponse.json();
  return settingsResult;
};
