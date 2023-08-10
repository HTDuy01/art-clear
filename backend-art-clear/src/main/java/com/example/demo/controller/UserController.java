package com.example.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.UserDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class UserController {
	private static String UPLOADED_FOLDER = System.getProperty("user.dir") + "//src//main//resources//static//upload//";

	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private HttpServletResponse response;
	@Autowired
	private PasswordEncoder passwordEncoder;
	private static final long MAX_FILE_SIZE = 32 * 1024 * 1024; // 10 MB

	@RequestMapping("/download")
	public void download(@RequestParam String fileName) {

		Path file = Paths.get(UPLOADED_FOLDER, fileName);
		if (Files.exists(file)) {
			response.setContentType("application/pdf");
			response.addHeader("Content-Disposition", "attachment; filename=" + fileName);
			try {
				Files.copy(file, response.getOutputStream());
				response.getOutputStream().flush();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}


	
	
	@GetMapping(value = "/users")
	public ResponseEntity<Map<String, Object>> getAllUsers(
	        @RequestParam(required = false) String email,
	        @RequestParam(required = false) String name,
	        @RequestParam(required = false, defaultValue = "and") String type,
	        @RequestParam(required = false, defaultValue = "like") String type_search,
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size) {

	    try {
	        List<User> users = new ArrayList<>();
	        Pageable paging = PageRequest.of(page, size);

	        Page<User> pageUsers;

	        if (email != null && name != null) {
	            if (type.equals("and")) {
	                pageUsers = userRepository.findAllByUsernameAndEmail(name, email, paging);
	            } else if (type.equals("or")) {
	                pageUsers = userRepository.findAllByUsernameOrEmail(name, email, paging);
	            } else {
	                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	            }
	        } else if (email != null) {
	            if (type_search.equals("like")) {
	                pageUsers = userRepository.findAllByEmailContaining(email, paging);
	            } else if (type_search.equals("equal")) {
	                pageUsers = userRepository.findAllByEmail(email, paging);
	            } else {
	                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	            }
	        } else if (name != null) {
	            if (type_search.equals("like")) {
	                pageUsers = userRepository.findAllByUsernameContaining(name, paging);
	            } else if (type_search.equals("equal")) {
	                pageUsers = userRepository.findAllByUsername(name, paging);
	            } else {
	                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	            }
	        } else {
	            pageUsers = userRepository.findAll(paging);
	        }

	        users = pageUsers.getContent();

	        Map<String, Object> response = new HashMap<>();
	        response.put("users", users);
	        response.put("currentPage", pageUsers.getNumber());
	        response.put("totalItems", pageUsers.getTotalElements());
	        response.put("totalPages", pageUsers.getTotalPages());

	        return new ResponseEntity<>(response, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	public static int[] merge(int[]... intarrays) {
		return Arrays.stream(intarrays).flatMapToInt(Arrays::stream).toArray();
	}

	@PutMapping(value = "/editUser/{userId}")
	public ResponseEntity<?> editUser(@PathVariable Long userId, @ModelAttribute UserDto userDto) {
	    Optional<User> userOptional = userRepository.findById(userId);

	    if (userOptional.isPresent()) {
	        User user = userOptional.get();

	        // Update specific fields if data is provided
	        boolean hasChanges = false;

	        if (userDto.getUsername() != null && !userDto.getUsername().isEmpty()
	                && !user.getUsername().equals(userDto.getUsername())) {
	            if (userRepository.existsByUsername(userDto.getUsername())) {
	                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken!");
	            }
	            user.setUsername(userDto.getUsername());
	            hasChanges = true;
	        }

	        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
	            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
	            hasChanges = true;
	        }

	        if (userDto.getFullname() != null && !userDto.getFullname().isEmpty()) {
	            user.setFullname(userDto.getFullname());
	            hasChanges = true;
	        }

	        if (userDto.getPhone() != null && !userDto.getPhone().isEmpty()
	                && !user.getPhone().equals(userDto.getPhone())) {
	            user.setPhone(userDto.getPhone());
	            hasChanges = true;
	        }

	        // Add check for email exists in DB if the email field is not null or empty
	        if (userDto.getEmail() != null && !userDto.getEmail().isEmpty()
	                && !user.getEmail().equals(userDto.getEmail())) {
	            if (userRepository.existsByEmail(userDto.getEmail())) {
	                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already taken!");
	            }
	            user.setEmail(userDto.getEmail());
	            hasChanges = true;
	        }

	        // Check if the file property is not null and contains data before updating the avatar
	        if (userDto.getFile() != null && !userDto.getFile().isEmpty()) {
	            try {
	                if (userDto.getFile().getSize() > MAX_FILE_SIZE) {
	                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                            .body("File size exceeds the maximum limit. Maximum file size allowed: " + MAX_FILE_SIZE
	                                    + " bytes.");
	                }
	                user.setAvatarName(StringUtils.cleanPath(userDto.getFile().getOriginalFilename()));
	                user.setAvatarType(userDto.getFile().getContentType());
	                user.setAvatarData(userDto.getFile().getBytes());
	                hasChanges = true;
	            } catch (IOException e) {
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                        .body("Failed to process the uploaded file.");
	            }
	        }

	        if (hasChanges) {
	            try {
	                userRepository.save(user);
	                return ResponseEntity.ok(user);
	            } catch (Exception e) {
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update this user.");
	            }
	        }

	        return ResponseEntity.ok(user);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}




	


	@DeleteMapping("/deleteUser/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
		Optional<User> userOptional = userRepository.findById(userId);
		if (userOptional.isPresent()) {
			User user = userOptional.get();

			user.setRoles(null); // Xóa quan hệ giữa User và Roles
			userRepository.save(user); // Lưu User sau khi xóa quan hệ

			// Xoá chính
			userRepository.delete(user);
			return ResponseEntity.ok("User has id: " + userId + " deleted successfully!");
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// show user details by user id {id}
	@GetMapping("/detailsUser/{id}")
	public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
		Optional<User> avatarOptional = userRepository.findById(id);
		if (avatarOptional.isPresent()) {
			User user = avatarOptional.get();
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// show user's avatar
	@GetMapping("/detailsUser/avatar/{userId}")
	public ResponseEntity<?> getAvatar(@PathVariable Long userId) {
		Optional<User> userOptional = userRepository.findById(userId);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			if (user.getAvatarData() != null && user.getAvatarData().length > 0) {
				return ResponseEntity.ok().contentType(MediaType.valueOf(user.getAvatarType()))
						.body(user.getAvatarData());
			} else {
				String error = "Avatar not found for user with ID: " + userId;
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
			}
		} else {
			String error = "User not found with ID: " + userId;
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
		}
	}

	@DeleteMapping("deleteUser/avatar/{userId}")
	public ResponseEntity<String> deleteAvatar(@PathVariable Long userId) {
		Optional<User> userOptional = userRepository.findById(userId);
		if (userOptional.isPresent()) {
			User user = userOptional.get();

			try {
				// Check if the user has an avatar
				if (user.getAvatarData() != null && user.getAvatarData().length > 0) {
					// Delete the avatar by setting the avatar data to null
					user.setAvatarData(null);
					user.setAvatarType(null);
					user.setAvatarName(null);
					userRepository.save(user);

					return ResponseEntity.ok("Avatar deleted for user with ID: " + userId);
				} else {
					// Handle case when the user has no avatar
					return ResponseEntity.badRequest().body("User with ID: " + userId + " does not have an avatar.");
				}
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Failed to delete avatar for user with ID: " + userId);
			}
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}