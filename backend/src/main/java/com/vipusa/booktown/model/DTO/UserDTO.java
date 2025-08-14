package com.vipusa.booktown.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {
    private Integer id;
    private String userName;
    private String email;
    private String role;
}
