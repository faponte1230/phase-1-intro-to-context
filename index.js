function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  };
  
function createEmployeeRecords(arrOfArrays){
    return arrOfArrays.map(createEmployeeRecord)
  };
  
function createTimeInEvent(employeeRec, dateStamp) { // dateStamp => "YYYY-MM-DD HHMM"
 let timeInEvent = {
      type: "TimeIn",
      hour: parseInt((dateStamp).split(" ")[1]),
      date: dateStamp.split(" ")[0] 
    };
    employeeRec.timeInEvents.push(timeInEvent);
    return employeeRec;
};
  
function createTimeOutEvent(employeeRec, dateStamp) {
    let timeOutEvent = {
      type: "TimeOut",
      hour: parseInt((dateStamp).split(" ")[1]),
      date: dateStamp.split(" ")[0] 
    }
    employeeRec.timeOutEvents.push(timeOutEvent);
    return employeeRec;
}
  
function hoursWorkedOnDate(employeeRec, date) {
    let timeIn = employeeRec.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRec.timeOutEvents.find(event => event.date === date);
    let hoursWorked = (timeOut.hour - timeIn.hour)/100;
    return hoursWorked;
};
  
function wagesEarnedOnDate(employeeRec, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRec, date);
    let payOwed = hoursWorked * employeeRec.payPerHour;
    return payOwed;
};
  
function allWagesFor(employeeRec) {
    const datesWorked = employeeRec.timeInEvents.map(event => event.date);
    const allWagesArray = datesWorked.map(date => wagesEarnedOnDate(employeeRec, date));
    const totalWages = allWagesArray.reduce((total, wageOfDay) => (total + wageOfDay), 0);
    return totalWages;
};

function calculatePayroll(employeesRecs) {
    const totalPay = employeesRecs.reduce((total, employeeRec) => total + allWagesFor(employeeRec), 0);
    return totalPay;
};