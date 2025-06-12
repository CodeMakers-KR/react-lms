import { NavLink } from "react-router-dom";

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
