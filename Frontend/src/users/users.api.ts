import { ApiUser } from "../types/users";
import { callRequest, RequestFunction } from "../utils/api";

const subPathUrl = "users/";

interface RequestLoadUser {
  id: number;
}

interface ResponseLoadUser {
  user: ApiUser;
}

const loadUser: RequestFunction<RequestLoadUser, ApiUser> = (
  requestBody
) =>
  callRequest(subPathUrl + "id", "GET", requestBody)
    .then((res: ResponseLoadUser) => {
      return res.user;
    })
    .catch((err) => {
      console.log("UsersAPI", "loadUser", err);
      throw err;
    });

const getMe: RequestFunction<{}, ApiUser> = (
) =>
  callRequest(subPathUrl + "me", "GET")
    .then((res: ResponseLoadUser) => {
      return res.user;
    })
    .catch((err) => {
      console.log("UsersAPI", "getMe", err);
      throw err;
    });

export const UsersAPI = {
  loadUser,
  getMe,
};
