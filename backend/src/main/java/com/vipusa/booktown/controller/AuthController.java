package com.vipusa.booktown.controller;

import com.vipusa.booktown.exception.RoleNotFoundException;
import com.vipusa.booktown.exception.UserAlreadyExistsException;
import com.vipusa.booktown.model.DTO.LoginRequestDTO;
import com.vipusa.booktown.model.DTO.SignUpRequestDTO;
import com.vipusa.booktown.response.ApiResponse;
import com.vipusa.booktown.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<?>> registerUser(@RequestBody @Valid SignUpRequestDTO signUpRequestDto)
            throws UserAlreadyExistsException, RoleNotFoundException {
        return authService.signUpUser(signUpRequestDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid LoginRequestDTO loginRequestDto){
        return authService.loginUser(loginRequestDto);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails){
        System.out.println("User Detail " + userDetails);
        return authService.getCurrentUser(userDetails);
    }

}