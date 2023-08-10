package com.example.demo.DTO;

public class CategoriesDto {

	private String categoryName;

	

	public CategoriesDto(String categoryName) {
		super();
		this.categoryName = categoryName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

}

