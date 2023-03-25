// import { store } from "../../store/index";
// import {API_login} from "@api/auth";
// import { myVue } from "@main";

import { useAuth } from "@composable";

export async function refreshTokenMiddleware(to) {
  const { refreshToken } = useAuth();

  if (["Auth", "Closer"].includes(to.name)) {
    return;
  }

  await refreshToken();
}
