package com.imooc.pojo.vo;

import java.math.BigDecimal;

import javax.persistence.Column;

public class ProductInfoVO {
	private String productId;
    private String productX;
    private String productY;
    private Integer productFnum;
    private String productName;
    private BigDecimal productPrice;
    private String productIcon;
    private String productIconBig;
    private Integer categoryType;
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getProductX() {
		return productX;
	}
	public void setProductX(String productX) {
		this.productX = productX;
	}
	public String getProductY() {
		return productY;
	}
	public void setProductY(String productY) {
		this.productY = productY;
	}
	public Integer getProductFnum() {
		return productFnum;
	}
	public void setProductFnum(Integer productFnum) {
		this.productFnum = productFnum;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public BigDecimal getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(BigDecimal productPrice) {
		this.productPrice = productPrice;
	}
	public String getProductIcon() {
		return productIcon;
	}
	public void setProductIcon(String productIcon) {
		this.productIcon = productIcon;
	}
	public String getProductIconBig() {
		return productIconBig;
	}
	public void setProductIconBig(String productIconBig) {
		this.productIconBig = productIconBig;
	}
	public Integer getCategoryType() {
		return categoryType;
	}
	public void setCategoryType(Integer categoryType) {
		this.categoryType = categoryType;
	}
    
}
