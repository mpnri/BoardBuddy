import { ApiBoard } from "../types/board";
import { callRequest, RequestFunction } from "../utils/api";

const subPathUrl = "boards/";

//* LoadBoard

interface ResponseLoadBoard {
  board: ApiBoard;
}

const loadBoard: RequestFunction<number, ApiBoard> = (id: number) =>
  callRequest(subPathUrl + id, "GET")
    .then((res: ResponseLoadBoard) => {
      return res.board;
    })
    .catch((err) => {
      console.error("BoardsAPI", "loadBoard", err);
      throw err;
    });

// //* LoadAllBoard

// interface ResponseLoadAllBoard {
//   boards: ApiBoard[];
// }

// const loadAllBoard: RequestFunction<object, ApiBoard[]> = () =>
//   callRequest(subPathUrl, "GET")
//     .then((res: ResponseLoadAllBoard) => {
//       return res.boards;
//     })
//     .catch((err) => {
//       console.error("BoardsAPI", "loadAllBoard", err);
//       throw err;
//     });

//* CreateBoard

interface RequestCreateBoard {
  name: string;
  workspaceID: number;
}

interface ResponseCreateBoard {
  board: ApiBoard;
}

const createBoard: RequestFunction<RequestCreateBoard, ApiBoard> = (
  body
) =>
  callRequest(subPathUrl, "POST", body)
    .then((res: ResponseCreateBoard) => {
      return res.board;
    })
    .catch((err) => {
      console.error("BoardsAPI", "createBoard", err);
      throw err;
    });

export const BoardsAPI = {
  loadBoard,
  // loadAllBoard,
  createBoard,
};
