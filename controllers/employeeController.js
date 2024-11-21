const { addOrUpdateEmployee, getEmployees } = require('../models/employee');

// Add or update an employee
const handleAddOrUpdateEmployee = (req, res) => {
    const { firstName, lastName, id, salary, working_department, email } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Employee ID is required.' });
    }

    const employee = { firstName, lastName, id, salary, working_department, email };
    addOrUpdateEmployee(employee);
    res.json({ message: 'Employee added/updated successfully.' });
};

// Get all employees
const handleGetEmployees = (req, res) => {
    res.json(getEmployees());
};

module.exports = {
    handleAddOrUpdateEmployee,
    handleGetEmployees,
};
