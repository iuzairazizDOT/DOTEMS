import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";

import shortValidations from "../../../../../validations/short-validations";
import LeaveTypeService from "../../../../../services/LeaveTypeService";
const LeaveTypeForm = (props) => {
  return (
    <Formik
      initialValues={{
        name: props.editable && props.leaveType.name,
        number: props.editable && props.leaveType.totalLeaves,
      }}
      validationSchema={shortValidations.leaveTypeValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? LeaveTypeService.updateLeaveType(props.leaveType._id, {
              name: values.name,
              totalLeaves: values.number,
            })
              .then((res) => {
                props.toggle();
                LeaveTypeService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                LeaveTypeService.handleCustomMessage(err.response.data);
              })
          : LeaveTypeService.addLeaveType({
              name: values.name,
              totalLeaves: values.number,
            })
              .then((res) => {
                props.toggle && props.toggle();
                LeaveTypeService.handleMessage("add");
                actions.setFieldValue("name", "");
                actions.setFieldValue("number", "");
              })
              .catch((err) => {
                LeaveTypeService.handleCustomMessage(err.response.data);
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Leave Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.name}
                    onChange={props.handleChange("name")}
                    placeholder="Enter Leave type"
                  />
                  <span id="err">
                    {props.touched.name && props.errors.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>No Of Leaves</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.number}
                    onChange={props.handleChange("number")}
                    placeholder="Enter No of leaves"
                  />
                  <span id="err">
                    {props.touched.number && props.errors.number}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Button
                  className="mt-3 my-primary-button"
                  onClick={props.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default LeaveTypeForm;