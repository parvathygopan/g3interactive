import React from "react";
import {TbLayoutDashboard} from "react-icons/tb";
import {
  LuLogOut,
  LuPower,
  LuPowerOff,
  LuSettings,
  LuUsers,
} from "react-icons/lu";
import {RiUserStarLine} from "react-icons/ri";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column ">
      <div className="logo text-center mx-auto">LOGO</div>

      <ul className="nav flex-column mt-4 list-side">
        <b className="small-head mb-3">
          <small>MAIN MENU</small>
        </b>
        <li className="mt-3">
          <NavLink to="/" end className="menu-link">
            <TbLayoutDashboard />
            <span className="m-2">Dashboard</span>
          </NavLink>
        </li>

        <li className="mt-3">
          <NavLink to="/users" className="menu-link">
            <RiUserStarLine />
            <span className="m-2">User Management</span>
          </NavLink>
        </li>

        <li className="mt-3">
          <NavLink to="/team" className="menu-link">
            <LuUsers />
            <span className="m-2">Team</span>
          </NavLink>
        </li>
        <b className="small-head mt-4">
          <small>SETTINGS</small>
        </b>

        <li className="mt-3">
          <LuSettings />
          <span className="m-2">Settings</span>
        </li>
      </ul>

      <div className="logout mt-auto">
        {" "}
        <li>
          <LuPower />
          <span className="m-2">Logout</span>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
