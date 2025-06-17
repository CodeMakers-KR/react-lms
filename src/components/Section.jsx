export const Section = ({ title, children, fixed = false, style }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "2rem",
        paddingTop: 0,
        margin: "1rem 0",
        height: fixed ? "100%" : "auto",
        overflow: fixed ? "auto" : "visible",
        ...style,
      }}
    >
      <h3
        style={{
          margin: "0",
          padding: "2rem 0 1rem 0",
          backgroundColor: "#fff",
          position: fixed ? "sticky" : "static",
          top: 0,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
};
