package com.example.demo.DTO;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ImageDTO {
	private Long artist_id;
	private Long category_id;
	private String picture_name;
	private String description;
	private Float quantity;
	private Float price;
	private MultipartFile file;
	
	
	public Long getArtist_id() {
		return artist_id;
	}
	public void setArtist_id(Long artist_id) {
		this.artist_id = artist_id;
	}
	public Long getCategory_id() {
		return category_id;
	}
	public void setCategory_id(Long category_id) {
		this.category_id = category_id;
	}
	public String getPicture_name() {
		return picture_name;
	}
	public void setPicture_name(String picture_name) {
		this.picture_name = picture_name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Float getQuantity() {
		return quantity;
	}
	public void setQuantity(Float quantity) {
		this.quantity = quantity;
	}
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	public MultipartFile getFile() {
		return file;
	}
	public void setFile(MultipartFile file) {
		this.file = file;
	}
	
	
}

