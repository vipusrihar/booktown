package com.vipusa.booktown.config;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vipusa.booktown.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDetailsImpl implements UserDetails {

    @Serial
    private static final long serialVersionUID = 1L;

    private Integer id;

    private String userName;

    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    private boolean enabled;

    public static UserDetailsImpl build(User user){
        // Create a single GrantedAuthority
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());

        // Wrap it into a List (or any Collection) because UserDetails requires Collection<GrantedAuthority>
        List<GrantedAuthority> authorities = Collections.singletonList(authority);

        return new UserDetailsImpl(
                user.getId(),
                user.getUserName(),
                user.getEmail(),
                user.getPassword(),
                authorities,
                user.getIsEnable()
        );

    }
    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired(){
        return true;
    }

    @Override
    public boolean isAccountNonLocked(){
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired(){
        return true;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


    @Override
    public boolean equals(Object o){
        if(this == o){
            return true;
        }
        if(o == null || getClass() != o.getClass()){
            return false;
        }
        UserDetailsImpl userDetails = (UserDetailsImpl) o;
        return Objects.equals(id,userDetails.id);
    }

}
