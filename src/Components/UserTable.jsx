import React, {useMemo, useState} from "react";

const UsersTable = ({users}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState(users);

  const totalPages = Math.ceil(users.length / perPage);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return users.slice(start, start + perPage);
  }, [users, currentPage, perPage]);

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, users.length);
  const [statusMap, setStatusMap] = useState({});

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
    setUserList((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded shadow-sm p-3">
      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4">
              <div style={{fontSize: 40}}>⚠</div>

              <h5 className="mt-3">Are you sure?</h5>
              <p className="text-muted small">
                You won't be able to revert this!
              </p>

              <div className="d-flex justify-content-center gap-2 mt-3">
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Yes, delete it!
                </button>

                <button className="btn btn-primary" onClick={cancelDelete}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table align-middle mb-0 users-table">
          <thead>
            <tr className="table-row-data">
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Initials</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{startItem + index}</td>
                <td>{user.name}</td>
                <td className="text-truncate email-col">{user.email}</td>
                <td>{user.initials}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>

                <td>
                  <div className="form-check form-switch m-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={statusMap[user.id] ?? user.active}
                      onChange={() => toggleStatus(user.id)}
                    />
                  </div>
                </td>

                <td>{user.title}</td>

                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">
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

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2">
        <small className="text-muted">
          Showing {startItem}–{endItem} of {users.length} results
        </small>

        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-light"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ‹
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-sm btn-light"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
