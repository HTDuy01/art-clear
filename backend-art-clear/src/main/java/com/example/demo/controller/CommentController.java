package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.CommentDto;
import com.example.demo.entity.Comment;
import com.example.demo.repository.CommentRepository;



@RestController
@CrossOrigin
@RequestMapping("/api/auth")

public class CommentController {
	@Autowired
	private CommentRepository commentRepository;
	
	
	@PostMapping(path="/comment/add")
	public ResponseEntity<?> addComment(@RequestBody CommentDto commentDto) {
		
		
		
		Comment comment = new Comment();
		
		comment.setImageId(commentDto.getImageId());
		comment.setUserId(commentDto.getUserId());
		comment.setUserName(commentDto.getUserName());
		comment.setCommentId(commentDto.getCommentId());
		comment.setComment(commentDto.getComment());
		
		commentRepository.save(comment);
		
		return new ResponseEntity<>(comment, HttpStatus.OK );
	}
	
	@PutMapping(path = "/comment/edit/{id}")
	public ResponseEntity<?> editComment(@PathVariable("id") long id, @RequestBody CommentDto commentDto) {
	    // Tìm comment cần chỉnh sửa dựa trên id
	    Comment existingComment = commentRepository.findById(id).orElse(null);
	    
	    // Kiểm tra nếu comment không tồn tại
	    if (existingComment == null) {
	        return new ResponseEntity<>("Comment not found", HttpStatus.NOT_FOUND);
	    }
	    existingComment.setComment(commentDto.getComment());

	    // Lưu comment đã chỉnh sửa vào commentRepository
	    commentRepository.save(existingComment);

	    return new ResponseEntity<>(existingComment, HttpStatus.OK);
	}
	
//	@GetMapping(path="/comment/id")
//	private ResponseEntity<?> getImageId(@RequestParam String imageId) {
//		return new ResponseEntity<T>
//	}
	@GetMapping("/comment/{imageId}")
    public ResponseEntity<List<Comment>> getCommentByImageId(@PathVariable("imageId") Long imageId) {
        List<Comment> comment = commentRepository.findByImageId(imageId);
        if (!comment.isEmpty()) {
            return ResponseEntity.ok(comment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	
	@DeleteMapping("/comment/delete/{id}")
	public ResponseEntity<?> deleteComment(@PathVariable Long id) {
	    Optional<Comment> optionalComment = commentRepository.findById(id);
	    if (optionalComment.isPresent()) {
	        Comment comment = optionalComment.get();
	        commentRepository.delete(comment);
	        return new ResponseEntity<>("Comment deleted successfully", HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>("Comment not found", HttpStatus.NOT_FOUND);
	    }
	}
	@GetMapping("/commentId/{id}")
	public ResponseEntity<?> getCommentById(@PathVariable("id") Long id) {
	    try {
	        Optional<Comment> optionalComment = commentRepository.findById(id);
	        if (optionalComment.isPresent()) {
	            Comment comment = optionalComment.get();
	            return new ResponseEntity<>(comment, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Comment not found", HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        // Handle any exception that occurred during the execution of the code
	        return new ResponseEntity<>("Error occurred while retrieving comment: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}

