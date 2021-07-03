
export function getCourseName(id) {
    return window.contract.methods.courses(id).call()
}

export  function createCourse(id, name, prof, credits) {
    return window.contract.methods.createCourse(id, name, prof, credits, []).send()
}