import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import ProjectPaymentsForm from "../ProjectPaymentsForm/ProjectPaymentsForm";

class AddProjectPayments extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <h4 className="mb-4 p-0">Add Projects' Payment</h4>
                    <ProjectPaymentsForm
                      projectpaymentid={
                        this.props.location.state
                          ? this.props.location.state.detail
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
}

export default AddProjectPayments;
