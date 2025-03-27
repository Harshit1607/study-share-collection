
package com.studynotes.api.controller;

import com.studynotes.api.dto.CommentDto;
import com.studynotes.api.dto.UserDto;
import com.studynotes.api.model.Comment;
import com.studynotes.api.model.Note;
import com.studynotes.api.model.User;
import com.studynotes.api.repository.CommentRepository;
import com.studynotes.api.repository.NoteRepository;
import com.studynotes.api.repository.UserRepository;
import com.studynotes.api.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/comments")
public class CommentController {
    
    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NoteRepository noteRepository;
    
    @PostMapping
    public ResponseEntity<CommentDto> addComment(
            @RequestBody Map<String, String> payload,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        String noteId = payload.get("noteId");
        String text = payload.get("text");
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + noteId));
        
        Comment comment = new Comment();
        comment.setText(text);
        comment.setDate(new Date());
        comment.setUser(user);
        comment.setNote(note);
        
        Comment savedComment = commentRepository.save(comment);
        
        CommentDto commentDto = new CommentDto(
                savedComment.getId(),
                savedComment.getText(),
                savedComment.getDate(),
                new UserDto(user.getId(), user.getName(), user.getEmail()));
        
        return ResponseEntity.ok(commentDto);
    }
}
