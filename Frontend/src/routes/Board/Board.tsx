import React, { useEffect, useMemo, useRef } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { MdError } from "react-icons/md";
import {
  RouteObject,
  RouteProps,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { BoardsAPI } from "~/boards/boards.api";
import { ApiBoard } from "~/types/board";
import { useAppDispatch, useAppSelector } from "~/utils/hooks.store";
import { Dispatch } from "@reduxjs/toolkit";
import { BoardsActions } from "~/boards/boards.slice";
import styles from "./Board.module.scss";
import clsx from "clsx";
import Sortable from "sortablejs";
import { ListsActions } from "~/lists/lists.slice";
import { listsSelector } from "~/lists/lists.selector";
import { boardSelector } from "~/boards/boards.selector";
import { ListsAPI } from "~/lists/lists.api";
import { toast } from "react-toastify";
import { CardsAPI } from "~/cards/cards.api";

const Board: React.FC = () => {
  const id = useLoaderData() as number;
  // console.log(board);
  // const param = useParams()
  // const id = param.boardID;
  const cards = useAppSelector((state) => boardSelector(state, id)?.cards);
  console.log("bbb", cards)
  const listsMap = useAppSelector(listsSelector);
  const boardData = useMemo(() => {
    const cardList = cards ?? [];
    const listIDs = Array.from(listsMap.values())
      .filter((l) => l.boardID === id)
      .map((l) => l.id);
    return listIDs
      .map((lID) => ({
        list: listsMap.get(lID)!,
        cards: cardList
          .filter((c) => c.listID === lID)
          .sort((c1, c2) => c1.order - c2.order),
      }))
      .sort((l1, l2) => l1.list.order - l2.list.order);
  }, [cards, id, listsMap]);

  const BoardWrapperRef = useRef<HTMLDivElement>(null);
  const mainWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = BoardWrapperRef.current;
    const main = mainWrapperRef.current;
    if (!body || !main) return;

    const list = Sortable.create(main, {
      group: styles.List,
      sort: true,
      filter: "." + styles.AddCard,
      draggable: "." + styles.List,
      ghostClass: styles.Ghost,
      dragoverBubble: true,
    });

    // console.log(list.toArray())

    function initContent() {
      const dropzones = document.querySelectorAll<HTMLDivElement>(
        "." + styles.ListContent
      );

      for (const item of dropzones) {
        Sortable.create(item, {
          group: styles.Card,
          sort: true,
          draggable: "." + styles.Card,
          ghostClass: styles.Ghost,
        });
      }
    }

    initContent();

    const inputs = document.querySelectorAll<HTMLTextAreaElement>("textaread");

    for (const item of inputs) {
      item.addEventListener("blur", inputBlurHandler);
    }

    function inputBlurHandler(e: FocusEvent) {
      const elm = e.currentTarget as HTMLTextAreaElement;
      elm.classList.add("inactive");
      elm.disabled = true;
      elm.classList.remove("active");
      list.options.disabled = false;
    }

    body.addEventListener("click", bodyClickHandler);

    function bodyClickHandler(e: MouseEvent) {
      elMouseLeaveHandler(e);
      const el = e.target as HTMLTextAreaElement;
      const isCard = el.classList.contains(styles.Card);
      const isTitle = el.classList.contains(styles.ListTitle);
      const isInactive = el.classList.contains("inactive");
      const isEditable = el.classList.contains(styles.Editable);
      const editing = el.classList.contains(styles.Editing);

      if (isCard && isInactive) {
        list.options.disabled = true;
        el.disabled = false;
        el.classList.remove("inactive");
        el.classList.add("active");
        el.select();
      }

      if (isTitle && isInactive) {
        list.options.disabled = true;
        el.disabled = false;
        el.classList.remove("inactive");
        el.classList.add("active");
        el.select();
      }

      if (isEditable && !editing) {
        el.contentEditable = "true";
        el.focus();
        document.execCommand("selectAll", false, "");
        el.addEventListener("blur", elBlurHandler);
        el.addEventListener("keypress", elKeypressHandler);
        el.classList.add(styles.Editing);

        // console.log("trello baleeee");
        if (el.parentElement!.className === styles.AddList) {
          // el.parentElement!.className = "list initial";
          el.parentElement!.className = clsx(styles.List, "initial");
        }
      }
    }

    function elKeypressHandler(e: KeyboardEvent) {
      const el = e.target as HTMLTextAreaElement;
      if (e.key === "Enter") {
        e.preventDefault();
        el.blur();
      }

      if (el.classList.contains(styles.AddCard)) {
        el.classList.add("pending");
      }

      // console.log("trello tttt", el.parentElement?.className)
      if (el.parentElement!.className === clsx(styles.List, "initial")) {
        el.parentElement!.className = clsx(styles.List, "pending");
      }

      // el.removeEventListener('keypress', elKeypressHandler);
    }

    function elBlurHandler(e: FocusEvent) {
      const el = e.target as HTMLElement;
      el.contentEditable = "false";
      el.classList.remove(styles.Editing);

      if (el.classList.contains("pending")) {
        // el.className = "card removable editable";
        // console.log("trello end")
        const listID = Number(el.parentElement?.children[0]?.id.split("-")?.[1] ?? "");
        // console.log(el.parentElement);
        CardsAPI.createCard({
          card: {
            id: 1,
            boardID: id,
            creatorID: 1,
            title: el.innerText,
            description: "",
            listID,
            order: 1,
          },
        })
          .then((card) => {
            el.className = clsx(styles.Card, styles.Removable, styles.Editable);
            el.id = `card-${card.id}`;
            const newEl = document.createElement("div");
            // newEl.className = "add-card editable";
            newEl.className = clsx(styles.AddCard, styles.Editable);
            const text = document.createTextNode("Add another card");
            newEl.appendChild(text);
            el.parentNode!.appendChild(newEl);

            el.parentNode!.querySelector("." + styles.ListContent)!.appendChild(
              el
            );
          })
          .catch((err) => {
            toast.error("Some Problem occurred");
          });
      }

      if (el.parentElement!.className === clsx(styles.List, "initial")) {
        el.parentElement!.className = styles.AddList;
      }

      // console.log("trello", "trello", el)
      if (el.parentElement!.className === clsx(styles.List, "pending")) {
        ListsAPI.createList({
          list: { id: 1, title: el.innerText, boardID: id, order: 1 },
        })
          .then((list) => {
            el.parentElement!.className = styles.List;
            // el.className = "title removable editable";
            el.className = clsx(
              styles.ListTitle,
              styles.Removable,
              styles.Editable
            );
            el.id = `list-${list.id}`;
            const newContent = document.createElement("div");
            newContent.className = styles.ListContent;
            newContent.id = "listContent-" + list.id;
            el.parentElement!.appendChild(newContent);

            const newEl = document.createElement("div");
            // newEl.className = "add-card editable";
            newEl.className = clsx(styles.AddCard, styles.Editable);
            let text = document.createTextNode("Add another card");
            newEl.appendChild(text);
            el.parentNode!.appendChild(newEl);

            main!.appendChild(el.parentElement!);

            initContent();

            const addList = document.createElement("div");
            addList.className = styles.AddList;
            const title = document.createElement("div");
            // title.className = "title editable";
            title.className = clsx(styles.ListTitle, styles.Editable);
            text = document.createTextNode("Add another list");
            title.appendChild(text);
            addList.appendChild(title);
            body!.appendChild(addList);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Some Problem occurred");
          });
      }

      initDelete();
    }

    function initDelete() {
      const editables = document.querySelectorAll("." + styles.Editable);

      for (const item of editables) {
        item.addEventListener("mouseenter", elMouseEnterHandler);
        item.addEventListener("mouseleave", elMouseLeaveHandler);
      }
    }

    initDelete();

    function elMouseEnterHandler(e: Event) {
      const el = e.target as HTMLElement;
      const isRemovable = el.classList.contains(styles.Removable);
      const isCard = el.classList.contains(styles.Card);

      if (isRemovable) {
        const del = document.createElement("span");
        del.className = "del";
        del.innerHTML = "&times;";
        if (!isCard) {
          const listID = el.id.split("-")?.[1] ?? "";
          del.addEventListener("click", () =>
            ListsAPI.deleteList(Number(listID))
              .then((res) => {})
              .catch((err) => {
                console.log(err);
                toast.error("Some Problem occurred");
              })
          );
        } else {
          const cardID = el.id.split("-")?.[1] ?? "";
          del.addEventListener("click", () =>
            CardsAPI.deleteCard(Number(cardID))
              .then((res) => {})
              .catch((err) => {
                console.log(err);
                toast.error("Some Problem occurred");
              })
          );
        }

        el.appendChild(del);

        el.addEventListener("click", deleteHandler);
      }
    }

    function elMouseLeaveHandler(e: Event) {
      const target = e.target as HTMLElement;
      let del = target.querySelector("span");
      if (del) target.removeChild(del);
    }

    function deleteHandler(e: MouseEvent) {
      const target = e.target as HTMLElement;
      let parent = target.parentElement!;

      if (parent.classList.contains(styles.Card)) {
        parent.parentElement!.removeChild(parent);
      }

      if (parent.classList.contains(styles.ListTitle)) {
        parent.parentElement!.parentElement!.removeChild(parent.parentElement!);
      }
    }

    return () => {};
  }, []);

  console.log(boardData)

  return (
    <div className={styles.BoardWrapper} ref={BoardWrapperRef}>
      <div className={styles.ListsWrapper} ref={mainWrapperRef}>
        {boardData.map((data) => (
          <div key={data.list.id} className={styles.List}>
            <div
              className={clsx(
                styles.ListTitle,
                styles.Removable,
                styles.Editable
              )}
              id={"list-" + data.list.id}
            >
              {/* This is a list */}
              {data.list.title}
            </div>
            <div
              className={styles.ListContent}
              id={"listContent-" + data.list.id}
            >
              {data.cards.map((card) => (
                <div
                  key={card.id}
                  className={clsx(
                    styles.Card,
                    styles.Removable,
                    styles.Editable
                  )}
                  id={"card-" + card.id}
                >
                  {/* This is a card */}
                  {card.title}
                </div>
              ))}
            </div>
            <div className={clsx(styles.AddCard, styles.Editable)}>
              Add another card
            </div>
          </div>
        ))}
        {/*
        <div className={styles.List}>
          <div
            className={clsx(
              styles.ListTitle,
              styles.Removable,
              styles.Editable
            )}
          >
            Empty list
          </div>
          <div className={styles.ListContent}></div>
          <div className={clsx(styles.AddCard, styles.Editable)}>
            Add another card
          </div>
        </div> */}
      </div>

      <div className={styles.AddList}>
        <div
          className={clsx(
            styles.ListTitle,

            styles.Editable
          )}
        >
          Add another list
        </div>
      </div>
    </div>
  );
};

const getBoardRoute = (dispatch: Dispatch): RouteObject => ({
  path: "boards/:boardID",
  element: <Board />,
  loader: async ({ params }) => {
    const id = Number(params.boardID);
    if (!isNaN(id)) {
      return Promise.all([
        BoardsAPI.loadAllListsByBoardID(id).then((lists) => {
          dispatch(ListsActions.setLists(lists));
          return lists;
        }),
        BoardsAPI.loadBoard(id).then((board) => {
          dispatch(BoardsActions.setBoards([board]));
          return board;
        }),
      ]).then(() => id);
    }
  },
  errorElement: <MdError color="#fff" />,
});

export { Board, getBoardRoute };
