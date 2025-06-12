import MainRouterProvider from "./routers/MainRouterProviders.jsx";
import { Toolkit } from "./store/Toolkit.jsx";

function App() {
  return (
    <Toolkit>
      <MainRouterProvider />
    </Toolkit>
  );
}

export default App;
