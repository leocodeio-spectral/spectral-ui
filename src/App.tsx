import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "@/routes/Landing";
import NotFound from "./routes/error/NotFound";
import AuthLayout from "./routes/auth/AuthLayout";
import Signup from "./routes/auth/Signup";
import Signin from "./routes/auth/Signin";
import AuthIndex from "./routes/auth/AuthIndex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <AuthIndex /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
    ],
  },
  {
    path: "*",
    loader: () => {
      throw new Response("Not found", { status: 404 });
    },
    errorElement: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
