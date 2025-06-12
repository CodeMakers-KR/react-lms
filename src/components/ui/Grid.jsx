import { useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./Grid.module.css";

export const Grid = ({
  ref,
  checkable = false,
  checkValue,
  title = "",
  columnStyle,
  header = [],
  content = [],
  footer,
  style = {},
  className = "",
  editable = false,
  clickableColumn = {},
  onChange = () => {},
}) => {
  const columnWidth = columnStyle ?? header.map(() => "1fr").join(" ");

  const [editCount, setEditCount] = useState(0);

  const contentLength = content.length;
  const gridItemRef = useRef(
    Array.from({ length: contentLength }, () => new Array())
  );
  const checkboxRef = useRef(Array.from({ length: contentLength }));
  const allCheckRef = useRef();

  useImperativeHandle(ref, () => ({
    getChecked() {
      if (checkable && checkValue) {
        return checkboxRef.current.filter((r) => r.checked).map((r) => r.value);
      }
    },
    allCheck() {
      if (checkable && checkValue) {
        allCheckRef.current.click();
      }
    },
  }));

  const headerMouseEnterHandler = (event) => {
    let index = parseInt(event.target.dataset.index);

    gridItemRef.current?.forEach((r) => {
      r[index].style.backgroundColor = "#f3f3f3";
    });
  };
  const headerMouseLeaveHandler = (event) => {
    let index = event.target.dataset.index;
    gridItemRef.current?.forEach((r) => {
      r[index].style.backgroundColor = "";
    });
  };

  const contentMouseEnterHandler = (event) => {
    const rowIndex = event.target.dataset.rowIndex;
    gridItemRef.current[rowIndex]?.forEach((r) => {
      r.style.backgroundColor = "#f3f3f3";
    });
  };

  const contentMouseLeaveHandler = (event) => {
    const rowIndex = event.target.dataset.rowIndex;
    gridItemRef.current[rowIndex]?.forEach((r) => {
      r.style.backgroundColor = "";
    });
  };

  const items = [];

  content.forEach((item, rowIndex) => {
    if (checkable && checkValue) {
      items.push(
        <li
          key={`${item[rowIndex][checkValue]}_check`}
          ref={(element) => (gridItemRef.current[rowIndex][0] = element)}
          data-key={`${item[rowIndex][checkValue]}_check`}
          data-row-index={rowIndex}
          className="item"
          onMouseEnter={contentMouseEnterHandler}
          onMouseLeave={contentMouseLeaveHandler}
          style={{
            borderBottom:
              rowIndex < contentLength - 1 ? "1px dashed #e4e4e4" : 0,
            padding: "10px",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          <input
            type="checkbox"
            value={item[rowIndex][checkValue]}
            style={{ margin: "0" }}
            ref={(element) => (checkboxRef.current[rowIndex] = element)}
            onChange={() => {
              const checkboxCount = checkboxRef.current.length;
              const checkedCount = checkboxRef.current.filter(
                (r) => r.checked
              ).length;
              allCheckRef.current.checked = checkboxCount === checkedCount;
            }}
          />
        </li>
      );
    }
    item.forEach((content, index) => {
      items.push(
        <Itembox
          key={`${rowIndex}_${content.id}_${index}`}
          ref={(element) =>
            (gridItemRef.current[rowIndex][
              checkable && checkValue ? index + 1 : index
            ] = element)
          }
          rowIndex={rowIndex}
          content={content}
          index={index}
          contentLength={contentLength}
          editable={editable}
          editCount={editCount}
          checkable={checkable && checkValue}
          setEditCount={setEditCount}
          onChange={onChange}
          clickable={Object.prototype.hasOwnProperty.call(
            clickableColumn,
            index
          )}
          onClickClickable={clickableColumn[index]}
          onMouseEnter={contentMouseEnterHandler}
          onMouseLeave={contentMouseLeaveHandler}
        />
      );
    });
  });

  return (
    <div className={className} style={style}>
      <h3 className={styles.title}>{title}</h3>
      <ul
        className={styles.grid}
        style={{
          gridTemplateColumns:
            checkable && checkValue ? "50px " + columnWidth : columnWidth,
        }}
      >
        {checkable && checkValue && (
          <li
            className={styles.gridColumn}
            data-index={0}
            onMouseEnter={headerMouseEnterHandler}
            onMouseLeave={headerMouseLeaveHandler}
          >
            <input
              type="checkbox"
              ref={allCheckRef}
              style={{ margin: "0" }}
              onChange={() => {
                checkboxRef.current.forEach(
                  (r) => (r.checked = allCheckRef.current.checked)
                );
              }}
            />
          </li>
        )}
        {header.map((item, index) => (
          <li
            key={item.id}
            className={styles.gridColumn}
            data-index={checkable && checkValue ? index + 1 : index}
            style={{
              borderLeft:
                (checkable && checkValue ? index + 1 : index) > 0
                  ? "1px dashed #e4e4e4"
                  : "0",
            }}
            onMouseEnter={headerMouseEnterHandler}
            onMouseLeave={headerMouseLeaveHandler}
          >
            {item.title}
          </li>
        ))}
        {items}
      </ul>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

const Itembox = ({
  ref,
  rowIndex,
  content,
  index,
  contentLength,
  editable,
  editCount,
  checkable,
  setEditCount,
  clickable = false,
  onClickClickable = () => {},
  onChange,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  const editBoxRef = useRef();
  const [visibleTextbox, setVisibleTextbox] = useState(false);

  const doubleClickHandler = () => {
    if (!editable || editCount > 0 || clickable) {
      return;
    }
    setEditCount(1);
    setVisibleTextbox(true);
  };

  const [hover, setHover] = useState(false);
  const hoverHandler = () => {
    if (clickable) {
      setHover(true);
    }
  };
  const houtHandler = () => {
    if (clickable) {
      setHover(false);
    }
  };

  return (
    <li
      ref={ref}
      data-row-index={rowIndex}
      data-id={content.id}
      data-index={index}
      data-key={`${rowIndex}_${content.id}`}
      data-row={`${styles.grid}_${rowIndex}`}
      className="item"
      data-default-text={content.value}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDoubleClick={doubleClickHandler}
      style={{
        borderLeft:
          (checkable ? index + 1 : index) > 0 ? "1px dashed #e4e4e4" : "0",
        borderBottom: rowIndex < contentLength - 1 ? "1px dashed #e4e4e4" : 0,
        padding: visibleTextbox ? 0 : "10px",
        display: visibleTextbox ? "flex" : "inline-block",
      }}
    >
      {visibleTextbox ? (
        <Editbox
          defaultText={content.value}
          ref={editBoxRef}
          onSave={() => {
            onChange(rowIndex, index, editBoxRef.current.value);
            setVisibleTextbox(false);
            setEditCount(0);
          }}
          onCancel={() => {
            setVisibleTextbox(false);
            setEditCount(0);
          }}
        />
      ) : (
        <div
          onMouseEnter={hoverHandler}
          onMouseOut={houtHandler}
          style={{
            cursor: clickable ? "pointer" : "default",
            color: hover ? "#888" : "#333",
            textDecoration: hover ? "underline" : "none",
          }}
          onClick={onClickClickable.bind(this, content.value)}
        >
          {content.value}
        </div>
      )}
    </li>
  );
};

const Editbox = ({ defaultText, ref, onSave, onCancel }) => {
  useEffect(() => {
    ref.current.focus();
  }, [ref]);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <input
        type="text"
        defaultValue={defaultText}
        ref={ref}
        style={{
          flexGrow: 1,
          outline: 0,
          paddingLeft: "10px",
          border: 0,
          backgroundColor: "#DDF",
        }}
      />
      <button
        type="button"
        onClick={onSave}
        style={{
          flexBasis: "30px",
          flexShrink: 0,
          outline: 0,
          border: 0,
          backgroundColor: "#45F",
          color: "#FFF",
        }}
      >
        OK
      </button>
      <button
        type="button"
        onClick={onCancel}
        style={{
          flexBasis: "30px",
          flexShrink: 0,
          outline: 0,
          border: 0,
          backgroundColor: "#F45",
          color: "#FFF",
        }}
      >
        X
      </button>
    </div>
  );
};
