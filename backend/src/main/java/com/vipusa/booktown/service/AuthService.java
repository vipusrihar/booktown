package com.vipusa.booktown.service;

import com.vipusa.booktown.exception.RoleNotFoundException;
import com.vipusa.booktown.exception.UserAlreadyExistsException;
import com.vipusa.booktown.model.DTO.LoginRequest;
import com.vipusa.booktown.model.DTO.SignUpRequest;
import com.vipusa.booktown.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    ResponseEntity<ApiResponse<?>> signUpUser (SignUpRequest signUpRequest)throws UserAlreadyExistsException, RoleNotFoundException;;

    ResponseEntity<ApiResponse<?>> loginUser(LoginRequest loginRequest);

    ResponseEntity<ApiResponse<?>> getCurrentUser(UserDetails userDetails);
}
