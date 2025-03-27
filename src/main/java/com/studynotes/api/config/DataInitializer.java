
package com.studynotes.api.config;

import com.studynotes.api.model.Subject;
import com.studynotes.api.model.User;
import com.studynotes.api.repository.SubjectRepository;
import com.studynotes.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Add some sample subjects
        if (subjectRepository.count() == 0) {
            Subject cs101 = new Subject();
            cs101.setCode("CS101");
            cs101.setName("Introduction to Computer Science");
            cs101.setYear(1);
            cs101.setSemester(1);
            subjectRepository.save(cs101);
            
            Subject math201 = new Subject();
            math201.setCode("MATH201");
            math201.setName("Calculus II");
            math201.setYear(2);
            math201.setSemester(1);
            subjectRepository.save(math201);
            
            Subject phys101 = new Subject();
            phys101.setCode("PHYS101");
            phys101.setName("Physics I");
            phys101.setYear(1);
            phys101.setSemester(2);
            subjectRepository.save(phys101);
            
            Subject eng205 = new Subject();
            eng205.setCode("ENG205");
            eng205.setName("Technical Writing");
            eng205.setYear(2);
            eng205.setSemester(2);
            subjectRepository.save(eng205);
        }
        
        // Add a demo user
        if (userRepository.count() == 0) {
            User user = new User();
            user.setName("Demo User");
            user.setEmail("demo@example.com");
            user.setPassword(passwordEncoder.encode("password123"));
            userRepository.save(user);
        }
    }
}
