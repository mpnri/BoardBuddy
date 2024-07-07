import { ApiCard } from "~/types/card";
import { callRequest, RequestFunction } from "../utils/api";

const subPathUrl = "cards/";

//* LoadCard

// interface ResponseLoadCard {
//   card: ApiCard;
// }

// const loadCard: RequestFunction<number, ApiCard> = (id: number) =>
//   callRequest(subPathUrl + id, "GET")
//     .then((res: ResponseLoadCard) => {
//       return res.card;
//     })
//     .catch((err) => {
//       console.error("CardsAPI", "loadCard", err);
//       throw err;
//     });

// //* LoadAllCard

// interface ResponseLoadAllCard {
//   cards: ApiCard[];
// }

// const loadAllCard: RequestFunction<object, ApiCard[]> = () =>
//   callRequest(subPathUrl, "GET")
//     .then((res: ResponseLoadAllCard) => {
//       return res.cards;
//     })
//     .catch((err) => {
//       console.error("CardsAPI", "loadAllCard", err);
//       throw err;
//     });

//* CreateCard

interface RequestCreateCard {
  card: ApiCard;
}

interface ResponseCreateCard {
  card: ApiCard;
}

const createCard: RequestFunction<RequestCreateCard, ApiCard> = (body) =>
  callRequest(subPathUrl, "POST", body)
    .then((res: ResponseCreateCard) => {
      return res.card;
    })
    .catch((err) => {
      console.error("CardsAPI", "createCard", err);
      throw err;
    });

// interface ResponseLoadAllCardsByCardID {
//   cards: ApiCard[];
// }
// //* LoadAllCardsByCardID
// const loadAllCardsByCardID: RequestFunction<number, ApiCard[]> = (id) =>
//   callRequest(subPathUrl + id + "/cards", "GET")
//     .then((res: ResponseLoadAllCardsByCardID) => {
//       return res.cards;
//     })
//     .catch((err) => {
//       console.error("CardsAPI", "loadAllCardsByCardID", err);
//       throw err;
//     });

const deleteCard: RequestFunction<number, string> = (id) =>
  callRequest(subPathUrl + id, "DELETE")
    .then((res: string) => {
      return res;
    })
    .catch((err) => {
      console.error("CardsAPI", "deleteCard", err);
      throw err;
    });

export const CardsAPI = {
  // loadCard,
  // loadAllCard,
  createCard,
  deleteCard,

  // loadAllCardsByCardID,
};
