package com.vipusa.booktown.service;

import com.vipusa.booktown.exception.DatabaseException;
import com.vipusa.booktown.exception.ResourceNotFoundException;
import com.vipusa.booktown.model.DTO.UpdateUserRequest;
import com.vipusa.booktown.model.entity.Address;
import com.vipusa.booktown.model.entity.User;
import com.vipusa.booktown.model.enums.ERole;
import com.vipusa.booktown.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.naming.EjbRef;
import org.springframework.dao.DataAccessException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public void saveUser(User user){
        userRepository.save(user);
    }

    @Override
    public long countUsers() {
        ERole role = ERole.ROLE_USER;
        return userRepository.countByRole(role);
    }

    @Override
    public boolean deleteUser(Integer id) {
        User user = findUserById(id);
        try {
            checkIfUserOwnAccount(user);
            userRepository.delete(user);
            return true;

        } catch (DataAccessException e) {
            throw new DatabaseException("Failed To Delete User: " + e.getMessage());
        }
    }


    @Override
    public User updateUser(Integer id, UpdateUserRequest request) {
        User user = findUserById(id);

        checkIfUserOwnAccount(user);

        // Update Address
        updateAddress(user, request);

        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }

        try {
            return userRepository.save(user);
        } catch (DataAccessException e) {
            throw new DatabaseException("Failed To Update User: " + e.getMessage());
        }
    }


    private void updateAddress(User user, UpdateUserRequest request) {

        Address address = user.getAddress();

        if (request.getStreet() != null)
            address.setStreet(request.getStreet());
        if (request.getCity() != null)
            address.setCity(request.getCity());
        if (request.getDistrict() != null)
            address.setDistrict(request.getDistrict());
        if (request.getProvince() != null)
            address.setProvince(request.getProvince());
        if (request.getCountry() != null)
            address.setCountry(request.getCountry());
        if (request.getZipCode() != null)
            address.setZipCode(request.getZipCode());
    }

    @Override
    public User findUserById(Integer id) {

        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User Not Found With This ID "+id));;

       checkIfUserOwnAccount(user);

        return user;
    }

    @Override
    public List<User> findAllUsers() {
        ERole role = ERole.ROLE_USER;
        return userRepository.findByRole(role);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public User changeEnableStatus(Integer userId) {
        User user = findUserById(userId);
        user.setIsEnable(!user.getIsEnable());
        return userRepository.save(user);
    }

    private void checkIfUserOwnAccount(User user){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUser = authentication.getName(); // current username

        // If role is USER, restrict deletion to self only
        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_USER"))) {
            if (!user.getUserName().equals(loggedInUser)) {
                throw new AccessDeniedException("Users Can Only Handle Their Own Account.");
            }
        }
    }

}
