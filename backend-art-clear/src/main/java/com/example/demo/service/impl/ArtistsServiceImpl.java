package com.example.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Artists;
import com.example.demo.repository.ArtistRepository;
import com.example.demo.service.ArtistsService;


@Service
public class ArtistsServiceImpl implements ArtistsService {
	@Autowired
	private ArtistRepository artistsRepository;

	@Override
	public List<Artists> getAllUser() {
		//C1
//		List<Artists> allArtistsEntity = new ArrayList<>();
//		Iterable<Artists> artists = artistsRepository.findAll();
//		for (Artists artistss : artists) {
//			allArtistsEntity.add(artistss);
//		}
//		return allArtistsEntity;
		//C2
		return (List<Artists>) artistsRepository.findAll();
	}

	@Override
	public ResponseEntity<?> saveArtists(Artists artists) {

		// check if artist exists in DB
		if (artistsRepository.existsByName(artists.getName())) {
			return new ResponseEntity<>("Artist name is already taken!", HttpStatus.BAD_REQUEST);
		}
		// check if email exists in DB
		if (artistsRepository.existsByEmail(artists.getEmail())) {
			return new ResponseEntity<>("Artist email is already taken!", HttpStatus.BAD_REQUEST);
		}

//		Artists artistss = new Artists();
//		artistss.setName(artists.getName());
//		artistss.setBiography(artists.getBiography());
//		artistss.setEmail(artists.getEmail());
//		artistss.setPhone(artists.getPhone());

		artistsRepository.save(artists);

		return new ResponseEntity<>(artists, HttpStatus.OK);

	}

	@Override
	public void deleteArtists(Long id) {
		artistsRepository.deleteById(id);

	}

	@Override
	public Optional<Artists> findArtistById(Long id) {
		return artistsRepository.findById(id);

	}

	@Override
	public ResponseEntity<Artists> updateArtists(Long id, Artists artists) {
		Artists existingArtists = artistsRepository.findById(id).get(); // DB
		existingArtists.setName(artists.getName());
		existingArtists.setBiography(artists.getBiography());
		existingArtists.setEmail(artists.getEmail());
		existingArtists.setPhone(artists.getPhone());
		artistsRepository.save(existingArtists);

		return new ResponseEntity<>(existingArtists, HttpStatus.OK);
	}

	@Override
	public Artists getArtistsID(Long id) {
		return artistsRepository.findById(id).get();
	}

	@Override
	public ResponseEntity<?> getArtistByName(String name) {
		return new ResponseEntity<List<Artists>>(artistsRepository.findByName(name), HttpStatus.OK);

	}

	@Override
	public ResponseEntity<?> getArtistByEmail(String email) {
		return new ResponseEntity<List<Artists>>(artistsRepository.findByName(email), HttpStatus.OK);

	}

	@Override
	public ResponseEntity<?> getArtistByNameOrEmail(String value) {
		return new ResponseEntity<List<Artists>>(artistsRepository.findByNameOrEmail(value, value), HttpStatus.OK);

	}

}

