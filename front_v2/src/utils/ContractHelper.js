

async function getAccount() {
return await window.ethereum.request({ method: 'eth_requestAccounts' });
}

export function getCoursesList() {
    return window.contract.methods.courses(0).call({from: '0xa32c98518E31Da77FbFd5a3fA1A380Dd6d1aA16d'})
}

export function createOrEditCourse(params) {
    let accounts = getAccount()
    console.log(accounts);
    window.contract.methods.createOrEditCourse(params.id, params.name, params.prof, params.credits, params.correlatives, params.active).send({from: '0xa32c98518E31Da77FbFd5a3fA1A380Dd6d1aA16d'})
}

export function approveStudent(student, courseId, partialApproval, rate) {
    if (partialApproval) {
        window.contract.methods.approveStudentPartial(student, courseId).send()
    } else {
        window.contract.methods.approveStudentTotal(student, courseId, rate).send()
    }
}

export function checkStudentState(student) {
    return window.contract.methods.getApprovalsByStudent(student).call()
}

async function send(method, params) {
    const txHash = await window.ethereum.request({
        method: method,
        params: [params],
    });
}