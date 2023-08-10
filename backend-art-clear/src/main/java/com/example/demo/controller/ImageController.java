package com.example.demo.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ImageDTO;
import com.example.demo.entity.Image;
import com.example.demo.repository.ImageRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    // Upload an image
    @PostMapping("/addImage")
    public ResponseEntity<String> uploadImage(@ModelAttribute ImageDTO imageDTO) {
        try {
            Image image = new Image();
            // Set image properties
            image.setArtistId(imageDTO.getArtist_id());
            image.setCategoryId(imageDTO.getCategory_id());
            image.setPictureName(imageDTO.getPicture_name());
            image.setDescription(imageDTO.getDescription());
            image.setQuantity(imageDTO.getQuantity());
            image.setPrice(imageDTO.getPrice());
            image.setNameImage(StringUtils.cleanPath(imageDTO.getFile().getOriginalFilename()));
            image.setType(imageDTO.getFile().getContentType());
            image.setData(imageDTO.getFile().getBytes());

            imageRepository.save(image);

            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (IOException e) {
            // Handle IO exception when uploading image
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        }
    }

    // Get an image by ID
    @GetMapping("upload/product/{imageId}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long imageId) {
        try {
            Optional<Image> imageOptional = imageRepository.findById(imageId);
            if (imageOptional.isPresent()) {
                Image image = imageOptional.get();
                return ResponseEntity.ok().contentType(MediaType.valueOf(image.getType())).body(image.getData());
            } else {
                // Image not found
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle any exception during image retrieval
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get all images
    @GetMapping("/listImage")
    public ResponseEntity<Map<String, Object>> getAllImages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Image> imagePage = imageRepository.findAll(pageable);

            List<Image> images = imagePage.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("images", images);
            response.put("currentPage", imagePage.getNumber());
            response.put("totalItems", imagePage.getTotalElements());
            response.put("totalPages", imagePage.getTotalPages());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Handle any exception during image retrieval
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get image by ID
    @GetMapping("/detailsImage/{id}")
    public ResponseEntity<?> getImageById(@PathVariable("id") Long id) {
        try {
            Optional<Image> imageOptional = imageRepository.findById(id);
            if (imageOptional.isPresent()) {
                Image image = imageOptional.get();
                return ResponseEntity.ok(image);
            } else {
                // Image not found
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle any exception during image retrieval
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update an image
    @PutMapping("/editImage/{imageId}")
    public ResponseEntity<?> updateImage(@PathVariable Long imageId, @ModelAttribute ImageDTO imageDTO) {
        try {
            Optional<Image> imageOptional = imageRepository.findById(imageId);
            if (imageOptional.isPresent()) {
                Image image = imageOptional.get();
                // Update image properties
//                if (imageDTO.getArtist_id() != null ) {
//                    image.setArtistId(imageDTO.getArtist_id());
//                    }
//                    if (imageDTO.getCategory_id() != null ) {
//                    image.setCategoryId(imageDTO.getCategory_id());
//                    }
//                    if (imageDTO.getPicture_name() != null ) {
//                    image.setPictureName(imageDTO.getPicture_name());
//                    }
//                    if (imageDTO.getDescription() != null ) {
//                    image.setDescription(imageDTO.getDescription());
//                    }
//                    if (imageDTO.getQuantity() != null ) {
//                    image.setQuantity(imageDTO.getQuantity());
//                    }
//                    if (imageDTO.getPrice() != null ) {
//                    image.setPrice(imageDTO.getPrice());
//                    }
                image.setArtistId(imageDTO.getArtist_id());
                image.setCategoryId(imageDTO.getCategory_id());
                image.setPictureName(imageDTO.getPicture_name());
                image.setDescription(imageDTO.getDescription());
                image.setQuantity(imageDTO.getQuantity());
                image.setPrice(imageDTO.getPrice());
                
                if (imageDTO.getFile() != null && !imageDTO.getFile().isEmpty()) {
                	image.setNameImage(StringUtils.cleanPath(imageDTO.getFile().getOriginalFilename()));
                	image.setType(imageDTO.getFile().getContentType());
                	image.setData(imageDTO.getFile().getBytes());
    			}
//                image.setNameImage(StringUtils.cleanPath(imageDTO.getFile().getOriginalFilename()));
//                image.setType(imageDTO.getFile().getContentType());
//                image.setData(imageDTO.getFile().getBytes());

                imageRepository.save(image);

                return ResponseEntity.ok(image);
            } else {
                // Image not found
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            // Handle IO exception when updating image
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update image.");
        } catch (Exception e) {
            // Handle any other exception during image update
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete an image
    @DeleteMapping("/deleteImage/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {
        try {
            Optional<Image> imageOptional = imageRepository.findById(id);
            if (imageOptional.isPresent()) {
                Image image = imageOptional.get();
                imageRepository.delete(image);
                return ResponseEntity.ok("Image deleted successfully!");
            } else {
                // Image not found
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle any exception during image deletion
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get images by category ID
    @GetMapping("/listImageCategory/{categoryId}")
    public ResponseEntity<List<Image>> getImagesByCategoryId(@PathVariable("categoryId") Long categoryId) {
        try {
            List<Image> images = imageRepository.findBycategoryId(categoryId);
            if (!images.isEmpty()) {
                return ResponseEntity.ok(images);
            } else {
                // Images not found for the given category ID
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle any exception during image retrieval by category ID
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Create product cart
    @PostMapping("/productCart")
    public ResponseEntity<Object> productCart(@RequestBody Map<String, Integer> requestData) {
        try {
            List<Map<String, Object>> getImage = new ArrayList<>();

            for (Map.Entry<String, Integer> entry : requestData.entrySet()) {
                String id = entry.getKey();
                Integer value = entry.getValue();

                Image image = getImageById(id);
                if (image != null) {
                    Map<String, Object> imageMap = new HashMap<>();
                    imageMap.put("id", image.getId());
                    imageMap.put("picture_name", image.getPictureName());
                    imageMap.put("artist_id", image.getArtistId());
                    imageMap.put("category_id", image.getCategoryId());
                    imageMap.put("description", image.getDescription());
                    imageMap.put("price", image.getPrice());
                    imageMap.put("name_image", image.getNameImage());
                    imageMap.put("quantity", value);
                    getImage.add(imageMap);
                }
            }

            return new ResponseEntity<>(Map.of("response", "success", "data", getImage), HttpStatus.OK);
        } catch (Exception e) {
            // Handle any exception during product cart creation
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get image by ID from the repository
    private Image getImageById(String id) {
        try {
            Optional<Image> optionalImage = imageRepository.findById(Long.parseLong(id));
            if (optionalImage.isPresent()) {
                return optionalImage.get();
            } else {
                // Image not found
                return null;
            }
        } catch (Exception e) {
            // Handle any exception during image retrieval
            return null;
        }
    }
    
    
    @GetMapping("/searchImage")
    public ResponseEntity<?> searchImageByName(@ModelAttribute ImageDTO imageDTO) {
        try {
            String imageName = imageDTO.getPicture_name();
            List<Image> images = imageRepository.findByPictureNameContainingIgnoreCase(imageName);
            
//            if (images.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No images found.");
//            }
//            
//            return ResponseEntity.ok(images);
            
            if (!images.isEmpty()) {
            	return ResponseEntity.ok(images);
			} else {
				return ResponseEntity.ok(Collections.emptyList());
			}
            
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to search images.");
        }
    }
}
