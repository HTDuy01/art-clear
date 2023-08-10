package com.example.demo.entity;

import java.time.LocalDate;
import java.util.Map;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MapKeyColumn;

@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String buyerName;

    @ElementCollection
    @CollectionTable(name = "invoice_items")
    @MapKeyColumn(name = "product_id")
    @Column(name = "quantity")
    private Map<Long, Integer> items;

    @Column(nullable = false)
    private double totalAmount;

    @Column(nullable = false)
    private LocalDate purchaseDate;

	

	public Invoice() {
		
	}

//	public Invoice(Long id, String buyerName, Map<Long, Integer> items, double totalAmount, LocalDate purchaseDate) {
//		super();
//		this.id = id;
//		this.buyerName = buyerName;
//		this.items = items;
//		this.totalAmount = totalAmount;
//		this.purchaseDate = purchaseDate;
//	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBuyerName() {
		return buyerName;
	}

	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
	}

	public Map<Long, Integer> getItems() {
		return items;
	}

	public void setItems(Map<Long, Integer> items) {
		this.items = items;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public LocalDate getPurchaseDate() {
	    return purchaseDate;
	}

	public void setPurchaseDate(LocalDate purchaseDate) {
	    this.purchaseDate = purchaseDate;
	}
	
   
    
    
}

