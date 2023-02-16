import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { RequireAuth } from "react-auth-kit";
import { useSelector } from "react-redux";

function App() {
  const themeState = useSelector((state) => state.user.theme);

  const styles = {
    app: `w-full text-center h-screen p-10 duration-500 ${
      themeState ? "bg-gray-100" : "bg-gray-700"
    }`,
    h1: `text-red-500 p-2 text-lg`,
  };

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/*" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth loginPath="/signin">
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
