
package com.studynotes.api.repository;

import com.studynotes.api.model.Rating;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends MongoRepository<Rating, String> {
    Optional<Rating> findByUserIdAndNoteId(String userId, String noteId);
}
