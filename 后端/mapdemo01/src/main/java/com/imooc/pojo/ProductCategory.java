package com.imooc.pojo;

import javax.persistence.*;

@Table(name = "product_category")
public class ProductCategory {
    @Id
    @Column(name = "category_id")
    private String categoryId;

    /**
     * 类目名字
     */
    @Column(name = "category_name")
    private String categoryName;

    /**
     * 类目编号
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
     * 获取类目名字
     *
     * @return category_name - 类目名字
     */
    public String getCategoryName() {
        return categoryName;
    }

    /**
     * 设置类目名字
     *
     * @param categoryName 类目名字
     */
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
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