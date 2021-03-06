import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import LeaveForm from "../LeaveForm/LeaveForm";

const NewLeave = () => {
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">Add New Leave</h4>
                  <p className="text-muted m-b-30 font-14">
                    Please fill the form below to apply for leave.
                  </p>
                  <LeaveForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default NewLeave;
