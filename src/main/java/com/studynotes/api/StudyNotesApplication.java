
package com.studynotes.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.studynotes.api.config.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({
    FileStorageProperties.class
})
public class StudyNotesApplication {
    public static void main(String[] args) {
        SpringApplication.run(StudyNotesApplication.class, args);
    }
}
