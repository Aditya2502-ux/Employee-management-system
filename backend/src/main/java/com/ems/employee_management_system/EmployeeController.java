package com.ems.employee_management_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This is the "Controller" layer.
 * It handles incoming HTTP requests (GET, POST, PUT, DELETE) from the frontend
 * (React).
 * It uses the EmployeeService to perform operations.
 */
@CrossOrigin(origins = "http://localhost:3000") // Allows our React app (running on port 3000) to talk to this backend.
@RestController // Tells Spring that this class is a REST API.
@RequestMapping("/api/v1/") // Base URL for all endpoints in this controller.
public class EmployeeController {

    @Autowired // This "injects" our service class automatically.
    private EmployeeService employeeService;

    // GET all employees: http://localhost:8080/api/v1/employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // POST a new employee: http://localhost:8080/api/v1/employees
    // @RequestBody converts the JSON data from frontend into a Java Employee
    // object.
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }

    // GET one employee by ID: http://localhost:8080/api/v1/employees/1
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee); // Returns the employee data with a 200 OK status.
    }

    // PUT (Update) an employee by ID: http://localhost:8080/api/v1/employees/1
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
        return ResponseEntity.ok(updatedEmployee);
    }

    // DELETE an employee by ID: http://localhost:8080/api/v1/employees/1
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
