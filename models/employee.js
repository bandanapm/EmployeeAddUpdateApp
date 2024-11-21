let employees = []; // JSON array as a database

const addOrUpdateEmployee = (employee) => {
    const index = employees.findIndex((e) => e.id === employee.id);
    if (index > -1) {
        // Update existing employee
        employees[index] = employee;
    } else {
        // Add new employee
        employees.push(employee);
    }
};

const getEmployees = () => employees;

module.exports = {
    addOrUpdateEmployee,
    getEmployees,
};
