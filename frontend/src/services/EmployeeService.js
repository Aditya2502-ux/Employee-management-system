/**
 * This is the "Service" layer in our frontend.
 * It uses 'axios' to send HTTP requests (GET, POST, etc.) to our Spring Boot backend.
 */
import axios from 'axios';

// The URL of our backend API
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {

    // Fetch all employees from the backend
    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    // Send a new employee object to the backend to be saved
    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    // Fetch a single employee by their ID
    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    // Update an existing employee by sending their ID and new data
    updateEmployee(employee, employeeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    // Tell the backend to delete an employee by their ID
    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

// We export a 'new' instance of this class so we can use its methods elsewhere.
export default new EmployeeService();
