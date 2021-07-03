import React, { Component } from 'react';
import "./home.scss";

export class Home extends Component {

    constructor(props){
        super(props)
        this.handleListCourses = this.handleListCourses.bind(this)
        this.handleCreateCourse = this.handleCreateCourse.bind(this)
        this.handleApproveStudent = this.handleApproveStudent.bind(this)
        this.handleVerifyStudentState = this.handleVerifyStudentState.bind(this)
    }

    handleListCourses(){
        this.props.history.push("/list-courses");
    }

    handleCreateCourse(){
        this.props.history.push("/create-course");
    }

    handleApproveStudent(){
        this.props.history.push("/approve-student");
    }

    handleVerifyStudentState() {
        this.props.history.push("/verify-student-state");
    }

    render() {
        return (
          <div className="container-home">
            <div className="base-container">
                <div className="admin-options">
                    <button name="list-courses" className="button-home" onClick={this.handleListCourses}>Listar cursos</button>
                    <button name="create-course" className="button-home" onClick={this.handleCreateCourse}>Crear/Modificar curso</button>
                    <button name="approve-student" className="button-home" onClick={this.handleApproveStudent}>Aprobar alumno</button>
                    <button name="verify-student-state" className="button-home" onClick={this.handleVerifyStudentState}>Verificar estado alumno</button>
                </div>
            </div>
          </div>
        );
    }
}
