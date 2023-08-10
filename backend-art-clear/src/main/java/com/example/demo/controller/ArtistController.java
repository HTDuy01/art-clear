package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Artists;
import com.example.demo.service.ArtistsService;



@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class ArtistController {


	@Autowired
	private ArtistsService artistsService;
	
	@GetMapping("/ListArtists")
	public List<Artists> getAllUser() {
		return artistsService.getAllUser();
	}
	
	@PostMapping(path = "/Admin/AddArtists")
	public ResponseEntity<?> addArtists(@RequestBody Artists artists) {
		return artistsService.saveArtists(artists);

	}
	
	@GetMapping("/artistDetails/{id}")
	 public Artists getArtistsID(@PathVariable Long id) {
       return artistsService.getArtistsID(id);
   }
	
	@PutMapping("/Admin/UpdateArtists/{id}")
//	 public Artists updateArtists(@PathVariable Long id, @RequestBody Artists artistsRequest) {
//      return  artistsService.updateArtists(id, artistsRequest);
//   }
	public void updateArtists(@PathVariable Long id, @RequestBody Artists artistsRequest) {
	         artistsService.updateArtists(id, artistsRequest);
	    }

	@DeleteMapping("/Admin/deleteArtists/{id}")
	public void deleteArtists(@PathVariable(name = "id") Long artistsID) {
		artistsService.deleteArtists(artistsID);
	}
	
	@GetMapping("/search/nameArtists")
	public ResponseEntity<List<Artists>> getArtistByName(@RequestParam String name) {
		return 	(ResponseEntity<List<Artists>>) artistsService.getArtistByName(name);

	}
	
	@GetMapping("/search/emailArtists")
	public ResponseEntity<List<Artists>> getArtistByEmail(@RequestParam String email) {
		return 	(ResponseEntity<List<Artists>>) artistsService.getArtistByEmail(email);

	}
	@GetMapping("/search/")
	public ResponseEntity<List<Artists>> getArtistByNameOrEmail(@RequestParam String value) {
		return 	(ResponseEntity<List<Artists>>) artistsService.getArtistByNameOrEmail(value);
	}
	
//	@GetMapping("/search/name")
//	public ResponseEntity<List<Artists>> getArtistByName(@RequestParam String name) {
//		return new ResponseEntity<List<Artists>>(artistRepository.findByName(name), HttpStatus.OK);
//	}
//	@GetMapping("/search/email")
//	public ResponseEntity<List<Artists>> getArtistByEmail(@RequestParam String email) {
//		return new ResponseEntity<List<Artists>>(artistRepository.findByName(email), HttpStatus.OK);
//	}
//	@GetMapping("/search/")
//	public ResponseEntity<List<Artists>> getArtistByNameOrEmail(@RequestParam String value) {
//		return new ResponseEntity<List<Artists>>(artistRepository.findByNameOrEmail(value, value), HttpStatus.OK);
//	}

}