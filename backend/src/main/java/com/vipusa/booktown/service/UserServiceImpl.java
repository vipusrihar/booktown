package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.User;
import com.vipusa.booktown.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public boolean existsByUserName(String username) {
        return userRepository.existsByUserName(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void save(User user){
        userRepository.save(user);
    }

    @Override
    public long countUsers() {
        return 0;
    }

    @Override
    public boolean deleteUser(Integer id) {
        return false;
    }

    @Override
    public User updateUser(Integer id, User userDetails) {
        return null;
    }

    @Override
    public User findUserById(Integer id) {
        return null;
    }

    @Override
    public List<User> findAllUsers() {
        return null;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
}
