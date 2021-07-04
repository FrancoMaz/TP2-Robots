async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

export async function getCoursesList() {
    return await window.contract.methods.getCourseId(0).call();
}

export async function createOrEditCourse(params) {
    const account = await getCurrentAccount();
    window.contract.methods.addId(parseInt(params.id)).send({from: account})
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
