package com.vipusa.booktown.service;

import com.vipusa.booktown.exception.RoleNotFoundException;
import com.vipusa.booktown.exception.UserAlreadyExistsException;
import com.vipusa.booktown.model.DTO.LoginRequestDTO;
import com.vipusa.booktown.model.DTO.SignUpRequestDTO;
import com.vipusa.booktown.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    ResponseEntity<ApiResponse<?>> signUpUser (SignUpRequestDTO signUpRequestDto)throws UserAlreadyExistsException, RoleNotFoundException;;

    ResponseEntity<ApiResponse<?>> loginUser(LoginRequestDTO loginRequestDto);

    ResponseEntity<ApiResponse<?>> getCurrentUser(UserDetails userDetails);
}
