import React, {useState} from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import UsersTable from "../Components/UserTable";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Travis Scott",
      email: "travis@email.com",
      initials: "TS",
      phone: "0412 345 678",
      role: "Admin",
      title: "Admin",
      active: true,
    },
  ]);
  const usersList = [
    {
      id: 1,
      name: "Travis Scott",
      email: "travis.scott@example.com",
      initials: "TS",
      phone: "0412 345 678",
      role: "Admin",
      title: "Admin",
      active: true,
    },
    {
      id: 2,
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      initials: "JC",
      phone: "0412 345 679",
      role: "Supervisor",
      title: "Supervisor",
      active: false,
    },
    {
      id: 3,
      name: "Ronald Richards",
      email: "ronald.richards@example.com",
      initials: "RR",
      phone: "0412 345 680",
      role: "Project Manager",
      title: "Project Manager",
      active: true,
    },
    {
      id: 4,
      name: "Darlene Robertson",
      email: "darlene.robertson@example.com",
      initials: "DR",
      phone: "0412 345 681",
      role: "Project Manager",
      title: "Team Lead",
      active: true,
    },
    {
      id: 5,
      name: "Courtney Henry",
      email: "courtney.henry@example.com",
      initials: "CH",
      phone: "0412 345 682",
      role: "Supervisor",
      title: "Supervisor",
      active: false,
    },
    {
      id: 6,
      name: "Wade Warren",
      email: "wade.warren@example.com",
      initials: "WW",
      phone: "0412 345 683",
      role: "Supervisor",
      title: "Project Manager",
      active: true,
    },
    {
      id: 7,
      name: "Brooklyn Simmons",
      email: "brooklyn.simmons@example.com",
      initials: "BS",
      phone: "0412 345 684",
      role: "Supervisor",
      title: "Project Manager",
      active: true,
    },
    {
      id: 8,
      name: "Jenny Wilson",
      email: "jenny.wilson@example.com",
      initials: "JW",
      phone: "0412 345 685",
      role: "Admin",
      title: "Admin",
      active: false,
    },
    {
      id: 9,
      name: "Robert Fox",
      email: "robert.fox@example.com",
      initials: "RF",
      phone: "0412 345 686",
      role: "Project Manager",
      title: "Project Manager",
      active: true,
    },
    {
      id: 10,
      name: "Kristin Watson",
      email: "kristin.watson@example.com",
      initials: "KW",
      phone: "0412 345 687",
      role: "Supervisor",
      title: "Team Lead",
      active: true,
    },
  ];
  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? {...u, active: !u.active} : u)),
    );
  };
  return (
    <div>
      <div className="d-flex dashboard-wrapper">
        <Sidebar active="users" />

        <div className="main-content p-4 w-100">
          <Header onAdd={() => alert("Add user")} />

          <div className="mt-3"></div>
          <UsersTable users={usersList} />
        </div>
      </div>
    </div>
  );
}

export default Users;
