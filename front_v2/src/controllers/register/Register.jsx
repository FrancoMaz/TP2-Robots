import React, { Component } from 'react';
import "./register.scss";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import tokenChecker from '../../utils/TokenChecker';
import validate from '../../utils/RegisterValidator';
import { withSnackbar } from 'notistack';

 class Register extends Component {

  constructor(props){
    super(props)
    this.state = {
      errors:{}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApiResponse = this.handleApiResponse.bind(this);
    this.handleAlertStatus = this.handleAlertStatus.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputChange(event) {
    const input = event.target;
    this.setState({[input.name]: input.value});
  }

  handleApiResponse(response) {
    if (response.error) {
      this.handleAlertStatus(response.error, 'error' )
    } 
    else {
        this.handleAlertStatus(response.msg, 'success' )
        this.props.history.push("/home");
    }
  }

   handleAlertStatus = (message, status) => {
    this.props.enqueueSnackbar(message, {variant: status})
  }

  handleSubmit() {
    console.log("formulario valido")
    const url =`https://facade-server-develop.herokuapp.com/admins`
    const requestConfig = {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name,
          surname: this.state.surname,
          dni: this.state.dni,
          email: this.state.email, 
          password: this.state.password
        }),
        headers: {
          'Content-Type': 'application/json',
      }
    };
    fetch(url, requestConfig).then(response => response.json()).then(this.handleApiResponse);
  }

  render(){
    const { errors } = this.state

    return (
      <div className="base-container">
          <div className="header">Crear nuevo administrador</div>
          <div className="content">
            <div className="form">
              <div className="form-group">
                <TextField type="text" name="name"  pattern="[0-9]+" id="register-id" label="ID de curso" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <TextField type="text" name="surname" id="register-name" label="Nombre del curso" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <TextField type="text" name="address" id="register-dni" label="Address del curso" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <TextField type="text" pattern="[0-9]+" name="credits" id="register-email" label="Créditos" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <TextField type="text" name="correlatives" id="register-correlatives" label="Ingrese correlativas separado por coma" variant="outlined" onChange={this.handleInputChange} />
              </div>
              <button className=" button button-intro" onClick={this.handleSubmit}>Crear</button>
            </div>
          </div>
      </div>
    );
  }
};

export default withSnackbar(Register)