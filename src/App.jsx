import React from "react";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Movies } from "./pages/Movies";
import { Employee } from "./pages/Employee";
import { Rentals } from "./pages/Rentals";
import { Clients } from "./pages/Clients";
import { DefaultLayout } from "./pages/DefaultLayout";
import { AuthProvider } from "./context/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Login />,
  },
  {
    path: "/admin",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/admin/movies",
        element: <Movies />
      },
      {
        path: "/admin/rentals",
        element: <Rentals />
      },
      {
        path: "/admin/employee",
        element: <Employee />
      },
      {
        path: "/admin/clients",
        element: <Clients />
      },
    ]
  }
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
};

export default App;
