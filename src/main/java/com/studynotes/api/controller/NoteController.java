
package com.studynotes.api.controller;

import com.studynotes.api.dto.*;
import com.studynotes.api.model.*;
import com.studynotes.api.repository.NoteRepository;
import com.studynotes.api.repository.SubjectRepository;
import com.studynotes.api.repository.UserRepository;
import com.studynotes.api.security.UserDetailsImpl;
import com.studynotes.api.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notes")
public class NoteController {
    
    @Autowired
    private NoteRepository noteRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    @Autowired
    private FileStorageService fileStorageService;
    
    @GetMapping
    public ResponseEntity<List<NoteDto>> getAllNotes(
            @RequestParam(required = false) String subject) {
        
        List<Note> notes;
        if (subject != null && !subject.isEmpty()) {
            notes = noteRepository.findBySubjectCode(subject);
        } else {
            notes = noteRepository.findAll();
        }
        
        List<NoteDto> noteDtos = notes.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(noteDtos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<NoteDetailDto> getNoteById(@PathVariable("id") String id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + id));
        
        NoteDetailDto noteDetailDto = convertToDetailDto(note);
        
        return ResponseEntity.ok(noteDetailDto);
    }
    
    @PostMapping
    public ResponseEntity<NoteDto> uploadNote(
            @RequestParam("name") String name,
            @RequestParam("subjectCode") String subjectCode,
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Subject subject = subjectRepository.findById(subjectCode)
                .orElseThrow(() -> new RuntimeException("Subject not found with code: " + subjectCode));
        
        FileInfo fileInfo = fileStorageService.storeFile(file);
        
        Note note = new Note();
        note.setName(name);
        note.setFile(fileInfo);
        note.setUploadDate(new Date());
        note.setUser(user);
        note.setSubject(subject);
        
        Note savedNote = noteRepository.save(note);
        
        return ResponseEntity.ok(convertToDto(savedNote));
    }
    
    private NoteDto convertToDto(Note note) {
        UserDto userDto = new UserDto(
                note.getUser().getId(),
                note.getUser().getName(),
                note.getUser().getEmail());
        
        SubjectDto subjectDto = new SubjectDto(
                note.getSubject().getCode(),
                note.getSubject().getName(),
                note.getSubject().getYear(),
                note.getSubject().getSemester());
        
        FileDto fileDto = new FileDto(
                note.getFile().getFileName(),
                note.getFile().getFileType(),
                note.getFile().getDownloadUrl());
        
        return new NoteDto(
                note.getId(),
                note.getName(),
                fileDto,
                note.getUploadDate(),
                userDto,
                subjectDto,
                note.getAverageRating(),
                note.getCommentCount());
    }
    
    private NoteDetailDto convertToDetailDto(Note note) {
        NoteDto noteDto = convertToDto(note);
        
        List<CommentDto> commentDtos = note.getComments().stream()
                .map(comment -> new CommentDto(
                        comment.getId(),
                        comment.getText(),
                        comment.getDate(),
                        new UserDto(
                                comment.getUser().getId(),
                                comment.getUser().getName(),
                                comment.getUser().getEmail())))
                .collect(Collectors.toList());
        
        List<RatingDto> ratingDtos = note.getRatings().stream()
                .map(rating -> new RatingDto(
                        rating.getId(),
                        rating.getRatingValue(),
                        rating.getDate(),
                        new UserDto(
                                rating.getUser().getId(),
                                rating.getUser().getName(),
                                rating.getUser().getEmail())))
                .collect(Collectors.toList());
        
        NoteDetailDto noteDetailDto = new NoteDetailDto();
        noteDetailDto.setId(noteDto.getId());
        noteDetailDto.setName(noteDto.getName());
        noteDetailDto.setFile(noteDto.getFile());
        noteDetailDto.setUploadDate(noteDto.getUploadDate());
        noteDetailDto.setUser(noteDto.getUser());
        noteDetailDto.setSubject(noteDto.getSubject());
        noteDetailDto.setAverageRating(noteDto.getAverageRating());
        noteDetailDto.setCommentCount(noteDto.getCommentCount());
        noteDetailDto.setComments(commentDtos);
        noteDetailDto.setRatings(ratingDtos);
        
        return noteDetailDto;
    }
}
