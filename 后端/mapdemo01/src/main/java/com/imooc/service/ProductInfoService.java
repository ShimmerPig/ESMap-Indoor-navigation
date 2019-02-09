package com.imooc.service;

import java.util.List;

import com.imooc.pojo.vo.ProductInfoVO;

public interface ProductInfoService {
	//从文件中读取数据并将其插入数据库
	public void ReadAndInsert(String filePath);
	//通过商品的类目，查询对应的商品list
	public List<ProductInfoVO>queryProductInfoList(String categoryType);
}
