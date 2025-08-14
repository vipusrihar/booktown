import { BrowserRouter} from "react-router-dom";
import AppContent from "./AppContent";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "./state/authentication/authSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      dispatch(loginSuccess(authData)); 
    }
  }, []);

  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  );
}

export default App;
