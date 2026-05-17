package com.example.user_service.service;

import com.example.user_service.dto.UserRegisteredEvent;
import com.example.user_service.model.Role;
import com.example.user_service.model.User;
import com.example.user_service.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repo;

    // Inject KafkaTemplate và ObjectMapper
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    // Tạo admin khi ứng dụng khởi động
    @PostConstruct
    public void initAdmin() {
        // Đổi chữ admin thành admin2
        if (!repo.existsByUsername("admin2")) {
            User admin = User.builder()
                    .username("admin2")
                    .password("admin123")
                    .role(Role.ADMIN)
                    .build();
            User savedAdmin = repo.save(admin);
            System.out.println("Admin created: admin2/admin123");

            // Đoạn code Kafka của bạn...
            try {
                UserRegisteredEvent event = UserRegisteredEvent.builder()
                        .userId(savedAdmin.getId())
                        .username(savedAdmin.getUsername()) // Lúc này sẽ gửi đi là admin2
                        .role(savedAdmin.getRole().name())
                        .build();
                String eventJson = objectMapper.writeValueAsString(event);
                kafkaTemplate.send("user-events", eventJson);
                System.out.println("🚀 [Kafka Publish] Sent USER_REGISTERED event for ADMIN");
            } catch (Exception e) {
                System.err.println("❌ Lỗi khi gửi message lên Kafka: " + e.getMessage());
            }
        }
    }
    public User register(String username, String password) {
        if (repo.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }

        User user = User.builder()
                .username(username)
                .password(password)
                .role(Role.USER)
                .build();

        User savedUser = repo.save(user);

        // Đẩy Event lên Message Broker (Kafka)
        try {
            UserRegisteredEvent event = UserRegisteredEvent.builder()
                    .userId(savedUser.getId())
                    .username(savedUser.getUsername())
                    .role(savedUser.getRole().name())
                    .build();

            // Chuyển Object sang JSON String để dễ dàng tương thích với các service viết bằng ngôn ngữ khác (nếu có)
            String eventJson = objectMapper.writeValueAsString(event);

            kafkaTemplate.send("user-events", eventJson);
            System.out.println("🚀 [Kafka Publish] Sent USER_REGISTERED event for user: " + username);
        } catch (Exception e) {
            System.err.println("❌ Lỗi khi gửi message lên Kafka: " + e.getMessage());
            // Tùy logic nhóm: có thể ném ra lỗi hoặc vẫn cho user đăng ký thành công dù lỗi gửi event
        }

        return savedUser;
    }

    public User login(String username, String password) {
        User user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Wrong password");
        }

        return user;
    }

    public List<User> getAll() {
        return repo.findAll();
    }
}