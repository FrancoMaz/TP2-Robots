import React, { Component } from 'react';
import {getCoursesList} from "../../utils/ContractHelper";

class CourseList extends Component {

    constructor(props){
        super(props)
        this.handleReturnToHome = this.handleReturnToHome.bind(this)
        this.state = {
            courses: null
        }
    }

    getList() {
        var that = this;
        getCoursesList().then(r => {
            that.setState({
                courses: r
            })
        })
    }

    handleReturnToHome() {
        this.props.history.push("/home");
    }

    render(){
        this.getList()
        return this.state.courses ? (
            <div className="base-container">
                <div className="header">Lista de cursos creados</div>
                <div className="content">
                    {this.state.courses.map(course =>
                        <div className="course">
                            <div className="course-field">Id: {course.id}</div>
                            <div className="course-field">Nombre: {course.name}</div>
                            <div className="course-field">Profesor: {course.prof}</div>
                            <div className="course-field">Créditos: {course.credits}</div>
                            <div className="course-field">{course.correlatives.length > 0 ? "Correlativas: " + course.correlatives.join(', ') : ""}</div>
                            <div className="course-field">Activo: {course.active ? "Sí" : "No"}</div>
                        </div>)}
                </div>
                <button name="return-to-home" className="button-home" onClick={this.handleReturnToHome}>Volver a la página principal</button>
            </div>
        ) : null;
    }
}

export default CourseList
