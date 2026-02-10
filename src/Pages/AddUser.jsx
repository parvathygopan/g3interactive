import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Row, Col, Container} from "react-bootstrap";
import {BeatLoader} from "react-spinners";
import toast, {Toaster} from "react-hot-toast";
import useAuth from "../hook/useAuth";
import * as Ai from "react-icons/ai";
import { createUser } from "../Constants/fakeApi";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AddUser() {
  const navigate = useNavigate();
  const {addTheraphist, actionLoading} = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    initials: "",
    title: "",
    designation: [],
    image: null,
  });

  const [errors, setErrors] = useState({});

  const update = (key, value) => setForm((prev) => ({...prev, [key]: value}));

  const handlePhone = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    update("phone", value);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    update("image", preview);
    update("rawFile", file);
  };

  const removeImage = () => {
    update("image", null);
    update("rawFile", null);
  };

  const handleDesignation = (e) => {
    const {value, checked} = e.target;

    if (checked) {
      update("designation", [...form.designation, value]);
    } else {
      update(
        "designation",
        form.designation.filter((d) => d !== value),
      );
    }
  };

  const validate = () => {
    const err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.email) err.email = "Email is required";
    else if (!emailRegex.test(form.email))
      err.email = "Please enter a valid email address.";

    if (!form.phone) err.phone = "Phone number is required";
    else if (form.phone.length < 10 || form.phone.length > 15)
      err.phone = "Phone must be 10–15 digits";

    if (!form.role) err.role = "Role is required";
    if (form.designation.length === 0)
      err.designation = "Select at least one responsibility";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

 const formSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      initials: form.initials,
      title: form.title,
      designation: form.designation,
      active: true,
    };

    await createUser(payload);

    toast.success("User added successfully");

    navigate("/users");
  } catch (error) {
    toast.error("Failed to save user");
  }
};

  return (
    <>
      <Toaster />
      <Container className="add_cont mt-4">
        <button
          className="btn btn-light mb-3"
          onClick={() => navigate("/users")}
        >
          <Ai.AiOutlineLeft /> Back
        </button>

        <form onSubmit={formSubmit} className="bg-white p-4 rounded shadow">
          <h4 className="mb-4">Add New User</h4>

          <div className="text-center mb-4">
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                overflow: "hidden",
                margin: "auto",
                border: "2px dashed #ccc",
              }}
            >
              <img
                src={form.image || "https://via.placeholder.com/120"}
                alt=""
                style={{width: "100%", height: "100%"}}
              />
            </div>

            <div className="mt-2">
              <input type="file" onChange={handleImage} />
              {form.image && (
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-2"
                  onClick={removeImage}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <Row>
            <Col md={6}>
              <label>Name *</label>
              <input
                className="form-control"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </Col>

            <Col md={6}>
              <label>Email *</label>
              <input
                className="form-control"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <label>Phone *</label>
              <input
                className="form-control"
                value={form.phone}
                onChange={handlePhone}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone}</small>
              )}
            </Col>

            <Col md={6}>
              <label>Role *</label>
              <select
                className="form-select"
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
              >
                <option value="">Select</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>User</option>
              </select>
              {errors.role && (
                <small className="text-danger">{errors.role}</small>
              )}
            </Col>
          </Row>

          <div className="mt-3">
            <label>Responsibility *</label>
            <div>
              {["Designer", "Manager", "Sales"].map((d) => (
                <label key={d} className="me-3">
                  <input
                    type="checkbox"
                    value={d}
                    onChange={handleDesignation}
                  />{" "}
                  {d}
                </label>
              ))}
            </div>
            {errors.designation && (
              <small className="text-danger">{errors.designation}</small>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-4"
            disabled={actionLoading?.loading}
          >
            {actionLoading?.loading ? <BeatLoader size={8} /> : "Save"}
          </button>
        </form>
      </Container>
    </>
  );
}

export default AddUser;
