package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;



public interface UserRepository extends JpaRepository<User, Long> {
//    Optional<User> findByEmail(String email);
   User findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Page<User> findAllByEmail(String username, Pageable pageable);
	Page<User> findAllByUsername(String username, Pageable pageable);
	
	Page<User> findAllByUsernameAndEmail(String username, String email, Pageable pageable);
	Page<User> findAllByUsernameOrEmail(String username, String email, Pageable pageable);
	
	Page<User> findAllByUsernameLike(String username, Pageable pageable);
	Page<User> findAllByUsernameContaining(String username, Pageable pageable);
	Page<User> findAllByUsernameStartingWith(String username, Pageable pageable);
	Page<User> findAllByUsernameEndingWith(String username, Pageable pageable);
	
	
	Page<User> findAllByEmailLike(String email, Pageable pageable);
	Page<User> findAllByEmailContaining(String email, Pageable pageable);
	Page<User> findAllByEmailStartingWith(String email, Pageable pageable);
	Page<User> findAllByEmailEndingWith(String email, Pageable pageable);
	
	
	Optional<User> findByUsernameIgnoreCase(String username);
	
//	Optional<User> findByuser_id(long id);
}
