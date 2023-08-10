package com.example.demo.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.LoginDto;
import com.example.demo.DTO.SignUpDto;
import com.example.demo.entity.Roles;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;


@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class LoginController {
	SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	Date date = new Date();
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

//	@PostMapping("/signin")
//	public ResponseEntity<String> authenticateUser(@RequestBody LoginDto loginDto) {
//		Authentication authentication = authenticationManager.authenticate(
//				new UsernamePasswordAuthenticationToken(loginDto.getUsernameOrEmail(), loginDto.getPassword()));
//
//		SecurityContextHolder.getContext().setAuthentication(authentication);
//		return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
//	}
	@PostMapping("/signin")
	public ResponseEntity<User> authenticateUser(@ModelAttribute LoginDto loginDto) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginDto.getUsernameOrEmail(), loginDto.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		Optional<User> userOptional = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(),loginDto.getUsernameOrEmail());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			return ResponseEntity.ok(user);
		} else {
				return ResponseEntity.notFound().build();
		}
	}

	@PostMapping(path = "/signup")
	public ResponseEntity<?> registerUser(@ModelAttribute SignUpDto signUpDto) throws IOException {

		// add check for username exists in a DB
		if (userRepository.existsByUsername(signUpDto.getUsername())) {
			return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
		}

		// add check for email exists in DB
		if (userRepository.existsByEmail(signUpDto.getEmail())) {
			return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
		}

			// create user object
			User user = new User();
			user.setUsername(signUpDto.getUsername());
			user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
			user.setEmail(signUpDto.getEmail());
			user.setFullname(signUpDto.getFullname());
			user.setPhone(signUpDto.getPhone());
		if (signUpDto.getFile() != null && !signUpDto.getFile().isEmpty()) {
			user.setAvatarName(StringUtils.cleanPath(signUpDto.getFile().getOriginalFilename()));
			user.setAvatarType(signUpDto.getFile().getContentType());
			user.setAvatarData(signUpDto.getFile().getBytes());
		}
		
		Roles roles = roleRepository.findByName("Customer").get();
		user.setRoles(Collections.singleton(roles));

		userRepository.save(user);

		return new ResponseEntity<>("User registered successfully", HttpStatus.OK);

	}
}
