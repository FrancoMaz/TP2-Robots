import React, { Component } from 'react';
import {getCoursesList} from "../../utils/ContractHelper";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Container from '@material-ui/core/Container';
import TableBody from '@material-ui/core/TableBody'
import "./course-list.scss"


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


class CourseList extends Component {

    constructor(props){
        super(props)
        this.handleReturnToHome = this.handleReturnToHome.bind(this)
        this.state = {
            courses: null
        }
    }

    getList() {
        var that = this;
        getCoursesList().then(r => {
            console.log('lista de cursos',r)
            this.setState({courses: r})
        })
    }

    componentDidMount() {
        this.getList();
    }

    handleReturnToHome() {
        this.props.history.push("/home");
    }

    render(){
        const courses = this.state.courses
        return (
          <div>
            <div className="course-list">
              <Container maxWidth="lg">
              {courses && courses.length !== 0 ? (
                <TableContainer component={Paper}>
                  <Table className="table" aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Id</StyledTableCell>
                        <StyledTableCell align="center">Nombre</StyledTableCell>
                        <StyledTableCell align="center">Profesor address&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Créditos</StyledTableCell>
                        <StyledTableCell align="center">Correlativas</StyledTableCell>
                        <StyledTableCell align="center">Activo</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {courses.map(course => (
                        <StyledTableRow key={course.id}>
                          <StyledTableCell component="th" scope="row">{course.id}</StyledTableCell>
                          <StyledTableCell align="center">{course.name}</StyledTableCell>
                          <StyledTableCell align="center">{course.prof}</StyledTableCell>
                          <StyledTableCell align="center">{course.credits}</StyledTableCell>
                          <StyledTableCell align="center">{course.correlatives.length > 0 ? course.correlatives.join(', ') : ""}</StyledTableCell>
                          <StyledTableCell align="center">{course.active ? "Sí" : "No"}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>) : <h1 className="non-courses">No hay cursos</h1>}
                <button name="return-to-home" className="button" onClick={this.handleReturnToHome}>Volver a la página principal</button>
              </Container>
            </div>
          </div>
        );
    }
}

export default CourseList
