package com.vipusa.booktown.model.DTO;

import com.vipusa.booktown.model.entity.Address;
import com.vipusa.booktown.model.enums.ERole;
import jakarta.persistence.Embedded;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class UpdateUserRequest {

    private String street;

    private String city;

    private String district;

    private String province;

    private String country;

    private Integer zipCode;

    @Pattern(regexp = "^[0-9+]{9,15}$", message = "Invalid phone number")
    private String phoneNumber;

}
