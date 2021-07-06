async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

export async function getCoursesList() {
    return await window.contract.methods.getCourses().call();
}

export async function createOrEditCourse(params) {
    const account = await getCurrentAccount();
    window.contract.methods.createOrEditCourse(
        params.id,
        params.name,
        params.prof,
        params.credits,
        params.correlatives,
        params.active).send({from: account})
}

export async function approveStudent(student, courseId, partialApproval, rate) {
    const account = await getCurrentAccount();
    if (partialApproval) {
        window.contract.methods.approveStudentPartial(student, courseId).send({from: account})
    } else {
        window.contract.methods.approveStudentTotal(student, courseId, rate).send({from: account})
    }
}

export async function checkStudentState(student) {
    return await window.contract.methods.getApprovalsByStudent(student).call()
}
