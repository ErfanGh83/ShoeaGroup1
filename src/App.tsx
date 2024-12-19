import Shoea from "./pages/shoea.page";
import { ToastContainer } from "react-toastify";
import QueryProvider from "./providers/QueryProvider";

function App() {
  return (
    <div className="overflow-hidden">
      <QueryProvider>
      <ToastContainer/>
      <Shoea />
      </QueryProvider>
    </div>
  );
}

export default App;
