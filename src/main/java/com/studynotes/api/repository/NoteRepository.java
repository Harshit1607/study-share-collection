
package com.studynotes.api.repository;

import com.studynotes.api.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findBySubjectCode(String subjectCode);
}
