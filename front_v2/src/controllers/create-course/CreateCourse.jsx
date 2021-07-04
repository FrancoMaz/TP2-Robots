import React, { Component } from 'react';
import "./create-course.scss";
import TextField from '@material-ui/core/TextField';
import {createOrEditCourse} from "../../utils/ContractHelper";

class CreateCourse extends Component {

  constructor(props){
    super(props)
    this.state = {
      errors:{}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturnToHome = this.handleReturnToHome.bind(this);
  }

  handleInputChange(event) {
    const input = event.target;
    this.setState({[input.name]: input.value});
  }

  handleSubmit() {
      createOrEditCourse({
        id: this.state.id
      }).then(r => console.log(r));
  }

  handleReturnToHome() {
      this.props.history.push("/home");
  }

  render(){

    return (
      <div className="base-container">
          <div className="header">Crear/Modificar curso</div>
          <div className="content">
            <div className="form">
              <div className="form-group">
                <TextField type="text" name="id"  pattern="[0-9]+" id="course-id" label="ID" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <TextField type="text" name="name" id="course-name" label="Nombre" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <TextField type="text" name="prof" id="course-prof" label="Address del profesor" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <TextField type="text" pattern="[0-9]+" name="credits" id="course-credits" label="Créditos" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <TextField type="text" name="correlatives" id="course-correlatives" label="Id de correlativas separados por coma" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <TextField type="text" name="active" id="course-active" label="Curso activado" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <button className="button" onClick={this.handleSubmit}>Crear/Modificar</button>
            </div>
          </div>
          <button name="return-to-home" className="button" onClick={this.handleReturnToHome}>Volver a la página principal</button>
      </div>

  );
  }
}

export default (CreateCourse)
