package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Categories;



public interface CategoriesRepository extends JpaRepository<Categories, Long> {
	List<Categories> findByCategoryName(String categoryName);

	Boolean existsByCategoryName(String categoryName);
}
