package com.ems.employee_management_system;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This is the "Repository" layer.
 * It provides built-in methods (like save(), findAll(), delete())
 * to interact with our MySQL database without writing SQL queries.
 */
@Repository // Marks this interface as a data access layer.
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // JpaRepository provides all the basic CRUD (Create, Read, Update, Delete) methods for us.
}
