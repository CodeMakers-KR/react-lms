export const Section = ({ title, children }) => {
  return (
    <div style={{ backgroundColor: "#fff", padding: "2rem", margin: "1rem 0" }}>
      <h3 style={{ marginTop: "0" }}>{title}</h3>
      {children}
    </div>
  );
};
