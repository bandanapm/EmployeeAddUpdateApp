const express = require('express');
const app = express();
const PORT = 3000;

// In-memory database
let employees = [];

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

// POST: Add or update employee
app.post('/api/employees', (req, res) => {
  const { id, firstName, lastName, salary, working_department, email } = req.body;

  const existingEmployee = employees.find(emp => emp.id === id);
  if (existingEmployee) {
    // Update existing employee
    Object.assign(existingEmployee, { firstName, lastName, salary, working_department, email });
    return res.json({ message: 'Employee updated successfully.' });
  }

  // Add new employee
  employees.push({ id, firstName, lastName, salary, working_department, email });
  res.json({ message: 'Employee added successfully.' });
});

// GET: Retrieve all employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// Serve HTML Page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
