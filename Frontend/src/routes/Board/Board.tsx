import React, { useEffect, useMemo, useRef } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { MdError } from "react-icons/md";
import { RouteObject, RouteProps, useLoaderData } from "react-router-dom";
import { BoardsAPI } from "~/boards/boards.api";
import { ApiBoard } from "~/types/board";
import { useAppDispatch } from "~/utils/hooks.store";
import { Dispatch } from "@reduxjs/toolkit";
import { BoardsActions } from "~/boards/boards.slice";
import styles from "./Board.module.scss";
import clsx from "clsx";
import Sortable from "sortablejs";

const Board: React.FC = () => {
  const board = useLoaderData() as ApiBoard;
  // console.log(board);
  const data = useMemo(() => {}, []);
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
        el.className = clsx(styles.Card, styles.Removable, styles.Editable);
        let newEl = document.createElement("div");
        // newEl.className = "add-card editable";
        newEl.className = clsx(styles.AddCard, styles.Editable);
        let text = document.createTextNode("Add another card");
        newEl.appendChild(text);
        el.parentNode!.appendChild(newEl);

        el.parentNode!.querySelector("." + styles.ListContent)!.appendChild(el);
      }

      if (el.parentElement!.className === clsx(styles.List, "initial")) {
        el.parentElement!.className = styles.AddList;
      }

      // console.log("trello", "trello", el)
      if (el.parentElement!.className === clsx(styles.List, "pending")) {
        el.parentElement!.className = styles.List;
        // el.className = "title removable editable";
        el.className = clsx(
          styles.ListTitle,
          styles.Removable,
          styles.Editable
        );
        const newContent = document.createElement("div");
        newContent.className = styles.ListContent;
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

      if (isRemovable) {
        const del = document.createElement("span");
        del.className = "del";
        del.innerHTML = "&times;";
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
      const target = e.target as HTMLElement
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

  return (
    <div className={styles.BoardWrapper} ref={BoardWrapperRef}>
      <div className={styles.ListsWrapper} ref={mainWrapperRef}>
        <div className={styles.List}>
          <div
            className={clsx(
              styles.ListTitle,
              styles.Removable,
              styles.Editable
            )}
          >
            This is a list
          </div>
          <div className={styles.ListContent}>
            <div
              className={clsx(styles.Card, styles.Removable, styles.Editable)}
            >
              This is a card
            </div>
            <div
              className={clsx(styles.Card, styles.Removable, styles.Editable)}
            >
              This is a card
            </div>
            <div
              className={clsx(styles.Card, styles.Removable, styles.Editable)}
            >
              This is a card
            </div>
            <div
              className={clsx(styles.Card, styles.Removable, styles.Editable)}
            >
              This is a card
            </div>
            <div
              className={clsx(styles.Card, styles.Removable, styles.Editable)}
            >
              This is a card
            </div>{" "}
            <div
              className={clsx(styles.Card, styles.Removable, styles.Editable)}
            >
              This is a card
            </div>
            <div
              className={clsx(styles.Card, styles.Removable, styles.Editable)}
            >
              This is a card
            </div>
            <div
              className={clsx(styles.Card, styles.Removable, styles.Editable)}
            >
              Look, another card!
            </div>
          </div>
          <div className={clsx(styles.AddCard, styles.Editable)}>
            Add another card
          </div>
        </div>
        <div className={styles.List}>
          <div
            className={clsx(
              styles.ListTitle,
              styles.Removable,
              styles.Editable
            )}
          >
            Another list
          </div>
          <div className={styles.ListContent}>
            <div
              className={clsx(styles.Card, styles.Removable, styles.Editable)}
            >
              Hello world!
            </div>
          </div>
          <div className={clsx(styles.AddCard, styles.Editable)}>
            Add another card
          </div>
        </div>
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
        </div>
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
      return BoardsAPI.loadBoard(id).then((board) => {
        dispatch(BoardsActions.setBoards([board]));
        return board;
      });
    }
  },
  errorElement: <MdError color="#fff" />,
});

export { Board, getBoardRoute };
