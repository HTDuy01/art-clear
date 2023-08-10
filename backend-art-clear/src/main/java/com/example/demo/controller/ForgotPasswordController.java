package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmailService;

import java.util.Random;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class ForgotPasswordController {

	
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;
    @Autowired
	private PasswordEncoder passwordEncoder;
    @PostMapping("/forgotpassword")
    public ResponseEntity<String> forgotPassword(@RequestParam("email") String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("Không tìm thấy người dùng với email đã cung cấp.");
        }

        // Tạo một mã đặc biệt cho việc đặt lại mật khẩu
        String resetToken = generateResetToken();

        // Lưu mã đặc biệt vào cơ sở dữ liệu hoặc bảng reset_token
        user.setPassword(passwordEncoder.encode(resetToken));

        userRepository.save(user);

        // Gửi email chứa liên kết đặt lại mật khẩu
//        String resetLink = "https://your-website.com/reset-password?token=" + resetToken;
        String emailSubject = "Yêu cầu đặt lại mật khẩu";
        String emailBody = "Mật khẩu mới của bạn: " + resetToken;
        emailService.sendPasswordResetEmail(email, emailSubject, emailBody);

        return ResponseEntity.ok("Đã gởi đến Email");
    }
    public String generateResetToken() {
	    int length = 10; // Độ dài của mã đặc biệt
	    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    StringBuilder sb = new StringBuilder();

	    Random random = new Random();
	    for (int i = 0; i < length; i++) {
	        int index = random.nextInt(characters.length());
	        sb.append(characters.charAt(index));
	    }

	    return sb.toString();
	}

    

}
