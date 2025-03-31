
package com.studynotes.api.controller;

import com.studynotes.api.dto.RatingDto;
import com.studynotes.api.dto.UserDto;
import com.studynotes.api.model.Note;
import com.studynotes.api.model.Rating;
import com.studynotes.api.model.User;
import com.studynotes.api.repository.NoteRepository;
import com.studynotes.api.repository.RatingRepository;
import com.studynotes.api.repository.UserRepository;
import com.studynotes.api.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/ratings")
public class RatingController {
    
    @Autowired
    private RatingRepository ratingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NoteRepository noteRepository;
    
    @PostMapping
    public ResponseEntity<RatingDto> addRating(
            @RequestBody Map<String, Object> payload,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        String noteId = (String) payload.get("noteId");
        int value = Integer.parseInt(payload.get("value").toString());
        
        if (value < 1 || value > 5) {
            throw new IllegalArgumentException("Rating value must be between 1 and 5");
        }
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + noteId));
        
        // Check if user already rated this note
        Optional<Rating> existingRating = ratingRepository.findByUserIdAndNoteId(user.getId(), noteId);
        
        Rating rating;
        if (existingRating.isPresent()) {
            rating = existingRating.get();
            rating.setRatingValue(value);
            rating.setDate(new Date());
        } else {
            rating = new Rating();
            rating.setRatingValue(value);
            rating.setDate(new Date());
            rating.setUser(user);
            rating.setNote(note);
            rating.setUserId(user.getId());
            rating.setNoteId(noteId);
        }
        
        Rating savedRating = ratingRepository.save(rating);
        
        RatingDto ratingDto = new RatingDto(
                savedRating.getId(),
                savedRating.getRatingValue(),
                savedRating.getDate(),
                new UserDto(user.getId(), user.getName(), user.getEmail()));
        
        return ResponseEntity.ok(ratingDto);
    }
}
