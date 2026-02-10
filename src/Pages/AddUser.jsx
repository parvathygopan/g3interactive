import React, {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Row, Col, Container} from "react-bootstrap";
import {Button} from "antd";
import Profile from "../../src/Assets/placeholder.jpg";
import Avatar from "react-avatar-edit";
import {Dialog} from "primereact/dialog";

import * as Ai from "react-icons/ai";
import toast, {Toaster} from "react-hot-toast";
import {BeatLoader} from "react-spinners";
import ReactConfirmAlert, {confirmAlert} from "react-confirm-alert";
import useAuth from "../hook/useAuth";

function AddUser() {
  const navigate = useNavigate();
  const {getTherapist, actionLoading, addTheraphist} = useAuth();
  const [therapy, setTherapy] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fullname, setfullname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [designation, setDesignation] = useState([]);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("");
  const [error, setError] = useState(false);
  const [dialogues, setDialogues] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [duration, setDuration] = useState("year");

  const onClose = (view) => {};
  const onCrop = (e) => {
    setFile(e);
  };

  const saveDoc = (e) => {
    setDialogues(false);
  };

  const onOptionChangeHandler = (e) => {
    setDuration(e.target.value);
  };
  const handleDesignationChange = (e) => {
    const {value, checked} = e.target;

    if (checked) {
      setDesignation((prev) => [...prev, value]);
    } else {
      setDesignation((prev) => prev.filter((item) => item !== value));
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const resetInput = "";
    if (
      fullname.length === 0 ||
      email.length === 0 ||
      role.length === 0 
    ) {
      setError(true);
      return;
    }

    const formData = new FormData();
    let prefix = "";

    formData.append("image", file);
    formData.append("name", fullname);
    formData.append("role", role);
    formData.append("phonenumber", phonenumber);
    formData.append("initials", initials);
    formData.append("email", email);
    formData.append("designation", designation);

    await addTheraphist(formData, {
      onSuccess: async (res) => {
        getTherapist();
        toast.success(res.message);
        await getTherapist();
        setTimeout(() => {
          setTherapy("");
          setfullname("");

          setPhonenumber("");
          setFile("");
          setInitials("");
          setDesignation("");
          setRole("");
          setEmail("");
          setTitle("");
          setInitials("");

          navigate("/users");
        }, 1000);
      },
      onFailed: (e) => toast.success(e.message),
    });
  };
  useEffect(() => {
    const handleBack = (e) => {
      if (!window.confirm("Are you sure you want to leave this page?")) {
        e.preventDefault();
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  const submitPrev = () => {
    if (window.confirm("Are you sure you want to go back?")) {
      navigate("/users");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <Container className="add_cont">
        <main>
          <section className="main ml-3 mt-3">
            <button className="back_btn" onClick={submitPrev}>
              <Ai.AiOutlineLeft />
            </button>
            <div className="form-box">
              <h2 className="text-left">Add New User</h2>
              <form
                className="form-control add_form"
                onSubmit={(e) => formSubmit(e)}
              >
                <Row>
                  <Col>
                    <div className="profile">
                      <div className="flex flex-column justify-content-center align-items-center">
                        <img
                          src={file != null ? file : Profile}
                          alt=""
                          value="image"
                          style={{maxWidth: "100%"}}
                          onClick={() => {
                            setDialogues(true);
                          }}
                        />
                        <Dialog
                          className="avatar-bg"
                          visible={dialogues}
                          header={() => (
                            <>
                              <p>Update Profile Picture</p>
                            </>
                          )}
                          onHide={() => setDialogues(false)}
                        >
                          <div className="confirmation-content flex flex-column align-items-center">
                            <div className="flex flex-column align-items-center mt-5 w-12">
                              <div className="flex flex-column justify-content-around w-12 mt-4 mx-auto text-center mb-4">
                                <Avatar
                                  width={400}
                                  height={300}
                                  onClose={(e) => onClose(e)}
                                  onCrop={(e) => onCrop(e)}
                                />
                                <Button
                                  label="Save"
                                  onClick={saveDoc}
                                  className="mx-auto text-center mt-3"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Dialog>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className="form-group">
                      <label for="fullname">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={fullname}
                        onChange={(e) => setfullname(e.target.value)}
                      />
                      {error && fullname?.length === 0 ? (
                        <>
                          <span style={{color: "red"}}>
                            Please fill your fullname
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div className="form-group">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {error && email?.length === 0 ? (
                        <>
                          <span style={{color: "red"}}>Email Required</span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xl={6}>
                    <div className="form-group">
                      <label for="phonenumber">Phone number</label>
                      <input
                        type="mobile"
                        className="form-control"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                      />
                      {error && phonenumber?.length === 0 ? (
                        <>
                          <span style={{color: "red"}}>
                            Please fill your phone number
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div className="form-group">
                      <label for="phonenumber">title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setPhonenumber(e.target.value)}
                      />
                    
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3 mt-3">
                  <Col xl={6}>
                    <div>
                      <label for="exp">Initials</label>
                      <select
                        className="form-select"
                        onChange={(e) => setInitials(e.target.value)}
                        value={initials}
                      >
                        <option selected hidden>
                          Select
                        </option>
                        <option value="mr">
                          mr
                        </option>
                        <option value="mrs">
                         mrs
                        </option>
                 
                        <option
                          value="other"
                          onSelect={() => setShowOther(false)}
                        >
                          Other
                        </option>
                      </select>
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div>
                      <label for="exp">Role</label>
                      <select
                        className="form-select"
                        onChange={(e) => setInitials(e.target.value)}
                        value={initials}
                      >
                        <option selected hidden>
                          Select
                        </option>
                        <option value="director">
                          Director
                        </option>
                        <option value="accounts">
                          Accounts
                        </option>
                        <option value="Teacher">Teacher</option>
                        <option
                          value="other"
                          onSelect={() => setShowOther(false)}
                        >
                          Other
                        </option>
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xl={12}>
                    <label>Designation</label>
                  </Col>

                  <Col xl={3}>
                    <input
                      type="checkbox"
                      value="Designer"
                      onChange={handleDesignationChange}
                    />{" "}
                    Designer
                  </Col>

                  <Col xl={3}>
                    <input
                      type="checkbox"
                      value="Project Manager"
                      onChange={handleDesignationChange}
                    />{" "}
                    Project Manager
                  </Col>

                  <Col xl={3}>
                    <input
                      type="checkbox"
                      value="Production Manager"
                      onChange={handleDesignationChange}
                    />{" "}
                    Production Manager
                  </Col>

                  <Col xl={3}>
                    <input
                      type="checkbox"
                      value="Sales Rep"
                      onChange={handleDesignationChange}
                    />{" "}
                    Sales Rep
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col xl={12}>
                    <button type="submit" className="form_btn">
                      {actionLoading &&
                      actionLoading.action == "Add" &&
                      actionLoading.loading ? (
                        <BeatLoader color="#fff" />
                      ) : (
                        "Add"
                      )}
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
          </section>
        </main>
      </Container>
    </>
  );
}

export default AddUser;
