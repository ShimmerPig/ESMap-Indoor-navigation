package com.imooc.pojo;

import javax.persistence.*;

@Table(name = "product_category")
public class ProductCategory {
    @Id
    @Column(name = "category_id")
    private String categoryId;

    /**
     * ��Ŀ����
     */
    @Column(name = "category_name")
    private String categoryName;

    /**
     * ��Ŀ���
     */
    @Column(name = "category_type")
    private Integer categoryType;

    /**
     * @return category_id
     */
    public String getCategoryId() {
        return categoryId;
    }

    /**
     * @param categoryId
     */
    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    /**
     * ��ȡ��Ŀ����
     *
     * @return category_name - ��Ŀ����
     */
    public String getCategoryName() {
        return categoryName;
    }

    /**
     * ������Ŀ����
     *
     * @param categoryName ��Ŀ����
     */
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
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