package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Image;


@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
	List<Image> findBycategoryId(Long categoryId);
//	List<Image> findByCategoryName(String categoryName);
	List<Image> findByPictureNameContainingIgnoreCase(String pictureName);
}

