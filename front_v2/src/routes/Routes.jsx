import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Home} from "../controllers/home/Home";
import Register from "../controllers/register/Register";
import { App } from '../controllers/App';


class Routes extends Component {
    render() {
        return (
            <Router key="router">
                <Route exact path={"/"} component={App}/>
                <Route exact path={"/home"} component={Home}/>
                <Route exact path={"/register"} component={Register}/>
            </Router>
        )
    }
}

export default Routes;