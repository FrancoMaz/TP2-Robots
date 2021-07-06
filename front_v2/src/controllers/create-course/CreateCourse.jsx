import React, { Component } from 'react';
import "./create-course.scss";
import TextField from '@material-ui/core/TextField';
import {createOrEditCourse} from "../../utils/ContractHelper";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

const classes = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

class CreateCourse extends Component {

  constructor(props){
    super(props)
    this.state = {
      errors:{},
      active:'true',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturnToHome = this.handleReturnToHome.bind(this);
    this.handleAlertStatus = this.handleAlertStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({active: event.target.value});
  };

  
  handleInputChange(event) {
    const input = event.target;
    this.setState({[input.name]: input.value});
  }

  handleSubmit() {
      let correlatives = this.state.correlatives || '';
      console.log('submit',this.state.active)
      createOrEditCourse({
        id: this.state.id,
        name: this.state.name,
        prof: this.state.prof,
        credits: this.state.credits,
        correlatives: correlatives.split(',').map(c => parseInt(c)),
        active: this.state.active
      }).then(r => console.log(r));
  }

  handleReturnToHome() {
      this.props.history.push("/home");
  }

  handleAlertStatus = (message, status) => {
    this.props.enqueueSnackbar(message, {variant: status})
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
              <div>
                <label>
                  Curso activo?
                </label>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
        
                    value={this.state.active}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={'true'}>Si</MenuItem>
                    <MenuItem value={'false'}>No</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <button className="button" onClick={this.handleSubmit}>Crear/Modificar</button>
            </div>
            <button name="return-to-home" className="button" onClick={this.handleReturnToHome}>Volver a la página principal</button>
          </div>
          
      </div>

  );
  }
}

export default (CreateCourse)
