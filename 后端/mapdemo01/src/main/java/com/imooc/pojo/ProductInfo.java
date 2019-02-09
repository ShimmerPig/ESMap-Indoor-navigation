package com.imooc.pojo;

import java.math.BigDecimal;
import javax.persistence.*;

@Table(name = "product_info")
public class ProductInfo {
    @Id
    @Column(name = "product_id")
    private String productId;

    @Column(name = "product_x")
    private String productX;

    @Column(name = "product_y")
    private String productY;

    @Column(name = "product_fnum")
    private Integer productFnum;

    /**
     * 商品名称
     */
    @Column(name = "product_name")
    private String productName;

    /**
     * 单价
     */
    @Column(name = "product_price")
    private BigDecimal productPrice;

    /**
     * 小图
     */
    @Column(name = "product_icon")
    private String productIcon;

    /**
     * 大图
     */
    @Column(name = "product_icon_big")
    private String productIconBig;

    /**
     * 类目编号
     */
    @Column(name = "category_type")
    private Integer categoryType;

    /**
     * @return product_id
     */
    public String getProductId() {
        return productId;
    }

    /**
     * @param productId
     */
    public void setProductId(String productId) {
        this.productId = productId;
    }

    /**
     * @return product_x
     */
    public String getProductX() {
        return productX;
    }

    /**
     * @param productX
     */
    public void setProductX(String productX) {
        this.productX = productX;
    }

    /**
     * @return product_y
     */
    public String getProductY() {
        return productY;
    }

    /**
     * @param productY
     */
    public void setProductY(String productY) {
        this.productY = productY;
    }

    /**
     * @return product_fnum
     */
    public Integer getProductFnum() {
        return productFnum;
    }

    /**
     * @param productFnum
     */
    public void setProductFnum(Integer productFnum) {
        this.productFnum = productFnum;
    }

    /**
     * 获取商品名称
     *
     * @return product_name - 商品名称
     */
    public String getProductName() {
        return productName;
    }

    /**
     * 设置商品名称
     *
     * @param productName 商品名称
     */
    public void setProductName(String productName) {
        this.productName = productName;
    }

    /**
     * 获取单价
     *
     * @return product_price - 单价
     */
    public BigDecimal getProductPrice() {
        return productPrice;
    }

    /**
     * 设置单价
     *
     * @param productPrice 单价
     */
    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    /**
     * 获取小图
     *
     * @return product_icon - 小图
     */
    public String getProductIcon() {
        return productIcon;
    }

    /**
     * 设置小图
     *
     * @param productIcon 小图
     */
    public void setProductIcon(String productIcon) {
        this.productIcon = productIcon;
    }

    /**
     * 获取大图
     *
     * @return product_icon_big - 大图
     */
    public String getProductIconBig() {
        return productIconBig;
    }

    /**
     * 设置大图
     *
     * @param productIconBig 大图
     */
    public void setProductIconBig(String productIconBig) {
        this.productIconBig = productIconBig;
    }

    /**
     * 获取类目编号
     *
     * @return category_type - 类目编号
     */
    public Integer getCategoryType() {
        return categoryType;
    }

    /**
     * 设置类目编号
     *
     * @param categoryType 类目编号
     */
    public void setCategoryType(Integer categoryType) {
        this.categoryType = categoryType;
    }
}