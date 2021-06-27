pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

import "./ownable.sol";
import "./credits.sol";

//TODO:
// 1) El owner debe poder modificar el minRate y el maxRate
// 2) Solo el profesor puede remover un curso de la cuenta del alumno
// 3) Remover el curso de la cuenta del alumno si paso 1 anio y medio despues de que aprobo la cursada pero no aprobo el final
// 4) Validaciones al crear y editar un curso

contract Class is Ownable, Credits {
    
    event StudentApproved(address student, uint courseId, bool partialApproval);
    
    uint minRate = 4;
    uint maxRate = 10;
    
    struct Course {
        uint id;
        string name;
        address prof;
        uint credits;
        uint[] correlatives;
        bool active;
    }
    
    struct Approval {
        uint courseId;
        address student;
        bool partialApproval;
        uint rate;
        uint approvalDate;
    }
    
    mapping (uint => address) public courseToOwner;
    mapping (uint => Course) public idToCourse;
    mapping (address => Approval[]) public studentAddressToApprovals;
    mapping (uint => Approval[]) public courseIdToApprovals;

    function createCourse(uint _id, string memory _name, address _prof, uint _credits, uint[] memory _correlatives) public {
        idToCourse[_id] = Course(_id, _name, _prof, _credits, _correlatives, true);
        courseToOwner[_id] = msg.sender;
    }
    
    function editCourse(uint _id, string memory _name, address _prof, uint _credits, uint[] memory _correlatives, bool _active) public {
        Course storage courseToChange = idToCourse[_id];
        courseToChange.name = _name;
        courseToChange.prof = _prof;
        courseToChange.credits = _credits;
        courseToChange.correlatives = _correlatives;
        courseToChange.active = _active;
    }
    
    function approveStudentPartial(address _student, uint _courseId) public {
        require(msg.sender == idToCourse[_courseId].prof);
        require(correlativesApproved(_student, _courseId));
        studentAddressToApprovals[_student].push(Approval(_courseId, _student, true, 0, now));
        courseIdToApprovals[_courseId].push(Approval(_courseId, _student, true, 0, now));
        emit StudentApproved(_student, _courseId, true);
    }
    
    function approveStudentTotal(address _student, uint _courseId, uint _rate) public {
        require(msg.sender == idToCourse[_courseId].prof);
        require(correlativesApproved(_student, _courseId));
        require(_rate >= minRate && _rate <= maxRate);
        for (uint i = 0; i < studentAddressToApprovals[_student].length; i++) {
            if (studentAddressToApprovals[_student][i].courseId == _courseId) {
                studentAddressToApprovals[_student][i].partialApproval = false;
                studentAddressToApprovals[_student][i].rate = _rate;
            }
        }
        for (uint i = 0; i < courseIdToApprovals[_courseId].length; i++) {
            if (courseIdToApprovals[_courseId][i].student == _student) {
                courseIdToApprovals[_courseId][i].partialApproval = false;
                courseIdToApprovals[_courseId][i].rate = _rate;
            }
        }
        generateToken(_student, idToCourse[_courseId].credits);
        emit StudentApproved(_student, _courseId, false);
    }
    
    function correlativesApproved(address _student, uint _courseId) private view returns (bool) {
        uint approved = 0;
        for (uint i = 0; i < idToCourse[_courseId].correlatives.length; i++) {
            for (uint j = 0; j < studentAddressToApprovals[_student].length; j++) {
                if (studentAddressToApprovals[_student][j].courseId == idToCourse[_courseId].correlatives[i]) {
                    approved++;
                }
            }
        }
        if (approved == idToCourse[_courseId].correlatives.length) {
            return true;
        }
        return false;
    }
    
    //Funcion para verificar el estado del alumno en todas las materias
    function getApprovalsByStudent(address _student) public view returns (Approval[] memory) {
        return studentAddressToApprovals[_student];
    }
    
    function verifyPartialApprovalForStudent(uint _courseId) public {
        Approval[] memory approvalsForCourse = courseIdToApprovals[_courseId];
        for (uint i = 0; i < approvalsForCourse.length; i++) {
            if (approvalsForCourse[i].partialApproval && now >= (approvalsForCourse[i].approvalDate + 548 days)) {
                 //TODO: remover curso para alumno
            }
        }
        
    }
    
}