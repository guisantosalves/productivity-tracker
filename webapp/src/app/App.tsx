import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Homepage } from "../pages/Homepage";
import { DefaultLayout } from "../shared/DefaultLayout";
import { TaskPage } from "../pages/TaskPage";
import { TaskCategoryPage } from "../pages/TaskCategory";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      // {index: true, Component: (<div>exemple</div>)} -> this one doestnt have layout
      { index: true, Component: Homepage },
    ],
  },
  {
    path: "/task",
    Component: DefaultLayout,
    children: [
      // {index: true, Component: (<div>exemple</div>)} -> this one doestnt have layout
      { index: true, Component: TaskPage },
    ],
  },
  {
    path: "/task-category",
    Component: DefaultLayout,
    children: [
      // {index: true, Component: (<div>exemple</div>)} -> this one doestnt have layout
      { index: true, Component: TaskCategoryPage },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
