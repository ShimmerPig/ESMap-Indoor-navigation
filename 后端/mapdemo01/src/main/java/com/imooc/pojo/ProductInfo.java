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
     * ��Ʒ����
     */
    @Column(name = "product_name")
    private String productName;

    /**
     * ����
     */
    @Column(name = "product_price")
    private BigDecimal productPrice;

    /**
     * Сͼ
     */
    @Column(name = "product_icon")
    private String productIcon;

    /**
     * ��ͼ
     */
    @Column(name = "product_icon_big")
    private String productIconBig;

    /**
     * ��Ŀ���
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
     * ��ȡ��Ʒ����
     *
     * @return product_name - ��Ʒ����
     */
    public String getProductName() {
        return productName;
    }

    /**
     * ������Ʒ����
     *
     * @param productName ��Ʒ����
     */
    public void setProductName(String productName) {
        this.productName = productName;
    }

    /**
     * ��ȡ����
     *
     * @return product_price - ����
     */
    public BigDecimal getProductPrice() {
        return productPrice;
    }

    /**
     * ���õ���
     *
     * @param productPrice ����
     */
    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    /**
     * ��ȡСͼ
     *
     * @return product_icon - Сͼ
     */
    public String getProductIcon() {
        return productIcon;
    }

    /**
     * ����Сͼ
     *
     * @param productIcon Сͼ
     */
    public void setProductIcon(String productIcon) {
        this.productIcon = productIcon;
    }

    /**
     * ��ȡ��ͼ
     *
     * @return product_icon_big - ��ͼ
     */
    public String getProductIconBig() {
        return productIconBig;
    }

    /**
     * ���ô�ͼ
     *
     * @param productIconBig ��ͼ
     */
    public void setProductIconBig(String productIconBig) {
        this.productIconBig = productIconBig;
    }

    /**
     * ��ȡ��Ŀ���
     *
     * @return category_type - ��Ŀ���
     */
    public Integer getCategoryType() {
        return categoryType;
    }

    /**
     * ������Ŀ���
     *
     * @param categoryType ��Ŀ���
     */
    public void setCategoryType(Integer categoryType) {
        this.categoryType = categoryType;
    }
}