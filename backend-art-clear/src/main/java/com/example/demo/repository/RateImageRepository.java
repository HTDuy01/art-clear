package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.RateImage;


public interface RateImageRepository extends JpaRepository<RateImage, Long > {
	List<RateImage> findByimageId(Long id);
	
	@Query("SELECT r FROM RateImage r WHERE r.userId = :userId")
    List<RateImage> findByUserId(@Param("userId") Long userId);
}
