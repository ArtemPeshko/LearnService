package by.peshko.teachill.repository;

import by.peshko.teachill.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Artem Peshko
 * @version 1.0
 */

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String name);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
