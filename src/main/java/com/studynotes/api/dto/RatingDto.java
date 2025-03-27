
package com.studynotes.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingDto {
    private String id;
    private int value;
    private Date date;
    private UserDto user;
}
