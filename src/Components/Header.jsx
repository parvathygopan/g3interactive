import React from "react";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleAddAdmin = () => {
    navigate("/add-user");
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Jobs Management</h4>
      </div>
      <div className="row">
        <div className="col-md-12 col-xl-6 col-sm-12">
          <div className="d-flex gap-2">
            <input
              className="form-control"
              placeholder="Search by name, email..."
              style={{width: 250}}
            />

            <select className="form-select">
              <option>Select Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="col-md-12 col-xl-6 col-sm-12">
          <button className="btn btn-primary add-btn" onClick={handleAddAdmin}>
            + Add New User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
