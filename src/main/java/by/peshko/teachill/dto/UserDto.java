package by.peshko.teachill.dto;

import by.peshko.teachill.model.RoleEntity;
import by.peshko.teachill.model.Status;
import by.peshko.teachill.model.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

/**
 * @author Artem Peshko
 * @version 1.0
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String status;
    private List<RoleEntity> roles;

    public UserEntity toUser() {
        UserEntity user = new UserEntity();
        user.setId(id);
        user.setUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(password);
        user.setStatus(Status.valueOf(status));
        user.setRoles(roles);

        return user;
    }

    public static UserDto fromUser(UserEntity user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setStatus(user.getStatus().name());
        userDto.setRoles(user.getRoles());

        return userDto;
    }
}
