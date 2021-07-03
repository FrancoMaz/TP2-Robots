import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Home} from "../controllers/home/Home";
import CreateCourse from "../controllers/create-course/CreateCourse";
import CourseList from "../controllers/course-list/CourseList";
import ApproveStudent from "../controllers/approve-student/ApproveStudent";
import VerifyStudentState from "../controllers/verify-student-state/VerifyStudentState";
import { App } from '../controllers/App';

class Routes extends Component {
    render() {
        return (
            <Router key="router">
                <Route exact path={"/"} component={App}/>
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
