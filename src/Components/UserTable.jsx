import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [statusMap, setStatusMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  /* ===============================
     FETCH USERS (fake api)
  =============================== */
  useEffect(() => {
    const loadUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();

      const formatted = data.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: "User",
        initials: u.name?.charAt(0),
        title: "N/A",
        active: true,
      }));

      setUsers(formatted);
    };

    loadUsers();
  }, []);

  /* ===============================
     ACTIONS
  =============================== */

  const toggleStatus = (id) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setShowModal(false);
    setCurrentPage(1);
  };

  const handleAddUser = () => navigate("/add-user");

  /* ===============================
     FILTER
  =============================== */

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const status = statusMap[user.id] ?? user.active;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && status) ||
        (statusFilter === "inactive" && !status);

      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter, statusMap]);

  /* ===============================
     PAGINATION
  =============================== */

  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredUsers.slice(start, start + perPage);
  }, [filteredUsers, currentPage]);

  const startItem =
    filteredUsers.length === 0 ? 0 : (currentPage - 1) * perPage + 1;

  const endItem = Math.min(currentPage * perPage, filteredUsers.length);

  /* ===============================
     UI
  =============================== */

  return (
    <div className="bg-white rounded shadow-sm p-3">
      {/* header */}
      <div className="d-flex justify-content-between mb-3">
        <h4 className="fw-bold">Users Management</h4>

        <button className="btn btn-primary" onClick={handleAddUser}>
          + Add New User
        </button>
      </div>

      {/* search + filter */}
      <div className="row mb-3 g-2">
        <div className="col-md-6 d-flex gap-2">
          <input
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* table */}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{startItem + index}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>

                <td>
                  <input
                    type="checkbox"
                    checked={statusMap[user.id] ?? user.active}
                    onChange={() => toggleStatus(user.id)}
                  />
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/edit-user/${user.id}`)}
                  >
                    ✏
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteClick(user)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="d-flex justify-content-between mt-3">
        <small>
          Showing {startItem}–{endItem} of {filteredUsers.length}
        </small>

        <div>
          <button
            className="btn btn-sm btn-light me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ‹
          </button>

          <button
            className="btn btn-sm btn-light"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            ›
          </button>
        </div>
      </div>

      {/* delete modal */}
      {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4">
              <h5>Delete this user?</h5>

              <div className="d-flex justify-content-center gap-2 mt-3">
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
