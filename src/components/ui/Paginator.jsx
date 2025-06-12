import styles from "./Paginator.module.css";

export const Paginator = ({
  id,
  start,
  countPerPageGroup = 10,
  activePage,
  setActivePage,
  totalPageCount,
}) => {
  const pageClickHandler = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const pageList = [];
  if (start / countPerPageGroup >= 1) {
    pageList.push(
      <li key={`page_${id}_0`} onClick={pageClickHandler.bind(this, 0)}>
        처음
      </li>
    );
    pageList.push(
      <li
        key={`page_prev_${id}_${start - countPerPageGroup}`}
        onClick={pageClickHandler.bind(this, start - countPerPageGroup)}
      >
        이전
      </li>
    );
  }
  let end = start + countPerPageGroup;
  if (end > totalPageCount) {
    end = totalPageCount;
  }
  for (let i = start; i < end; i++) {
    pageList.push(
      <li
        key={`page_${id}_${i}`}
        className={`${activePage === i ? styles.active : ""}`}
        onClick={pageClickHandler.bind(this, i)}
      >
        {i + 1}
      </li>
    );
  }
  if (end < totalPageCount) {
    pageList.push(
      <li key={`page_${id}_${end}`} onClick={pageClickHandler.bind(this, end)}>
        다음
      </li>
    );
    pageList.push(
      <li
        key={`page_${id}_${totalPageCount}`}
        onClick={pageClickHandler.bind(this, totalPageCount - 1)}
      >
        마지막
      </li>
    );
  }

  return <ul className={styles.pageList}>{pageList}</ul>;
};
