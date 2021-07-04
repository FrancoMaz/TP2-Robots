import React, { Component } from 'react';
import {getCoursesList} from "../../utils/ContractHelper";

class CourseList extends Component {

    constructor(props){
        super(props)
        this.handleReturnToHome = this.handleReturnToHome.bind(this)
        this.state = {
            course: null
        }
    }

    getList() {
        var that = this;
        getCoursesList().then(r => {
            that.setState({
                course: r
            })
        })
    }

    handleReturnToHome() {
        this.props.history.push("/home");
    }

    render(){
        this.getList()
        return this.state.course ? (
            <div className="base-container">
                <div className="header">Lista de cursos creados</div>
                <div className="content">
                        <div className="course">
                            <div className="course-field">Id: {this.state.course[0].id}</div>
                            <div className="course-field">Nombre: {this.state.course[0].name}</div>
                            <div className="course-field">Profesor: {this.state.course[0].prof}</div>
                            <div className="course-field">Créditos: {this.state.course[0].credits}</div>
                            <div className="course-field">Correlativas: {this.state.course[0].correlatives}</div>
                            <div className="course-field">Activo: {this.state.course[0].active}</div>
                        </div>
                </div>
                <button name="return-to-home" className="button-home" onClick={this.handleReturnToHome}>Volver a la página principal</button>
            </div>
        ) : null;
    }
}

export default CourseList
