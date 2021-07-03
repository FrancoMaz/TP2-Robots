import React, { Component } from 'react';
import {getCoursesList} from "../../utils/ContractHelper";

class CourseList extends Component {

    constructor(props){
        super(props)
        this.handleReturnToHome = this.handleReturnToHome.bind(this)
        this.state = {
            courses: getCoursesList()
        }

    }

    handleReturnToHome() {
        this.props.history.push("/home");
    }

    render(){

        return (
            <div className="base-container">
                <div className="header">Lista de cursos creados</div>
                <div className="content">
                    {this.state.courses}.map((course) =>
                        <div className="course">
                            <div className="course-field">Id: {course.id}</div>
                            <div className="course-field">Nombre: {course.name}</div>
                            <div className="course-field">Profesor: {course.prof}</div>
                            <div className="course-field">Créditos: {course.credits}</div>
                            <div className="course-field">Correlativas: {course.correlatives}</div>
                            <div className="course-field">Activo: {course.active}</div>
                        </div>
                </div>
                <button name="return-to-home" className="button-home" onClick={this.handleReturnToHome}>Volver a la página principal</button>
            </div>

        );
    }
}

export default CourseList
