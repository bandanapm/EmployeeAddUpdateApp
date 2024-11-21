// Fetch and display employees
function fetchEmployees() {
    fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('employee-table');
            tableBody.innerHTML = ''; // Clear table

            data.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.id}</td>
            <td>${employee.salary}</td>
            <td>${employee.working_department}</td>
            <td>${employee.email}</td>
            <td>
              <button onclick="fillForm('${employee.id}')">Update</button>
            </td>
          `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching employees:', error));
}

// Add or update employee
document.getElementById('employee-form').addEventListener('submit', event => {
    event.preventDefault();

    const employee = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        id: document.getElementById('id').value,
        salary: parseInt(document.getElementById('salary').value),
        working_department: document.getElementById('working_department').value,
        email: document.getElementById('email').value
    };

    fetch('/api/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    })
        .then(response => response.json())
        .then(() => {
            fetchEmployees(); // Refresh employee table
            alert('Employee added/updated successfully.');
        })
        .catch(error => console.error('Error adding/updating employee:', error));
});

// Pre-fill form for updating an employee
function fillForm(id) {
    fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            const employee = data.find(emp => emp.id === id);
            if (employee) {
                document.getElementById('firstName').value = employee.firstName;
                document.getElementById('lastName').value = employee.lastName;
                document.getElementById('id').value = employee.id;
                document.getElementById('salary').value = employee.salary;
                document.getElementById('working_department').value = employee.working_department;
                document.getElementById('email').value = employee.email;

                // Scroll to form
                window.scrollTo(0, document.getElementById('employee-form').offsetTop);
            }
        })
        .catch(error => console.error('Error fetching employee for update:', error));
}

// Fetch employees on page load
fetchEmployees();
