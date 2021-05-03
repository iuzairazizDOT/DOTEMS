import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import ClientValidation from "../../../validations/client-validations";
import { Progress, Button } from "reactstrap";
import ClientsForm from "../Client/ClientsForm";

class ViewClients extends Component {
  render() {
    const data = {
      columns: [
        {
          label: "Client Name",
          field: "clientName",
          sort: "asc",
          width: 125,
        },
        {
          label: "Company Name",
          field: "companyName",
          sort: "asc",
          width: 125,
        },
        {
          label: "Email",
          field: "Email",
          sort: "disabled",
          width: 200,
        },
        {
          label: "Address",
          field: "Address",
          sort: "disabled",
          width: 200,
        },
        {
          label: "Contact Number",
          field: "contactNum",
          sort: "disabled",
          width: 125,
        },
        {
          label: "Contact Number",
          field: "otherContact",
          sort: "disabled",
          width: 125,
        },
        {
          label: "URL",
          field: "URL",
          sort: "disabled",
          width: 150,
        },
        {
          label: "Country",
          field: "country",
          sort: "asc",
          width: 75,
        },
        {
          label: "Action",
          field: "action",
          sort: "disabled",
          width: 150,
        },
      ],
      rows: [
        {
          title: "Tiger Nixon",
          project: "System Architect",
          estimatedHrs: "Edinburgh",
          projectRatio: (
            <Progress color="teal" value="60">
              60%
            </Progress>
          ),
          status: <span className="badge badge-teal">Done</span>,
          parentTask: "2011/04/25",
          addedBy: "2011/04/25",
          Country: "Pakistan",
          action: (
            <div className="row">
              <div className="col">
                <Button
                  color="info"
                  size="sm"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Edit
                </Button>
              </div>
              <div className="col">
                <Button color="danger" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          ),
        },
      ],
    };
    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Clients</h4>

                    <MDBDataTable bordered hover data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="myModal"
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                  Edit Client
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <ClientsForm />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary waves-effect"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
}

export default ViewClients;
