package com.vipusa.booktown.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vipusa.booktown.model.entity.Address;
import com.vipusa.booktown.model.enums.ERole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "User name is required")
    private String userName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must have at least 8 characters")
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private ERole role;

    @Embedded
    private Address address;

    @Pattern(regexp = "^[0-9+]{9,15}$", message = "Invalid phone number")
    private String phoneNumber;

    @NotNull(message = "Created date is required")
    private LocalDateTime createdAt;

    private Boolean isEnable;
}
