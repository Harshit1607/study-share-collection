
package com.studynotes.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteDto {
    private String id;
    private String name;
    private FileDto file;
    private Date uploadDate;
    private UserDto user;
    private SubjectDto subject;
    private double averageRating;
    private int commentCount;
}
