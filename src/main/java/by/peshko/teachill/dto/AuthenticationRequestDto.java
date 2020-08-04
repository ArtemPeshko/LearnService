package by.peshko.teachill.dto;

import lombok.Data;

/**
 * @author Artem Peshko
 * @version 1.0
 */

@Data
public class AuthenticationRequestDto {
    private String username;
    private String password;

}
