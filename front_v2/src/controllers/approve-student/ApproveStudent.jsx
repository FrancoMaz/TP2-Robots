import React, { Component } from 'react';
import "./approve-student.scss";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {approveStudent} from "../../ContractHelper";

class ApproveStudent extends Component {

  constructor(props){
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturnToHome = this.handleReturnToHome.bind(this);

  }

  handleInputChange(event) {
    const input = event.target;
    this.setState({[input.name]: input.value});
  }

  handleSubmit() {
    approveStudent(this.state.studentAddress, this.state.courseId, this.state.partialApproval, this.state.rate)
  }

  handleReturnToHome() {
    this.props.history.push("/home");
  }

  render(){
    return (
      <div>
        <div className="base-container">
            <div className="header">Aprobar alumno</div>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <TextField type="text" name="courseId"  pattern="[0-9]+" id="course-id" label="ID del curso" variant="outlined" onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <TextField type="text" name="studentAddress" id="student-address" label="Address del alumno" variant="outlined" onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <Select
                      name="partialApproval"
                      labelId="approval-type"
                      id="approval-type"
                      onChange={this.handleInputChange}>
                    <MenuItem value={true}>Solo cursada</MenuItem>
                    <MenuItem value={false}>Aprobado</MenuItem>
                  </Select>
                </div>
                <div className="form-group">
                  <TextField type="text" pattern="[0-9]+" name="rate" id="rate" label="Nota" variant="outlined" onChange={this.handleInputChange} />
                </div>
                <button className="button" onClick={this.handleSubmit}>Aprobar alumno</button>
              </div>
            </div>
        </div>
        <button name="return-to-home" className="button-home" onClick={this.handleReturnToHome}>Volver a la página principal</button>
      </div>
    );
  }
}
export default (ApproveStudent)
