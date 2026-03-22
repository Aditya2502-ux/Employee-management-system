package com.ems.employee_management_system;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This is our "Model" or "Entity" class.
 * It represents the data we want to store in our database.
 * Think of it as a blueprint for an Employee object.
 */
@Entity // This tells Spring Data JPA that this class is a table in our database.
@Table(name = "employees") // This specifies the name of the table in MySQL.
@Data // This is a Lombok annotation that automatically creates Getters, Setters,
      // toString, etc.
@NoArgsConstructor // Automatically creates a constructor with no arguments.
@AllArgsConstructor // Automatically creates a constructor with all arguments (id, firstName, etc.).
public class Employee {

    @Id // Tells JPA that this field is the Primary Key (unique ID for each employee).
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically increases the ID by 1 for every new employee
                                                        // (Auto-increment).
    private Long id;

    @Column(name = "first_name") // Maps this Java field to a specific column name in the MySQL table.
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_id")
    private String emailId;
}
