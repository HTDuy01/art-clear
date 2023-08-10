package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

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

import com.example.demo.entity.Categories;
import com.example.demo.service.CategoriesService;



@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class CategoriesController {
	@Autowired
	private CategoriesService categoriesService;

	@GetMapping("/ListCategories")
	public List<Categories> getAllCategories() {
		return categoriesService.getAllCategories();
	}

	@GetMapping("/categoriesDetails/{id}")
	public Optional<Categories> getCategoriesID(@PathVariable Long id) {
		return categoriesService.findCategoriesById(id);
	}

	@PostMapping("/Admin/AddCategories")
	public ResponseEntity<?> createCategories(@RequestBody Categories categories) {
		return categoriesService.saveCategories(categories);
	}

	@PutMapping("/Admin/UpdateCategories/{id}")
	public void updateCategories(@PathVariable Long id, @RequestBody Categories categoriesRequest) {
		categoriesService.updateCategories(id, categoriesRequest);
	}

	@DeleteMapping("/Admin/deleteCategories/{id}")
	public void deleteCategories(@PathVariable(name = "id") Long categoriesID) {
		categoriesService.deleteCategories(categoriesID);
	}

	@GetMapping("/search/nameCategories")
	public ResponseEntity<List<Categories>> getCategoriesByName(@RequestParam String categoryName) {
		return (ResponseEntity<List<Categories>>) categoriesService.getCategoriesByName(categoryName);

	}

}

