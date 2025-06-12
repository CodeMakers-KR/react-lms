import { NavLink } from "react-router-dom";
import styles from "./List.module.css";
import { useState } from "react";
export const Arrow = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height="30px"
      viewBox="0 -960 960 960"
      width="30px"
      fill="#FFF"
    >
      <path d="M522-480 333-669l51-51 240 240-240 240-51-51 189-189Z" />
    </svg>
  );
};

export const FoldableList = ({ list }) => {
  return (
    <div className={styles.foldableList}>
      <h4 className={styles.foldableListTitle}>{list.group}</h4>
      <ul className={styles.foldableListItem}>
        {list?.groupItem?.map(({ id, title, subItems, spread }) => (
          <FoldableListItem
            key={id}
            title={title}
            subItems={subItems}
            isSpread={spread}
          />
        ))}
      </ul>
    </div>
  );
};

const FoldableListItem = ({ title, subItems, isSpread = false }) => {
  const [spread, setSpread] = useState(isSpread);

  return (
    <li style={{ overflow: "hidden" }}>
      <div
        className={styles.foldableListItemTitle}
        onClick={() => {
          setSpread((prev) => !prev);
        }}
      >
        <Arrow
          className={
            spread ? styles.foldableSpreadRotated : styles.foldableSpread
          }
        />
        <h2>{title}</h2>
      </div>
      {subItems && (
        <ul
          className={
            spread
              ? styles.foldableListSubItemsSpread
              : styles.foldableListSubItemsFold
          }
        >
          {subItems.map(({ id, title, to }) => (
            <li key={id} className={styles.foldableListItem}>
              <NavLink to={to}>{title}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export const List = ({ items, className, itemClassName }) => {
  return (
    <ul className={className}>
      {items.map((item) => (
        <ListItem key={item?.id} className={itemClassName}>
          {item?.html}
        </ListItem>
      ))}
    </ul>
  );
};
export const ListItem = ({ className, children }) => {
  return <li className={className}>{children}</li>;
};

export const NavList = ({ items, className, itemClassName }) => {
  if (!items) {
    return <ul></ul>;
  }
  return (
    <ul className={className}>
      {items.map((item) => (
        <NavListItem key={item.id} className={itemClassName} to={item.to}>
          {item.html}
        </NavListItem>
      ))}
    </ul>
  );
};
export const NavListItem = ({ className, children, to }) => {
  return (
    <li className={className}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
};
