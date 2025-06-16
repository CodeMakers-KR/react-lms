export const Form = ({ ref, children, onSubmit = () => {} }) => {
  return (
    <form
      ref={ref}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input name="tempId" style={{ display: "none" }} aria-hidden="true" />
      <input
        name="tempId2"
        type="password"
        style={{ display: "none" }}
        aria-hidden="true"
      />
      {children}
    </form>
  );
};
