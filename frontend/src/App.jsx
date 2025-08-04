import "./App.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/homepage",
      element: (
        <ProtectedRoutes>
          <Homepage />
        </ProtectedRoutes>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
