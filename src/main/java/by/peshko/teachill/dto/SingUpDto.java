package by.peshko.teachill.dto;

import by.peshko.teachill.model.RoleEntity;
import by.peshko.teachill.model.UserEntity;
import lombok.Data;


import java.util.List;

@Data
public class SingUpDto {

    private String username;
    private String password;
    private String email;
    private String status;
    private List<RoleEntity> roles;

    public static SingUpDto fromUser(UserEntity user) {
        SingUpDto singUpDto = new SingUpDto();
        singUpDto.setUsername(user.getUsername());
        singUpDto.setEmail(user.getEmail());
        singUpDto.setStatus("ACTIVE");
        return singUpDto;
    }
}
