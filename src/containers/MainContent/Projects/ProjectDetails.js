import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link } from 'react-router-dom';


const ProjectDetails = (props) =>{
 
{
    console.log("props", props.location.projectProps)
    const project = props.location.projectProps;
    console.log("Project Name", project.name)

    return(
           <AUX>
                <div className="page-content-wrapper">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="card m-b-20">
                                    <div className="card-body">

                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Project Name</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" id="example-text-input"  value={project.name} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Client Name</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text"  id="example-text-input" value={project.client.name} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Order Number</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" id="example-text-input" value={project.orderNum} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Platform</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text"  id="example-text-input" value={project.platform.name} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Technology </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text"  id="example-text-input" value={project.technology.name} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Service Type </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" id="example-text-input" value={project.service.name} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Status </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" id="example-text-input" value={project.status.name} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Project Nature</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text"  id="example-text-input" value={project.nature.name} readOnly = {true}/>
                                            </div>
                                        </div>
                                        {/* <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Status </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text"   id="example-text-input" value={project.name}/>
                                            </div>
                                        </div> */}
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Client Start Date </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" id="example-text-input" value={project.cStartDate} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Client Deadline </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text"  id="example-text-input" value={project.cEndDate} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">PM Start Date </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text"  id="example-text-input" value={project.pmStartDate} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">PM End Date </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text"  id="example-text-input" value={project.pmEndDate} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Project Manager </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" id="example-text-input" value={project.projectManager.name} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Team Members </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" id="example-text-input" value={project.assignedUser.map((item)=>{
                                                        return item.name
                                                })} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Cost </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text"  id="example-text-input" value={project.cost} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Currency </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" id="example-text-input" value={project.currency.name} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Platform Deduction </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" id="example-text-input" value={project.Pdeduction} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Reserve Profit </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text"  id="example-text-input" value={project.Rprofit} readOnly = {true}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                        <label>Description</label>
                                        <div>
                                            <textarea  className="form-control" rows="5"></textarea>
                                        </div>
                                    </div>
                                       
                                        
                                       
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

export default ProjectDetails;   