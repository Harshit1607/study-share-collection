
package com.studynotes.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class NoteDetailDto extends NoteDto {
    private List<CommentDto> comments = new ArrayList<>();
    private List<RatingDto> ratings = new ArrayList<>();
    
    public NoteDetailDto(String id, String name, FileDto file, java.util.Date uploadDate, 
                        UserDto user, SubjectDto subject, double averageRating, 
                        int commentCount, List<CommentDto> comments, List<RatingDto> ratings) {
        super(id, name, file, uploadDate, user, subject, averageRating, commentCount);
        this.comments = comments;
        this.ratings = ratings;
    }
}
