package com.imooc.service;

import java.util.List;

import com.imooc.pojo.vo.ProductCategoryVO;

public interface ProductCategoryService {
	
	//从文件中读取数据并将其插入数据库
	public void ReadAndInsert(String filePath);
	//查询商品类目list
	public List<ProductCategoryVO>queryProductCategoryList();
	
}
