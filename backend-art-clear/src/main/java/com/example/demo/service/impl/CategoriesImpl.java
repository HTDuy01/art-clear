package com.example.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Categories;
import com.example.demo.repository.CategoriesRepository;
import com.example.demo.service.CategoriesService;



@Service
public class CategoriesImpl implements CategoriesService {
	@Autowired
	private CategoriesRepository categoriesRepository;

	@Override
	public List<Categories> getAllCategories() {
//		List<Categories> allCategoryesEntity = new ArrayList<>();
//		Iterable<Categories> categories = categoriesRepository.findAll();
//		for (Categories categoriess : categories) {
//			allCategoryesEntity.add(categoriess);
//		}
//		return allCategoryesEntity;
		return (List<Categories>) categoriesRepository.findAll();

	}

	@Override
	public ResponseEntity<?> saveCategories(Categories categories) {

		// check if artist exists in DB
		if (categoriesRepository.existsByCategoryName(categories.getCategoryName())) {
			return new ResponseEntity<>("Artist name is already taken!", HttpStatus.BAD_REQUEST);
		}

		categoriesRepository.save(categories);
		
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}

	@Override
	public void deleteCategories(Long id) {
		categoriesRepository.deleteById(id);
	}

	@Override
	public Optional<Categories> findCategoriesById(Long id) {
		return categoriesRepository.findById(id);

	}

	@Override
	public void updateCategories(Long id, Categories categories) {
		Categories existingCategories = categoriesRepository.findById(id).get(); // DB
		existingCategories.setCategoryName(categories.getCategoryName());

		categoriesRepository.save(existingCategories);
	}

	@Override
	public ResponseEntity<?> getCategoriesByName(String categoryName) {
		return new ResponseEntity<List<Categories>>(categoriesRepository.findByCategoryName(categoryName), HttpStatus.OK);

	}
}
