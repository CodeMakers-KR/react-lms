export const CardList = ({ cards, ellipsisLine, lineHeight }) => (
  <ul className="card-list list horizontal-list">
    {cards.map((card) => (
      <Card
        key={card.id}
        {...card}
        ellipsisLine={ellipsisLine}
        lineHeight={lineHeight}
      />
    ))}
  </ul>
);

export const Card = ({
  img,
  title,
  content,
  style = {},
  ellipsisLine = 1,
  lineHeight = 1.5,
}) => {
  return (
    <li className="card" style={style}>
      {img && <img className="card-img" src={img} alt={title} />}
      <div
        className="card-desc"
        style={{
          top: img ? "235px" : "10px",
        }}
      >
        <h3 className="card-title">{title}</h3>
        <div
          className={`card-content ${img ? "ellipsis" : ""}`}
          style={
            img
              ? {
                  WebkitLineClamp: ellipsisLine,
                  lineHeight: `${lineHeight}em`,
                  maxHeight: `${ellipsisLine * lineHeight}em`,
                }
              : {
                  height: "90%",
                }
          }
        >
          {content}
        </div>
      </div>
    </li>
  );
};
