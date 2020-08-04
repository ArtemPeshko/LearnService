package by.peshko.teachill.service;

import by.peshko.teachill.model.UserEntity;

import java.util.List;

/**
 * @author Artem Peshko
 * @version 1.0
 */

public interface UserService {
    UserEntity register(UserEntity user);

    List<UserEntity> getAll();

    UserEntity findByUsername(String username);

    UserEntity findById(Long id);

    void delete(Long id);
}