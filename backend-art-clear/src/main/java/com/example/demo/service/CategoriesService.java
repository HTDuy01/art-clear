package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.example.demo.entity.Categories;


public interface CategoriesService {
	
	public	List<Categories> getAllCategories();
	
	ResponseEntity<?> getCategoriesByName(String categoryName);
	
	ResponseEntity<?> saveCategories(Categories categories);

	void deleteCategories(Long id);
	
	void updateCategories(Long id ,Categories categories);

	Optional<Categories> findCategoriesById(Long id);
}
