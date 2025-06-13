export const Form = ({ ref, children, onSubmit = () => {} }) => {
  return (
    <form
      autoComplete="off"
      ref={ref}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
};
