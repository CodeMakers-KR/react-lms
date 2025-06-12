import { useImperativeHandle, useRef, useState } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { Button } from "./input/Input";

export const Alert = ({
  ref,
  title,
  content,
  draggable = false,
  children,
  buttonText = "OK",
  onBeforeLoad = () => {},
  onClickOk = () => {},
}) => {
  const [down, setDown] = useState(false);
  const [open, setOpen] = useState(false);

  const style = { display: open ? "flex" : "none" };

  const mouseDownHandler = () => {
    if (!draggable) {
      return;
    }
    alertRef.current.style.position = "absolute";
    setDown(true);
  };
  const mouseUpHandler = () => {
    if (!draggable) {
      return;
    }

    setDown(false);
  };
  const mouseMoveHandler = (event) => {
    if (!draggable) {
      return;
    }

    if (down) {
      const offsetTop = alertRef.current.offsetTop;
      const offsetLeft = alertRef.current.offsetLeft;

      alertRef.current.style.top = `${offsetTop + event.movementY}px`;
      alertRef.current.style.left = `${offsetLeft + event.movementX}px`;
    }
  };

  const clickHandler = () => {
    onClickOk();
    setOpen(false);
    alertRef.current.style.position = "";
    alertRef.current.style.top = "";
    alertRef.current.style.left = "";
  };

  const alertRef = useRef();
  useImperativeHandle(ref, () => ({
    open() {
      onBeforeLoad();
      setOpen(true);
    },
    close() {
      clickHandler();
      setOpen(false);
      alertRef.current.style.position = "";
      alertRef.current.style.top = "";
      alertRef.current.style.left = "";
    },
  }));

  return createPortal(
    <div className={styles.modalWrapper} style={style}>
      <div
        className={`${styles.alert}`}
        ref={alertRef}
        style={{
          cursor: draggable ? (down ? "grabbing" : "grab") : "default",
        }}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={mouseUpHandler}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children ?? content}</div>
        <div className={styles.buttonGroup}>
          <Button
            text={buttonText}
            className="positive"
            onClick={clickHandler}
          />
        </div>
      </div>
    </div>,
    document.querySelector("#modals")
  );
};

export const Confirm = ({
  ref,
  title,
  content,
  draggable = false,
  children,
  positiveButtonText = "Ok",
  negativeButtonText = "Cancel",
  onBeforeLoad = () => {},
  onClickPositive = () => {},
  onClickNegative = () => {},
}) => {
  const [down, setDown] = useState(false);
  const [open, setOpen] = useState(false);

  const style = { display: open ? "flex" : "none" };

  const mouseDownHandler = () => {
    if (!draggable) {
      return;
    }
    alertRef.current.style.position = "absolute";
    setDown(true);
  };
  const mouseUpHandler = () => {
    if (!draggable) {
      return;
    }

    setDown(false);
  };
  const mouseMoveHandler = (event) => {
    if (!draggable) {
      return;
    }

    if (down) {
      const offsetTop = alertRef.current.offsetTop;
      const offsetLeft = alertRef.current.offsetLeft;

      alertRef.current.style.top = `${offsetTop + event.movementY}px`;
      alertRef.current.style.left = `${offsetLeft + event.movementX}px`;
    }
  };

  const clickPositiveHandler = () => {
    setOpen(false);
    alertRef.current.style.position = "";
    alertRef.current.style.top = "";
    alertRef.current.style.left = "";
    onClickPositive();
  };

  const clickNegativeHandler = () => {
    setOpen(false);
    alertRef.current.style.position = "";
    alertRef.current.style.top = "";
    alertRef.current.style.left = "";
    onClickNegative();
  };

  const alertRef = useRef();
  useImperativeHandle(ref, () => ({
    open() {
      onBeforeLoad();
      setOpen(true);
    },
    close() {
      setOpen(false);
      alertRef.current.style.position = "";
      alertRef.current.style.top = "";
      alertRef.current.style.left = "";
    },
  }));

  return createPortal(
    <div className={styles.modalWrapper} style={style}>
      <div
        className={`${styles.alert}`}
        ref={alertRef}
        style={{
          cursor: draggable ? (down ? "grabbing" : "grab") : "default",
        }}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={mouseUpHandler}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children ?? content}</div>
        <div className={styles.buttonGroup}>
          <Button
            text={positiveButtonText}
            className="positive"
            onClick={clickPositiveHandler}
          />
          <Button
            text={negativeButtonText}
            className="negative"
            onClick={clickNegativeHandler}
          />
        </div>
      </div>
    </div>,
    document.querySelector("#modals")
  );
};
