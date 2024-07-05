import { ApiUser } from "../types/users";
import { callRequest, RequestFunction } from "../utils/api";

const subPathUrl = "users/";

interface ResponseLoadUser {
  user: ApiUser;
}

const loadUser: RequestFunction<number, ApiUser> = (id) =>
  callRequest(subPathUrl + id, "GET")
    .then((res: ResponseLoadUser) => {
      return res.user;
    })
    .catch((err) => {
      console.error("UsersAPI", "loadUser", err);
      throw err;
    });

export const UsersAPI = {
  loadUser,
};
