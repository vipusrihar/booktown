package com.vipusa.booktown.service;

import com.vipusa.booktown.config.jwt.JwtUtils;
import com.vipusa.booktown.exception.RoleNotFoundException;
import com.vipusa.booktown.exception.UserAlreadyExistsException;
import com.vipusa.booktown.model.DTO.LoginRequest;
import com.vipusa.booktown.model.DTO.SignUpRequest;
import com.vipusa.booktown.model.DTO.UserDTO;
import com.vipusa.booktown.model.entity.User;
import com.vipusa.booktown.model.enums.ERole;
import com.vipusa.booktown.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    @Override
    public ResponseEntity<ApiResponse<?>> signUpUser(SignUpRequest signUpRequestDto)
            throws UserAlreadyExistsException, RoleNotFoundException {
        if (userService.existsByEmail(signUpRequestDto.getEmail())) {
            throw new UserAlreadyExistsException("Registration Failed: Provided email already exists. Try sign in or provide another email.");
        }
        if (userService.existsByUserName(signUpRequestDto.getUserName())) {
            throw new UserAlreadyExistsException("Registration Failed: Provided username already exists. Try sign in or provide another username.");
        }

        User user = createUser(signUpRequestDto);
        userService.saveUser(user);


        String token = jwtUtils.generateTokenFromEmail(user.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.builder()
                        .isSuccess(true)
                        .message("User account has been successfully created!")
                        .response(token) // Include the JWT token in response
                        .build()
        );
    }

    @Override
    public ResponseEntity<ApiResponse<?>> loginUser(LoginRequest loginRequest) {

        User user = userService.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Email Not Registered"));

        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String token = jwtUtils.generateTokenFromEmail(loginRequest.getEmail());
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .isSuccess(true)
                            .message("Successfully Logged in")
                            .response(token)
                            .build()
            );
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ApiResponse.builder()
                        .isSuccess(false)
                        .message("Invalid credentials")
                        .response(null)
                        .build()
        );
    }

    @Override
    public ResponseEntity<ApiResponse<?>> getCurrentUser(UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.builder()
                            .isSuccess(false)
                            .message("User not authenticated")
                            .response(null)
                            .build());
        }
        System.out.println("USER +"+ userDetails.getUsername());


        User user = userService.findByUserName(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // You can return a DTO instead of the entity for safety
        UserDTO userDto = new UserDTO(user.getId(), user.getUserName(), user.getEmail(), user.getRole().toString());
        System.out.println(userDto);

        return ResponseEntity.ok(ApiResponse.builder()
                .isSuccess(true)
                .message("User details fetched successfully")
                .response(userDto)
                .build());
    }


    private User createUser(SignUpRequest signUpRequest) throws RoleNotFoundException {
        return User.builder()
                .email(signUpRequest.getEmail())
                .userName(signUpRequest.getUserName())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .isEnable(true)
                .role(determineRole(signUpRequest.getRole()))
                .createdAt(LocalDateTime.now())
                .build();
    }

    private ERole determineRole(String role) throws RoleNotFoundException {
        ERole userRole = null;
        if (role.equals( "ROLE_ADMIN")){
            userRole = ERole.ROLE_ADMIN;
        }else if (role.equals("ROLE_WORKER")) {
            userRole = ERole.ROLE_WORKER;
        }else if (!role.equals("ROLE_USER") && role != null) {
            throw new RoleNotFoundException("Role Not Defined here");
        } else {
            userRole = ERole.ROLE_USER;
        }
        return userRole;
    }
}