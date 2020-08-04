package by.peshko.teachill.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.IndexColumn;

import javax.persistence.*;
import java.util.List;

/**
 * @author Artem Peshko
 * @version 1.0
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "users")
@Data
public class UserEntity extends BaseEntity {

    @Column(name = "username")
    private String username;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "id")})
    private List<RoleEntity> roles;


}