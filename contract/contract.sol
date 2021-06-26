pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";

contract class is Ownable {
    
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
        bool partialApproval;
        uint rate;
        uint approvalDate;
    }
    
    Course[] public courses;
    
    mapping (uint => address) public courseToOwner;
    mapping (string => address) public profNameToAddress;
    mapping (address => mapping (uint => Approval)) public studentAddressAndCourseIdToApproval;
    mapping (uint => Approval[]) public courseIdToApprovals;

    function createCourse(uint _id, string memory _name, string memory _prof, uint _credits, uint[] memory _correlatives) public {
        courses.push(Course(_id, _name, profNameToAddress[_prof], _credits, _correlatives, true));
        courseToOwner[_id] = msg.sender;
    }
    
    function editCourse(uint _id, string memory _name, string memory _prof, uint _credits, uint[] memory _correlatives, bool _active) public {
        require(msg.sender == courses[_id].prof);
        Course storage courseToChange = courses[_id];
        courseToChange.name = _name;
        courseToChange.prof = profNameToAddress[_prof];
        courseToChange.credits = _credits;
        courseToChange.correlatives = _correlatives;
        courseToChange.active = _active;
    }
    
    function approveStudent(address _student, uint _courseId, bool _partialApproval, uint _rate) public {
        require(msg.sender == courses[_courseId].prof);
        if (_partialApproval) {
            //TODO: verificar como hacer para que newApproval sea modificado en todos los mappings en los que esta
            Approval memory newApproval = Approval(_partialApproval, 0, now);
            studentAddressAndCourseIdToApproval[_student][_courseId] = newApproval;
            courseIdToApprovals[_courseId].push(newApproval);
        } else {
            require(_rate >= minRate && _rate <= maxRate);
            Approval memory studentApprovalForCourse = studentAddressAndCourseIdToApproval[_student][_courseId];
            studentApprovalForCourse.partialApproval = false;
            studentApprovalForCourse.rate = _rate;
            //TODO: agregar token para creditos
        }
        //TODO: enviar evento de aprobacion de la materia
    }
    
    function verifyStudentState(address _student) public {
        
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