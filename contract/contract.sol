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
            studentAddressAndCourseIdToApproval[_student][_courseId] = Approval(_partialApproval, 0, now);
        } else {
            require(_rate >= minRate && _rate <= maxRate);
            Approval studentApprovalForCourse = studentAddressAndCourseIdToApproval[_student][_courseId];
            studentApprovalForCourse.partialApproval = false;
            studentApprovalForCourse.rate = _rate;
        }
    
}