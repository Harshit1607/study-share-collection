
package com.studynotes.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "ratings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    @Id
    private String id;

    private int ratingValue;

    private Date date;
    
    @DBRef
    private User user;
    
    @DBRef
    private Note note;
    
    private String userId;
    private String noteId;
}
