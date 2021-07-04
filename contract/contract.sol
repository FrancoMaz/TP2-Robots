pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

import "./ownable.sol";
import "./credits.sol";

//TODO:
// 1) Validaciones al crear y editar un curso

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
    mapping (address => mapping (uint => Approval)) public studentAddressToApprovals;
    mapping (uint => mapping (address => Approval)) public courseIdToApprovals;
    
    Course[] courses;

    function _existsCourse(uint _id) private view returns (bool) {
        for (uint i = 0; i < courses.length; i++) {
            if (courses[i].id == _id) {
                return true;
            }
        }
        return false;
    }
    
    function getCourses() public view returns (Course[] memory) {
        return courses;
    }
    

    function createOrEditCourse(uint _id, string memory _name, address _prof, uint _credits, uint[] memory _correlatives, bool _active) public payable {
        if (_existsCourse(_id)) {
            editCourse(_id, _name, _prof, _credits, _correlatives, _active);
        } else {
            createCourse(_id, _name, _prof, _credits, _correlatives, _active);
        }
    }
    
    function createCourse(uint _id, string memory _name, address _prof, uint _credits, uint[] memory _correlatives, bool _active) private {
        idToCourse[_id] = Course(_id, _name, _prof, _credits, _correlatives, _active);
        courseToOwner[_id] = msg.sender;
        courses.push(Course(_id, _name, _prof, _credits, _correlatives, _active));
    }
    
    function editCourse(uint _id, string memory _name, address _prof, uint _credits, uint[] memory _correlatives, bool _active) private {
        Course storage courseToChange = idToCourse[_id];
        courseToChange.name = _name;
        courseToChange.prof = _prof;
        courseToChange.credits = _credits;
        courseToChange.correlatives = _correlatives;
        courseToChange.active = _active;
    }
    
    function transferOwnership(address _newOwner, uint _courseId) public onlyOwner {
        require(courseToOwner[_courseId] == msg.sender);
        courseToOwner[_courseId] = _newOwner;
    }
    
    function approveStudentPartial(address _student, uint _courseId) public payable {
        require(msg.sender == idToCourse[_courseId].prof);
        require(correlativesApproved(_student, _courseId));
        Approval memory approval = Approval(_courseId, _student, true, 0, now);
        studentAddressToApprovals[_student][_courseId] = approval;
        courseIdToApprovals[_courseId][_student] = approval;
        emit StudentApproved(_student, _courseId, true);
    }
    
    function approveStudentTotal(address _student, uint _courseId, uint _rate) public payable {
        require(msg.sender == idToCourse[_courseId].prof);
        require(correlativesApproved(_student, _courseId));
        require(_rate >= minRate && _rate <= maxRate);
        Approval memory approval = Approval(_courseId, _student, false, _rate, now);
        studentAddressToApprovals[_student][_courseId] = approval;
        courseIdToApprovals[_courseId][_student] = approval;
        generateToken(_student, idToCourse[_courseId].credits);
        emit StudentApproved(_student, _courseId, false);
    }
    
    function correlativesApproved(address _student, uint _courseId) private view returns (bool) {
        uint approved = 0;
        for (uint i = 0; i < idToCourse[_courseId].correlatives.length; i++) {
            if (!(studentAddressToApprovals[_student][idToCourse[_courseId].correlatives[i]].rate >= minRate)) {
                approved++;
            }
        }
        if (approved == idToCourse[_courseId].correlatives.length) {
            return true;
        }
        return false;
    }
    
    function getApprovalsByStudent(address _student) public view returns (Approval[] memory) {
        Approval[] memory result = new Approval[](courses.length);
        uint counter = 0;
        for (uint i = 0; i < courses.length; i++) {
            uint courseId = courses[i].id;
          if (studentAddressToApprovals[_student][courseId].student == _student) {
            result[counter] = studentAddressToApprovals[_student][courseId];
            counter++;
          }
        }
        return result;
    }
    
    function verifyPartialApprovalForStudent(uint _courseId, address _student) public {
        require(msg.sender == idToCourse[_courseId].prof);
        if (courseIdToApprovals[_courseId][_student].partialApproval && now >= (courseIdToApprovals[_courseId][_student].approvalDate + 548 days)) {
            delete studentAddressToApprovals[_student][_courseId];
            delete courseIdToApprovals[_courseId][_student];
        }
        
    }
    
    function editMinRate(uint _minRate) public {
        minRate = _minRate;
    }
    
    function editMaxRate(uint _maxRate) public {
        maxRate = _maxRate;
    }
    
}