package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long artistId;
    

    private Long categoryId;
    

    @NotEmpty(message = "name is required.")

    @Column(columnDefinition = "VARCHAR(5000)")
    private String pictureName;


    
    @Column(columnDefinition = "VARCHAR(5000)")
    private String description;


    private Float price;
    

    private Float quantity;
    
    private String nameImage;

    private String type;

    @Lob
    @Column(columnDefinition ="MEDIUMBLOB")
    private byte[] data;

   

	public Image() {
		
	}

//	public Image(Long id, Long artistId, Long categoryId, 
//			@NotEmpty(message = "name is required.") String pictureName, String description, Float price,
//			Float quantity, String nameImage, String type, byte[] data) {
//		this.id = id;
//		this.artistId = artistId;
//		this.categoryId = categoryId;
////		this.warehouse_id = warehouse_id;
//		this.pictureName = pictureName;
//		this.description = description;
//		this.price = price;
//		this.quantity = quantity;
//		this.nameImage = nameImage;
//		this.type = type;
//		this.data = data;
//	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getArtistId() {
		return artistId;
	}

	public void setArtistId(Long artistId) {
		this.artistId = artistId;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getPictureName() {
		return pictureName;
	}

	public void setPictureName(String pictureName) {
		this.pictureName = pictureName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public Float getQuantity() {
		return quantity;
	}

	public void setQuantity(Float quantity) {
		this.quantity = quantity;
	}

	public String getNameImage() {
		return nameImage;
	}

	public void setNameImage(String nameImage) {
		this.nameImage = nameImage;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

}
