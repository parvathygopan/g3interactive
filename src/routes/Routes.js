import React from "react";
import Login from "../Pages/Login";
import Users from "../Pages/Users";
import AddUser from "../Pages/AddUser";
import EditUser from "../Pages/EditUser";


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
   {
    path: "/edit-user/:id",
    element: <EditUser />,
  },

];

export default AppRoutes;
