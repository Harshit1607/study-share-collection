
package com.studyshare.controller;

import com.studyshare.model.User;
import com.studyshare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        
        // Create response with user and token
        Map<String, Object> response = new HashMap<>();
        response.put("user", registeredUser);
        response.put("token", "dummy-token-" + registeredUser.getId()); // In a real app, generate a JWT token
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        // This is a placeholder. In a real app, you'd authenticate the user
        // and generate a token
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login endpoint placeholder");
        return ResponseEntity.ok(response);
    }
}
