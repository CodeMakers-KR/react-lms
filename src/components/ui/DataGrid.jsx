import { useRef, useState } from "react";
import styles from "./Grid.module.css";

export const DataGrid = ({
  title,
  headers,
  contents = [],
  checkable = false,
  checkValue,
  clickEvents = {},
  columnStyle,
  className = "",
  style = {},
}) => {
  const columnWidth = columnStyle ?? headers.map(() => "1fr").join(" ");
  const gridItemRef = useRef();
  gridItemRef.current = Array.from(
    { length: contents.length },
    () => new Array()
  );

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

  return (
    <div className={className} style={style}>
      <h3 className={styles.title}>{title}</h3>
      <ul
        className={styles.grid}
        style={{
          position: "relative",
          gridTemplateColumns:
            checkable && checkValue ? "50px " + columnWidth : columnWidth,
        }}
      >
        <DataGridHeader
          headers={headers}
          onMouseEnter={headerMouseEnterHandler}
          onMouseLeave={headerMouseLeaveHandler}
        />

        {contents.map((eachContent, rowIndex) => (
          <DataGridContent
            key={eachContent.id}
            rowRef={gridItemRef}
            rowIndex={rowIndex}
            eachContent={eachContent}
            headers={headers}
            clickEvents={clickEvents}
            onMouseEnter={contentMouseEnterHandler}
            onMouseLeave={contentMouseLeaveHandler}
          />
        ))}
      </ul>
    </div>
  );
};

const DataGridHeader = ({
  headers,
  checkable,
  checkValue,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <>
      {headers.map((item, index) => (
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
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {item.title}
        </li>
      ))}
    </>
  );
};

const DataGridContent = ({
  rowRef,
  rowIndex,
  eachContent,
  headers,
  clickEvents = {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  return (
    <>
      {headers.map(({ id: contentKey }, index) => (
        <Itembox
          key={`${rowIndex}_${index}`}
          itemRef={rowRef}
          rowIndex={rowIndex}
          index={index}
          contentLength={headers.length}
          content={eachContent[contentKey]}
          rawContent={eachContent}
          clickable={Object.prototype.hasOwnProperty.call(
            clickEvents,
            contentKey
          )}
          onClick={clickEvents[contentKey]}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </>
  );
};

const Itembox = ({
  itemRef,
  rowIndex,
  content,
  rawContent,
  index,
  contentLength,
  checkable,
  clickable = false,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
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
      ref={(element) => {
        itemRef.current[rowIndex][checkable ? index + 1 : index] = element;
      }}
      className="item"
      data-row-index={rowIndex}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        borderLeft:
          (checkable ? index + 1 : index) > 0 ? "1px dashed #e4e4e4" : "0",
        borderBottom: rowIndex < contentLength - 1 ? "1px dashed #e4e4e4" : 0,
        padding: "10px",
        display: "inline-block",
      }}
    >
      <div
        onMouseEnter={hoverHandler}
        onMouseOut={houtHandler}
        style={{
          cursor: clickable ? "pointer" : "default",
          color: hover ? "#888" : "#333",
          textDecoration: hover ? "underline" : "none",
        }}
        onClick={onClick.bind(this, content, rawContent)}
      >
        {content}
      </div>
    </li>
  );
};
