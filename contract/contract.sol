pragma solidity >=0.5.0 <0.6.0;

contract class is Ownable {
    
    uint minRate = 4;
    uint maxRate = 10;
    
    struct Course {
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

    function createCourse(string _name, string _prof, uint _credits, uint[] _correlatives) public {
        require(_name != '' && _prof != '' && _credits != ''); //TODO: Ver el tema de validacion de correlativas
        courses.push(Course(_name, profNameToAddress[_prof], _credits, _correlatives, true));
        courseToOwner[_id] = msg.sender;
    }
    
    function editCourse(uint _id, string _name, string _prof, uint _credits, uint[] _correlatives, bool active) public {
        Course courseToChange = courses[_id];
        if (_name != '') {
            courseToChange.name = _name;
        }
        if (_prof != '') {
            courseToChange.prof = profNameToAddress[_prof];
        }
        if (_credits != '') {
            courseToChange.credits = _credits;
        }
        if (_correlatives != '') {
            courseToChange.correlatives = _correlatives;
        }
        if (_active != '') {
            courseToChange.active = _active;
        }
    }
    
    function approveStudent(address _student, uint _courseId, bool _partialApproval, uint _rate) public {
        if (_partialApproval) {
            //TODO: verificar como hacer para que newApproval sea modificado en todos los mappings en los que esta
            Approval newApproval = Approval(_partialApproval, 0, now);
            studentAddressAndCourseIdToApproval[_student][_courseId] = newApproval;
            courseIdToApprovals[_courseId].push(newApproval);
        } else {
            require(_rate >= minRate && _rate <= maxRate);
            Approval studentApprovalForCourse = studentAddressAndCourseIdToApproval[_student][_courseId];
            studentApprovalForCourse.partialApproval = false;
            studentApprovalForCourse.rate = _rate;
            //TODO: agregar token para creditos
        }
        //TODO: enviar evento de aprobacion de la materia
    }
    
    function verifyStudentState(address _student) public {
        
    }
    
    //TODO: preguntar el miercoles. Capaz se puede hacer en la funcion anterior
    function verifyPartialApprovalForStudent(uint _courseId) {
        Approval[] approvalsForCourse = courseIdToApprovals[_courseId];
        Approval[] partialApprovals = new Approval[];
        for (uint i = 0; i < approvalsForCourse.length; i++) {
            if (approvalsForCourse[i].partialApproval) {
                partialApprovals.push(approvalsForCourse[i]);
            }
        }
        for (uint i = 0; i < partialApprovals.length; i++) {
            if (now >= (partialApprovals[i].approvalDate + 548 days)) {
                //TODO: remover curso para alumno
            }
        }
    }
    
}