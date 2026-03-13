package com.esports.controller;

import com.esports.dto.AuthResponse;
import com.esports.dto.ErrorResponse;
import com.esports.dto.LoginRequest;
import com.esports.dto.SignupRequest;
import com.esports.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * POST /api/auth/register
     * Body: { "name": "...", "email": "...", "password": "..." }
     * Returns 201 Created with user info on success, 400 if email already exists.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("REGISTRATION_FAILED", ex.getMessage()));
        }
    }

    /**
     * POST /api/auth/login
     * Body: { "email": "...", "password": "..." }
     * Returns 200 OK with user info on success, 401 if credentials are invalid.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("LOGIN_FAILED", ex.getMessage()));
        }
    }
}
