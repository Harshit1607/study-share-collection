
package com.studynotes.api.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;

    @NotBlank
    @Size(max = 50)
    private String name;

    @NotBlank
    @Size(max = 50)
    @Email
    @Indexed(unique = true)
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;
    
    @DBRef
    private List<Note> notes = new ArrayList<>();
    
    @DBRef
    private List<Comment> comments = new ArrayList<>();
    
    @DBRef
    private List<Rating> ratings = new ArrayList<>();
}
