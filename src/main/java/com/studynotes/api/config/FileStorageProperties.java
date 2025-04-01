
package com.studynotes.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "file")
@Component
@Getter
@Setter
public class FileStorageProperties {
    private String uploadDir;
}
