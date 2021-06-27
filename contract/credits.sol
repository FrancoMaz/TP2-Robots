pragma solidity >=0.5.0 <0.6.0;

contract Token {

function balanceOf(address _student) public view returns (uint256 balance) {}
    
}

contract Credits is Token {

    string public name;
    string public symbol;
    
    mapping (address => uint256) balances;

    function generateToken (address _student, uint _numberOfCredits) public {
        balances[_student] += _numberOfCredits;
        name = "FIUBA-CREDITO";
        symbol = "FUC";
    }
    
    function balanceOf(address _student) public view returns (uint256 balance) {
        return balances[_student];
    }

}