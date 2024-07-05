import { ApiUser } from "../types/users";
import { callRequest, RequestFunction } from "../utils/api";

const subPathUrl = "auth/";

interface RequestRegisterUser {
  username: string;
  email: string;
  password: string;
}

interface ResponseRegisterUser {
  user: ApiUser;
  token: string;
}

const registerUser: RequestFunction<RequestRegisterUser, ApiUser> = (
  requestBody
) =>
  callRequest(subPathUrl + "register", "POST", requestBody)
    .then((res: ResponseRegisterUser) => {
      document.cookie = `jwt=${res.token}; path=/; secure; samesite=strict`;
      return res.user;
    })
    .catch((err) => {
      console.log("AuthAPI", "registerUser", err);
      throw err;
    });

/** */

interface RequestLoginUser {
  email: string;
  password: string;
}

interface ResponseLoginUser {
  user: ApiUser;
  token: string;
}

const loginUser: RequestFunction<RequestLoginUser, ApiUser> = (requestBody) =>
  callRequest(subPathUrl + "login", "POST", requestBody)
    .then((res: ResponseLoginUser) => {
      document.cookie = `jwt=${res.token}; path=/; secure; samesite=strict`;
      return res.user;
    })
    .catch((err) => {
      console.error("AuthAPI", "loginUser", err);
      throw err;
    });

/** */

interface ResponseGetMe {
  user: ApiUser;
}

const getMe: RequestFunction<object, ApiUser> = () =>
  callRequest(subPathUrl + "me", "GET")
    .then((res: ResponseGetMe) => {
      return res.user;
    })
    .catch((err) => {
      console.error("AuthAPI", "getMe", err);
      throw err;
    });

export const AuthAPI = {
  registerUser,
  loginUser,
  getMe,
};
