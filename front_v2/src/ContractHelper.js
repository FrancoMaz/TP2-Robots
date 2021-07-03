export function getCoursesList() {
    return window.contract.methods.courses.call()
}

export function createOrEditCourse(id, name, prof, credits, correlatives, active) {
    window.contract.methods.createCourse(id, name, prof, credits, correlatives, active).send()
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
