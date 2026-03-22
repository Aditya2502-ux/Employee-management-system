package com.ems.employee_management_system;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;

/**
 * A simple login controller for beginners.
 * In a real app, we would use Spring Security, but for now, 
 * we will use a simple "Hardcoded" admin check.
 */
@CrossOrigin(originPatterns = {"http://localhost:*", "http://127.0.0.1:*"})
@RestController
@RequestMapping("/api/v1/")
public class AuthController {

    // POST: http://localhost:8080/api/v1/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        // Hardcoded check: Only username 'admin' and password 'admin123' can login
        if ("admin".equals(username) && "admin123".equals(password)) {
            return ResponseEntity.ok(Map.of("message", "Login Successful", "role", "ADMIN"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid Credentials"));
        }
    }
}
