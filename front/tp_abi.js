var tpABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_student",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_courseId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_partialApproval",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "_rate",
                "type": "uint256"
            }
        ],
        "name": "approveStudent",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "courseIdToApprovals",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "courseId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "student",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "partialApproval",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "approvalDate",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "courseToOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "courses",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "prof",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "credits",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "active",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_prof",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_credits",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "_correlatives",
                "type": "uint256[]"
            }
        ],
        "name": "createCourse",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_prof",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_credits",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "_correlatives",
                "type": "uint256[]"
            },
            {
                "internalType": "bool",
                "name": "_active",
                "type": "bool"
            }
        ],
        "name": "editCourse",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_student",
                "type": "address"
            }
        ],
        "name": "getApprovalsByStudent",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "courseId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "student",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "partialApproval",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "approvalDate",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct class.Approval[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isOwner",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "profNameToAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "studentAddressToApprovals",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "courseId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "student",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "partialApproval",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "approvalDate",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_courseId",
                "type": "uint256"
            }
        ],
        "name": "verifyPartialApprovalForStudent",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]