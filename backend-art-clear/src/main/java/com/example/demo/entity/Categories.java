package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")
public class Categories {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long category_ID;


	private String categoryName;

	
	
//	public Categories(Long category_ID, String categoryName) {
//		super();
//		this.category_ID = category_ID;
//		this.categoryName = categoryName;
//	}

	
	public Categories() {
		
	}
	public Long getCategory_ID() {
		return category_ID;
	}

	public void setCategory_ID(Long category_ID) {
		this.category_ID = category_ID;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	

	


	
}

