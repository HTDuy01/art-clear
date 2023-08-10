package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.RateImageDto;
import com.example.demo.entity.RateImage;
import com.example.demo.repository.RateImageRepository;



@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class RateImageController {

	@Autowired
	private RateImageRepository rateImageRepository;

	@PostMapping("/image/rate")
	public ResponseEntity<?> addRateImage(@RequestBody RateImageDto rateImageDto) {

		RateImage rateImage = new RateImage();

		rateImage.setUserId(rateImageDto.getUserId());
		rateImage.setImageId(rateImageDto.getImageId());
		rateImage.setRate(rateImageDto.getRate());

		rateImageRepository.save(rateImage);

		return new ResponseEntity<>(rateImage, HttpStatus.OK);
	}

	@GetMapping("/image/rate/{imageId}")
	public ResponseEntity<List<RateImage>> getCommentByImageId(@PathVariable("imageId") Long imageId) {
		List<RateImage> rateImage = rateImageRepository.findByimageId(imageId);
		if (!rateImage.isEmpty()) {
			return ResponseEntity.ok(rateImage);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// getRatesByUserId: Retrieves all rates given by a specific user based on their userId
	@GetMapping("/image/rate/user/{userId}")
	public ResponseEntity<List<RateImage>> getRatesByUserId(@PathVariable("userId") Long userId) {
		List<RateImage> rateImages = rateImageRepository.findByUserId(userId);
		if (!rateImages.isEmpty()) {
			return ResponseEntity.ok(rateImages);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// getRatesByUserId: Retrieves all rates given by a specific user based on their userId
	@GetMapping("/image/rate")
	public ResponseEntity<List<RateImage>> getAllRates() {
		List<RateImage> rateImages = rateImageRepository.findAll();
		return ResponseEntity.ok(rateImages);
	}
}