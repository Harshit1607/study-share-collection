
package com.studynotes.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteDetailDto extends NoteDto {
    private List<CommentDto> comments;
    private List<RatingDto> ratings;
}
