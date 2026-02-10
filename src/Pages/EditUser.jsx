import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { fetchUsers, updateUser } from "../Constants/fakeApi";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    designation: [],
    image: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetchUsers();
        const user = res.data.find((u) => u.id === Number(id));

        if (!user) return navigate("/users");

        setForm({
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: "User",
          designation: [],
          image: null,
        });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, navigate]);

  const update = (key, value) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handlePhone = (e) =>
    update("phone", e.target.value.replace(/\D/g, ""));

  const handleDesignation = (e) => {
    const { value, checked } = e.target;

    if (checked)
      update("designation", [...form.designation, value]);
    else
      update(
        "designation",
        form.designation.filter((d) => d !== value)
      );
  };

  const validate = () => {
    const err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.email) err.email = "Email is required";
    else if (!emailRegex.test(form.email))
      err.email = "Please enter a valid email address.";

    if (!form.phone) err.phone = "Phone number required";
    if (!form.role) err.role = "Role is required";
    if (form.designation.length === 0)
      err.designation = "Select at least one responsibility";

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await updateUser(id, form);

      toast.success("User updated successfully");

      navigate("/users");
    } catch {
      toast.error("Failed to update user");
    }
  };

  if (loading) return <BeatLoader />;
  return (
    <>
      <Toaster />
      <Container className="mt-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow"
        >
          <h4 className="mb-4">Edit User</h4>

          <Row>
            <Col md={6}>
              <label>Name *</label>
              <input
                className="form-control"
                value={form.name}
                onChange={(e) =>
                  update("name", e.target.value)
                }
              />
              {errors.name && (
                <small className="text-danger">
                  {errors.name}
                </small>
              )}
            </Col>

            <Col md={6}>
              <label>Email *</label>
              <input
                className="form-control"
                value={form.email}
                onChange={(e) =>
                  update("email", e.target.value)
                }
              />
              {errors.email && (
                <small className="text-danger">
                  {errors.email}
                </small>
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
                <small className="text-danger">
                  {errors.phone}
                </small>
              )}
            </Col>

            <Col md={6}>
              <label>Role *</label>
              <select
                className="form-select"
                value={form.role}
                onChange={(e) =>
                  update("role", e.target.value)
                }
              >
                <option value="">Select</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>User</option>
              </select>
              {errors.role && (
                <small className="text-danger">
                  {errors.role}
                </small>
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
                    checked={form.designation.includes(d)}
                    onChange={handleDesignation}
                  />{" "}
                  {d}
                </label>
              ))}
            </div>
            {errors.designation && (
              <small className="text-danger">
                {errors.designation}
              </small>
            )}
          </div>

          <button className="btn btn-primary w-100 mt-4">
            Save Changes
          </button>
        </form>
      </Container>
    </>
  );
}

export default EditUser;
