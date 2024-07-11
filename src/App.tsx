import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Home from "./pages/home/home";
import PersistLogin from "./components/auth/persist-login";
import RequireAuth from "./components/auth/require-auth";
import { ChatProvider } from "./context/chat-provider";

export default function App() {
  const router = createBrowserRouter([
    {
      element: <PersistLogin />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          element: <RequireAuth />,
          children: [
            {
              path: "/",
              element: (
                <ChatProvider>
                  <Home />
                </ChatProvider>
              ),
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
