package by.peshko.teachill.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * @author Artem Peshko
 * @version 1.0
 */

@MappedSuperclass
@Data
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    @Column(name = "created")
    private Date created;

    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    @Column(name = "updated")
    private Date updated;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @PrePersist
    public void onSave(){
        created = new Date();
        updated = new Date();
    }

    @PreUpdate
    public void onUpdate(){
        updated = new Date();
    }
}
