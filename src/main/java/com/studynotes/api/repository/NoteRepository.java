
package com.studynotes.api.repository;

import com.studynotes.api.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, String> {
    List<Note> findBySubjectCode(String subjectCode);
}
