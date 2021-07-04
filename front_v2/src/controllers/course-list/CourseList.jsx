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
        return (
            <div className="base-container">
                <div className="header">Lista de cursos creados</div>
                <div className="content">
                        <div className="course">
                            <div className="course-field">Id: {this.state.course}</div>
                        </div>
                </div>
                <button name="return-to-home" className="button-home" onClick={this.handleReturnToHome}>Volver a la página principal</button>
            </div>

        );
    }
}

export default CourseList
