import React, { Component } from 'react';
import {checkStudentState} from "../../utils/ContractHelper";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Container from '@material-ui/core/Container';
import TableBody from '@material-ui/core/TableBody'
import Moment from 'moment';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

class VerifyStudentState extends Component {

    constructor(props){
        super(props)
        this.handleReturnToHome = this.handleReturnToHome.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            approvals: null
        }
    }

    handleReturnToHome() {
        this.props.history.push("/home");
    }

    handleInputChange(event) {
        const input = event.target;
        this.setState({[input.name]: input.value});
    }

    handleSubmit() {
        this.getList()
        this.state = {
            approvals: checkStudentState(this.state.studentAddress)
        }
    }

    getList() {
        var that = this;
        checkStudentState(this.state.studentAddress).then(r => {
          console.log('verifyStudentState: ', r)
            that.setState({
                approvals: r
            })
        })
    }

    render(){
        const approvals = this.state.approvals
        return (
            <div className="base-container">
                <div className="header">Verificar estado de alumno</div>
                <div className="form">
                    <div className="form-group">
                        <TextField type="text" name="studentAddress" id="student-address" label="Address del alumno" variant="outlined" onChange={this.handleInputChange} />
                    </div>
                    <button className="button" onClick={this.handleSubmit}>Verificar estado del alumno</button>
                </div>
                {approvals ? (
                      <div>
                        <div className="course-list">
                          <Container maxWidth="lg">
                            <TableContainer component={Paper}>
                              <Table className="table" aria-label="customized table">
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell align="center">Curso</StyledTableCell>
                                    <StyledTableCell align="center">Estado</StyledTableCell>
                                    <StyledTableCell align="center">Nota</StyledTableCell>
                                    <StyledTableCell align="center">Fecha de aprobación</StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {approvals.map(approval => (
                                    approval.courseId !== '0' ?
                                    <StyledTableRow key={approval.courseId}>
                                      <StyledTableCell component="th" scope="row">{approval.courseId}</StyledTableCell>
                                      <StyledTableCell align="center">{approval.partialApproval? "solo cursada" : "aprobado"}</StyledTableCell>
                                      <StyledTableCell align="center">{approval.rate > 0 ? approval.rate : "-"}</StyledTableCell>
                                      <StyledTableCell align="center">{Moment(Number(approval.approvalDate)*1000,).format("DD MMM YYYY")}</StyledTableCell>
                                    </StyledTableRow> : null 
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <button name="return-to-home" className="button" onClick={this.handleReturnToHome}>Volver a la página principal</button>
                          </Container>
                        </div>
                      </div>) : <h1 className="non-courses">No hay resultados</h1>}
            </div>
        );
    }
}

export default VerifyStudentState
