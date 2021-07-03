import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Home} from "../controllers/home/Home";
import loadTp from '../utils/AppHelper';
import CreateCourse from "../controllers/create-course/CreateCourse";
import CourseList from "../controllers/course-list/CourseList";
import ApproveStudent from "../controllers/approve-student/ApproveStudent";
import VerifyStudentState from "../controllers/verify-student-state/VerifyStudentState";

class Routes extends Component {
    render() {
        return (
            <Router key="router">
                <Route exact path={"/"} render={props => loadTp ?
                    <Redirect to={{pathname: "/home"}}/> :
                   ''
                }/>
                <Route exact path={"/home"} component={Home}/>
                <Route exact path={"/list-courses"} component={CourseList}/>
                <Route exact path={"/create-course"} component={CreateCourse}/>
                <Route exact path={"/approve-student"} component={ApproveStudent}/>
                <Route exact path={"/verify-student-state"} component={VerifyStudentState}/>
            </Router>
        )
    }
}

export default Routes;
