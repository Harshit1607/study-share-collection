
package com.studynotes.api.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "notes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Note {
    @Id
    private String id;

    @NotBlank
    @Size(max = 100)
    private String name;
    
    private FileInfo file;

    private Date uploadDate;
    
    @DBRef
    private User user;
    
    @DBRef
    private Subject subject;
    
    @DBRef
    private List<Comment> comments = new ArrayList<>();
    
    @DBRef
    private List<Rating> ratings = new ArrayList<>();
    
    @Transient
    public double getAverageRating() {
        if (ratings.isEmpty()) {
            return 0;
        }
        return ratings.stream().mapToInt(Rating::getRatingValue).average().getAsDouble();
    }
    
    @Transient
    public int getCommentCount() {
        return comments.size();
    }
}
