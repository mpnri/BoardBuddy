import { ApiList } from "~/types/list";
import { callRequest, RequestFunction } from "../utils/api";

const subPathUrl = "lists/";

//* LoadList

// interface ResponseLoadList {
//   list: ApiList;
// }

// const loadList: RequestFunction<number, ApiList> = (id: number) =>
//   callRequest(subPathUrl + id, "GET")
//     .then((res: ResponseLoadList) => {
//       return res.list;
//     })
//     .catch((err) => {
//       console.error("ListsAPI", "loadList", err);
//       throw err;
//     });

// //* LoadAllList

// interface ResponseLoadAllList {
//   lists: ApiList[];
// }

// const loadAllList: RequestFunction<object, ApiList[]> = () =>
//   callRequest(subPathUrl, "GET")
//     .then((res: ResponseLoadAllList) => {
//       return res.lists;
//     })
//     .catch((err) => {
//       console.error("ListsAPI", "loadAllList", err);
//       throw err;
//     });

//* CreateList

interface RequestCreateList {
  list: ApiList;
}

interface ResponseCreateList {
  list: ApiList;
}

const createList: RequestFunction<RequestCreateList, ApiList> = (body) =>
  callRequest(subPathUrl, "POST", body)
    .then((res: ResponseCreateList) => {
      return res.list;
    })
    .catch((err) => {
      console.error("ListsAPI", "createList", err);
      throw err;
    });

// interface ResponseLoadAllListsByListID {
//   lists: ApiList[];
// }
// //* LoadAllListsByListID
// const loadAllListsByListID: RequestFunction<number, ApiList[]> = (id) =>
//   callRequest(subPathUrl + id + "/lists", "GET")
//     .then((res: ResponseLoadAllListsByListID) => {
//       return res.lists;
//     })
//     .catch((err) => {
//       console.error("ListsAPI", "loadAllListsByListID", err);
//       throw err;
//     });

const deleteList: RequestFunction<number, string> = (id) =>
  callRequest(subPathUrl + id, "DELETE")
    .then((res: string) => {
      return res;
    })
    .catch((err) => {
      console.error("ListsAPI", "deleteList", err);
      throw err;
    });

export const ListsAPI = {
  // loadList,
  // loadAllList,
  createList,
  deleteList,

  // loadAllListsByListID,
};
