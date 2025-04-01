
package com.studynotes.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notes")
public class Note {
    @Id
    private String id;
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
    
    public Double getAverageRating() {
        if (ratings == null || ratings.isEmpty()) {
            return 0.0;
        }
        return ratings.stream()
                .collect(Collectors.averagingInt(Rating::getRatingValue));
    }
}
