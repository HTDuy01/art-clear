package com.example.demo.repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Artists;


public interface ArtistRepository extends JpaRepository<Artists, Long> {
	List<Artists> findByName(String name);
	List<Artists> findByNameOrEmail(String name, String email);
	
//	Optional<Artists> findByName(String name);
	Optional<Artists> findByEmail(String email);
	
	Boolean existsByName(String name);
	Boolean existsByEmail(String email);
	
}
