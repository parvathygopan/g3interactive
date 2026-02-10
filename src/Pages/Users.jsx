import React from "react";
import Sidebar from "../Components/Sidebar";
import UsersTable from "../Components/UserTable";

function Users() {
  return (
    <div className="d-flex dashboard-wrapper">
      <Sidebar active="users" />

      <div className="main-content p-4 w-100">
        <UsersTable />
      </div>
    </div>
  );
}

export default Users;
