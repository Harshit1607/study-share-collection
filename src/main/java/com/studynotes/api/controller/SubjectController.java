
package com.studynotes.api.controller;

import com.studynotes.api.dto.SubjectDto;
import com.studynotes.api.model.Subject;
import com.studynotes.api.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/subjects")
public class SubjectController {
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    @GetMapping
    public ResponseEntity<List<SubjectDto>> getAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        
        List<SubjectDto> subjectDtos = subjects.stream()
                .map(subject -> new SubjectDto(
                        subject.getCode(),
                        subject.getName(),
                        subject.getYear(),
                        subject.getSemester()))
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(subjectDtos);
    }
}
