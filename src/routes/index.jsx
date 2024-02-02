import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "~/layouts/main";
import AdminLayout from "~/layouts/admin";

// Pages
import Home from "~/pages/home";
import NotFound from "~/pages/not-found";
import Game from "~/pages/game";
import Results from "~/pages/results";
import Leaderboards from "~/pages/leaderboards";

// Admin Pages
import AdminHome from "~/admin/home";
import AdminUsers from "~/admin/users";
import AdminQuestions from "~/admin/questions";
import AdminQuestionsEdit from "~/admin/questions/edit";
import AdminUsersEdit from "~/admin/users/edit";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "leaderboards",
        element: <Leaderboards />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/users/edit/:id",
        element: <AdminUsersEdit />,
      },
      {
        path: "/admin/questions",
        element: <AdminQuestions />,
      },
      {
        path: "/admin/questions/edit/:id",
        element: <AdminQuestionsEdit />,
      },
    ],
  },
]);

export default routes;
