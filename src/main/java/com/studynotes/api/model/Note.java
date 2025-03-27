
package com.studynotes.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "notes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    @Size(max = 100)
    private String name;
    
    @Embedded
    private FileInfo file;

    @Temporal(TemporalType.TIMESTAMP)
    private Date uploadDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_code")
    private Subject subject;
    
    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL)
    private Set<Comment> comments = new HashSet<>();
    
    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL)
    private Set<Rating> ratings = new HashSet<>();
    
    @Transient
    public double getAverageRating() {
        if (ratings.isEmpty()) {
            return 0;
        }
        return ratings.stream().mapToInt(Rating::getValue).average().getAsDouble();
    }
    
    @Transient
    public int getCommentCount() {
        return comments.size();
    }
}
