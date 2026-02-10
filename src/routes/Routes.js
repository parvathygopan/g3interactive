import React from "react";
import Login from "../Pages/Login";
import Users from "../Pages/Users";
import AddUser from "../Pages/AddUser";


const AppRoutes = [
  {
    path: "/",
    element: <Login />,
  },
   {
    path: "/users",
    element: <Users />,
  },
    {
    path: "/add-user",
    element: <AddUser />,
  },

];

export default AppRoutes;
