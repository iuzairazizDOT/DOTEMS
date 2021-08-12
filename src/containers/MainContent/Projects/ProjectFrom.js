import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import ProjectValidation from "../../../validations/project-validations";
import Configuration from "../../../config/configuration";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import CountryService from "../../../services/CountryService";
import AddClientForm from "../Client/ClientsForm";
import AddPlatform from "../Platform/PlatformForm/PlatformForm";
import AddTechnology from "../Technology/TechnologyForm/TechnologyForm";
import AddService from "../Service/ServiceForm/ServiceForm";
import AddStatus from "../Status/StatusForm/StatusForm";
import AddProjectNature from "../Nature/NatureForm/NatureForm";
import AddCurrency from "../Currency/CurrencyForm";
import ProjectService from "../../../services/ProjectService";
import PlatformService from "../../../services/PlatformService";
import TechnologyService from "../../../services/TechnologyService";
import ServiceService from "../../../services/ServiceService";
import NatureService from "../../../services/NatureService";
import userService from "../../../services/UserService";
import ClientService from "../../../services/ClientService";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import StatusService from "../../../services/StatusService";
import CurrencyService from "../../../services/CurrencyService";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import Editable from "react-x-editable";
import "./ProjectForm.scss";
import { useHistory } from "react-router-dom";

const ProjectForm = (props) => {
  const [default_option, set_default_option] = useState(0);
  const [clientModal, setClientModal] = useState(false);
  const [platformModal, setPlatformModal] = useState(false);
  const [technologyModal, setTechnologyModal] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [natureModal, setNatureModal] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [country, setCountry] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [service, setServiceType] = useState([]);
  const [nature, setNature] = useState([]);
  const [users, setUsers] = useState([]);
  const [client, setClient] = useState([]);
  const [status, setStatus] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [toShow, setToShow] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const roless = new Configuration().Roles;

  const editable = props.editable;
  const project = props.project;
  const history = useHistory();

  const [totalCost, setTotalCost] = useState(0);
  const [phases, setPhases] = useState([
    {
      phasename: "Requirement Analysis",
      estTime: editable ? project.phase[0].estTime : 0,
    },
    {
      phasename: "Design",
      estTime: editable ? project.phase[1].estTime : 0,
    },
    {
      phasename: "Development",
      estTime: editable ? project.phase[2].estTime : 0,
    },
    {
      phasename: "Implementation",
      estTime: editable ? project.phase[3].estTime : 0,
    },
    {
      phasename: "Testing",
      estTime: editable ? project.phase[4].estTime : 0,
    },
    {
      phasename: "Documentation",
      estTime: editable ? project.phase[5].estTime : 0,
    },
    {
      phasename: "Evaluation",
      estTime: editable ? project.phase[6].estTime : 0,
    },
  ]);

  let tHours = 0;

  useEffect(() => {
    console.log(tHours);
  }, [totalHours]);

  const setThours = (value) => {
    tHours = parseInt(tHours) + parseInt(value);
    setTotalHours(parseInt(tHours));
  };

  const handleOption = (opt) => {
    set_default_option(opt);
  };

  const toggleClientEdit = () => setClientModal(!clientModal);
  const togglePlatformEdit = () => setPlatformModal(!platformModal);
  const toggleTechnologyEdit = () => setTechnologyModal(!technologyModal);
  const toggleServiceEdit = () => setServiceModal(!serviceModal);
  const toggleStatusEdit = () => setStatusModal(!statusModal);
  const toggleNatureEdit = () => setNatureModal(!natureModal);
  const toggleCurrencyEdit = () => setCurrencyModal(!currencyModal);

  useEffect(() => {
    getCountry();
    getPlatform();
    getTechnology();
    getServiceType();
    getNature();
    getUsers();
    getClient();
    getStatus();
    getCurrency();
    getTeamMembers();
  }, [
    clientModal,
    platformModal,
    technologyModal,
    serviceModal,
    statusModal,
    natureModal,
    currencyModal,
  ]);

  useEffect(() => {
    toShowData();
  }, [nature]);

  const getCurrency = () => {
    CurrencyService.getAllCurrency().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setCurrency(options);
    });
  };

  const getStatus = () => {
    StatusService.getAllStatus().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setStatus(options);
    });
  };

  const getUsers = () => {
    userService.getUsers("", "", "", "").then((res) => {
      let options = [];
      res.data
        .filter((role) => role.userRole === roless.PM)
        .map((item, index) => {
          options.push({
            value: item._id,
            label: `${item.name} (${item.userRole})`,
          });
        });
      setUsers(options);
    });
  };

  const getTeamMembers = () => {
    userService.getUsers("", "", "", "").then((res) => {
      let options = [];
      res.data
        .filter(
          (role) =>
            role.userRole === roless.INTERNEE ||
            role.userRole === roless.PROBATION ||
            role.userRole === roless.EMPLOYEE
        )
        .map((item, index) => {
          options.push({
            value: item._id,
            label: `${item.name} (${item.userRole})`,
          });
        });
      setTeamMember(options);
    });
  };

  const getClient = () => {
    ClientService.getAllClient().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setClient(options);
    });
  };

  const getNature = () => {
    NatureService.getAllNature().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setNature(options);
    });
  };

  const getServiceType = () => {
    ServiceService.getAllService().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setServiceType(options);
    });
  };

  const getTechnology = () => {
    TechnologyService.getAllTechnologies().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setTechnology(options);
    });
  };

  const getPlatform = () => {
    PlatformService.getAllPlatform().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setPlatform(options);
    });
  };

  const getCountry = () => {
    CountryService.getAllCountry().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setCountry(options);
    });
  };

  // console.log(project);

  const toShowData = () => {
    let options = [];
    let natre = nature;
    let keys = Object.keys(nature);
    // console.log("n lenth", natre.length);
    // console.log("keys lenght", keys.length);
    nature.map((item, index) => {
      options.push({ value: item.id, text: item.label });
    });
    setToShow(options);
    // console.log("Data To Disply in MultiSelect", options);
    // console.log("User Nature", nature);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  var TeamMembers = [];
  editable &&
    project.assignedUser.map((item) =>
      TeamMembers.push({ label: item.name, value: item._id, id: item._id })
    );

  return (
    <Formik
      initialValues={{
        projectName: editable && project.name,
        clientName: editable &&
          project.client && {
            label: project.client.name,
            value: project.client._id,
          },
        status: editable &&
          project.status && {
            label: project.status.name,
            value: project.status._id,
          },
        description: editable
          ? EditorState.createWithContent(
              convertFromRaw(JSON.parse(project.description))
            )
          : EditorState.createEmpty(),
        cost: editable && project.cost,
        Rprofit: editable && project.Rprofit,
        platform: editable &&
          project.platform && {
            label: project.platform.name,
            value: project.platform._id,
          },
        technology: editable &&
          project.technology && {
            label: project.technology.name,
            value: project.technology._id,
          },
        serviceType: editable &&
          project.service && {
            label: project.service.name,
            value: project.service._id,
          },
        nature: editable &&
          project.nature && {
            label: project.nature.name,
            value: project.nature._id,
          },
        currency: editable &&
          project.currency && {
            label: project.currency.name,
            value: project.currency._id,
          },
        cStartDate: editable && project.cStartDate,
        cEndDate: editable && project.cEndDate,
        pmStartDate: editable && project.pmStartDate,
        pmEndDate: editable && project.pmEndDate,
        projectManager: editable &&
          project.projectManager && {
            label: project.projectManager.name,
            value: project.projectManager._id,
          },
        teamMembers: editable && TeamMembers,
        orderNum: editable && project.orderNum,
        Pdeduction: editable && project.Pdeduction,
        percentage: editable && project.percentage,
        fCost: editable && project.fCost,
        otherDeduction: editable && project.otherDeduction,
        phase: editable && phases,
      }}
      validate={(val) => {
        console.log("vlue", val);
      }}
      validationSchema={ProjectValidation.newProjectValidation}
      onSubmit={(values, actions) => {
        // console.log(phases);
        const usrs = [];
        // console.log("team members", values.teamMembers);
        values.teamMembers.map((item) => {
          usrs.push(item.value);
          // console.log("users", usrs);
        });
        // console.log("valuesss", values);
        editable
          ? ProjectService.updateProject(project._id, {
              name: values.projectName,
              client: values.clientName.value,
              orderNum: values.orderNum,
              platform: values.platform.value,
              technology: values.technology.value,
              service: values.serviceType.value,
              status: values.status.value,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
              nature: values.nature.value,
              cStartDate: values.cStartDate,
              cEndDate: values.cEndDate,
              pmStartDate: values.pmStartDate,
              pmEndDate: values.pmEndDate,
              projectManager: values.projectManager.value,
              assignedUser: usrs,
              cost: values.cost,
              Rprofit: values.Rprofit,
              Pdeduction: values.Pdeduction,
              percentage: values.percentage,
              fCost: values.fCost,
              currency: values.currency.value,
              otherDeduction: values.otherDeduction,
              phase: phases,
            })

              .then((res) => {
                ProjectService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                ProjectService.handleCustomMessage(err.response.data);
                props.toggle();
              })
          : ProjectService.addProject({
              name: values.projectName,
              client: values.clientName.value,
              orderNum: values.orderNum,
              platform: values.platform.value,
              technology: values.technology.value,
              service: values.serviceType.value,
              status: values.status.value,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
              nature: values.nature.value,
              cStartDate: values.cStartDate,
              cEndDate: values.cEndDate,
              pmStartDate: values.pmStartDate,
              pmEndDate: values.pmEndDate,
              projectManager: values.projectManager.value,
              assignedUser: usrs,
              cost: values.cost,
              Rprofit: values.Rprofit,
              Pdeduction: values.Pdeduction,
              percentage: values.percentage,
              fCost: values.fCost,
              otherDeduction: values.otherDeduction,
              phase: phases,
              currency: values.currency.value,
            })
              .then((res) => {
                ProjectService.handleMessage("add");
                history.push("/viewproject");
              })
              .catch((err) => {
                ProjectService.handleCustomMessage(err.response.data);
              });
        // console.log("clientName", values.clientName);
        // console.log("platform", values.platform);
        // console.log("technology", values.technology);
        // console.log("serviceType", values.serviceType);
        // console.log("projectNature", values.projectNature);
        // console.log("projectManager", values.projectManager);
      }}
    >
      {(props) => (
        <div className="project-form">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  name="projectName"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.projectName && props.errors.projectName
                      ? "is-invalid"
                      : props.touched.projectName && "is-valid"
                  }`}
                  value={props.values.projectName}
                  onChange={props.handleChange("projectName")}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.projectName && props.errors.projectName}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Client Name</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleClientEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  name="clientName"
                  blurInputOnSelect={true}
                  className={`my-select${
                    props.touched.clientName && props.errors.clientName
                      ? "is-invalid"
                      : props.touched.clientName && "is-valid"
                  }`}
                  onBlur={props.handleBlur}
                  value={props.values.clientName}
                  onChange={(val) => props.setFieldValue("clientName", val)}
                  options={client}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.clientName && props.errors.clientName}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Order Number</label>
                <input
                  name="orderNum"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.orderNum && props.errors.orderNum
                      ? "is-invalid"
                      : props.touched.orderNum && "is-valid"
                  }`}
                  value={props.values.orderNum}
                  onChange={props.handleChange("orderNum")}
                  placeholder="Enter Order Number"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.orderNum && props.errors.orderNum}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Platform</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        togglePlatformEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  className={`my-select${
                    props.touched.platform && props.errors.platform
                      ? "is-invalid"
                      : props.touched.platform && "is-valid"
                  }`}
                  name="platform"
                  onBlur={props.handleBlur}
                  value={props.values.platform}
                  onChange={(val) => props.setFieldValue("platform", val)}
                  options={platform}
                />

                <span id="err" className="invalid-feedback">
                  {props.touched.platform && props.errors.platform}
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Project Nature</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleNatureEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  name="nature"
                  onBlur={props.handleBlur}
                  value={props.values.nature}
                  className={`my-select${
                    props.touched.nature && props.errors.nature
                      ? "is-invalid"
                      : props.touched.nature && "is-valid"
                  }`}
                  onChange={(val) => props.setFieldValue("nature", val)}
                  options={nature}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.nature && props.errors.nature}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Project Manager</label>

                <Select
                  name="projectManager"
                  onBlur={props.handleBlur}
                  className={`my-select${
                    props.touched.projectManager && props.errors.projectManager
                      ? "is-invalid"
                      : props.touched.projectManager && "is-valid"
                  }`}
                  value={props.values.projectManager}
                  onChange={(val) => props.setFieldValue("projectManager", val)}
                  options={users}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.projectManager && props.errors.projectManager}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Currency</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleCurrencyEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>

                <Select
                  name="currency"
                  onBlur={props.handleBlur}
                  className={`my-select${
                    props.touched.currency && props.errors.currency
                      ? "is-invalid"
                      : props.touched.currency && "is-valid"
                  }`}
                  value={props.values.currency}
                  onChange={(val) => props.setFieldValue("currency", val)}
                  options={currency}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.currency && props.errors.currency}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-0">
                <label className="control-label">Team Members</label>
                <Select
                  name="teamMembers"
                  onBlur={props.handleBlur}
                  className={`my-select${
                    props.touched.teamMembers && props.errors.teamMembers
                      ? "is-invalid"
                      : props.touched.teamMembers && "is-valid"
                  }`}
                  value={props.values.teamMembers}
                  onChange={(val) => props.setFieldValue("teamMembers", val)}
                  options={teamMember}
                  isMulti={true}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.teamMembers && props.errors.teamMembers}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {" "}
              <div className="form-group">
                <label>Client Start Date</label>
                <div>
                  <DatePicker
                    name="cStartDate"
                    onBlur={props.handleBlur}
                    className={`form-control ${
                      props.touched.cStartDate && props.errors.cStartDate
                        ? "is-invalid"
                        : props.touched.cStartDate && "is-valid"
                    }`}
                    selected={props.values.cStartDate}
                    onChange={(date) => {
                      props.setFieldValue("cStartDate", date);
                      console.log("datepicker", date);
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.cStartDate && props.errors.cStartDate}
                  </span>
                </div>
              </div>{" "}
            </div>
            <div className="col">
              {" "}
              <div className="form-group">
                <label>Client Deadline</label>
                <div>
                  <DatePicker
                    name="cEndDate"
                    onBlur={props.handleBlur}
                    className={`form-control ${
                      props.touched.cEndDate && props.errors.cEndDate
                        ? "is-invalid"
                        : props.touched.cEndDate && "is-valid"
                    }`}
                    selected={props.values.cEndDate}
                    onChange={(datee) => {
                      props.setFieldValue("cEndDate", datee);
                      // console.log("datepicker", datee);
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.cEndDate && props.errors.cEndDate}
                  </span>
                </div>
              </div>{" "}
            </div>
            <div className="col">
              <div className="form-group">
                <label>Cost</label>
                <input
                  name="cost"
                  onBlur={props.handleBlur}
                  type="number"
                  className={`form-control ${
                    props.touched.cost && props.errors.cost
                      ? "is-invalid"
                      : props.touched.cost && "is-valid"
                  }`}
                  value={props.values.cost}
                  onChange={props.handleChange("cost")}
                  placeholder="Enter Amount"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.cost && props.errors.cost}
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Technology</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleTechnologyEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                 <Select
                  name="technology"
                  onBlur={props.handleBlur}
                  className={`my-select${
                    props.touched.technology && props.errors.technology
                      ? "is-invalid"
                      : props.touched.technology && "is-valid"
                  } zIndex`}
                  value={props.values.technology}
                  onChange={(val) => props.setFieldValue("technology", val)}
                  options={technology}
                  isMulti={true}
                />

                <span id="err" className="invalid-feedback">
                  {props.touched.technology && props.errors.technology}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Service Type</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleServiceEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  name="serviceType"
                  onBlur={props.handleBlur}
                  value={props.values.serviceType}
                  className={`my-select${
                    props.touched.serviceType && props.errors.serviceType
                      ? "is-invalid"
                      : props.touched.serviceType && "is-valid"
                  } zIndex`}
                  onChange={(val) => props.setFieldValue("serviceType", val)}
                  options={service}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.serviceType && props.errors.serviceType}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Status</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleStatusEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>

                <Select
                  name="status"
                  onBlur={props.handleBlur}
                  value={props.values.status}
                  className={`my-select${
                    props.touched.status && props.errors.status
                      ? "is-invalid"
                      : props.touched.status && "is-valid"
                  } zIndex`}
                  onChange={(val) => props.setFieldValue("status", val)}
                  options={status}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.status && props.errors.status}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Platform Deduction</label>
                <div className="input-group">
                  <input
                    name="Pdeduction"
                    onBlur={props.handleBlur}
                    type="number"
                    className={`form-control ${
                      props.touched.Pdeduction && props.errors.Pdeduction
                        ? "is-invalid"
                        : props.touched.Pdeduction && "is-valid"
                    }`}
                    value={props.values.Pdeduction}
                    onChange={props.handleChange("Pdeduction")}
                    placeholder="Enter Deduction"
                  />
                  <span className="input-group-text">%</span>
                </div>
                <span id="err" className="invalid-feedback">
                  {props.touched.Rprofit && props.errors.Rprofit}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Other Deductions</label>
                <input
                  name="otherDeduction"
                  onBlur={props.handleBlur}
                  type="number"
                  className={`form-control ${
                    props.touched.otherDeduction && props.errors.otherDeduction
                      ? "is-invalid"
                      : props.touched.otherDeduction && "is-valid"
                  }`}
                  value={props.values.otherDeduction}
                  onChange={props.handleChange("otherDeduction")}
                  placeholder="Enter Other Deductions"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.otherDeduction && props.errors.otherDeduction}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Reserve Profit</label>
                <div className="input-group">
                  <input
                    name="Rprofit"
                    onBlur={props.handleBlur}
                    type="number"
                    className={`form-control ${
                      props.touched.Rprofit && props.errors.Rprofit
                        ? "is-invalid"
                        : props.touched.Rprofit && "is-valid"
                    }`}
                    value={props.values.Rprofit}
                    onChange={props.handleChange("Rprofit")}
                    placeholder="Enter Preserve Profit"
                  />
                  <span className="input-group-text">%</span>
                </div>
                <span id="err" className="invalid-feedback">
                  {props.touched.Rprofit && props.errors.Rprofit}
                </span>
              </div>
            </div>
          </div>

          <div className="container">
            {/* <form>
            <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Fixed Cost</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.fCost}
                  onChange={props.handleChange("fCost")}
                  placeholder="Enter Cost"
                />
                <span id="err">{props.errors.fCost}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Percentage</label>
                <input1
                  type="text"
                  className="form-control"
                  value={props.values.percentage}
                  onChange={props.handleChange("percentage")}
                  placeholder="Enter Percentage"
                />
                <span id="err">{props.errors.percentage}</span>
              </div>
            </div>
            </div>
          </form> */}
          </div>
          <div className="row">
            <div className="col-12">
              <h4 className="mt-0 header-title">Description</h4>
              <Editor
                name="description"
                onBlur={props.handleBlur}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editor"
                editorState={props.values.description}
                onEditorStateChange={(val) => {
                  props.setFieldValue("description", val);
                }}
              />
              <span id="err" className="invalid-feedback">
                {props.touched.description && props.errors.description}
              </span>
            </div>
          </div>
          <div className="PMArea">
            <h4>Project Manager Area</h4>
            <div className="row">
              <div className="col">
                {" "}
                <div className="form-group">
                  <label>PM Start Date</label>
                  <div>
                    <DatePicker
                      name="pmStartDate"
                      onBlur={props.handleBlur}
                      className={`form-control ${
                        props.touched.pmStartDate && props.errors.pmStartDate
                          ? "is-invalid"
                          : props.touched.pmStartDate && "is-valid"
                      }`}
                      selected={props.values.pmStartDate}
                      onChange={(date1) => {
                        props.setFieldValue("pmStartDate", date1);
                        // console.log("datepicker", date1);
                      }}
                    />
                    <span id="err" className="invalid-feedback">
                      {props.touched.pmStartDate && props.errors.pmStartDate}
                    </span>
                  </div>
                </div>{" "}
              </div>
              <div className="col">
                {" "}
                <div className="form-group">
                  <label>PM End Date</label>
                  <div>
                    <DatePicker
                      name="pmEndDate"
                      onBlur={props.handleBlur}
                      selected={props.values.pmEndDate}
                      className={`form-control ${
                        props.touched.pmEndDate && props.errors.pmEndDate
                          ? "is-invalid"
                          : props.touched.pmEndDate && "is-valid"
                      }`}
                      onChange={(date2) => {
                        props.setFieldValue("pmEndDate", date2);
                        // console.log("datepicker", date2);
                      }}
                    />
                    <span id="err" className="invalid-feedback">
                      {props.touched.pmEndDate && props.errors.pmEndDate}
                    </span>
                  </div>
                </div>{" "}
              </div>
            </div>

            <div className="page-content-wrapper">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <table className="table table-striped mb-0">
                      <thead>
                        <tr>
                          <th style={{ fontSize: "17px", fontWeight: "bold" }}>
                            Project Phase
                          </th>
                          <th style={{ fontSize: "17px", fontWeight: "bold" }}>
                            Estimate Hours
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Requirement Analysis</td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[0].estTime}
                              display={(value) => {
                                phases[0].estTime = value;
                                // console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Design</td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[1].estTime}
                              display={(value) => {
                                phases[1].estTime = value;
                                // console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Development </td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[2].estTime}
                              display={(value) => {
                                phases[2].estTime = value;
                                // console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Testing </td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[3].estTime}
                              display={(value) => {
                                phases[3].estTime = value;
                                // console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Implementation </td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[4].estTime}
                              display={(value) => {
                                phases[4].estTime = value;
                                // console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Documentation </td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[5].estTime}
                              display={(value) => {
                                phases[5].estTime = value;
                                // console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Evaluation </td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[6].estTime}
                              display={(value) => {
                                phases[6].estTime = value;
                                // console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>

                        <tr>
                          <td style={{ fontSize: "14px", fontWeight: "bold" }}>
                            Total Est. Hours
                          </td>
                          <td>{totalHours}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="primary-button">
              <Button
                className="mt-3 my-primary-button"
                onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={clientModal}
            toggle={toggleClientEdit}
          >
            <ModalHeader toggle={toggleClientEdit}>New Client</ModalHeader>
            <ModalBody>
              <AddClientForm toggle={toggleClientEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={platformModal}
            toggle={togglePlatformEdit}
          >
            <ModalHeader toggle={togglePlatformEdit}>Add Platform</ModalHeader>
            <ModalBody>
              <AddPlatform toggle={togglePlatformEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={technologyModal}
            toggle={toggleTechnologyEdit}
          >
            <ModalHeader toggle={toggleTechnologyEdit}>
              Add Technology
            </ModalHeader>
            <ModalBody>
              <AddTechnology toggle={toggleTechnologyEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={serviceModal}
            toggle={toggleServiceEdit}
          >
            <ModalHeader toggle={toggleServiceEdit}>Add Service</ModalHeader>
            <ModalBody>
              <AddService toggle={toggleServiceEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={statusModal}
            toggle={toggleStatusEdit}
          >
            <ModalHeader toggle={toggleStatusEdit}>Add Status</ModalHeader>
            <ModalBody>
              <AddStatus toggle={toggleStatusEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={natureModal}
            toggle={toggleNatureEdit}
          >
            <ModalHeader toggle={toggleNatureEdit}>
              Add Project Nature
            </ModalHeader>
            <ModalBody>
              <AddProjectNature toggle={toggleNatureEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={currencyModal}
            toggle={toggleCurrencyEdit}
          >
            <ModalHeader toggle={toggleCurrencyEdit}>
              Add New Currency
            </ModalHeader>
            <ModalBody>
              <AddCurrency toggle={toggleCurrencyEdit} />
            </ModalBody>
          </Modal>
        </div>
      )}
    </Formik>
  );
};

export default ProjectForm;
