import React, { Component } from 'react';
import {checkStudentState} from "../../utils/ContractHelper";
import TextField from '@material-ui/core/TextField';

class VerifyStudentState extends Component {

    constructor(props){
        super(props)
        this.handleReturnToHome = this.handleReturnToHome.bind(this)

    }

    handleReturnToHome() {
        this.props.history.push("/home");
    }

    handleInputChange(event) {
        const input = event.target;
        this.setState({[input.name]: input.value});
    }

    handleSubmit() {
        this.state = {
            studentApprovals: checkStudentState(this.state.studentAddress)
        }
    }

    render(){

        return (
            <div className="base-container">
                <div className="header">Verificar estado de alumno</div>
                <div className="form">
                    <div className="form-group">
                        <TextField type="text" name="studentAddress" id="student-address" label="Address del alumno" variant="outlined" onChange={this.handleInputChange} />
                    </div>
                    <button className="button" onClick={this.handleSubmit}>Verificar estado del alumno</button>
                </div>
                <div className="content">
                    {this.state.approvals.map(approval =>
                    <div className="approval">
                        <div className="approval-field">Curso: {approval.courseId}</div>
                        <div className="approval-field">Estado: {approval.partialApproval ? "Solo cursada" : "Aprobado"}</div>
                        <div className="course-field">Nota: {approval.rate}</div>
                        <div className="course-field">Fecha de aprobación: {approval.approvalDate}</div>
                    </div>)}
                </div>
                <button name="return-to-home" className="button-home" onClick={this.handleReturnToHome}>Volver a la página principal</button>
            </div>

        );
    }
}

export default VerifyStudentState
