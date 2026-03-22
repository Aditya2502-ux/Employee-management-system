package com.ems.employee_management_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This is the "Service" layer.
 * This is where we write our business logic.
 * It sits between the Controller (which handles web requests)
 * and the Repository (which talks to the database).
 */
@Service // Marks this as a Service class.
public class EmployeeService {

    @Autowired // This "injects" our repository automatically. Spring Boot handles it for us.
    private EmployeeRepository employeeRepository;

    // Get all employees from the database
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Save a new employee into the database
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Find one employee by their ID
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    // Update an existing employee
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        // First, check if the employee exists
        Employee employee = getEmployeeById(id);
        
        // Update the fields with new information
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());
        employee.setSalary(employeeDetails.getSalary());
        employee.setDob(employeeDetails.getDob());
        employee.setLocation(employeeDetails.getLocation());
        employee.setMobileNumber(employeeDetails.getMobileNumber());
        
        // Save the updated employee back to the database
        return employeeRepository.save(employee);
    }

    // Delete an employee by their ID
    public void deleteEmployee(Long id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);
    }
}
