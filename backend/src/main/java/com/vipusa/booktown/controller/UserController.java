package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.DTO.UpdateUserRequest;
import com.vipusa.booktown.model.entity.User;
import com.vipusa.booktown.response.ApiResponse;
import com.vipusa.booktown.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<User>>> findAllUsers() {

        List<User> users = userService.findAllUsers();

        ApiResponse<List<User>> response = ApiResponse.<List<User>>builder()
                .message("Users Fetched Successfully")
                .isSuccess(true)
                .response(users)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<User>> findUserById(@PathVariable Integer userId) {
        User user = userService.findUserById(userId);

        ApiResponse<User> response = ApiResponse.<User>builder()
                .response(user)
                .isSuccess(true)
                .message("User Fetched Successfully")
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

//    @PreAuthorize("#userId == principal.id or hasRole('ADMIN')")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PutMapping("/edit/{userId}")
    public ResponseEntity<ApiResponse<User>> editUser
            (@PathVariable Integer userId, @RequestBody UpdateUserRequest request) {
        User updatedUser = userService.updateUser(userId, request);

        ApiResponse<User> response = ApiResponse.<User>builder()
                .response(updatedUser)
                .isSuccess(true)
                .message("User Updated Successfully")
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

//    @PreAuthorize("#userId == principal.id or hasRole('ADMIN')")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Boolean>> deleteUser(@PathVariable Integer userId) {

        boolean isDeleted = userService.deleteUser(userId);
        ApiResponse<Boolean> response = ApiResponse.<Boolean>builder()
                .message("User Deleted Successfully")
                .isSuccess(true)
                .response(isDeleted)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Long>> countUser() {
        Long count = userService.countUsers();
        ApiResponse<Long> response = ApiResponse.<Long>builder()
                .response(count)
                .isSuccess(true)
                .message("Counted Successfully")
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<User>> changeEnableStatus(@PathVariable Integer userId){
        User updatedUser = userService.changeEnableStatus(userId);

        ApiResponse<User> response = ApiResponse.<User>builder()
                .response(updatedUser)
                .isSuccess(true)
                .message("User Status Changed Successfully")
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }


}