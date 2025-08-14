package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.entity.User;
import com.vipusa.booktown.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> findAllUsers() {
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<User> findUserById(@RequestParam Integer id) {
        User user = userService.findUserById(id);
        if (user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/edit/{userId}")
    public ResponseEntity<User> editUser(@PathVariable Integer userId, @RequestBody User user) {
        User updatedUser = userService.updateUser(userId, user);
         if(updatedUser != null){
             return new ResponseEntity<>(updatedUser, HttpStatus.OK);
         }else {
             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) {
        boolean deleted = userService.deleteUser(userId);
        return deleted
                ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countUser() {
        long count = userService.countUsers();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}