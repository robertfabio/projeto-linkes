import { createBrowserRouter} from "react-router-dom"
import Admin from "./pages/admin"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import SocialMedias from "./pages/socialmedias"
import NotFound from "./pages/notfound"


import { Private } from "./routes/Private"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <Private><Admin /></Private>,
  },
  {
    path: "/social",
    element: <Private><SocialMedias /></Private>,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export { router };
