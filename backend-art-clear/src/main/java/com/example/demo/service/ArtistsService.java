package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.example.demo.entity.Artists;



public interface ArtistsService {
public	List<Artists> getAllUser();
	
	Artists getArtistsID(Long id);

	ResponseEntity<?> getArtistByName(String name);
	
	ResponseEntity<?> getArtistByEmail(String email);

	ResponseEntity<?> getArtistByNameOrEmail(String value);

	
	ResponseEntity<?> saveArtists(Artists artists);


	void deleteArtists(Long id);
	
	ResponseEntity<Artists> updateArtists(Long id ,Artists artists);

	Optional<Artists> findArtistById(Long id);
	
}