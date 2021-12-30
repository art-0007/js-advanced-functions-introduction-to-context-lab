// Your code here
function createEmployeeRecord(array) {
    let record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
   return record
}

function createEmployeeRecords(arrays) {
   return arrays.map(createEmployeeRecord)
}

function dateStampObj(type, dateStamp) {
    return {type: type, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
} 

function createTimeInEvent(employee, date_stamp) {
    employee.timeInEvents.push(dateStampObj("TimeIn", date_stamp))
    return employee
}

function createTimeOutEvent(employee, date_stamp) {
    employee.timeOutEvents.push(dateStampObj("TimeOut", date_stamp))
    return employee
}

function hoursWorkedOnDate(employee, form_date) { 
    const timeIn = employee.timeInEvents.find((e) => e.date === form_date).hour
    const timeOut = employee.timeOutEvents.find((e) => e.date === form_date).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employee, form_date) {
    const payOwed = hoursWorkedOnDate(employee, form_date) * employee.payPerHour
    return payOwed
}

function allWagesFor(employee) {
    const allPayOwed = employee.timeInEvents.map((d) => { return wagesEarnedOnDate(employee, d.date)})
    return allPayOwed.reduce((accum, curVal) => accum + curVal)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((record) => record.firstName === firstName)
}

function calculatePayroll(array) {
    const allPayOwed = (array.map((em) => { return allWagesFor(em)}))
    return allPayOwed.reduce((accum, curVal) => accum + curVal)
}