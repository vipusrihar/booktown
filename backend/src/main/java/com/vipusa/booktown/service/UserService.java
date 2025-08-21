package com.vipusa.booktown.service;

import com.vipusa.booktown.model.DTO.UpdateUserRequest;
import com.vipusa.booktown.model.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    boolean existsByUserName(String username);

    boolean existsByEmail(String email);

    void saveUser(User user);

    long countUsers();

    boolean deleteUser(Integer id);

    User updateUser(Integer id, UpdateUserRequest request);

    User findUserById(Integer id);

    List<User> findAllUsers();

    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String userName);

    User changeEnableStatus(Integer userId);
}
