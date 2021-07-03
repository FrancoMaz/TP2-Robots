import React, { Component } from 'react';
import "./home.scss";

export class Home extends Component {

    constructor(props){
        super(props)
        this.handleCreateAdmin = this.handleCreateAdmin.bind(this)
    }

    handleCreateAdmin(){
        console.log(window.contract)
        this.props.history.push("/register");
    }

    render() {
        return (
          <div className="container-home">
            <div className="base-container">
                <div className="header">¡Bienvenido a Bookbnb Admin!</div>
                <div className="admin-options">
                    <button name="newAdmin"className="button-home button-home-intro" onClick={this.handleCreateAdmin}>Dar de alta un curso</button>
                    <button name="publications" className="button-home button-home-intro" onClick={this.handleViewPublications}>Ver cursos</button>
                    <button name="users"className="button-home button-home-intro " onClick={this.handleViewUsers}>Listar usuarios</button>
                </div>
            </div>
          </div>
        );
    }
}
